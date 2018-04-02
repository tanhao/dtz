const logger=require('../common/log.js').getLogger('game_dtz.js');
const roomManager=require('./room_manager.js');
const userManager=require('./user_manager.js');


var games = {};

//开房间时验证配置
module.exports.checkConfig=function(config){
    if(config.peoples == null
    || config.score == null
    || config.fee == null
    || config.gift == null
    || config.liudipai == null 
    || config.jipaiqi == null ){
        return false;
    }
    if(config.peoples != 4 && config.peoples != 3){
        return false;
    }

    if(config.score != 1000 && config.score != 600){
        return false;
    }
    if(config.fee != 1 && config.fee != 2){
        return false;
    }
    if(![100,200,300,400,500].includes(config.gift)){
        return false;
    }
    return true;
}
//生成座位初始化信息
module.exports.initSeats=function(config){
    let seats=[];
    for(let i=0;i<4;i++){
        seats.push({
            userId:null,
            name:null,
            headImgUrl:null,
            sex:null,
            score:null,
            ready:false,
            online:false,
            index:i,
            ip:null
        })
    }
    return seats;
}


module.exports.isBegin=function(roomId){
    let game=games[roomId];
    if(game) return true;
    let room=roomManager.getRoom(roomId);
    if(room) return room.round>0;
    return false;
}

module.exports.setReady=function(userId){
    let roomId=roomManager.getUserRoomId(userId);
    if(roomId==null) return;
    let room=roomManager.getRoom(roomId);
    if(room==null) return;
    roomManager.setReady(userId,true);
    let game=games[roomId];
    if(game==null){
        for(let i = 0; i < room.seats.length; i++){
            let seat = room.seats[i];
            if(seat.ready == false || userManager.isOnline(s.userId)==false){
                return;
            }
        }
        module.exports.begin(roomId);
    }else{

    }
}

module.exports.begin=function(roomId){
    let room=roomManager.getRoom(roomId);
    if(room==null) return;
    let seats = room.seats;
    let game={
        room:room,
        config:room.config,
        round:room.round,
        seats:new Array(room.seats.length),
        pokers:new Array(132),

        
    }
    room.round++;

    for(let i=0;i<game.seats.length;i++){
        let seat=game.seats[i]={};
        seat.game=game;
        seat.index=i;
        seat.userId=seats[i].userId;
        //持有的牌
        seat.holds = [];
        //打出的牌
        seat.folds = [];
    }
}