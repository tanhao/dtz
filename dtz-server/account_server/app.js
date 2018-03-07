const logger=require('../common/log.js').getLogger('app.js');
const db=require('../common/db.js');
const config=require('../config.js');

//初始化数据库链接池
db.init(config.mongodb(),function(err,isConnected){
	if(isConnected){
		//启动账号服务
		let accountService=require('./account_server.js');
		accountService.start(config.account_server());

		/*
        db.getRoomNo(function(err,roomNo){
            logger.info('room:'+roomNo);
        })
		
		db.isUserExist('wx_asdfasdlf',function(err,isExist){
			logger.info('isExist:'+isExist);
		});
		*/
		/*
		var user={
			account:'wx_asdfasdlf',
			name:'tanhao22222',
			sex:1,
			headImgUrl:'www.baidu2222.com',
		}
		db.updateUser(user,function(err,isSucceed){
			if(err){
				logger.info(err); 
				return ;
			}
			logger.info('isSucceed:'+isSucceed);
		});
		*/

		/*
		var user={
			account:'wx_oy4oyv28f9lQvkZfyLL_yj4v9U8w',
			name:'zhiyuan',
		}
		db.createUser(user,function(err,isSucceed){
			if(err){
				logger.info(err); 
				return ;
			}
			logger.info('isSucceed:'+isSucceed);
		})
		*/
	}
});






