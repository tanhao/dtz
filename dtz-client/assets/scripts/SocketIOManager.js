cc.Class({
    extends: cc.Component,

    properties: {
        roomId:null,
    },

    onLoad () {
      
    },

    /*
    update (dt) {
    },
    */
   initHandlers:function(){

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
