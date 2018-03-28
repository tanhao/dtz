cc.Class({
    extends: cc.Component,

    properties: {
        _folds:null,
    },

    onLoad () {
        this.initView();
        this.initEventHandler();
    },


    update (dt) {
    },

    initView:function(){
        var seatNames = ["myself","right","up","left"];
        for(var i = 0; i < seatNames.length; i++){
            var foldRoot = this.node.getChildByName(seatNames[i]).getChildByName('folds');
            var folds = [];
            for(var j=0;j<foldRoot.children.length;j++){
                
            }

        }
    },
  
    initEventHandler:function(){

    },

});
