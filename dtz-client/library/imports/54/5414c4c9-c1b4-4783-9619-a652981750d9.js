"use strict";
cc._RF.push(module, '5414cTJwbRHg5YZplKYF1DZ', 'AppStart');
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


    onBtnGuestClicked: function onBtnGuestClicked() {
        cc.log("isAgree:", this._isAgree);
        if (this._isAgree) {
            cc.th.userManager.guestAuth();
        }
    },

    onBtnWeichatClicked: function onBtnWeichatClicked() {
        if (this._isAgree) {
            cc.log("onBtnGuestClicked");
            cc.th.wc.show();
        }
    },

    onBtnAgreeClicked: function onBtnAgreeClicked(target) {
        this._isAgree = target.isChecked;
    }

    // update (dt) {},
});

cc._RF.pop();