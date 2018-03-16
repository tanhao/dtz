(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/UserManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c6fb334U8hIn79b0A8Adc+k', 'UserManager', __filename);
// scripts/UserManager.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        userId: null,
        userName: null,
        account: null,
        sex: null,
        headImgUrl: null,
        balance: 0,
        ip: null,
        sign: null
    },

    onLoad: function onLoad() {},

    // update: function (dt) {

    // },

    // start: function (dt) {

    // },

    lingshiAuth: function lingshiAuth() {
        cc.th.wc.show("正在登录游戏");
        cc.th.http.get('/lingshi_auth', { account: 'oy4oyv4IBaxtkPjSq9ee4w42QazA' }, this.onAuth);
    },

    onAuth: function onAuth(err, data) {
        if (err) {
            cc.log(err);
            return;
        }
        var self = cc.th.userManager;
        self.account = data.account;
        self.sign = data.sign;
        cc.th.http.baseURL = 'http://' + data.hallAddr;

        cc.log(cc.th.http.baseURL);
        self.login();
    },

    login: function login() {
        var self = this;
        var callback = function callback(err, data) {
            if (err || data.errcode) {
                cc.log(err, data.errmsg);
                return;
            }
            self.sex = data.sex;
            self.userId = data.id;
            self.account = data.account;
            self.balance = data.balance;
            self.userName = data.name;
            self.headImgUrl = data.headImgUrl;
            cc.director.loadScene("hall");
        };
        cc.th.wc.show("正在登录游戏");
        cc.th.http.get('/login', { account: self.account, sign: self.sign }, callback);
    },

    enterRoom: function enterRoom(roomId, callback) {
        var self = this;
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=UserManager.js.map
        