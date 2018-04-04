const logger=require('../common/log.js').getLogger('game_dtz.js');
const roomManager=require('./room_manager.js');
const userManager=require('./user_manager.js');


var games = {};
var users={};
//洗牌
function shuffle(game) {
    var pokers=game.pokers;
    var index=0;
    for(var x=0;x<3;x++){
        for(var y=5;y<=15;y++){
            for(var z=1;z<=4;z++){
                pokers[index]=y*10+z;
                index++;
            }
        }
    }
    //打乱顺序
    pokers.sort(function(){ return 0.5 - Math.random() });
}
//发牌
function deal(game){
    //3人玩每人44张，4人玩每人33张
    var peoples=game.config.peoples;
    var average=peoples==4?33:44;
    var dipaiCount=game.config.liudipai?(peoples==4?8:9):0;
    average -= dipaiCount;
    var seatIndex=0;
    for(var i=0;i<average;i++){
        var holds=game.seats[seatIndex].holds;
        holds.push(game.poksers.pop());
        seatIndex ++;
        seatIndex &=peoples;
    }
    
}
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
    let game={
        room:room,
        config:room.config,
        round:room.round,
        seats:[],
        //底牌
        dipai:[],
        //当前牌面分数
        scoreRound5:0,
        scoreRound10:0,
        scoreRoundK:0,
        //当局A,B组分数
        scoreRoundA:0,
        scoreRoundB:0,
        //A,B组历史筒分总数
        scoreTongziA:0,
        scoreTongziB:0,
        //A,B组历史总数(包括了筒分总数)
        scoreTotalA:0,
        scoreTotalB:0,
        //出牌人的位置索引
        turn:0,
        
    }
    room.round++;
    //随机一个出头
    room.turn=Math.floor(Math.random()*game.seats.length);

    for(let i=0;i<room.seats.length;i++){
        let data=game.seats[i]={};
        data.game=game;
        data.index=i;
        data.userId=data[i].userId;
        //持有的牌
        data.holds = [];
        //打出的牌
        data.folds = [];
        //总分数
        data.scoreTotal=0;
        //当局分数
        data.scoreRound5=0;
        data.scoreRound10=0;
        data.scoreRoundK=0;
        //是否要得起
        data.canYaodeqi = false;
        users[data.userId]=data;

    }
    games[roomId]=game;
    //洗牌
    let pokers=[];
    let index=0;
    for(let x=0;x<3;x++){
        for(let y=5;y<=15;y++){
            for(let z=1;z<=4;z++){
                pokers[index]=y*10+z;
                index++;
            }
        }
    }
    //打乱顺序
    pokers.sort(function(){ return 0.5 - Math.random() });
    //发牌
    //3人玩每人44张，4人玩每人33张
    let peoples=game.config.peoples;
    let dipai=game.config.liudipai?(peoples==4?8:9):0;
    let pokersCount=pokers.length-dipai;
    let seatIndex=game.turn;
    for(let i=0;i<pokersCount;i++){
        let holds=game.seats[seatIndex].holds;
        holds.push(pokers.pop());
        seatIndex ++;
        seatIndex &=peoples;
    }
    //把剩余的牌放到底牌
    if(game.config.liudipai){
        for(let i=0;i<pokers.length;i++){
            game.dipai.push(pokers.pop());
        }
    }


}