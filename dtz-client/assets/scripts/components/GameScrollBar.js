cc.Class({
    extends: cc.Component,

    properties: {
        _lastPosY:0,
    },

    onLoad () {
        
    },


    update (dt) {
    },


    onGameBarScroll:function(scrollView, eventType, customEventData){
        var posY=parseInt(scrollView.getContentPosition().y);
        if(eventType=== cc.ScrollView.EventType.SCROLLING&&Math.abs(posY-this._lastPosY)>1){
            this._lastPosY=posY;
            var btnHeight=174;
            var currentIndex=parseInt((posY+(btnHeight/2)*(posY>0?1:-1))/btnHeight)+3;
            var buttons=scrollView.getComponentsInChildren(cc.Button);
            for(var i=0;i<buttons.length;i++){
                var scale=Math.abs(posY+(3-i)*btnHeight)/800;
                buttons[i].node.setScale(1-scale);
                buttons[i].node.setColor(i==currentIndex?cc.color(255,255,255):cc.color(120,120,120));
            }
        }else if(eventType=== cc.ScrollView.EventType.SCROLL_ENDED){
            console.log("SCROLL_ENDED");
           
        }else if(eventType=== cc.ScrollView.EventType.AUTOSCROLL_ENDED_WITH_THRESHOLD){
            console.log("AUTOSCROLL_ENDED_WITH_THRESHOLD");
            var max=scrollView.getMaxScrollOffset().y;
            console.log("Y:",max)
            scrollView.scrollToOffset(cc.p(max / 2, 0), 0.5);
        }
        
    }

});
