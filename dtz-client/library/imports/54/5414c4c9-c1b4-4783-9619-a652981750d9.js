"use strict";
cc._RF.push(module, '5414cTJwbRHg5YZplKYF1DZ', 'AppStart');
// scripts/components/AppStart.js

"use strict";

function initManager(I) {
    cc.th = {};

    cc.th.http = require("Http");
}

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        initManager();
        console.log('haha');
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();