/*
if(window.io == null){
    window.io = require("socket.io");
}
*/
var SIO=cc.Class({
    extends: cc.Component,

    /*
    properties: {
        lastSendTime:0,
        lastRecieveTime:0,
        delayMS:0,
    },
    */

    statics:{
        addr:null,
        sio:null,
        handlers:{},
        lastSendTime:0,
        lastRecieveTime:0,
        delayMS:0,
        //fnDisconnect:null,
        connect:function(fnConnect,fnError){
            var self=this;
            cc.log("connect to : "+this.addr);
            var opts = {
                'reconnection':false,
                'force new connection': true,
                'transports':['websocket', 'polling']
            }
            this.sio = window.io.connect(this.addr,opts);
            this.sio.on('connect',function(data){
                self.sio.connected = true;
                fnConnect(data);
            });
            this.sio.on('disconnect',function(data){
                console.log("disconnect");
                self.sio.connected = false;
                self.close();
            });
            this.sio.on('reconnect',function(){
                console.log('reconnect');
            });
            this.sio.on('connect_error',function (){
                console.log('connect_error');
            });
            this.sio.on('connect_timeout', (timeout) => {
                console.log('connect_timeout');
            });
            this.sio.on('reconnect_error', (error) => {
                console.log('reconnect_error');
            });
            this.sio.on('reconnect_failed', (error) => {
                console.log('reconnect_failed');
            });
            this.sio.on('error', (error) => {
                console.log('error');
                fnError(error);
            });

            for(var key in this.handlers){
                var handler = this.handlers[key];
                if(typeof(value) == "function"){
                    this.sio.on(key,value);
                }
            }

            this.heartbeat();
        },
        heartbeat:function(){
            var self=this;
            this.sio.on('ping',function(){
                self.lastRecieveTime = Date.now();
                self.delayMS = self.lastRecieveTime - self.lastSendTime;
                console.log('ping:'+self.delayMS);
            });
        },
        close:function(){
            if(this.sio && this.sio.connected){
                this.sio.connected = false;
                this.sio.disconnect();
            }
            this.sio = null;
        },
        send:function(event,data){
            if(this.sio&&this.sio.connected){
                if(data&&typeof(data)=='object'){
                    data==JSON.stringify(data);
                }
                this.sio.emit(event,data);
            }
        },
        ping:function(){
            if(this.sio){
                this.lastSendTime=Date.now();
                this.send('ping');
            }
        }

    }
});