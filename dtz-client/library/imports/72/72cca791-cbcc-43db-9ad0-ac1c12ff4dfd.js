"use strict";
cc._RF.push(module, '72ccaeRy8xD25rQrBwS/039', 'Game');
// scripts/components/Game.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        seatLeft: cc.Node,
        seatMyself: cc.Node,
        seatRight: cc.Node,
        seatUp: cc.Node,
        options: cc.Node,
        wangfa: cc.Label,
        dipai8: cc.Sprite,
        dipai9: cc.Sprite,

        settingWin: cc.Node,
        menuWin: cc.Node,

        _seatNodes: [],
        _myHoldPokers: [],
        _myFoldPokers: []
    },

    onLoad: function onLoad() {

        this.addComponent("Folds");

        this.initView();
        this.initSeats();
        this.initEventHandlers();
        this.initWanfaLabel();
        this.initDipai();
        th.audioManager.playBGM("bg_fight.mp3");
    },


    initView: function initView() {
        this._seatNodes.push(this.seatMyself);
        this._seatNodes.push(this.seatRight);
        if (th.socketIOManager.seats.length == 4) {
            this._seatNodes.push(this.seatUp);
        }
        this._seatNodes.push(this.seatLeft);

        var myholds = ['Holds1', 'Holds2'];
        for (var i = 0; i < myholds.length; i++) {
            var holds = this.seatMyself.getChildByName(myholds[i]);
            for (var j = 0; j < holds.children.length; j++) {
                var sprite = holds.children[j].getComponent(cc.Sprite);
                this._myHoldPokers.push(sprite);
                sprite.spriteFrame = null;
            }
        }
        //this.initDragStuffs(sprite.node);
        cc.log("mypokers:" + this._myHoldPokers.length);
        //var realwidth = cc.director.getVisibleSize().width;
        //cc.log("realWidth:"+(realwidth/1280));

        this.hideOptions();
    },

    initSeats: function initSeats() {
        var seats = th.socketIOManager.seats;
        for (var i = 0; i < seats.length; ++i) {
            this.initSingleSeat(seats[i]);
        }
    },

    initSingleSeat: function initSingleSeat(seat) {
        var index = th.socketIOManager.getLocalIndex(seat.index);
        this._seatNodes[index].setInfo(seat.userId, seat.name, seat.score, seat.headImgUrl);
        this._seatNodes[index].setFangzhu(seat.userId == th.socketIOManager.creator);
        this._seatNodes[index].setReady(seat.ready);
        this._seatNodes[index].setOffline(!seat.online);
    },

    initEventHandlers: function initEventHandlers() {
        var self = this;
        th.socketIOManager.dataEventHandler = this.node;

        this.node.on('init_room', function (data) {
            console.log('==>Gmae init_room:', JSON.stringify(data));
        });
        //加入房间
        this.node.on('join_push', function (data) {
            self.initSingleSeat(data);
            console.log('==>Gmae join_push:', JSON.stringify(data));
        });

        //检查IP
        this.node.on('check_ip', function (data) {
            console.log('==>Gmae check_ip:', JSON.stringify(data));
        });

        //离开房间
        this.node.on('leave_push', function (data) {
            self.initSingleSeat(data);
            console.log('==>Gmae leave_push:', JSON.stringify(data));
        });

        //解散房间
        this.node.on('dissolve_push', function (data) {

            console.log('==>Gmae dissolve_push:', JSON.stringify(data));
        });
        //断线
        this.node.on('disconnect', function (data) {

            console.log('==>Gmae disconnect:', JSON.stringify(data));
        });
    },

    initWanfaLabel: function initWanfaLabel() {
        this.wangfa.string = th.socketIOManager.getWanfa();
    },
    initDipai: function initDipai() {
        var dipai = th.socketIOManager.getDipai();
        if (dipai == 8) {
            this.dipai8.node.active = true;
            this.dipai9.node.active = false;
        } else if (dipai == 9) {
            this.dipai8.node.active = false;
            this.dipai9.node.active = true;
        } else {
            this.dipai8.node.active = false;
            this.dipai9.node.active = false;
        }
    },
    /*
    update (dt) {
    },
    */

    hideOptions: function hideOptions(data) {
        this.options.active = false;
        for (var i = 0; i < this.options.children.length; i++) {
            var child = this.options.children[i];
            child.active = false;
        }
    },

    onMenuClicked: function onMenuClicked() {
        this.menuWin.active = !this.menuWin.active;
    },
    onBtnDissolveRequestClicked: function onBtnDissolveRequestClicked() {
        this.menuWin.active = false;
        th.alert.show("申请解散房间", "申请解散房间不会退换钻石，是否确定申请解散？", function () {
            th.sio.send("dissolve_request");
        }, true);
    },
    onBtnDissolveClicked: function onBtnDissolveClicked() {
        this.menuWin.active = false;
        th.alert.show("解散房间", "解散房间不扣钻石，是否确定解散？", function () {
            th.sio.send("dissolve");
        }, true);
    },
    onBtnLeaveClicked: function onBtnLeaveClicked() {
        if (th.socketIOManager.isFangzhu()) {
            th.alert.show("离开房间", "您是房主，不能离开房间。", function () {
                th.sio.send("leave");
            });
            return;
        }
        this.menuWin.active = false;
        th.alert.show("离开房间", "您确定要离开房间?", function () {
            th.sio.send("leave");
        }, true);
    },
    onBtnSettingClicked: function onBtnSettingClicked() {
        this.menuWin.active = false;
        this.settingWin.active = true;
    },
    onChatClicked: function onChatClicked() {
        cc.log('onChatClicked==>');
    },
    onVoiceClicked: function onVoiceClicked() {
        cc.log('onVoiceClicked==>');
    }

});

cc._RF.pop();