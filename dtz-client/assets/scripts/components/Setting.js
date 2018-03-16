cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function () {
    },

    // update: function (dt) {

    // },
    
    onEnable:function(){
        var bgm = cc.sys.localStorage.getItem("bgmVolume");
        if(bgm){
            cc.th.audioManager.setBGMVolume(parseFloat(bgm));    
        }
        var sfx = cc.sys.localStorage.getItem("sfxVolume");
        if(sfx){
            cc.th.audioManager.setSFXVolume(parseFloat(sfx));    
        }

        cc.log("bgm:",bgm,"sfx:",sfx);

    },

    onCloseClicked:function(){
        this.node.active = false;
    },

    onEffectSlide:function(target){
        cc.th.audioManager.setSFXVolume(target.progress);
    },

    onMusicSlide:function(target){
        cc.th.audioManager.setBGMVolume(target.progress);
    },

});
