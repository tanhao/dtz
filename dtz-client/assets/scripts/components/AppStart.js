function initManager(I){
    cc.th={};

    cc.th.http=require("Http");
}

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        initManager();
        console.log('haha'); 
    },

    start () {

    },

    // update (dt) {},
});
