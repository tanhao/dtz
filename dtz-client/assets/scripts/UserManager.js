cc.Class({
    extends: cc.Component,

    properties: {
        userId:null,
        userName:null,
        account:null,
        sex:null,
        headImgUrl:null,
        balance:0,
        ip:null,
        sign:null,
    },

    onLoad: function () {
    },

    // update: function (dt) {

    // },

    // start: function (dt) {

    // },

    lingshiAuth:function(){
        th.wc.show("正在登录游戏");
        th.http.get('/lingshi_auth',{account:'oy4oyv4IBaxtkPjSq9ee4w42QazA'},this.onAuth);
    },

    onAuth:function(err,data){
        if(err){
            cc.log(err);
            return ;
        }
        var self = th.userManager;
        self.account = data.account;
        self.sign = data.sign;
        th.http.baseURL = 'http://'+data.hallAddr;

        cc.log(th.http.baseURL);
        self.login();
    },

    login:function(){
        var self = this;
        var callback = function(err,data) {
             if(err||data.errcode){
                 cc.log(err,data.errmsg);
                 return;
             }
             self.sex = data.sex;
             self.userId = data.id;
             self.account = data.account;
             self.balance = data.balance;
             self.userName = data.name;
             self.headImgUrl = data.headImgUrl;
             cc.director.loadScene("hall");
        };
        th.wc.show("正在登录游戏");
        th.http.get('/login',{account:self.account,sign:self.sign},callback)
    },

    createRoom : function(config){
        var data={
            account:th.userManager.account,
            sign:th.userManager.sign,
            config:JSON.stringify(config)
        }
        var callback = function(err,data) {
            if(err||data.errcode){
                cc.log(err,data.errmsg);
                return;
            }
            cc.log("createRoom==>"+JSON.stringify(data));
            
        };
        th.wc.show("正在创建房间");
        th.http.get('/create_private_room',data,callback);
    },

    enterRoom : function(roomId,callback){
        var self = this;
    }
    
});
