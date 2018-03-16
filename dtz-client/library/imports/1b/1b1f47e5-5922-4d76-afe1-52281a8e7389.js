"use strict";
cc._RF.push(module, '1b1f4flWSJNdq/hUigajnOJ', 'Hall');
// scripts/components/Hall.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        lblId: cc.Label,
        lblName: cc.Label,
        lblBalance: cc.Label,
        lblMarquee: cc.Label,
        joinRoomWin: cc.Node,
        createRoomWin: cc.Node,
        settingWin: cc.Node,
        spriteHead: cc.Sprite
    },

    onLoad: function onLoad() {
        this.initUserInfo();
        cc.th.audioManager.playBGM("bg_hall.mp3");
    },

    initUserInfo: function initUserInfo() {
        var self = this;
        this.lblId.string = "ID:" + cc.th.userManager.userId;
        this.lblName.string = cc.th.userManager.userName;
        this.lblBalance.string = cc.th.userManager.balance;
        cc.log(cc.th.userManager.headImgUrl);
        cc.loader.load({ url: cc.th.userManager.headImgUrl, type: 'jpg' }, function (err, texture) {
            if (!err) {
                var headSpriteFrame = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));
                self.spriteHead.spriteFrame = headSpriteFrame;
                //cc.log(texture.width, texture.height);
            }
        });
    },

    update: function update(dt) {
        var x = this.lblMarquee.node.x;
        x -= dt * 100;
        if (x + this.lblMarquee.node.width < -250) {
            x = 260;
        }
        this.lblMarquee.node.x = x;
    },

    // start: function (dt) {

    // },

    onCreateRoomClicked: function onCreateRoomClicked() {
        this.createRoomWin.active = true;
    },

    onJoinRoomClicked: function onJoinRoomClicked() {
        this.joinRoomWin.active = true;
    },

    onSettingClicked: function onSettingClicked() {
        this.settingWin.active = true;
    }

});

cc._RF.pop();