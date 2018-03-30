cc.Class({
    extends: cc.Component,

    properties: {
        dataEventHandler:null, //处理socket.io发过来的数据的节点
        roomId:null,
        config:null,
        seats:null,
        round:null,
        creator:null,
        seatIndex:-1,
        needCheckIp:false,
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
        //连接成功初始化信息
        th.sio.addHandler("init_room",function(data){
            cc.log("==>SocketIOManager init_room:",JSON.stringify(data));
            self.roomId=data.roomId;
            self.config=data.config;
            self.seats=data.seats;
            self.round=data.round;
            self.creator=data.creator;
            self.seatIndex=self.getSeatIndexById(th.userManager.userId);
            self.dispatchEvent("init_room",data);
        })
        //其他玩家加入房间
        th.sio.addHandler("join_push",function(data){
            cc.log("==>SocketIOManager init_room:",JSON.stringify(data));
            var index=data.index;
            if(self.seats[index].userId){
                self.seats[index].online = true;
                if(self.seats[index].ip != data.ip){
                    self.seats[index].ip = data.ip;
                    self.needCheckIp=true;
                }
            }else{
                self.seats[index] = data;
                self.needCheckIp=true;
            }
            self.dispatchEvent("join_push",self.seats[index]);
            if(needCheckIp){
                self.dispatchEvent('check_ip',self.seats[seatIndex]);
            }
        })

        //其他玩家离开房间
        th.sio.addHandler("leave_push",function(data){
            cc.log("==>SocketIOManager leave_push:",JSON.stringify(data));
            var userId=data.usereId;
            var seat=self.getSeatByUserId(userId);
            if(seat){
                seat.userId=null;
                seat.name=null;
                seat.headImgUrl=null;
                seat.sex=null;
                seat.sex=null;
                seat.score=0;
                seat.ready=false;
                seat.online=false;
            }
            self.dispatchEvent("leave_push",seat);
        })

        //解散房间，所有玩家退出房间，收到此消息返回大厅
        th.sio.addHandler("dissolve_push",function(data){
            self.roomId=null;
            self.config=null;
            self.seats=null;
            self.round=null;
            self.seatIndex=-1;
            cc.log("==>SocketIOManager dissolve_push:",JSON.stringify(data));
            self.dispatchEvent("dissolve_push",data);
        })
        //断线
        th.sio.addHandler("disconnect",function(data){
            if(self.roomId == null){
                cc.vv.wc.show('正在返回游戏大厅');
                cc.director.loadScene("hall");
            }else{
                if(self.isOver == false){
                    th.userManager.roomId = self.roomId;
                    self.dispatchEvent("disconnect");                    
                }else{
                    self.roomId=null;
                    self.config=null;
                    self.seats=null;
                    self.round=null;
                    self.seatIndex=-1;
                }
            }
        });
       
    },

    getSeatIndexById:function(userId){
        for(var i = 0; i < this.seats.length;i++){
            if(this.seats[i].userId == userId){
                return i;
            }
        }
        return -1;
    },

    getLocalIndex:function(index){
        var total=this.seats.length;
        var ret = (index - this.seatIndex + total) % total;
        return ret;
    },

    getSeatByUserId:function(userId){
        var index = this.getSeatIndexByID(userId);
        var seat = this.seats[index];
        return seat;
    },

    getWanfa:function(){
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
