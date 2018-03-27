cc.Class({
    extends: cc.Component,

    properties: {
       headImg:cc.Sprite,
       lblName:cc.Label,
       lblScore:cc.Label,
       offline:cc.Sprite,
       fangzhu:cc.Sprite,
       emoji:cc.Sprite,
       countdown:cc.Sprite,
       ready:cc.Sprite,
       chat:cc.Label,
       restCard:cc.Node,

       _userId:null,
       _userName:"",
       _headImgUrl:null,
       _sex:0,
       _score:0,
       _restCard:0,
       _isOffline:false,
       _isReady:false,
       _isFangzhu:false,
       _lastChatTime:-1,
    },

    onLoad () {
        if(this.chat){
            this.chat.node.active=false;
        }
        if(this.emoji){
            this.emoji.node.active=false;
        }
        if(this.countdown){
            this.countdown.node.active=false;
        }
        if(this.restCard){
            this.restCard.active=false;
        }
        this.refresh();
    },

    refresh:function(){
        if(this._userName){
            this.lblName.string=this._userName;
        }
        if(this._score){
            this.lblScore.string=this._score;
        }
        if(this.offline){
            this.offline.node.active = this._isOffline && this._userId != null;
        }
        
        if(this.ready){
            this.ready.node.active = this._isReady; 
        }
        
        if(this.fangzhu){
            this.fangzhu.node.active = this._isFangzhu;    
        }

        //this.node.active = this._userId!=null;
    },

    setUserID:function(id){
        if(id){
            this._userId = id;
        }
    },

    setUserName:function(name){
        if(name){
            this._userName = name;
            this.lblName.string=name;
        }
    },

    setSex:function(sex){
        this._sex=sex;
    },

    setHeadImg:function(headImgUrl){
        var self=this;
        if(headImgUrl){
            this._headImgUrl = headImgUrl;
            cc.loader.load({url: headImgUrl, type: 'jpg'}, function (err, texture) {
                if(!err){
                    var headSpriteFrame = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));
                    self.headImg.spriteFrame=headSpriteFrame;
                }
            });
        }
    },

    setScore:function(score){
        if(score){
            this._score = score;
            this.lblScore.string=score;
        }
    },

    setFangzhu:function(isFangzhu){
        this._isFangzhu = isFangzhu;
        if(this.fangzhu){
            this.fangzhu.node.active =this._isFangzhu;
        }
    },
    
    setReady:function(isReady){
        this._isReady = isReady;
        if(this.ready){
            this.ready.node.active = this._isReady; 
        }
    },
    
    setOffline:function(isOffline){
        this._isOffline = isOffline;
        if(this.offline){
            this.offline.node.active = this._isOffline && this._userId != null;
        }
    },

    setRestCard:function(rest){
        this._restCard = rest;
        if(this.restCard){
            this.restCard.active=rest>0;
            this.restCard.getChildByName("poker_count").getComponent(cc.Label).string = rest+"";
        }
    },

    setChat:function(content){
        if(this.chat){
            this.emoji.node.active=false;
            this.chat.node.active = true;
            this.chat.getComponent(cc.Label).string = content;
            this.chat.getChildByName("chat_msg").getComponent(cc.Label).string = content;
            this._lastChatTime = 3;
        }
    },

    setEmoji:function(emoji){
        if(this.emoji){
            this.chat.node.active = false;
            this.emoji.node.active=true;
            this._lastChatTime = 3;
        }
    },

    update: function (dt) {
        if(this._lastChatTime > 0){
            this._lastChatTime -= dt;
            if(this._lastChatTime < 0){
                this.chat.node.active = false;
                this.emoji.node.active = false;
            }
        }
    },
    



    /*
    update (dt) {
    },
    */

  

});