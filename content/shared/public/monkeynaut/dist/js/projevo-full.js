'use strict';
angular.module("evo.api", [
               "evo.utils",
               "evo.user",
               "evo.client.config"]);

angular.module("evo.client.browser", []);

angular.module("evo.client", ["ngCookies", "evo.utils"]);

angular.module("evo.client.config", []);

angular.module("evo.common", [
               "evo.common.services",
               "evo.common.filters",
               "evo.common.directives"]);

angular.module("evo.common.directives", [
    "ui.bootstrap",
    "ui.bootstrap.tpls",
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

angular.module("evo.locale", []);

angular.module("evo.templates", []);

angular.module("evo.user", [
               "ngCookies",
               "evo.utils"]);

angular.module("evo.user.validation", ["evo.utils"]);

angular.module("evo.utils", []);

angular.module("evo.utils.uuid", []);

angular.module('evo.templates').
run(['$templateCache', function($templateCache) {
  $templateCache.put('common/directives/breadcrumb/breadcrumb.html', '<ul class="breadcrumb"> <li ng-repeat="route in crumbs"> <a href="" ng-href="{{ route.path }}" ng-class="{ disabled: $last }">{{ route.label }}</a> </li> </ul> <!-- /.breadcrumb -->');
  $templateCache.put('common/directives/table/table.html', '<div class="evo-table-toolbar" ng-show="options.toolbar"> <form role="search" class="form-inline"> <div class="form-group"> <input type="text" class="form-control evo-control" evo-placeholder="{{ getPlaceholder(options.toolbar.search) }}" ng-model="search" ng-show="options.toolbar.search" ng-change="onSearch()"> </div> <div class="form-group"> <div class="btn-group evo-btn-group"> <a href="" ng-click="button.onclick()" ng-class="setGetButtonClass(button, \'toolbar\')" ng-repeat="button in options.toolbar.buttons"> <i ng-show="hasIcon(button)" ng-class="button.icon"></i> {{ button.text || \'\' }} </a> </div> </div> </form> </div> <!-- /.evo-table-toolbar --> <div class="evo-table-container"> <div class="evo-thead"> <table class="table table-bordered"> <thead> <tr> <th ng-repeat="column in columns" ng-click="onTheadClick($event, column, options.columns.indexOf(column))" class="evo-link" ng-class="{\'evo-selected\': isSelectedOrder(column)}"> {{ options.thead.rename[column] || column | type : "string" : "title" }} </th> </tr> </thead> </table> </div> <!-- /.evo-thead --> <div class="evo-tbody"> <table class="table table-bordered"> <tbody> <tr ng-repeat="item in dados | orderBy: order | startFrom : (pagination.currentPage - 1) * pagination.itemsPerPage | limitTo: pagination.itemsPerPage"> <td ng-repeat="column in columns" ng-class="{\'evo-selected\': isSelectedOrder(column)}"> <a href="" ng-click="options.columns[column].onclick($event, item[column], column, data.indexOf(item))" ng-show="isButton(options.columns[column])" ng-class="setGetButtonClass(options.columns[column])"> <i ng-show="hasIcon(options.columns[column])" ng-class="options.columns[columns].icon"></i> {{ options.columns[column].text || item[column] }} </a> <span ng-hide="isButton(options.columns[column])"> {{ item[column] | type : options.columns[column].type : options.columns[column].fmt }} </span> </td> </tr> </tbody> </table> </div> <!-- /.evo-tbody --> </div> <!--/.evo-table-container --> <div class="evo-tfoot"> <pagination ng-show="isPaginationVisible()" ng-model="pagination.currentPage" items-per-page="pagination.itemsPerPage" class="pagination-sm" total-items="dados.length" rotate="false"></pagination> </div> <!-- /.evo-tfoot -->');
}]);

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
                return clientData.config[k] || d;
            };

            return srvc;
        }
    ]);

angular.module("evo.common.directives")
    .value("evoCrumbs", [])
    .directive("evoBreadcrumb", [
        "$route",
        "$routeParams",
        "$location",
        "evoCrumbs",
        function (route, routeParams, location, crumbs) {

            var BASEPATH = angular.element(document.getElementsByTagName("base")).attr("href") || '';

            function indexOf(label, originalPath) {
                var i = 0, n = crumbs.length;

                for (; i < n; i++) {
                    var c = crumbs[i];
                    if (c.label === label && c.originalPath === originalPath)
                        return i;
                }

                return -1;
            }

            function getLabel(a, o) {
                return (o.useParam) ? routeParams[a.substr(1)] : (o.label || a);
            }

            function updateDynamic(originalPath) {
                var r = route.routes[originalPath].breadcrumb;

                if (!angular.isObject(r)) return;

                var p = location.path(),
                    a = originalPath.split('/'),
                    i = 0,
                    n = a.length, j = 0, l = void 0;

                for (; i < n; i++) {
                    l = getLabel(a[i], r);
                    j = indexOf(l, originalPath);

                    if (l && l.length) {
                        if (j !== -1) {
                            crumbs.splice(j + 1);
                            break;
                        }
                        crumbs.push({ label: l, path: p, "originalPath": originalPath });
                    }
                }
            }

            function updateDefault(originalPath) {
                var p1 = '', p2 = '',
                    a = originalPath.split('/'), b = location.path().split('/'),
                    i = 0,
                    n = a.length;

                crumbs.splice(0);

                for (; i < n; i++) {
                    if (!a[i] && i !== 0) continue;
                    if (a[i]) {
                        p1 += '/' + a[i];
                        p2 += '/' + b[i];
                    }
                    crumbs.push({ label: getLabel(a[i], route.routes[(p1 || '/')].breadcrumb), path: ((a[i]) ? BASEPATH + p2 : '/'), originalPath: (p1 || '/') });
                }
            }

            return {
                restrict: "E",
                templateUrl: "common/directives/breadcrumb/breadcrumb.html",
                replace: true,
                link: function (scope, elem, attrs) {
                    var isDynamic = attrs.hasOwnProperty("dynamic");

                    scope.crumbs = crumbs;

                    scope.$on("$routeChangeSuccess", function (e, o) {
                        ((isDynamic) ? updateDynamic : updateDefault)(o.$$route.originalPath);
                    });
                }
            };
        }
    ]);

angular.module("evo.common.directives")
    .directive("evoGrid", [
        "$log",
        "$timeout",
        "evoUtils",
        function (log, timeout, utils) {

            var OPTIONS    = { width: 240, margin: 10 },
                DOM_EVENTS = ["DOMNodeInserted", "DOMNodeRemoved"];

            function render(elem, options) {
                elem.css("visibility", "hidden");

                var w = elem[0].clientWidth,
                    i = 0,
                    n = Math.max(Math.floor(w/(options.width + options.margin)), 1),
                    j = (n == 1) ? options.margin / 2 : (w % (options.width + options.margin)) / 2;

                var columns = [], children = elem.children();

                for (i = 0; i < n; i++) columns.push(0);

                for (i = 0; i < children.length; i++) {
                    var idx  = columns.indexOf(utils.getMinNum(columns)),
                        cell = angular.element(children[i]);
                    if (cell[0]) {
                        cell.css({
                            position: "absolute",
                            width: options.width + "px",
                            margin: options.margin/2 + "px",
                            top: (columns[idx] + options.margin/2) + "px",
                            left: ((options.width + options.margin) * idx + j) + "px",
                            overflow: "hidden",
                            visibility: "visible"
                        });
                        columns[idx] += cell[0].clientHeight + options.margin;
                    } else {
                        return render(elem, options);
                    }
                }
                elem.css({ height: utils.getMaxNum(columns) + "px", visibility: "visible" });
            }

            return {
                restrict: "E",
                link: function (scope, elem, attrs) {
                    var opt = angular.copy(OPTIONS);

                    for (var k in opt) {
                        if (attrs.hasOwnProperty(k)) {
                            opt[k] = parseInt(attrs[k]);
                        }
                    }

                    scope.renderGrid = function () {
                        timeout(function () {
                            render(elem, opt);
                        });
                    };

                    DOM_EVENTS.forEach(function (event) {
                        elem.bind(event, function () {
                            scope.renderGrid();
                        });
                    });

                    scope.$on("evo.resize", scope.renderGrid);

                    scope.$on("$destroy", function () {
                        DOM_EVENTS.forEach(function (event) {
                            elem.off(event);
                        });
                    });
                }
            }
        }
    ])
    .directive("evoCell", [
        function () {
            return {
                restrict: "E",
                transclude: true,
                template: "<div ng-transclude></div>",
                compile: function (tElement) {
                    tElement.css("visibility", "hidden");
                }
            };
        }
    ]);

angular.module("evo.common.directives")
    .directive("evoPlaceholder", [
        "$timeout",
        function (timeout) {

            var DOM_EVENTS = ["focus", "blur"];

            return {
                restrict: "A",
                link: function (scope, elem, attrs) {
                    if (attrs.type === "password") return;

                    // initialise placeholder
                    timeout(onblur);

                    function onfocus() {
                        if (elem.val() === attrs.evoPlaceholder) elem.val('').removeClass("blur");
                    }

                    function onblur() {
                        if (elem.val() === "") elem.val(attrs.evoPlaceholder).addClass("blur");
                    }

                    DOM_EVENTS.forEach(function (event) {
                        elem.bind(event, function (e) {
                            if (e.type === "focus")
                                onfocus();
                            else if (e.type === "blur")
                                onblur();
                        });
                    });

                    scope.$on("$destroy", function () {
                        DOM_EVENTS.forEach(function (event) {
                            elem.off(event);
                        });
                    });
                }
            };
        }
    ]);

angular.module("evo.common.directives")
    .directive("evoTable", [
        "$timeout",
        "$filter",
        function (timeout, filter) {

            var DOM_EVENTS = ["DOMNodeInserted", "DOMNodeRemoved", "scroll"];

            function renderThead(thead, tbody) {
                var td = tbody[0].querySelectorAll("tbody > tr:first-child td"),
                    th = thead[0].querySelectorAll("thead > tr:first-child th");
                angular.forEach(td, function (v, i) {
                    th[i].style.width = v.offsetWidth + "px";
                });
            }

            function repositionThead(thead, tbody, n) {
                if (!n) {
                    thead.removeClass("hover");
                    thead.css("top", "0px");
                    tbody.css("margin-top", "0px");
                    return;
                }
                if (!thead.hasClass("hover")) {
                    thead.addClass("hover");
                    tbody.css("margin-top", thead[0].offsetHeight + "px");
                }
                thead.css("top", (n + "px"));
            }

            return {
                restrict: "E",
                scope: { data: "=?ngModel", opt: "&options" },
                templateUrl: "common/directives/table/table.html",
                link: function (scope, elem, attrs) {
                    var opt       = scope.opt(),
                        col       = Object.keys(opt.columns),
                        container = angular.element(elem[0].getElementsByClassName("evo-table-container")),
                        thead     = angular.element(container[0].getElementsByClassName("evo-thead")),
                        tbody     = angular.element(container[0].getElementsByClassName("evo-tbody"));

                    elem.css("visibility", "hidden");
                    timeout(function () { elem.css("visibility", "visible") });

                    container.css("height", opt.height || "inherit");

                    for (var i = col.length - 1, k; k = col[i]; i--) {
                        if (angular.isString(opt.columns[k]))
                            opt.columns[k] = { type: opt.columns[k] || "string" };
                        if (angular.isFunction(opt.columns[k].filter) && !opt.columns[k].filter())
                            col.splice(i, 1);
                    }

                    if (!angular.isObject(opt.toolbar)) opt.toolbar = {};
                    if (!angular.isObject(opt.thead)) opt.thead = {};

                    scope.options    = opt;
                    scope.columns    = col;
                    scope.order      = "";
                    scope.dados      = [];
                    scope.pagination = angular.extend({}, { currentPage: 1, itemsPerPage: 10 }, (opt.pagination || {}));

                    scope.hasIcon = function (o) {
                        return !!o.icon;
                    };

                    scope.isPaginationVisible = function () {
                        return scope.dados.length > scope.pagination.itemsPerPage;
                    };

                    scope.isButton = function (o) {
                        return o.type === "link" || o.type === "button";
                    };

                    scope.setGetButtonClass = function (o, parent) {
                        return ((!o.type || o.type === "button") ? ["btn", "btn-default", (parent !== "toolbar" && "btn-block" || "")] : (o.type === "link") ? ["evo-link"] : []).concat(angular.isArray(o.class) ? o.class : [o.class]);
                    };

                    scope.getPlaceholder = function (o) {
                        return (angular.isObject(o) && o.hasOwnProperty("placeholder")) && o.placeholder || "Search";
                    };

                    scope.onTheadClick = function (e, column, index) {
                        scope.order = (!scope.order || scope.order.search(column) === -1) ? '+' + column : ((scope.order.charAt(0) === '-') ? '+' : '-') + scope.order.slice(1);
                        scope.onSearch();
                        angular.isFunction(scope.options.thead.onclick) && scope.options.thead.onclick(e, column, index);
                    };

                    scope.isSelectedOrder = function (column) {
                        return scope.order.search(column) !== -1;
                    };

                    scope.onSearch = function () {
                        var o = {};
                        o[angular.isObject(opt.toolbar.search) && opt.toolbar.search.by || "$"] = scope.search || "";
                        scope.dados = filter("filter")(scope.data, o);
                    };
                    scope.$watch("data", scope.onSearch, true);

                    DOM_EVENTS.forEach(function (event) {
                        container.bind(event, function (e) {
                            if (e.type === "scroll")
                                repositionThead(thead, tbody, e.target.scrollTop);
                            else {
                                timeout(function () {
                                    renderThead(thead, tbody);
                                });
                            };
                        });
                    });

                    scope.$on("$destroy", function () {
                        DOM_EVENTS.forEach(function (event) {
                            container.off(event);
                        });
                    });

                    scope.$on("evo.resize", function () {
                        renderThead(thead, tbody);
                    });
                }
            };
        }
    ]);

angular.module("evo.common.filters")
    .filter("startFrom", [
        function () {
            return function (input, start) {
                return angular.isArray(input) && input.slice(parseInt(start));
            };
        }
    ]);

angular.module("evo.common.filters")
    .filter("truncate", [
        function () {

            var ELLIPSIS = '...';

            return function (string, length, overflow) {
                if (length && isNaN(length)) {
                    throw new Error("Incorrect argument type. Expected integer.");
                }

                length = (length) ? Math.abs(parseInt(length)) : 10;
                overflow = overflow || ELLIPSIS;

                if (string.length > length) {
                    return string.substring(0, (length - overflow.length)) + overflow;
                }
                return string;
            }
        }
    ]);


angular.module("evo.common.filters")
    .filter("type", [
        "$filter",
        function (filter) {

            var SCIENTIFIC_NOTATION_REGEX = /^[+|-]?\d\.?\d{0,}[E|e|X|x](10)?[\^\*]?[+|-]?\d+$/,
                OCTAL_REGEX               = /^0[0-7]{3}$/,
                HEXIDECIMAL_REGEX         = /0[xX][0-9a-fA-F]+/;

            var types = {};

            function isNegative(a) {
                return (typeof a === "String") ? a.charAt(0) === '-' : a < 0;
            }

            function isSciNot(a) {
                return SCIENTIFIC_NOTATION_REGEX.test(a);
            }

            function isHexInt(a) {
                return HEXIDECIMAL_REGEX.test(a);
            }

            function isOctalInt(a) {
                return OCTAL_REGEX.test(a);
            }

            types.int = function (a) {
                if (isNaN(a)) {
                    throw new Error("Attempting to convert a string that is not a number to type int.");
                }
                return parseInt(a, (isHexInt(a) && 16 || isOctalInt(a) && 8 || 10));
            };

            types.uint = function (a) {
                if (isNegative(a)) {
                    throw new Error("Attempting to convert a negative to a positive. Please enter positive number only for field type uint.");
                }
                return Math.abs(types.int(a));
            };

            types.float = function (a) {
                if (isNaN(a)) {
                    throw new Error("Attempting to convert a string that is not a number to type float.");
                }
                if (isSciNot(a)) {
                    var num       = a.toString().split('e'),
                        precision = Math.abs(num[1]) + num[0].split('.')[1].length;
                    return parseFloat(a).toFixed(precision);
                }
                return parseFloat(a);
            };

            types.number = function (a, fmt) {
                return (fmt === "currency") ? filter("currency")(types.float(a)) : filter("number")(types.float(a), fmt);
            };

            types.date = function (a, fmt) {
                return filter("date")(a, (fmt || "mediumDate"));
            };

            types.string = function (a, fmt) {
                switch (fmt) {
                    case "capitalize":
                        return (a.length) ? a[0].toUpperCase() + a.slice(1) : a;
                    case "title":
                        return a.split(/\s+/).map(function (c) { return types.string(c, "capitalize") }).join(' ');
                    case "uppercase":
                    case "lowercase":
                        return filter(fmt)(a);
                    default:
                        return a;
                }
            };

            return function (data, type, fmt) {
                if (!types.hasOwnProperty(type)) {
                    return data;
                }
                return types[type](data, fmt);
            };
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
                return (s == null || !regexp.emptyString.test(str));
            }

            /**
             * @param  {string} password
             * @return {number}
             */
            srvc.passwordStrength = function (password) {
                if (string.isEmptyStr(password) || password.length < 8) return 0;

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
                if(isNaN(num) || isNaN(digits)) throw new Error("Incorrect argument type(s).");
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
