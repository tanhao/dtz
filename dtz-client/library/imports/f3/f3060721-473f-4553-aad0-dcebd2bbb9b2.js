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
        th.sio.addHandler("init_info", function (data) {
            cc.log("==>init_info:", JSON.stringify(data));
            self.roomId = data.roomId;
            self.config = data.config;
            self.seats = data.seats;
            self.round = data.round;
            self.seatIndex = getSeatIndexById(th.userManager.userId);
            self.dispatchEvent("init_info", data);
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