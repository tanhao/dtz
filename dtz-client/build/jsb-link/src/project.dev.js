require = function() {
  function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = "function" == typeof require && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n || e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = "function" == typeof require && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  }
  return e;
}()({
  Alert: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "01a0eYD3wVLrLra9sMACvXk", "Alert");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        btnConfirm: cc.Button,
        btnCancel: cc.Button,
        title: cc.Label,
        content: cc.Label,
        _fnConfirm: null
      },
      onLoad: function onLoad() {
        cc.log("Alert====>onload");
        if (null == th) return null;
        th.alert = this;
        this.node.active = false;
        this._fnConfirm = null;
      },
      show: function show(title, content, fnConfirm, showBtnCancel) {
        cc.log("showBtnCancel:" + showBtnCancel);
        this.node && (this.node.active = true);
        this.title && (this.title.string = title || "");
        this.content && (this.content.string = content || "");
        this._fnConfirm = fnConfirm;
        if (showBtnCancel) {
          this.btnCancel.node.active = true;
          this.btnCancel.node.x = 160;
          this.btnConfirm.node.x = -160;
        } else {
          this.btnCancel.node.active = false;
          this.btnConfirm.node.x = 0;
        }
      },
      onCancelClicked: function onCancelClicked() {
        this.node.active = false;
      },
      onConfirmClicked: function onConfirmClicked() {
        this.node.active = false;
        this._fnConfirm && this._fnConfirm();
      },
      hide: function hide() {
        this.node && (this.node.active = false);
      },
      onDestory: function onDestory() {
        th && (th.alert = null);
      }
    });
    cc._RF.pop();
  }, {} ],
  AnysdkManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "38eefl+wMxId5kHf1PxI2t5", "AnysdkManager");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      init: function init() {}
    });
    cc._RF.pop();
  }, {} ],
  AppStart: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5414cTJwbRHg5YZplKYF1DZ", "AppStart");
    "use strict";
    function initManager(I) {
      window.th = window.th || {};
      th.http = require("Http");
      th.http.baseURL = "http://192.168.88.156:9001";
      th.sio = require("SocketIO");
      var UserManager = require("UserManager");
      th.userManager = new UserManager();
      var AnysdkManager = require("AnysdkManager");
      th.anysdkManager = new AnysdkManager();
      var AudioManager = require("AudioManager");
      th.audioManager = new AudioManager();
      th.audioManager.init();
      var SocketIOManager = require("SocketIOManager");
      th.socketIOManager = new SocketIOManager();
      th.socketIOManager.initHandlers();
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        _isAgree: false
      },
      onLoad: function onLoad() {
        initManager();
      },
      start: function start() {},
      onBtnWeichatClicked: function onBtnWeichatClicked() {
        if (this._isAgree) {
          cc.log("onBtnWeichatClicked");
          th.wc.show("正在登录游戏");
          th.userManager.lingshiAuth();
        }
      },
      onBtnAgreeClicked: function onBtnAgreeClicked(target) {
        this._isAgree = target.isChecked;
      }
    });
    cc._RF.pop();
  }, {
    AnysdkManager: "AnysdkManager",
    AudioManager: "AudioManager",
    Http: "Http",
    SocketIO: "SocketIO",
    SocketIOManager: "SocketIOManager",
    UserManager: "UserManager"
  } ],
  AudioManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d859bTzzhZK5rmyriLb24GW", "AudioManager");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bgmVolume: .5,
        sfxVolume: .5,
        bgmAudioID: -1,
        _pauseBgm: true
      },
      onLoad: function onLoad() {},
      init: function init() {
        var bgm = cc.sys.localStorage.getItem("bgmVolume");
        bgm ? this.bgmVolume = parseFloat(bgm) : cc.sys.localStorage.setItem("bgmVolume", this.bgmVolume);
        var sfx = cc.sys.localStorage.getItem("sfxVolume");
        sfx ? this.sfxVolume = parseFloat(sfx) : cc.sys.localStorage.setItem("sfxVolume", this.sfxVolume);
        cc.game.on(cc.game.EVENT_HIDE, function() {
          console.log("cc.audioEngine.pauseAll");
          cc.audioEngine.pauseAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function() {
          console.log("cc.audioEngine.resumeAll");
          cc.audioEngine.resumeAll();
        });
      },
      getUrl: function getUrl(url) {
        return cc.url.raw("resources/sounds/" + url);
      },
      playBGM: function playBGM(url) {
        var audioUrl = this.getUrl(url);
        this.bgmAudioID >= 0 && cc.audioEngine.stop(this.bgmAudioID);
        this._pauseBgm = true;
        this.bgmAudioID = cc.audioEngine.play(audioUrl, true, this.bgmVolume);
      },
      playSFX: function playSFX(url) {
        var audioUrl = this.getUrl(url);
        if (this.sfxVolume > 0) var audioId = cc.audioEngine.play(audioUrl, false, this.sfxVolume);
      },
      setSFXVolume: function setSFXVolume(v) {
        if (this.sfxVolume != v) {
          cc.sys.localStorage.setItem("sfxVolume", v);
          this.sfxVolume = v;
        }
      },
      setBGMVolume: function setBGMVolume(v) {
        if (this.bgmAudioID >= 0) if (this._pauseBgm && v > 0) {
          this._pauseBgm = false;
          cc.audioEngine.resume(this.bgmAudioID);
        } else if (!this._pauseBgm && 0 == v) {
          this._pauseBgm = true;
          cc.audioEngine.pause(this.bgmAudioID);
        }
        if (this.bgmVolume != v) {
          cc.sys.localStorage.setItem("bgmVolume", v);
          this.bgmVolume = v;
          cc.audioEngine.setVolume(this.bgmAudioID, v);
        }
      },
      pauseAll: function pauseAll() {
        cc.audioEngine.pauseAll();
      },
      resumeAll: function resumeAll() {
        cc.audioEngine.resumeAll();
      }
    });
    cc._RF.pop();
  }, {} ],
  CreateRoom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4d86fQBcbxD06NbosHhw5bO", "CreateRoom");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        peoples: 4,
        score: 1e3,
        fee: 1,
        gift: 100,
        liudipai: false,
        jipaiqi: false
      },
      onLoad: function onLoad() {},
      onEnable: function onEnable() {
        cc.log("create_room onEnable");
        this.onResetClicked();
      },
      onResetClicked: function onResetClicked() {
        this.peoples = 4;
        this.score = 1e3;
        this.fee = 1;
        this.gift = 100;
        this.liudipai = false;
        this.jipaiqi = false;
        cc.find("Canvas/create_room/setting_list/peoples/toggleContainer/toggle1").getComponent(cc.Toggle).check();
        cc.find("Canvas/create_room/setting_list/score/toggleContainer/toggle1").getComponent(cc.Toggle).check();
        cc.find("Canvas/create_room/setting_list/fee/toggleContainer/toggle1").getComponent(cc.Toggle).check();
        cc.find("Canvas/create_room/setting_list/gift/toggleContainer/toggle1").getComponent(cc.Toggle).check();
        cc.find("Canvas/create_room/setting_list/options/toggle1").getComponent(cc.Toggle).uncheck();
        cc.find("Canvas/create_room/setting_list/options/toggle2").getComponent(cc.Toggle).uncheck();
      },
      onCloseClicked: function onCloseClicked() {
        this.node.active = false;
      },
      onPeoplesClicked: function onPeoplesClicked(target, num) {
        this.peoples = num;
      },
      onScoreClicked: function onScoreClicked(target, score) {
        this.score = score;
      },
      onFeeClicked: function onFeeClicked(target, fee) {
        this.fee = fee;
      },
      onGiftClicked: function onGiftClicked(target, gift) {
        this.gift = gift;
      },
      onLiudipaiClicked: function onLiudipaiClicked(target) {
        this.liudipai = target.isChecked;
      },
      onJipaiqiClicked: function onJipaiqiClicked(target) {
        this.jipaiqi = target.isChecked;
      },
      onCreateClicked: function onCreateClicked(target) {
        this.node.active = false;
        var config = {
          peoples: this.peoples,
          score: this.score,
          fee: this.fee,
          gift: this.gift,
          liudipai: this.liudipai,
          jipaiqi: this.jipaiqi
        };
        th.userManager.createRoom(config);
      }
    });
    cc._RF.pop();
  }, {} ],
  Hall: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1b1f4flWSJNdq/hUigajnOJ", "Hall");
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
        spriteHead: cc.Sprite,
        btnCreateRoom: cc.Button,
        btnReturnRoom: cc.Button,
        btnJoinRoom: cc.Button
      },
      onLoad: function onLoad() {
        this.initUserInfo();
        th.audioManager.playBGM("bg_hall.mp3");
      },
      start: function start() {
        th.userManager.roomId && th.alert.show("提示", "你已在房间中，是否返回游戏房间？", this.onReturnRoomClicked, true);
      },
      initUserInfo: function initUserInfo() {
        var self = this;
        this.lblId.string = "ID:" + th.userManager.userId;
        this.lblName.string = th.userManager.userName;
        this.lblBalance.string = th.userManager.balance;
        if (th.userManager.roomId) {
          this.btnJoinRoom.node.active = false;
          this.btnReturnRoom.node.active = true;
        } else {
          this.btnJoinRoom.node.active = true;
          this.btnReturnRoom.node.active = false;
        }
        cc.log(th.userManager.headImgUrl);
        cc.loader.load({
          url: th.userManager.headImgUrl,
          type: "jpg"
        }, function(err, texture) {
          if (!err) {
            var headSpriteFrame = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));
            self.spriteHead.spriteFrame = headSpriteFrame;
          }
        });
      },
      update: function update(dt) {
        var x = this.lblMarquee.node.x;
        x -= 100 * dt;
        x + this.lblMarquee.node.width < -250 && (x = 260);
        this.lblMarquee.node.x = x;
      },
      onCreateRoomClicked: function onCreateRoomClicked() {
        this.createRoomWin.active = true;
      },
      onJoinRoomClicked: function onJoinRoomClicked() {
        this.joinRoomWin.active = true;
      },
      onReturnRoomClicked: function onReturnRoomClicked() {
        th.userManager.joinRoom(th.userManager.roomId);
      },
      onSettingClicked: function onSettingClicked() {
        this.settingWin.active = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  Http: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "904ffIoZYNMnaB5ix5gAedT", "Http");
    "use strict";
    var Http = cc.Class({
      extends: cc.Component,
      statics: {
        baseURL: null,
        get: function get(path, params, callback) {
          var xhr = cc.loader.getXMLHttpRequest();
          var paramsStr = "?";
          for (var k in params) {
            "?" != paramsStr && (paramsStr += "&");
            paramsStr += k + "=" + params[k];
          }
          var requestUrl = Http.baseURL + path + encodeURI(paramsStr);
          xhr.open("GET", requestUrl, true);
          xhr.onreadystatechange = function() {
            if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) try {
              console.log("try => http response:" + xhr.responseText);
              var json = JSON.parse(xhr.responseText);
              callback(null, json);
            } catch (e) {
              callback(e, null);
            }
          };
          xhr.send();
        },
        post: function post(path, params, callback) {
          var xhr = cc.loader.getXMLHttpRequest();
          xhr.open("POST", Http.baseURL + path);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
          xhr.onreadystatechange = function() {
            if (4 == xhr.readyState && xhr.status >= 200 && xhr.status <= 207) try {
              var json = JSON.parse(xhr.responseText);
              callback(null, json);
            } catch (e) {
              callback(e, null);
            }
          };
          xhr.send(params);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  JoinRoom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "89ec8TY4OVDEL5X/J8nkwft", "JoinRoom");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        nums: {
          default: [],
          type: [ cc.Label ]
        },
        _inputIndex: 0
      },
      onLoad: function onLoad() {},
      onEnable: function onEnable() {
        this.onResetClicked();
      },
      onResetClicked: function onResetClicked() {
        for (var i = 0; i < this.nums.length; ++i) this.nums[i].string = "";
        this._inputIndex = 0;
      },
      onDelClicked: function onDelClicked() {
        if (this._inputIndex > 0) {
          this._inputIndex -= 1;
          this.nums[this._inputIndex].string = "";
        }
      },
      onCloseClicked: function onCloseClicked() {
        this.node.active = false;
      },
      parseRoomID: function parseRoomID() {
        var str = "";
        for (var i = 0; i < this.nums.length; ++i) str += this.nums[i].string;
        return parseInt(str);
      },
      onInput: function onInput(target, num) {
        if (this._inputIndex >= this.nums.length) return;
        this.nums[this._inputIndex].string = num;
        this._inputIndex += 1;
        if (this._inputIndex == this.nums.length) {
          var roomId = this.parseRoomID();
          console.log("ok:" + roomId);
          this.onInputFinished(roomId);
        }
      },
      onInputFinished: function onInputFinished(roomId) {
        th.userManager.enterRoom(roomId, function(ret) {
          if (0 == ret.errcode) this.node.active = false; else {
            var content = "房间[" + roomId + "]不存在，请重新输入!";
            4 == ret.errcode && (content = "房间[" + roomId + "]已满!");
            th.alert.show("提示", content);
            this.onResetClicked();
          }
        }.bind(this));
      }
    });
    cc._RF.pop();
  }, {} ],
  Setting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a0fbUIvs9N64QfYQsH2Pec", "Setting");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        effectSlider: cc.Slider,
        musicSlider: cc.Slider
      },
      onLoad: function onLoad() {},
      onEnable: function onEnable() {
        var bgm = cc.sys.localStorage.getItem("bgmVolume");
        if (bgm) {
          th.audioManager.setBGMVolume(parseFloat(bgm));
          this.musicSlider.progress = parseFloat(bgm);
        }
        var sfx = cc.sys.localStorage.getItem("sfxVolume");
        if (sfx) {
          th.audioManager.setSFXVolume(parseFloat(sfx));
          this.effectSlider.progress = parseFloat(sfx);
        }
        cc.log("bgm:", bgm, "sfx:", sfx);
      },
      onCloseClicked: function onCloseClicked() {
        this.node.active = false;
      },
      onEffectSlide: function onEffectSlide(target) {
        th.audioManager.setSFXVolume(target.progress);
      },
      onMusicSlide: function onMusicSlide(target) {
        th.audioManager.setBGMVolume(target.progress);
      }
    });
    cc._RF.pop();
  }, {} ],
  SocketIOManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f3060chRz9FU6rQ3OvSu7my", "SocketIOManager");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        roomId: null
      },
      onLoad: function onLoad() {},
      initHandlers: function initHandlers() {},
      connectServer: function connectServer(data) {
        var onConnectSuccess = function onConnectSuccess() {
          cc.director.loadScene("game", function() {
            th.wc.hide();
          });
        };
        var onConnectError = function onConnectError(err) {
          th.wc.hide();
          th.alert.show("提示", err, null, false);
        };
        th.sio.addr = "ws://" + data.ip + ":" + data.port + "?roomId=" + data.roomId + "&token=" + data.token + "&sign=" + data.sign + "&time=" + data.time;
        th.sio.connect(onConnectSuccess, onConnectError);
      }
    });
    cc._RF.pop();
  }, {} ],
  SocketIO: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1e1fa6Pq4tHoqqg23GKLerB", "SocketIO");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var SIO = cc.Class({
      extends: cc.Component,
      statics: {
        addr: null,
        sio: null,
        handlers: {},
        fnDisconnect: null,
        isPinging: false,
        lastSendTime: 0,
        lastRecieveTime: 0,
        delayMS: 0,
        addHandler: function addHandler(event, fn) {
          if (this.handlers[event]) {
            console.log("event:" + event + "' handler has been registered.");
            return;
          }
          var handler = function handler(data) {
            "disconnect" != event && "string" == typeof data && (data = JSON.parse(data));
            fn(data);
          };
          this.handlers[event] = handler;
          if (this.sio) {
            console.log("register event: " + event);
            this.sio.on(event, handler);
          }
        },
        connect: function connect(fnConnect, fnError) {
          var self = this;
          cc.log("connect to : " + this.addr);
          var opts = {
            reconnection: false,
            "force new connection": true,
            transports: [ "websocket", "polling" ]
          };
          this.sio = window.io.connect(this.addr, opts);
          this.sio.on("connect", function(data) {
            self.sio.connected = true;
            fnConnect(data);
          });
          this.sio.on("disconnect", function(data) {
            console.log("disconnect");
            self.sio.connected = false;
            self.close();
          });
          this.sio.on("reconnect", function() {
            console.log("reconnect");
          });
          this.sio.on("connect_error", function() {
            console.log("connect_error");
          });
          this.sio.on("connect_timeout", function(timeout) {
            console.log("connect_timeout");
          });
          this.sio.on("reconnect_error", function(error) {
            console.log("reconnect_error");
          });
          this.sio.on("reconnect_failed", function(error) {
            console.log("reconnect_failed");
          });
          this.sio.on("error", function(error) {
            console.log("error");
            fnError(error);
          });
          for (var key in this.handlers) {
            var handler = this.handlers[key];
            if ("function" == typeof value) if ("disconnect" == key) this.fnDisconnect = value; else {
              console.log("register event: " + key);
              this.sio.on(key, value);
            }
          }
          this.heartbeat();
        },
        heartbeat: function heartbeat() {
          var self = this;
          this.sio.on("th-pong", function() {
            self.lastRecieveTime = Date.now();
            self.delayMS = self.lastRecieveTime - self.lastSendTime;
            console.log("th-pong:", self.delayMS, self == th.sio);
          });
          if (!self.isPinging) {
            cc.game.on(cc.game.EVENT_HIDE, function() {
              self.ping();
            });
            setInterval(function() {
              self.sio && self.ping();
            }.bind(this), 5e3);
          }
        },
        close: function close() {
          if (this.sio && this.sio.connected) {
            this.sio.connected = false;
            this.sio.disconnect();
          }
          this.sio = null;
          if (this.fnDisconnect) {
            this.fnDisconnect();
            this.fnDisconnect = null;
          }
        },
        send: function send(event, data) {
          if (this.sio && this.sio.connected) {
            data && "object" == ("undefined" === typeof data ? "undefined" : _typeof(data)) && data == JSON.stringify(data);
            this.sio.emit(event, data);
          }
        },
        ping: function ping() {
          if (this.sio) {
            this.lastSendTime = Date.now();
            this.send("th-ping");
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  UserManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c6fb334U8hIn79b0A8Adc+k", "UserManager");
    "use strict";
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
        roomId: null
      },
      onLoad: function onLoad() {},
      lingshiAuth: function lingshiAuth() {
        th.http.get("/lingshi_auth", {
          account: "oy4oyv4IBaxtkPjSq9ee4w42QazA"
        }, this.onAuth);
      },
      onAuth: function onAuth(err, data) {
        if (err) {
          cc.log(err);
          return;
        }
        var self = th.userManager;
        self.account = data.account;
        self.sign = data.sign;
        th.http.baseURL = "http://" + data.hallAddr;
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
          cc.director.loadScene("hall", function() {
            th.wc.hide();
          });
        };
        th.http.get("/login", {
          account: self.account,
          sign: self.sign
        }, callback);
      },
      createRoom: function createRoom(config) {
        var fnCreate = function fnCreate(err, data) {
          if (err || data.errcode) {
            th.wc.hide();
            th.alert.show("提示", data.errmsg, null, false);
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
        th.http.get("/create_private_room", params, fnCreate);
      },
      joinRoom: function joinRoom(roomId) {
        var self = this;
        var fnJoin = function fnJoin(err, data) {
          if (err || data.errcode) {
            th.wc.hide();
            th.alert.show("提示", data.errmsg, null, false);
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
        th.http.get("/join_private_room", params, fnJoin);
      }
    });
    cc._RF.pop();
  }, {} ],
  WaitingConnection: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c9213QZp3ROI7Fd7AOxsnlH", "WaitingConnection");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        target: cc.Node,
        lblContent: cc.Label
      },
      onLoad: function onLoad() {
        cc.log("WaitingConnection====>onload");
        if (null == th) return null;
        th.wc = this;
        this.node.active = false;
      },
      update: function update(dt) {
        this.target.rotation = this.target.rotation - 90 * dt;
      },
      show: function show(content) {
        this.node && (this.node.active = true);
        this.lblContent && (this.lblContent.string = content || "");
      },
      hide: function hide() {
        this.node && (this.node.active = false);
      },
      onDestory: function onDestory() {
        th && (th.wc = null);
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "AnysdkManager", "AudioManager", "Http", "SocketIO", "SocketIOManager", "UserManager", "Alert", "AppStart", "CreateRoom", "Hall", "JoinRoom", "Setting", "WaitingConnection" ]);