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

    guestAuth: function guestAuth() {
        cc.th.wc.show("正在登录游戏");
        cc.th.http.get('/guest_auth', { account: Date.now() }, this.onAuth);
    },

    onAuth: function onAuth(err, data) {
        if (err) {
            cc.log(err);
            return;
        }
        cc.log('guest:' + JSON.stringify(data));
        var self = cc.th.userManager;
        self.account = data.account;
        self.sign = data.sign;
        cc.th.http.baseURL = 'http://' + self.hallAddr;
    },

    login: function login() {
        cc.th.wc.show("正在登录游戏");
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
        