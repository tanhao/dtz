const logger=require('../common/log.js').getLogger('game_dtz.js');
const roomManager=require('./room_manager.js');
const userManager=require('./user_manager.js');

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
            score:0,
            ready:false,
            online:false,
            index:i
        })
    }
    return seats;
}
