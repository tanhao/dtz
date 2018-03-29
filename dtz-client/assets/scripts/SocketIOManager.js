cc.Class({
    extends: cc.Component,

    properties: {
        dataEventHandler:null, //处理socket.io发过来的数据的节点
        roomId:null,
        config:null,
        seats:null,
        round:null,
        seatIndex:-1,
    },


    onLoad () {

    },

    /*
    update (dt) {
    },
    */

    dispatchEvent(event,data){
        if(this.dataEventHandler){
            this.dataEventHandler.emit(event,data);
        }    
    },

    initHandlers:function(){
        var self = this;
        th.sio.addHandler("init_room",function(data){
            cc.log("==>init_room:",JSON.stringify(data));
            self.roomId=data.roomId;
            self.config=data.config;
            self.seats=data.seats;
            self.round=data.round;
            self.seatIndex=self.getSeatIndexById(th.userManager.userId);
            //self.dispatchEvent("init",data);
        })
       
    },

    getSeatIndexById:function(userId){
        for(var i = 0; i < this.seats.length;i++){
            if(this.seats[i].userId == userId){
                return i;
            }
        }
        return -1;
    },

    getWanfa:function(){
        /*
        {"roomId":293935,"config":{"peoples":4,"score":1000,"fee":1,"gift":100,"liudipai":false,"jipaiqi":false},"round":1,
        "seats":[{"userId":null,"name":null,"headImgUrl":null,"sex":null,"score":0,"ready":false,"online":false,"index":0},
          {"userId":"100000","name":"zhiyuan","headImgUrl":"http://thirdwx.qlogo.cn/mmopen/vi_32/yRMlybhILtPMrSOz5Bo7zkF94HEaJqYE6hZvaPpGAqlJnJO0sjSJ2lJqhZiaFcSrLNaicfYzDbbtPySaQCxJxCUg/132","sex":"1","score":0,"ready":false,"online":true,"index":1,"ip":"127.0.0.1"},
          {"userId":null,"name":null,"headImgUrl":null,"sex":null,"score":0,"ready":false,"online":false,"index":2},
          {"userId":null,"name":null,"headImgUrl":null,"sex":null,"score":0,"ready":false,"online":false,"index":3}]}
        */
       var str=[];
       str.push(this.config.peoples)
       str.push("人");
       str.push(" 结算");
       str.push(this.config.score)
       str.push(" 奖励");
       str.push(this.config.gift)
       return str.join("");
    },
    getDipai:function(){
        return this.config.liudipai?(peoples==4?8:(peoples==3?9:0)):0;  
    },

    connectServer:function(data){
        var onConnectSuccess=function(){
            cc.director.loadScene("game",function(){
                th.sio.ping();
                th.wc.hide();
            });
        }

        var onConnectError=function(err){
             th.wc.hide();
             th.alert.show('提示',err,null,false); //
        }
        th.sio.addr="ws://"+data.ip+":"+data.port+"?roomId="+data.roomId+"&token="+data.token+"&sign="+data.sign+"&time="+data.time;
        th.sio.connect(onConnectSuccess,onConnectError);
    }
    

});
