"use strict";
cc._RF.push(module, 'c6fb334U8hIn79b0A8Adc+k', 'UserManager');
// scripts/UserManager.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        userId: null,
        userName: null,
        account: null,
        sex: null,
        headImgUrl: null,
        balance: 0,
        ip: null,
        sign: null,

        roomId: null //登陆时如果不为null,代表用户在房间里，直接加入房间
    },

    onLoad: function onLoad() {},

    // update: function (dt) {

    // },

    // start: function (dt) {

    // },

    lingshiAuth: function lingshiAuth(account) {
        th.http.get('/lingshi_auth', { account: account }, this.onAuth);
    },

    onAuth: function onAuth(err, data) {
        if (err) {
            cc.log(err);
            return;
        }
        var self = th.userManager;
        self.account = data.account;
        self.sign = data.sign;
        th.http.baseURL = 'http://' + data.hallAddr;

        cc.log(th.http.baseURL);
        self.login();
    },

    login: function login() {
        var self = this;
        var callback = function callback(err, data) {
            if (err || data.errcode) {
                cc.log(err, data.errmsg);
                return;
            }
            self.sex = data.sex;
            self.userId = data.id;
            self.account = data.account;
            self.balance = data.balance;
            self.userName = data.name;
            self.headImgUrl = data.headImgUrl;
            self.roomId = data.roomId;
            cc.director.loadScene("hall", function () {
                th.wc.hide();
            });
        };
        th.http.get('/login', { account: self.account, sign: self.sign }, callback);
    },

    createRoom: function createRoom(config) {
        var fnCreate = function fnCreate(err, data) {
            if (err || data.errcode) {
                th.wc.hide();
                th.alert.show('提示', data.errmsg, null, false); //
            } else {
                cc.log("create room data:" + JSON.stringify(data));
                th.wc.show("正在进入房间");
                th.socketIOManager.connectServer(data);
            }
        };

        var params = {
            account: th.userManager.account,
            sign: th.userManager.sign,
            config: JSON.stringify(config)
        };
        th.wc.show("正在创建房间");
        th.http.get('/create_private_room', params, fnCreate);
    },

    joinRoom: function joinRoom(roomId) {
        var self = this;
        var fnJoin = function fnJoin(err, data) {
            if (err || data.errcode) {
                th.wc.hide();
                th.alert.show('提示', data.errmsg, null, false); //
            } else {
                cc.log("join room data:" + JSON.stringify(data));
                th.socketIOManager.connectServer(data);
            }
        };

        var params = {
            account: th.userManager.account,
            sign: th.userManager.sign,
            roomId: roomId
        };
        th.wc.show("正在加入房间");
        th.http.get('/join_private_room', params, fnJoin);
    }

});

cc._RF.pop();