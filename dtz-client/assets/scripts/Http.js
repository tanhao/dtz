
var HTTP=cc.Class({
    extends: cc.Component,

    statics:{
        get:function(url,callback){
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.open("GET",url,true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    try{
                        var json = JSON.parse(xhr.responseText);
                        callback(null,json);
                    }catch(e){
                        callback(e,null);
                    }
                }
            };
            xhr.send();
        },
        post:function(url,params,callback){
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                    try{
                        var json = JSON.parse(xhr.responseText);
                        callback(null,json);
                    }catch(e){
                        callback(e,null);
                    }
                }
            }
           xhr.send(params);
        }

    }
});