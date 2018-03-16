cc.Class({
    extends: cc.Component,

    properties: {
        lblId:cc.Label,
        lblName:cc.Label,
        lblBalance:cc.Label,
        lblMarquee:cc.Label,
        joinRoomWin:cc.Node,
        createRoomWin:cc.Node,
        settingWin:cc.Node,
    },

    onLoad: function () {
        this.initUserInfo();
        cc.th.audioManager.playBGM("bg_hall.mp3");
    },

    initUserInfo:function(){
        this.lblId.string = "ID:"+cc.th.userManager.userId;
        this.lblName.string = cc.th.userManager.userName;
        this.lblBalance.string = cc.th.userManager.balance;
    },

    update: function (dt) {
        var x = this.lblMarquee.node.x;
        x -= dt*100;
        if(x + this.lblMarquee.node.width < -250){
            x = 260;
        }
        this.lblMarquee.node.x = x;
    },

    // start: function (dt) {

    // },

    onCreateRoomClicked : function(){
        this.createRoomWin.active=true;
    },

    onJoinRoomClicked : function(){
        this.joinRoomWin.active=true;
    },

    onSettingClicked : function(){
        this.settingWin.active=true;
    }

});
