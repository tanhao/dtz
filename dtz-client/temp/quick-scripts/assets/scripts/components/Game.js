(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/components/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '72ccaeRy8xD25rQrBwS/039', 'Game', __filename);
// scripts/components/Game.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        _myHoldPokers: [],
        _myFoldPokers: []
    },

    onLoad: function onLoad() {
        this.initView();
        this.initEventHandlers();
        this.initWanfaLabel();
        th.audioManager.playBGM("bg_fight.mp3");
    },


    initView: function initView() {
        var myself = this.node.getChildByName("myself");
        var myholds = myself.getChildByName("holds");
        for (var i = 0; i < myholds.children.length; ++i) {
            var sprite = myholds.children[i].getComponent(cc.Sprite);
            this._myHoldPokers.push(sprite);
            sprite.spriteFrame = null;
            //this.initDragStuffs(sprite.node);
        }
        myholds = myself.getChildByName("holds2");
        for (var i = 0; i < myholds.children.length; ++i) {
            var sprite = myholds.children[i].getComponent(cc.Sprite);
            this._myHoldPokers.push(sprite);
            sprite.spriteFrame = null;
            //this.initDragStuffs(sprite.node);
        }

        cc.log("pokers:" + this._myHoldPokers.length);
        var realwidth = cc.director.getVisibleSize().width;
        cc.log("realWidth:" + realwidth / 1280);
    },

    initEventHandlers: function initEventHandlers() {
        var self = this;
        th.socketIOManager.dataEventHandler = this.node;

        this.node.on('init_info', function (data) {
            console.log('==>Gmae init_info:', JSON.stringify(data));
        });
    },

    initWanfaLabel: function initWanfaLabel() {}
    /*
    update (dt) {
    },
    */

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
        //# sourceMappingURL=Game.js.map
        