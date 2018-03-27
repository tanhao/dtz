cc.Class({
    extends: cc.Component,

    properties: {
        dataEventHandler:null, //处理socket.io发过来的数据的节点
        roomId:null,
        config:null,
        seats:null,
        round:0,
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
        th.sio.addHandler("init_info",function(data){
            cc.log("==>init_info:",JSON.stringify(data));
            self.roomId=data.roomId;
            self.config=data.config;
            self.seats=data.seats;
            self.round=data.round;
            self.seatIndex=getSeatIndexById(th.userManager.userId);
            self.dispatchEvent("init_info",data);
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

    connectServer:function(data){
        var onConnectSuccess=function(){
            cc.director.loadScene("game",function(){
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
