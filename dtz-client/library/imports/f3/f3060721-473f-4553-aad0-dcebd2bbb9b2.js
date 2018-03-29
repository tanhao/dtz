"use strict";
cc._RF.push(module, 'f3060chRz9FU6rQ3OvSu7my', 'SocketIOManager');
// scripts/SocketIOManager.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        dataEventHandler: null, //处理socket.io发过来的数据的节点
        roomId: null,
        config: null,
        seats: null,
        round: null,
        seatIndex: -1
    },

    onLoad: function onLoad() {},


    /*
    update (dt) {
    },
    */

    dispatchEvent: function dispatchEvent(event, data) {
        if (this.dataEventHandler) {
            this.dataEventHandler.emit(event, data);
        }
    },


    initHandlers: function initHandlers() {
        var self = this;
        //连接成功初始化信息
        th.sio.addHandler("init_room", function (data) {
            cc.log("==>SocketIOManager init_room:", JSON.stringify(data));
            self.roomId = data.roomId;
            self.config = data.config;
            self.seats = data.seats;
            self.round = data.round;
            self.seatIndex = self.getSeatIndexById(th.userManager.userId);
            self.dispatchEvent("init_room", data);
        });
        //其他玩家加入房间
        th.sio.addHandler("join_push", function (data) {
            cc.log("==>SocketIOManager init_room:", JSON.stringify(data));
            self.dispatchEvent("join_push", data);
        });

        //其他玩家离开房间
        th.sio.addHandler("leave_push", function (data) {
            cc.log("==>SocketIOManager leave_push:", JSON.stringify(data));
            self.dispatchEvent("leave_push", data);
        });

        //解散房间，所有玩家退出房间，收到此消息返回大厅
        th.sio.addHandler("dissolve_push", function (data) {
            cc.log("==>SocketIOManager dissolve_push:", JSON.stringify(data));
            self.dispatchEvent("dissolve_push", data);
        });
    },

    getSeatIndexById: function getSeatIndexById(userId) {
        for (var i = 0; i < this.seats.length; i++) {
            if (this.seats[i].userId == userId) {
                return i;
            }
        }
        return -1;
    },

    getWanfa: function getWanfa() {
        /*
        {"roomId":293935,"config":{"peoples":4,"score":1000,"fee":1,"gift":100,"liudipai":false,"jipaiqi":false},"round":1,
        "seats":[{"userId":null,"name":null,"headImgUrl":null,"sex":null,"score":0,"ready":false,"online":false,"index":0},
          {"userId":"100000","name":"zhiyuan","headImgUrl":"http://thirdwx.qlogo.cn/mmopen/vi_32/yRMlybhILtPMrSOz5Bo7zkF94HEaJqYE6hZvaPpGAqlJnJO0sjSJ2lJqhZiaFcSrLNaicfYzDbbtPySaQCxJxCUg/132","sex":"1","score":0,"ready":false,"online":true,"index":1,"ip":"127.0.0.1"},
          {"userId":null,"name":null,"headImgUrl":null,"sex":null,"score":0,"ready":false,"online":false,"index":2},
          {"userId":null,"name":null,"headImgUrl":null,"sex":null,"score":0,"ready":false,"online":false,"index":3}]}
        */
        var str = [];
        str.push(this.config.peoples);
        str.push("人");
        str.push(" 结算");
        str.push(this.config.score);
        str.push(" 奖励");
        str.push(this.config.gift);
        return str.join("");
    },
    getDipai: function getDipai() {
        return this.config.liudipai ? peoples == 4 ? 8 : peoples == 3 ? 9 : 0 : 0;
    },

    connectServer: function connectServer(data) {
        var onConnectSuccess = function onConnectSuccess() {
            cc.director.loadScene("game", function () {
                th.sio.ping();
                th.wc.hide();
            });
        };

        var onConnectError = function onConnectError(err) {
            th.wc.hide();
            th.alert.show('提示', err, null, false); //
        };
        th.sio.addr = "ws://" + data.ip + ":" + data.port + "?roomId=" + data.roomId + "&token=" + data.token + "&sign=" + data.sign + "&time=" + data.time;
        th.sio.connect(onConnectSuccess, onConnectError);
    }

});

cc._RF.pop();