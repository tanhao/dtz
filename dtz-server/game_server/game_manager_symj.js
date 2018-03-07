const logger=require('../common/log.js').getLogger('game_symj.js');
const roomManager=require('./room_manager.js');
const userManager=require('./user_manager.js');

//开房间时验证配置
module.exports.checkConfig=function(config){


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

