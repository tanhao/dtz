function initManager(I){
    cc.th={};
    cc.th.http=require("Http");
    cc.th.http.baseURL="http://127.0.0.1:9001"

    var UserManager=require("UserManager");
    cc.th.userManager=new UserManager();

    var AnysdkManager=require("AnysdkManager");
    cc.th.anysdkManager=new AnysdkManager();

    var AudioManager = require("AudioManager");
    cc.th.audioManager = new AudioManager();
    cc.th.audioManager.init();

}   


cc.Class({
    extends: cc.Component,

    properties: {
       _isAgree:false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        initManager();
        console.log('onLoad'); 
    },

    start () {
        cc.log("start");
    },

    onBtnWeichatClicked:function(){
        if(this._isAgree){
            cc.log("onBtnWeichatClicked");
            cc.th.userManager.lingshiAuth();
        }
    },

    onBtnAgreeClicked:function(target){
        this._isAgree=target.isChecked;
    },

    // update (dt) {},
});
