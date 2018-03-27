(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/components/Status.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ebf91v970xOZ6EDH8DBtT/j', 'Status', __filename);
// scripts/components/Status.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        roomId: cc.Label,
        round: cc.Label,
        time: cc.Label,
        delay: cc.Label,
        battery: cc.ProgressBar
    },

    onLoad: function onLoad() {},
    update: function update(dt) {}
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
        //# sourceMappingURL=Status.js.map
        