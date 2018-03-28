cc.Class({
    extends: cc.Component,

    properties: {
        seatLeft:cc.Node,
        seatMyself:cc.Node,
        seatRight:cc.Node,
        seatUp:cc.Node,
        options:cc.Node,
        wangfa:cc.Label,
        dipai8:cc.Sprite,
        dipai9:cc.Sprite,
        btnMenu:cc.Button,
        btnChat:cc.Button,
        btnVoice:cc.Button,

        _myHoldPokers:[],
        _myFoldPokers:[]
    },

    onLoad () {

        this.addComponent("Folds");

        this.initView();
        this.initEventHandlers();
        this.initWanfaLabel();
        this.initDipai();
        th.audioManager.playBGM("bg_fight.mp3");
    },

    initView:function(){
        var myholds=['Holds1','Holds2'];
        for(var i=0;i<myholds.length;i++){
            var holds = this.seatMyself.getChildByName(myholds[i]);
            for(var j=0;j<holds.children.length;j++){
                var sprite = holds.children[j].getComponent(cc.Sprite);
                this._myHoldPokers.push(sprite);
                sprite.spriteFrame = null;
            }
        }
        //this.initDragStuffs(sprite.node);
        cc.log("mypokers:"+this._myHoldPokers.length);
        //var realwidth = cc.director.getVisibleSize().width;
        //cc.log("realWidth:"+(realwidth/1280));

        this.hideOptions();
    },

    initEventHandlers:function(){
        var self=this;
        th.socketIOManager.dataEventHandler=this.node;

        this.node.on('init_info', function (data) {
            console.log('==>Gmae init_info:',JSON.stringify(data));
        });
    },

    initWanfaLabel:function(){
        this.wangfa.string=th.socketIOManager.getWanfa();
    },
    initDipai:function(){
        var dipai=th.socketIOManager.getDipai();
        cc.log("dipai:"+dipai);
        if(dipai==8){
            this.dipai8.node.active=true;
            this.dipai9.node.active=false;
        }else if(dipai==9){
            this.dipai8.node.active=false;
            this.dipai9.node.active=true;
        }else{
            this.dipai8.node.active=false;
            this.dipai9.node.active=false;
        }
    },
    /*
    update (dt) {
    },
    */

    hideOptions:function(data){
        this.options.active=false;
        for(var i=0;i<this.options.children.length;i++){
            var child = this.options.children[i]; 
            child.active=false;
        }
        
    }
});
