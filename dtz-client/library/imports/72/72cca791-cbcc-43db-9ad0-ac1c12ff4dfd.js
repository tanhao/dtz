"use strict";
cc._RF.push(module, '72ccaeRy8xD25rQrBwS/039', 'Game');
// scripts/components/Game.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.initView();
        this.initEventHandlers();
        th.audioManager.playBGM("bg_fight.mp3");
    },


    initView: function initView() {},

    initEventHandlers: function initEventHandlers() {
        var self = this;
        th.socketIOManager.dataEventHandler = this.node;

        this.node.on('init_info', function (data) {
            console.log('==>Gmae init_info:', JSON.stringify(data));
        });
    }
    /*
    update (dt) {
    },
    */

});

cc._RF.pop();