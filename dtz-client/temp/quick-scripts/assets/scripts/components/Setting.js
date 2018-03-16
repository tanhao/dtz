(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/components/Setting.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6a0fbUIvs9N64QfYQsH2Pec', 'Setting', __filename);
// scripts/components/Setting.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {},

    // update: function (dt) {

    // },

    onEnable: function onEnable() {
        var bgm = cc.sys.localStorage.getItem("bgmVolume");
        if (bgm) {
            cc.th.audioManager.setBGMVolume(parseFloat(bgm));
        }
        var sfx = cc.sys.localStorage.getItem("sfxVolume");
        if (sfx) {
            cc.th.audioManager.setSFXVolume(parseFloat(sfx));
        }

        cc.log("bgm:", bgm, "sfx:", sfx);
    },

    onCloseClicked: function onCloseClicked() {
        this.node.active = false;
    },

    onEffectSlide: function onEffectSlide(target) {
        cc.th.audioManager.setSFXVolume(target.progress);
    },

    onMusicSlide: function onMusicSlide(target) {
        cc.th.audioManager.setBGMVolume(target.progress);
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
        //# sourceMappingURL=Setting.js.map
        