"use strict";
cc._RF.push(module, 'f3060chRz9FU6rQ3OvSu7my', 'SocketIOManager');
// scripts/SocketIOManager.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {},


    /*
    update (dt) {
    },
    */
    initHandlers: function initHandlers() {},

    connectServer: function connectServer(data) {
        var onConnectSuccess = function onConnectSuccess() {
            console.log('onConnectSuccess=>');
            cc.director.loadScene("game", function () {
                th.wc.hide();
            });
        };

        var onConnectError = function onConnectError(err) {
            console.log('onConnectError=>' + err);
            th.wc.hide();
            th.alert.show('提示', data.errmsg, null, false); //
        };
        th.sio.addr = "ws://" + data.ip + ":" + data.port + "?roomId=" + data.roomId + "&token=" + data.token + "&sign=" + data.sign + "&time=" + data.time;
        th.sio.connect(onConnectSuccess, onConnectError);
    }

});

cc._RF.pop();