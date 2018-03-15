(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Http.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '904ffIoZYNMnaB5ix5gAedT', 'Http', __filename);
// scripts/Http.js

"use strict";

var qs = require("npm/qs");

var Http = cc.Class({
    extends: cc.Component,

    statics: {
        baseURL: null,
        get: function get(path, params, callback) {
            var xhr = cc.loader.getXMLHttpRequest();
            var requestUrl = Http.baseURL + path + '?' + encodeURI(qs.stringify(params));
            xhr.open("GET", requestUrl, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                    try {
                        var json = JSON.parse(xhr.responseText);
                        callback(null, json);
                    } catch (e) {
                        callback(e, null);
                    } finally {
                        if (cc.th && cc.th.wc) {
                            cc.th.wc.hide();
                        }
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
                    } finally {
                        if (cc.th && cc.th.wc) {
                            cc.th.wc.hide();
                        }
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
        