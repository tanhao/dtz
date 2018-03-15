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

    guestAuth:function(){
        cc.th.wc.show("正在登录游戏");
        cc.th.http.get('/guest_auth',{account:Date.now()},this.onAuth);
    },

    onAuth:function(err,data){
        if(err){
            cc.log(err);
            return ;
        }
        cc.log('guest:'+JSON.stringify(data));
        var self=cc.th.userManager;
        self.account=data.account;
        self.sign=data.sign;
        cc.th.http.baseURL='http://'+self.hallAddr;
    },

    login:function(){
        cc.th.wc.show("正在登录游戏");
        
    }
    
});
