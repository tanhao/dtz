cc.Class({
    extends: cc.Component,

    properties: {
        target:cc.Node,
        _isShow:false,
	    lblContent:cc.Label
    },

    onLoad () {
        if(cc.th==null){
            return null;
        }
        cc.th.wc=this;
        this.node.active=this._isShow;
    },

    update (dt) {
        this.target.rotation=this.target.rotation-dt*90;
    },

    show (content) {
        this._isShow=true;
        if(this.node){
            this.node.active=this._isShow;
        }
        if(this.lblContent){
            this.lblContent.string=content||""; 
        }
    },

    hide () {
        this._isShow=false;
        if(this.node){
            this.node.active=this._isShow;
        }
    }
});
