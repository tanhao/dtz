(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/components/Seat.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '527a6Fse5NLY4BmOdN+KmLn', 'Seat', __filename);
// scripts/components/Seat.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        headImg: cc.Sprite,
        lblName: cc.Label,
        lblScore: cc.Label,
        offline: cc.Sprite,
        fangzhu: cc.Sprite,
        emoji: cc.Sprite,
        countdown: cc.Sprite,
        ready: cc.Sprite,
        chat: cc.Label
    },

    onLoad: function onLoad() {}
}

/*
update (dt) {
},
*/

);

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
        //# sourceMappingURL=Seat.js.map
        