(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/components/GameScrollBar.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a2747akXS9P6L0ATNR/aQ3U', 'GameScrollBar', __filename);
// scripts/components/GameScrollBar.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        _lastPosY: 0
    },

    onLoad: function onLoad() {},
    update: function update(dt) {},


    onGameBarScroll: function onGameBarScroll(scrollview, eventType, customEventData) {
        var posY = parseInt(scrollview.getContentPosition().y);
        if (eventType === cc.ScrollView.EventType.SCROLLING && Math.abs(posY - this._lastPosY) > 1) {
            this._lastPosY = posY;
            //console.log("SCROLLING",scrollview.isScrolling(),scrollview.isAutoScrolling(),scrollview.getContentPosition());
            //cc.log(scrollview.getScrollOffset(),scrollview.getMaxScrollOffset());
            cc.log(posY, parseInt(posY / 200), scrollview.node.getComponents(cc.Button).length);
            var items = scrollview.getComponentsInChildren(cc.Sprite);
        } else if (eventType === cc.ScrollView.EventType.SCROLL_ENDED) {
            console.log("SCROLL_ENDED");
        }
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
        //# sourceMappingURL=GameScrollBar.js.map
        