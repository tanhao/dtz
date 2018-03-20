"use strict";
cc._RF.push(module, '5414cTJwbRHg5YZplKYF1DZ', 'AppStart');
// scripts/components/AppStart.js

"use strict";

function initManager(I) {
    window.th = window.th || {};

    th.http = require("Http");
    th.http.baseURL = "http://127.0.0.1:9001";

    var UserManager = require("UserManager");
    th.userManager = new UserManager();

    var AnysdkManager = require("AnysdkManager");
    th.anysdkManager = new AnysdkManager();

    var AudioManager = require("AudioManager");
    th.audioManager = new AudioManager();
    th.audioManager.init();
}

cc.Class({
    extends: cc.Component,

    properties: {
        _isAgree: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        initManager();
        //console.log('onLoad'); 
    },
    start: function start() {
        //cc.log("start");
    },


    onBtnWeichatClicked: function onBtnWeichatClicked() {
        if (this._isAgree) {
            cc.log("onBtnWeichatClicked");
            th.userManager.lingshiAuth();
        }
    },

    onBtnAgreeClicked: function onBtnAgreeClicked(target) {
        this._isAgree = target.isChecked;
    }

    // update (dt) {},
});

cc._RF.pop();