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


    onGameBarScroll: function onGameBarScroll(scrollView, eventType, customEventData) {
        var posY = parseInt(scrollView.getContentPosition().y);
        if (eventType === cc.ScrollView.EventType.SCROLLING && Math.abs(posY - this._lastPosY) > 1) {
            this._lastPosY = posY;
            var btnHeight = 174;
            var currentIndex = parseInt((posY + btnHeight / 2 * (posY > 0 ? 1 : -1)) / btnHeight) + 3;
            var buttons = scrollView.getComponentsInChildren(cc.Button);
            for (var i = 0; i < buttons.length; i++) {
                var scale = Math.abs(posY + (3 - i) * btnHeight) / 800;
                buttons[i].node.setScale(1 - scale);
                buttons[i].node.setColor(i == currentIndex ? cc.color(255, 255, 255) : cc.color(120, 120, 120));
            }
        } else if (eventType === cc.ScrollView.EventType.SCROLL_ENDED) {
            console.log("SCROLL_ENDED");
        } else if (eventType === cc.ScrollView.EventType.AUTOSCROLL_ENDED_WITH_THRESHOLD) {
            console.log("AUTOSCROLL_ENDED_WITH_THRESHOLD");
            var max = scrollView.getMaxScrollOffset().y;
            console.log("Y:", max);
            scrollView.scrollToOffset(cc.p(max / 2, 0), 0.5);
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
        