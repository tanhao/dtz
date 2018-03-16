(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/components/AppStart.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5414cTJwbRHg5YZplKYF1DZ', 'AppStart', __filename);
// scripts/components/AppStart.js

"use strict";

function initManager(I) {
    cc.th = {};
    cc.th.http = require("Http");
    cc.th.http.baseURL = "http://127.0.0.1:9001";

    var UserManager = require("UserManager");
    cc.th.userManager = new UserManager();

    var AnysdkManager = require("AnysdkManager");
    cc.th.anysdkManager = new AnysdkManager();

    var AudioManager = require("AudioManager");
    cc.th.audioManager = new AudioManager();
    cc.th.audioManager.init();
}

cc.Class({
    extends: cc.Component,

    properties: {
        _isAgree: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        initManager();
        console.log('onLoad');
    },
    start: function start() {
        cc.log("start");
    },


    onBtnWeichatClicked: function onBtnWeichatClicked() {
        if (this._isAgree) {
            cc.log("onBtnWeichatClicked");
            cc.th.userManager.lingshiAuth();
        }
    },

    onBtnAgreeClicked: function onBtnAgreeClicked(target) {
        this._isAgree = target.isChecked;
    }

    // update (dt) {},
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
        //# sourceMappingURL=AppStart.js.map
        