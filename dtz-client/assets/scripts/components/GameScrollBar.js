cc.Class({
    extends: cc.Component,

    properties: {
        _lastPosY:0,
    },

    onLoad () {
        
    },


    update (dt) {
    },


    onGameBarScroll:function(scrollview, eventType, customEventData){
        var posY=parseInt(scrollview.getContentPosition().y);
        if(eventType=== cc.ScrollView.EventType.SCROLLING&&Math.abs(posY-this._lastPosY)>1){
            this._lastPosY=posY;
            //console.log("SCROLLING",scrollview.isScrolling(),scrollview.isAutoScrolling(),scrollview.getContentPosition());
            //cc.log(scrollview.getScrollOffset(),scrollview.getMaxScrollOffset());
            cc.log(posY,parseInt(posY/200),scrollview.getComponent('cc.Button')).length;
            var items=scrollview.getComponentsInChildren(cc.Sprite);
        }else if(eventType=== cc.ScrollView.EventType.SCROLL_ENDED){
            console.log("SCROLL_ENDED");
        }
    }

});
