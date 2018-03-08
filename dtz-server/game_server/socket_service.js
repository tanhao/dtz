const logger=require('../common/log.js').getLogger('socket_service.js');
const crypto=require('../common/crypto.js');
const db=require('../common/db.js');
const tokenManager=require('./token_manager.js');
const roomManager=require('./room_manager.js');
const userManager=require('./user_manager.js');


var io=null;

module.exports.start=function(config){
     io = require('socket.io')();
     io.set('authorization', function (handshake, accept) {
        let {roomNo,token,time,sign}=handshake._query;
        roomNo=roomNo&&parseInt(roomNo);
        time=time&&parseInt(time);
        //logger.info(token,roomNo,sign,time);
        //检查参数合法性
        if(token == null || roomNo == null || sign == null || time == null){
            accept('invalid parameters', false);
            return;
        }
        //检查参数是否被篡改
        var socketSign = crypto.md5(roomNo + token + time + config.HALL_PRIVATE_KEY);
		if(socketSign != sign){
            accept('sign failed', false);
			return;
        }
        //检查token是否有效
		if(tokenManager.isTokenValid(token)==false){
            accept('token invalid.', false);
			return;
        }
        //检查房间合法性
        let userId=tokenManager.getUserID(token);
        roomNo=roomManager.getUserRoomNo(userId);
        if(userId == null || roomNo == null){
            accept('enter room failed.', false);
			return;
        }
        accept(null, true);
     });
     io.on('connection',function(socket){
        let {token} = socket.handshake.query;
        let userId = tokenManager.getUserID(token);
        let roomNo = roomManager.getUserRoomNo(userId);
        let ip = socket.handshake.address.replace('::ffff:','');
        //logger.info('connection=>',token,userId,roomNo);
        userManager.bind(userId,socket);
        socket.userId=userId;
        //设置用户IP
        roomManager.setUserIp(userId,ip);
        roomManager.setUserOnline(userId,true);
        //返回房间信息
        let room = roomManager.getRoom(roomNo);
        let initData={
            roomNo:room.roomNo,
            config:room.config,
            seats:room.seats
        }
        socket.emit('init',initData);
        //通知其它客户端
        let newUserData=room.seats.find(seat=>seat.userId==userId);
        userManager.broacastInRoom('new_user_join',newUserData,userId);
        
        //准备
        socket.on('ready',function(data){
        });
        //聊天
		socket.on('chat',function(data){
        });
        //表情
		socket.on('emoji',function(data){
        });
        //断开链接
		socket.on('disconnect',function(data){
        });
        //心跳
        socket.on('heartbeat',function(data){
		});

        
     });
     io.listen(config.CLIENT_PORT);
     logger.info('Game socket service is listening on ' + config.SERVER_IP + ':' + config.CLIENT_PORT);
}