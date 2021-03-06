(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Http.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '904ffIoZYNMnaB5ix5gAedT', 'Http', __filename);
// scripts/Http.js

"use strict";

var Http = cc.Class({
    extends: cc.Component,

    statics: {
        baseURL: null,
        get: function get(path, params, callback) {
            var xhr = cc.loader.getXMLHttpRequest();

            var paramsStr = "?";
            for (var k in params) {
                if (paramsStr != "?") {
                    paramsStr += "&";
                }
                paramsStr += k + "=" + params[k];
            }

            var requestUrl = Http.baseURL + path + encodeURI(paramsStr);
            xhr.open("GET", requestUrl, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                    try {
                        console.log("try => http response:" + xhr.responseText);
                        var json = JSON.parse(xhr.responseText);
                        callback(null, json);
                    } catch (e) {
                        callback(e, null);
                    }
                }
            };
            xhr.send();
        },
        post: function post(path, params, callback) {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.open("POST", Http.baseURL + path);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status <= 207) {
                    try {
                        var json = JSON.parse(xhr.responseText);
                        callback(null, json);
                    } catch (e) {
                        callback(e, null);
                    }
                }
            };
            xhr.send(params);
        }

    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Http.js.map
        