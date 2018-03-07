const logger=require('../common/log.js').getLogger('room_manager.js');
const crypto=require('../common/crypto.js');
const mongoose=require('mongoose');
const db=require('../common/db.js');

var rooms = {};
//存放用户在那个房间那个座位
var locations = {};

function generateRoomNo(){
	let roomNo = "";
	for(let i = 0; i < 6; ++i){
        let tmp=Math.floor(Math.random()*10);
        if(i==0&&tmp==0){
            --i;
            continue;
        };
		roomNo +=tmp;
	}
	return parseInt(roomNo);
}

module.exports.createRoom=function(creator,config,balance,ip,port,callback){
    if(!config.type) return callback(new Error('invalid parameters'),null);
    let manager=null;
    if(config.type==='symj'){
        manager = require("./game_manager_symj.js");
    }
    if(!manager) return callback(new Error('game type error'),null);
    let success=manager.checkConfig(config);
    if(!success) return  callback(new Error('invalid parameters'),null);
    //验证房间配置
    let fnCreate=function(){
        let roomNo=generateRoomNo();
        if(rooms[roomNo]) return fnCreate();
        db.isRoomExist(roomNo,function(err,isExist){
            if(err||isExist) return fnCreate();
            let room={
                roomNo:roomNo,
                ip:ip,
                port: port,
                config:config,
                seats: manager.initSeats(),
                creator:mongoose.Types.ObjectId(creator),
                createdTime: Math.ceil(Date.now()/1000)
            };
            db.createRoom(room,function(err,data){
                if(err) return callback(err,null);
                rooms[roomNo]=data;
                rooms[roomNo].manager=manager;
                callback(null,roomNo);
            })
        });
    }
    fnCreate();
}

module.exports.joinRoom = function(userId,name,headImgUrl,roomNo,ip,port,callback){
    let fnTakeSeat=function(room){
        if(module.exports.getUserRoomNo(userId) == roomNo){
			return true;
        }
        let idleSeats=[];
        for(let i=0;i<room.seats.length;i++){
            if(room.seats[i].userId==null){
                idleSeats.push(i);
            }
        }
        if(idleSeats.length==0){
            return false;
        }
        let index=Math.floor(Math.random()*idleSeats.length);
        let seat=room.seats[index];
        seat.userId=mongoose.Types.ObjectId(userId);
        seat.name=name;
        seat.headImgUrl=headImgUrl;
        locations[userId]={
            roomNo:roomNo,
            seatIndex:index
        }
        return true;        
    }
    let room = rooms[roomNo];
    if(room){
        //如果房间存在，选一个座位
        if(!fnTakeSeat(room)) return  callback(new Error('room is full'),null);
        callback(null,room);
    }else{
        db.getRoomAndModifyIpPort(roomNo,ip,port,function(err,room){
            if(err) return callback(err,null);
            if(!room) return callback(new Error('room no exist'),null);
            //根据DB的数据还原room
            rooms[roomNo]=room;
            if(!fnTakeSeat(room)) return  callback(new Error('room is full'),null);
            callback(null,room);
        })
    }
}

module.exports.getRoom = function(roomNo){
	return rooms[roomNo];
};

module.exports.getUserRoomNo = function(userId){
    let location = locations[userId];
    return location && location.roomNo;
};

module.exports.getUserSeatIndex = function(userId){
    let location = locations[userId];
    return location && location.seatIndex;
};

module.exports.setUserIp = function(userId,ip){
    let roomNo=module.exports.getUserRoomNo(userId);
    let room=module.exports.getRoom(roomNo);
    let seatIndex=module.exports.getUserSeatIndex(userId);
    room.seats[seatIndex].ip=ip;
};

module.exports.setUserOnline = function(userId,isOnline){
    let roomNo=module.exports.getUserRoomNo(userId);
    let room=module.exports.getRoom(roomNo);
    let seatIndex=module.exports.getUserSeatIndex(userId);
    room.seats[seatIndex].online=isOnline;
};

module.exports.getTotalRooms = function(){
	return Object.keys(rooms).length+2;
}