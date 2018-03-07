/*
用来处理客户端大厅请求
*/
const logger=require('../common/log.js').getLogger('client_service.js');
const crypto=require('../common/crypto.js');
const http=require('../common/http.js');
const db=require('../common/db.js');
const express=require('express');
const waterfall = require('async/waterfall');
const hallService=require('./hall_service.js');

var app=express();
var config=null;
module.exports.start=function(cfg){
    config=cfg;
    app.listen(config.CLIENT_PORT,config.HALL_IP);
    logger.info('Hall client service is listening on ' + config.HALL_IP + ':' + config.CLIENT_PORT);
}

//设置跨域访问
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE');
    res.header('X-Powered-By', '3.2.1')
    res.header('Content-Type', "application/json;charset=utf-8");
    next();
});

function checkAccount(req,res){
    let {account, sign} = req.query;
    let ip=http.getClientIp(req);
    if(account == null || sign == null){
        http.send(res,-1,'invalid parameters.');
		return false;
    }
    //验证数据是否被篡改
    var hallSign = crypto.md5(account + ip+ config.ACCOUNT_PRIVATE_KEY);
	if(hallSign != sign){
        http.send(res,-1,'sign failed');
		return false;
	} 
    return true;
}
//登陆游戏
app.get('/login',function(req,res){
    if(!checkAccount(req,res)){
		return;
	}
    let ip=http.getClientIp(req);
    let account=req.query.account;
    waterfall([
        (callback)=>{
            db.findUserByAccount(account,callback);
        },
        (user,callback)=>{
            user=JSON.parse(JSON.stringify(user));
            //如果用户没处于房间中
            if(!user.roomNo){
                delete user.roomNo;
                return  callback(null,false,user);
            };
             //如果用户处于房间中，则需要对其房间进行检查。 如果房间还在，则通知用户进入
            db.isRoomExist(user.roomNo,function(err,isExist){
                callback(err,isExist,user);
            });
        },
        (isRoomExist,user,callback)=>{
            if(!isRoomExist&&user.roomNo){
                delete user.roomNo;
                db.updateUsersRoomNo([user._id],null,function(err,res){
                    callback(err,user)
                })
                return;
            }
            callback(null,user);
        }
    ], function (err, user) {
        if(err) return http.send(res,-1,err.message);
        http.send(res,0,'ok',user);
    });
});

app.get('/create_private_room',function(req,res){
    if(!checkAccount(req,res)){
		return;
    }
    let data=req.query;
    let account = data.account;
    let config=data.config;
    delete data.account;
    delete data.sign;

    waterfall([
        (callback)=>{
            db.findUserByAccount(account,callback);
        },
        (user,callback)=>{
            if(user.roomNo) return callback(new Error('user is playing in room now.'),null);
            hallService.createRoom(user._id.toString(),config,callback);
        }
    ], function (err, data) {
        if(err) return http.send(res,-1,err.message);
        http.send(res,0,'ok',data);
    });
});

app.get('/join_private_room',function(req,res){
    if(!checkAccount(req,res)){
		return;
    }
    let roomNo=req.query.roomNo&&parseInt(req.query.roomNo);
    let account=req.query.account;
    if(roomNo == null){
        http.send(res,-1,'invalid parameters');
		return;
	}
    waterfall([
        (callback)=>{
            db.findUserByAccount(account,callback);
        },
        (user,callback)=>{
            hallService.joinRoom(user._id.toString(),user.name,user.headImgUrl,roomNo,callback);
        }
    ], function (err, data) {
        if(err) return http.send(res,-1,err.message);
        http.send(res,0,'ok',data);
    });
});