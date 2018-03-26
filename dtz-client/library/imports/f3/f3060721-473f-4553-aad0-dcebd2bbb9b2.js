"use strict";
cc._RF.push(module, 'f3060chRz9FU6rQ3OvSu7my', 'SocketIOManager');
// scripts/SocketIOManager.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        dataEventHandler: null, //处理socket.io发过来的数据的节点
        roomId: null
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


    initHandlers: function initHandlers() {},

    connectServer: function connectServer(data) {
        var onConnectSuccess = function onConnectSuccess() {
            cc.director.loadScene("game", function () {
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