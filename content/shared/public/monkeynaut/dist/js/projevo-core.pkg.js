'use strict';
angular.module("evo.api", [
               "evo.utils",
               "evo.user",
               "evo.client.config"]);

angular.module("evo.client.browser", []);

angular.module("evo.client", [
               "ngCookies",
               "evo.utils",
               "evo.client.browser"]);

angular.module("evo.client.config", []);

angular.module("evo.common", [
               "evo.common.services",
               "evo.common.filters",
               "evo.common.directives"]);

angular.module("evo.common.directives", [
    "ui.bootstrap",
    "ui.bootstrap.tpls",
    "evo.client.config",
    "evo.utils",
    "evo.common.filters"])
    .run([
        "$rootScope",
        "$window",
        function (root, w) {
            angular.forEach(["resize", "scroll"], function (event) {
                angular.element(w).bind(event, function (e) {
                    root.$broadcast(("evo." + event), { $event: e });
                });
            });
        }
    ]);

angular.module("evo.common.filters", []);

angular.module("evo.common.services", []);

angular.module("evo.locale", ["i18n"]);

angular.module("evo.templates", []);

angular.module("evo.user", [
               "ngCookies",
               "evo.utils",
               "evo.user.validation"]);

angular.module("evo.user.validation", ["evo.utils"]);

angular.module("evo.utils", []);

angular.module("evo.utils.uuid", []);

angular.module("evo.api")
    .factory("evoAPIErrors", [
        function () {

            var ERRORS = {
                5: "Timeout calling server"
            };

            var srvc = {};

            /**
             * Returns object with error code and message.
             * @param  {number} n   Error number.
             * @param  {string} msg Default message to pass if message not found.
             * @return {object}
             */
            srvc.getByCode = function (n, msg) {
                return { errorNum: n, errorMsg: ERRORS[n] || msg };
            };

            return srvc;
        }
    ])
    .factory("evoAPI", [
        "$log",
        "$rootScope",
        "$timeout",
        "$q",
        "$window",
        "evoUser",
        "evoConfig",
        "evoUtils",
        "evoAPIErrors",
        function (log, root, timeout, q, win, user, config, utils, apiErrors) {

            if (!win.Primus) throw new Error("Required third-party library 'Primus' is missing.");
            var appBase = config.get('appBase');
            win.Primus.prototype.pathname = appBase ? (appBase + (win.Primus.prototype.pathname || '/primus')) : (win.Primus.prototype.pathname || '/primus');

            var srvc = {};

            var isInit        = false,
                madeCalls     = {},
                deferredCalls = [],
                primus        = win.Primus.connect(config.get("socket_server") + ":" + config.get("socket_port")),
                socketTimeout = config.get("socket_timeout", 4000);

            function rejectDeferred(callObj){
                if(madeCalls.hasOwnProperty(callObj.id)) {
                    log.error("Call timed out: " + madeCalls[callObj.id].name);
                    root.$apply(madeCalls[callObj.id].deferred.reject(apiErrors.getByCode(5)));
                    delete madeCalls[callObj.id];
                }
            };

            // Connection timeout. Reject any deferred calls that were made in the meantime.
            var initTimeout = timeout(function () {
                angular.forEach(deferredCalls, rejectDeferred);
                deferredCalls = [];
                isInit = true;
                log.error("Socket connection timed out.");
            },
            socketTimeout);

            function handleCall(callObj) {
                callObj.timeout = timeout(function() { rejectDeferred(callObj) }, socketTimeout);
                primus.write(callObj);
            }

            primus.on("open", function (){
                log.info("Primus socket connection initialized.");
                angular.forEach(deferredCalls, handleCall);
                deferredCalls = [];
                isInit = true;
                timeout.cancel(initTimeout);
            });

            primus.on("data", function (resultObj) {
                log.info("Primus socket data recv.");
                if(madeCalls.hasOwnProperty(resultObj.id)) {
                    timeout.cancel(resultObj.timeout);

                    if (resultObj.result && resultObj.result.hasOwnProperty("errorNum")) {
                        root.$apply(madeCalls[resultObj.id].deferred.reject(resultObj));
                    }
                    else if (resultObj.result && resultObj.result.hasOwnProperty("errno")) {
                        root.$apply(madeCalls[resultObj.id].deferred.reject(apiErrors.getByCode(o.result.errno, o.result.code)));
                    }
                    else {
                        root.$apply(madeCalls[resultObj.id].deferred.resolve(resultObj));
                    }
                    delete madeCalls[resultObj.id];
                }
                else if (resultObj.event && resultObj.message) {
                    root.$emit(resultObj.event, resultObj.message);
                }
            });

            srvc.callFunction = function (name, params) {
                var defer = q.defer(),
                    o = {
                        id: utils.getRandString(10),
                        "name": name,
                        "params": params,
                        user: user.data,
                        context: user.context
                    };

                madeCalls[o.id] = { deferred: defer, "name": name };

                // check if the connection is initialized
                if (isInit) handleCall(o);            // handle current call
                else deferredCalls.push(o);           // can't handle the call yet, save it to deferred calls array

                return defer.promise;
            };

            return srvc;
        }
    ]);

angular.module("evo.client.browser")
    .factory("evoBrowser", [
        function () {

            var BROWSER_DATA = [
                    {
                        string: navigator.userAgent,
                        subString: "Chrome",
                        identity: "Chrome"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "OmniWeb",
                        versionSearch: "OmniWeb/",
                        identity: "OmniWeb"
                    },
                    {
                        string: navigator.vendor,
                        subString: "Apple",
                        identity: "Safari",
                        versionSearch: "Version"
                    },
                    {
                        prop: window.opera,
                        identity: "Opera",
                        versionSearch: "Version"
                    },
                    {
                        string: navigator.vendor,
                        subString: "iCab",
                        identity: "iCab"
                    },
                    {
                        string: navigator.vendor,
                        subString: "KDE",
                        identity: "Konqueror"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "Firefox",
                        identity: "Firefox"
                    },
                    {
                        string: navigator.vendor,
                        subString: "Camino",
                        identity: "Camino"
                    },
                    {
                        string: navigator.userAgent,            // for newer Netscapes (6+)
                        subString: "Netscape",
                        identity: "Netscape"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "MSIE",
                        identity: "Explorer",
                        versionSearch: "MSIE"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "Gecko",
                        identity: "Mozilla",
                        versionSearch: "rv"
                    },
                    {
                        string: navigator.userAgent,             // for older Netscapes (4-)
                        subString: "Mozilla",
                        identity: "Netscape",
                        versionSearch: "Mozilla"
                    }
                ],
                BROWSER_OS   = [
                    {
                        string: navigator.platform,
                        subString: "Win",
                        identity: "Windows"
                    },
                    {
                        string: navigator.platform,
                        subString: "Mac",
                        identity: "Mac"
                    },
                    {
                        string: navigator.userAgent,
                        subString: "iPhone",
                        identity: "iPhone/iPod"
                    },
                    {
                        string: navigator.platform,
                        subString: "Linux",
                        identity: "Linux"
                    }
                ];

            var srvc = {}, searchstr = "";

            function searchString(ns) {
                var i = 0, b = ns[i];
                for (;b = ns[i++];) {
                    searchstr = b.versionSearch || b.identity;
                    if (b.string && b.string.indexOf(b.subString) !== -1 || b.prop) {
                        return b.identity;
                    }
                }
                return null;
            }

            function searchVersion(str) {
                var i = str.indexOf(searchstr);
                return (i !== -1) ? parseFloat(str.substring(i + searchstr.length + 1)) : null;
            }

            srvc.browser = searchString(BROWSER_DATA) || "unknown";
            srvc.version = searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || "unknown";
            srvc.os      = searchString(BROWSER_OS) || "unknown";

            srvc.supportsCSS3Animation = function() {
                return !(srvc.browser == "Explorer" && srvc.version < 10);
            };

            return srvc;
        }
    ]);

angular.module("evo.client")
    .factory("evoClientData", [
        "$cookies",
        "evoUtils",
        function (cookies, utils) {

            var srvc = {};

            try {
                srvc = JSON.parse(utils.base64Encoder("atob", "decode", cookies.clientData));
            } catch(err) {
                srvc = { config: {} };
            }

            /**
             * Returns base64 method to decode a base-64 encoded string.
             * @param  {string} s
             * @return {string}
             */
            srvc.atob = function(s) {
                return utils.base64Encoder("atob", "decode", s);
            };

            /**
             * Returns base64 method to encode a string.
             * @param  {string} s
             * @return {string}
             */
            srvc.btoa = function(s) {
                return utils.base64Encoder("btoa", "encode", s);
            };

            return srvc;
        }
    ]);

angular.module("evo.client.config")
    .factory("evoConfig", [
        "evoClientData",
        function (clientData) {

            var srvc = {};

            /**
             * Returns data at specified index.
             * @param  {string} k
             * @param  {*}      d Set default return value.
             * @return {*}
             */
            srvc.get = function (k, d) {
                return clientData[k] || clientData.config[k] || d;
            };

            return srvc;
        }
    ]);

angular.module("evo.templates")
    .factory("evoTemplates", [
        "$templateCache",
        function (templateCache) {
            var srvc = {};

            /**
             * Adds an array of templates to angular template cache service.
             * @param  {array} Array of templates to cache.
             */
            srvc.cacheTemplates = function (templates) {
                if (!angular.isArray(templates)) return;
                if (!templates.length) return;
                angular.forEach(templates, function (v, i) {
                    if (!templateCache.get(v.name)) templateCache.put(v.name, (v.reference ? templateCache.get(v.reference) : v.content) || '');
                });
            };

            return srvc;
        }
    ]);

angular.module("evo.user")
    .factory("evoUser", [
        "$cookies",
        "evoUtils",
        function (cookies, utils) {

            var srvc = {}, privileges = {};

            try {
                srvc.data    = JSON.parse(utils.base64Encoder("atob", "decode", cookies.userData)).user;
                srvc.context = JSON.parse(cookies.contextData);
                privileges   = srvc.data.product.roles.concat(Object.keys(srvc.data.product.settings.permissions).filter(function (v) { return srvc.data.product.settings.permissions[v] }));
            } catch(err) { /* pass */ }

            srvc.isLoggedIn = !!srvc.data;

            /**
             * Returns base64 method to decode a base-64 encoded string.
             * @param  {string} s
             * @return {string}
             */
            srvc.atob = function(s) {
                return utils.base64Encoder("atob", "decode", s);
            };

            /**
             * Returns base64 method to encode a string.
             * @param  {string} s
             * @return {string}
             */
            srvc.btoa = function(s) {
                return utils.base64Encoder("btoa", "encode", s);
            };

            /**
             * Checks user priviledges for specified role or permission, and returns true if exists.
             * @param  {string}  a Role or permission.
             * @return {boolean}
             */
            srvc.hasPrivilege = function (a) {
                return privileges.indexOf(a) >= 0;
            };

            /**
             * Returns true if user has one of the roles/permissions specified.
             * @param  {array}  arr [description]
             * @return {Boolean}     [description]
             */
            srvc.hasSomePrivileges = function (arr) {
                var i = 0, n = arr.length;
                for (; i < n; i++) {
                    if (srvc.hasPrivilege(arr[i])) {
                        return true;
                    }
                }
                return false;
            };

            /**
             * Returns true if user has all specified roles/permissions.
             * @param  {array}   arr Array of privileges to match.
             * @return {boolean}
             */
            srvc.hasAllPrivileges = function (arr) {
                var i = 0, n = arr.length;
                for (;i < n; i++) {
                    if (!srvc.hasPrivilege(arr[i])) {
                        return false;
                    }
                }
                return true;
            };

            return srvc;
        }
    ]);

angular.module("evo.user.validation")
    .factory("evoValidation", [
        "evoRegExp",
        function (regexp) {

            var srvc = {};

            function hasLowerChar(s) {
                return (s.search(/[a-z]/) != -1);
            }

            function hasUpperChar(s) {
                return (s.search(/[A-Z]/) != -1);
            }

            function hasDigitChar(s) {
                return (s.search(/[0-9]/) != -1);
            }

            function hasSpecialChar(s) {
                return (s.search(regexp.specialChar) != -1);
            }

            function isEmptyString(s) {
                return (s == null || !regexp.emptyString.test(s));
            }

            /**
             * @param  {string} password
             * @return {number}
             */
            srvc.passwordStrength = function (password) {
                if (isEmptyString(password) || password.length < 8) return 0;

                var base = 0;
                base = base + (hasLowerChar(password) ? 26 : 0);
                base = base + (hasUpperChar(password) ? 26 : 0);
                base = base + (hasDigitChar(password) ? 10 : 0);
                base = base + (hasSpecialChar(password) ? 20 : 0);

                var comb = Math.pow(base, password.length);

                if (comb < Math.pow(56, 8))  return 0;      // anything below this is unacceptable
                if (comb < Math.pow(56, 11)) return 1;      // weak password
                if (comb < Math.pow(56, 15)) return 2;      // moderate password

                return 3;                                   // strong password
            };

            return srvc;
        }
    ]);

angular.module("evo.utils")
    .value("evoRegExp", {
        specialChar: /(?!^[0-9a-zA-Z]*$)(^.*$)/,
        email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        username: /^[a-z0-9_-]{3,16}$/,
        password: /^[a-z0-9_-]{6,18}$/,
        hexValue: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/,
        url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        htmlTag: /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/,
        emptyString: /[^\s]+/
    })
    .value("evoStrings", {
        letters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        digits: "0123456789",
        hexdigits: "0123456789abcdefABCDEF",
        octdigits: "01234567",
        punctuation: "!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~",
        whitespace: " \t\n\r\x0b\x0c"
    })
    .factory("evoUtils", [
        "$window",
        "evoStrings",
        function (win, string) {

            var srvc = {};

            function empty(str) {
                return str==null||!/[^\s]+/.test(str);
            }

            /**
             * Returns formatted string with all '%s' replaced by there corresponding value.
             * @return {string}
             */
            srvc.sprintf = function () {
                var args = (angular.isArray(arguments[0])) ? arguments[0] : arguments, i = 1, n = args.length, str = args[0];
                for(; i < n; i++)
                    str = str.replace(/%s/i, args[i]);
                return str;
            };

            /**
             * Returns a string of random characters.
             * @param  {number}  length      Length of return string.
             * @param  {boolean} punctuation
             * @return {string}
             */
            srvc.getRandString = function (length, punctuation) {
                var choices = string.letters + string.digits + ((punctuation && string.punctuation) || ''), s = [];
                if (isNaN(length)) length = 16;
                for (; s.length !== length;) {
                    s.push(choices[Math.floor(srvc.randRange(0, choices.length))]);
                }
                return s.join("");
            };

            /**
             * Returns result of specified base64 string encoding.
             * @param  {string} m1 Base64 method.
             * @param  {string} m2 Specify method action. Decode or encode.
             * @param  {string} s  String to encode or decode.
             * @return {string}
             */
            srvc.base64Encoder = function (m1, m2, s) {
                return ((win[m1]) ? win[m1] : base64[m2])(s);
            };

            /**
             * Returns random number between provided min and max numbers.
             * @param  {number} min
             * @param  {number} max
             * @return {number}
             */
            srvc.randRange = function (min, max) {
                return Number(min + (Math.random() * ((max - min) + 1)));
            };

            /**
             * Returns the largest of zero or more numbers.
             * @param  {array|*} a
             * @return {number}
             */
            srvc.getMaxNum = function (a) {
                return Math.max.apply(null, (angular.isArray(a)) ? a : arguments);
            };

            /**
             * Returns the smallest of zero or more numbers.
             * @param  {array|*} a
             * @return {number}
             */
            srvc.getMinNum = function (a) {
                return Math.min.apply(null, (angular.isArray(a)) ? a : arguments);
            };

            /**
             * [roundNumber description]
             * @param  {number} num    [description]
             * @param  {number} digits [description]
             * @return {number}        [description]
             */
            srvc.roundNumber = function (num, digits) {
                if(empty(num) || isNaN(num) || isNaN(digits)) throw new Error("Incorrect argument type(s).");
                var rounder = Math.pow(10, digits);
                return (Math.round(num * rounder)/rounder);
            };

            return srvc;
        }
    ]);

angular.module("evo.utils.uuid")
    .factory("evoUUID", [
        function () {

            var srvc = {};

            function getRandomStr(length){
                var i = 0, s = '';
                for(; i < length; i++){
                    s += Math.floor(Math.random() * 16).toString(16).toUpperCase();
                }
                return s;
            };

            srvc.uuid4 = function () {
                var arr = [];
                for (var i = 0; i <= 20; i++) {
                    if(i >= 8){
                        if(i === 8)
                            arr.push(getRandomStr(8));
                        else if(i % 4 === 0)
                            arr.push(getRandomStr(4));
                    }
                }
                arr.push(getRandomStr(12));
                return arr.join('-');
            };

            return srvc;
        }
    ]);

var evo = {} || evo;

evo.version = " ";
evo.module  = function (name, deps) {
    var module;
    try {
        module = angular.module(name);
    } catch (e) {
        module = angular.module(name, (deps || []));
    }
    return module;
};
window.evo = evo;

angular.module("evo", [
               "evo.utils",
               "evo.client",
               "evo.user",
               "evo.api",
               "evo.locale",
               "evo.templates"]);
