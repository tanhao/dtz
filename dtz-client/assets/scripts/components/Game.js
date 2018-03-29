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

        settingWin:cc.Node,
        menuWin:cc.Node,

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

        this.node.on('init_room', function (data) {
            console.log('==>Gmae init_room:',JSON.stringify(data));
        });

        this.node.on('join_push', function (data) {
            console.log('==>Gmae join_push:',JSON.stringify(data));
        });

        this.node.on('leave_push', function (data) {
            console.log('==>Gmae leave_push:',JSON.stringify(data));
        });

        this.node.on('dissolve_push', function (data) {
            console.log('==>Gmae dissolve_push:',JSON.stringify(data));
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
    },

    onMenuClicked:function(){
        this.menuWin.active=!this.menuWin.active;
    },
    onDissolveClicked:function(){
        this.menuWin.active=false;
        cc.log('onChatClicked==>');
    },
    onLeaveClicked:function(){
        this.menuWin.active=false;
        th.alert.show("返回大厅","返回大厅房间仍会保留，快去邀请大伙来玩吧！",function(){
            th.wc.show('正在返回游戏大厅');
            cc.director.loadScene("hall");    
        },true)
    },
    onSettingClicked:function(){
        this.menuWin.active=false;
        this.settingWin.active=true;
    },
    onChatClicked:function(){
        cc.log('onChatClicked==>');
    },
    onVoiceClicked:function(){
        cc.log('onVoiceClicked==>');
    },


});
