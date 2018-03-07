const logger=require('../common/log.js').getLogger('app.js');
const db=require('../common/db.js');
const config=require('../config.js');

//初始化数据库链接池
db.init(config.mongodb(),function(err,isConnected){
    if(isConnected){
        //启动游戏服务器节点与大厅服务器内部HTTP通信服务
        let nodeService=require('./node_service.js');
        nodeService.start(config.game_server());

        let serviceSocket=require('./socket_service.js');
        serviceSocket.start(config.game_server());

        /*
        db.getRoomAndModifyIpPort(159809,'127.0.0.1',777,function(err,room){
            if(err){
                logger.info(err);
                return;
            }
            logger.info(room)
        })
        */
    }
});

