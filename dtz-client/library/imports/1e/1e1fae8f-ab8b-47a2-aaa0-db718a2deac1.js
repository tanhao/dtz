"use strict";
cc._RF.push(module, '1e1fa6Pq4tHoqqg23GKLerB', 'SocketIO');
// scripts/SocketIO.js

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
if(window.io == null){
    window.io = require("socket.io");
}
*/
var SIO = cc.Class({
    extends: cc.Component,

    /*
    properties: {
        lastSendTime:0,
        lastRecieveTime:0,
        delayMS:0,
    },
    */

    statics: {
        addr: null,
        sio: null,
        handlers: {},
        lastSendTime: 0,
        lastRecieveTime: 0,
        delayMS: 0,
        //fnDisconnect:null,
        connect: function connect(fnConnect, fnError) {
            var self = this;
            cc.log("connect to : " + this.addr);
            var opts = {
                'reconnection': false,
                'force new connection': true,
                'transports': ['websocket', 'polling']
            };
            this.sio = window.io.connect(this.addr, opts);
            this.sio.on('connect', function (data) {
                self.sio.connected = true;
                fnConnect(data);
            });
            this.sio.on('disconnect', function (data) {
                console.log("disconnect");
                self.sio.connected = false;
                self.close();
            });
            this.sio.on('reconnect', function () {
                console.log('reconnect');
            });
            this.sio.on('connect_error', function () {
                console.log('connect_error');
            });
            this.sio.on('connect_timeout', function (timeout) {
                console.log('connect_timeout');
            });
            this.sio.on('reconnect_error', function (error) {
                console.log('reconnect_error');
            });
            this.sio.on('reconnect_failed', function (error) {
                console.log('reconnect_failed');
            });
            this.sio.on('error', function (error) {
                console.log('error');
                fnError(error);
            });

            for (var key in this.handlers) {
                var handler = this.handlers[key];
                if (typeof value == "function") {
                    this.sio.on(key, value);
                }
            }

            this.heartbeat();
        },
        heartbeat: function heartbeat() {
            var self = this;
            this.sio.on('ping', function () {
                self.lastRecieveTime = Date.now();
                self.delayMS = self.lastRecieveTime - self.lastSendTime;
                console.log('ping:' + self.delayMS);
            });
        },
        close: function close() {
            if (this.sio && this.sio.connected) {
                this.sio.connected = false;
                this.sio.disconnect();
            }
            this.sio = null;
        },
        send: function send(event, data) {
            if (this.sio && this.sio.connected) {
                if (data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) == 'object') {
                    data == JSON.stringify(data);
                }
                this.sio.emit(event, data);
            }
        },
        ping: function ping() {
            if (this.sio) {
                this.lastSendTime = Date.now();
                this.send('ping');
            }
        }

    }
});

cc._RF.pop();