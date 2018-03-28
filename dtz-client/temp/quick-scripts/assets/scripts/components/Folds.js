(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/components/Folds.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'de9d3K4PRxAB497YFYzZtA5', 'Folds', __filename);
// scripts/components/Folds.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        _folds: null
    },

    onLoad: function onLoad() {
        this.initView();
        this.initEventHandler();
    },
    update: function update(dt) {},


    initView: function initView() {
        var seatNames = ["myself", "right", "up", "left"];
        for (var i = 0; i < seatNames.length; i++) {
            var foldRoot = this.node.getChildByName(seatNames[i]).getChildByName('folds');
            var folds = [];
            for (var j = 0; j < foldRoot.children.length; j++) {}
        }
    },

    initEventHandler: function initEventHandler() {}

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
        //# sourceMappingURL=Folds.js.map
        