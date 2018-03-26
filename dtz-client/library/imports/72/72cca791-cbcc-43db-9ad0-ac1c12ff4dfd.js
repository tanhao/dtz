"use strict";
cc._RF.push(module, '72ccaeRy8xD25rQrBwS/039', 'Game');
// scripts/components/Game.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.initView();
        this.initEventHandlers();
        th.audioManager.playBGM("bg_fight.mp3");
    },


    initView: function initView() {},

    initEventHandlers: function initEventHandlers() {}
    /*
    update (dt) {
    },
    */

});

cc._RF.pop();