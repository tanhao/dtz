const logger=require('../common/log.js').getLogger('user_manager.js');
const roomManager=require('./room_manager.js');

var users = {};
module.exports.bind = function(userId,socket){
    users[userId] = socket;
}

module.exports.del=function(userId,socket){
    logger.info('del:'+userId);
    delete users[userId];
}

module.exports.get=function(userId){
    return users[userId];
}

module.exports.isOnline = function(userId){
   return users[userId]?true:false;
};

module.exports.getOnlineCount = function(){
    return Object.keys(users).length;
}

module.exports.sendMsg = function(userId,event,msg){
    let socket = users[userId];
    if(socket == null) return;
    socket.emit(event,msg);
};


module.exports.kickAllInRoom = function(roomNo){
    let room=roomNo && roomManager.getRoom(roomNo) || null;
    if(!room) return ;
    for(let i = 0; i < room.seats.length; ++i){
        let seat = room.seats[i];
        let socket = users[seat.userId];
        if(socket){
            module.exports.del(seat.userId);
            socket.disconnect();
        }
    }
};

module.exports.broacastInRoom=function(event,data,sender,includingSender){
    let roomNo=roomManager.getUserRoomNo(sender);
    if(!roomNo) return;
    let room=roomManager.getRoom(roomNo);
    if(!room) return ;
    for(let i=0;i<room.seats.length;++i){
        let seat=room.seats[i];
        //如果不需要发给发送方，则跳过
        if(seat.userId==sender && includingSender==false){
            continue;
        }
        let socket=users[seat.userId];
        if(socket){
            socket.emit(event,data);
        }
    }
}