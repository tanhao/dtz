const logger=require('../common/log.js').getLogger('room_manager.js');
const crypto=require('../common/crypto.js');
const mongoose=require('mongoose');
const db=require('../common/db.js');
const  manager = require("./game_manager_dtz.js");

var rooms = {};
//存放用户在那个房间那个座位
var locations = {};

function generateRoomId(){
	let roomId = "";
	for(let i = 0; i < 6; ++i){
        let tmp=Math.floor(Math.random()*10);
        if(i==0&&tmp==0){
            --i;
            continue;
        };
		roomId +=tmp;
	}
	return parseInt(roomId);
}

module.exports.createRoom=function(creator,config,balance,ip,port,callback){
    let success=manager.checkConfig(config);
    if(!success) return  callback(new Error('config invalid parameters'),null);

    if((config.fee==1&&balance<40)||(config.fee==2&&balance<10)){
        return callback(new Error("钻石不足，创建房间失败!"),null);
    }
    
    //验证房间配置
    let fnCreate=function(){
        let roomId=generateRoomId();
        if(rooms[roomId]) return fnCreate();
        db.isRoomExist(roomId,function(err,isExist){
            if(err||isExist) return fnCreate();
            let room={
                id:roomId,
                ip:ip,
                port: port,
                config:config,
                seats: manager.initSeats(),
                //creator:mongoose.Types.ObjectId(creator),
                creator:creator,
                createdTime: Math.ceil(Date.now()/1000)
            };
            db.createRoom(room,function(err,data){
                logger.info("FUCK:"+err)
                if(err) return callback(err,null);
                rooms[roomId]=data;
                rooms[roomId].manager=manager;
                callback(null,roomId);
            })
        });
    }
    fnCreate();
}

module.exports.joinRoom = function(userId,name,headImgUrl,roomId,ip,port,callback){
    let fnTakeSeat=function(room){
        if(module.exports.getUserRoomId(userId) == roomId){
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
            roomId:roomId,
            seatIndex:index
        }
        return true;        
    }
    let room = rooms[roomId];
    if(room){
        //如果房间存在，选一个座位
        if(!fnTakeSeat(room)) return  callback(new Error('room is full'),null);
        callback(null,room);
    }else{
        db.getRoomAndModifyIpPort(roomId,ip,port,function(err,room){
            if(err) return callback(err,null);
            if(!room) return callback(new Error('room no exist'),null);
            //根据DB的数据还原room
            rooms[roomId]=room;
            if(!fnTakeSeat(room)) return  callback(new Error('room is full'),null);
            callback(null,room);
        })
    }
}

module.exports.getRoom = function(roomId){
	return rooms[roomId];
};

module.exports.getUserRoomId= function(userId){
    let location = locations[userId];
    return location && location.roomId;
};

module.exports.getUserSeatIndex = function(userId){
    let location = locations[userId];
    return location && location.seatIndex;
};

module.exports.setUserIp = function(userId,ip){
    let roomId=module.exports.getUserRoomId(userId);
    let room=module.exports.getRoom(roomId);
    let seatIndex=module.exports.getUserSeatIndex(userId);
    room.seats[seatIndex].ip=ip;
};

module.exports.setUserOnline = function(userId,isOnline){
    let roomId=module.exports.getUserRoomId(userId);
    let room=module.exports.getRoom(roomId);
    let seatIndex=module.exports.getUserSeatIndex(userId);
    room.seats[seatIndex].online=isOnline;
};

module.exports.getTotalRooms = function(){
	return Object.keys(rooms).length+2;
}