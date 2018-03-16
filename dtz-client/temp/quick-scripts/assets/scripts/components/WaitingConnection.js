(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/components/WaitingConnection.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c9213QZp3ROI7Fd7AOxsnlH', 'WaitingConnection', __filename);
// scripts/components/WaitingConnection.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,
        _isShow: false,
        lblContent: cc.Label
    },

    onLoad: function onLoad() {
        if (cc.th == null) {
            return null;
        }
        cc.th.wc = this;
        this.node.active = this._isShow;
    },
    update: function update(dt) {
        //cc.log(new Date().getTime());
        this.target.rotation = this.target.rotation - dt * 90;
    },
    show: function show(content) {
        this._isShow = true;
        if (this.node) {
            this.node.active = this._isShow;
        }
        if (this.lblContent) {
            this.lblContent.string = content || "";
        }
    },
    hide: function hide() {
        this._isShow = false;
        if (this.node) {
            this.node.active = this._isShow;
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
        //# sourceMappingURL=WaitingConnection.js.map
        