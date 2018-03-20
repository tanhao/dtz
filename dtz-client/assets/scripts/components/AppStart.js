function initManager(I){
    window.th=window.th || {};
    
    th.http=require("Http");
    th.http.baseURL="http://127.0.0.1:9001"

    var UserManager=require("UserManager");
    th.userManager=new UserManager();

    var AnysdkManager=require("AnysdkManager");
    th.anysdkManager=new AnysdkManager();

    var AudioManager = require("AudioManager");
    th.audioManager = new AudioManager();
    th.audioManager.init();

}   


cc.Class({
    extends: cc.Component,

    properties: {
       _isAgree:false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        initManager();
        //console.log('onLoad'); 
    },

    start () {
        //cc.log("start");
    },

    onBtnWeichatClicked:function(){
        if(this._isAgree){
            cc.log("onBtnWeichatClicked");
            th.userManager.lingshiAuth();
        }
    },

    onBtnAgreeClicked:function(target){
        this._isAgree=target.isChecked;
    },

    // update (dt) {},
});
