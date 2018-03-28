cc.Class({
    extends: cc.Component,

    properties: {
        _myHoldPokers:[],
        _myFoldPokers:[]
    },

    onLoad () {
        this.initView();
        this.initEventHandlers();
        this.initWanfaLabel();
        th.audioManager.playBGM("bg_fight.mp3");
    },

    initView:function(){
        var myself = this.node.getChildByName("myself");
        var myholds = myself.getChildByName("holds");
        for(var i = 0; i < myholds.children.length; ++i){
            var sprite = myholds.children[i].getComponent(cc.Sprite);
            this._myHoldPokers.push(sprite);
            sprite.spriteFrame = null;
            //this.initDragStuffs(sprite.node);
        }
        myholds = myself.getChildByName("holds2");
        for(var i = 0; i < myholds.children.length; ++i){
            var sprite = myholds.children[i].getComponent(cc.Sprite);
            this._myHoldPokers.push(sprite);
            sprite.spriteFrame = null;
            //this.initDragStuffs(sprite.node);
        }

        cc.log("pokers:"+this._myHoldPokers.length);
        var realwidth = cc.director.getVisibleSize().width;
        cc.log("realWidth:"+(realwidth/1280));
    },

    initEventHandlers:function(){
        var self=this;
        th.socketIOManager.dataEventHandler=this.node;

        this.node.on('init_info', function (data) {
            console.log('==>Gmae init_info:',JSON.stringify(data));
        });
    },

    initWanfaLabel:function(){

    },
    /*
    update (dt) {
    },
    */

});
