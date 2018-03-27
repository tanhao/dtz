cc.Class({
    extends: cc.Component,

    properties: {
   
    },

    onLoad () {
        this.initView();
        this.initEventHandlers();
        th.audioManager.playBGM("bg_fight.mp3");
    },

    initView:function(){

    },

    initEventHandlers:function(){
        var self=this;
        th.socketIOManager.dataEventHandler=this.node;

        this.node.on('init_info', function (data) {
            console.log('==>Gmae init_info:',JSON.stringify(data));
        });
    }
    /*
    update (dt) {
    },
    */

});
