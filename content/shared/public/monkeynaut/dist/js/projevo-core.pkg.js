'use strict';
angular.module('evo.templates').
run(['$templateCache', function($templateCache) {
  $templateCache.put('client/about/about.html', '<div id="evo-about-container" ng-show="isOpen"> <div class="modal"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <img ng-src="{{ logo }}" ng-show="logo.length"> <h3>{{ "txtAbout" | i18n }}</h3> </div> <!-- /.modal-header --> <div class="modal-body"> <div class="evo-about-product"> <h4>{{ productTitle }}</h4> <ul> <li class="evo-about-version"> <label>{{ "lblProductVersion" | i18n }}:</label>&nbsp;{{ meta.build.app.version }} </li> <li class="evo-about-date"> <label>{{ "lblProductBuildDate" | i18n }}:</label>&nbsp;{{ meta.build.app.date | date: "longDate" }} </li> </ul> </div> <hr ckass="cai-background-color-primary"> <!-- /.evo-about-product --> <div class="evo-about-core"> <h4>Core</h4> <ul> <li class="evo-about-version"> <label>{{ "lblCoreLibraryVersion" | i18n }}:</label>&nbsp;{{ meta.build.core.version }} </li> <li class="evo-about-date"> <label>{{ "lblCoreLibraryBuildDate" | i18n }}:</label>&nbsp;{{ meta.build.core.date | date: "longDate" }} </li> </ul> </div> <!-- /.evo-about-core --> </div> <!-- /.modal-body --> <div class="modal-footer"> <button class="btn btn-primary evo-btn-primary" ng-click="closeModal()">{{ "txtClose" | i18n }}</button> </div> <!-- /.modal-footer --> </div> </div> </div> <!-- /.modal --> <div class="modal-backdrop"></div> </div> <!-- /#evo-about-modal -->');
}]);

angular.module("evo.api", [
               "evo.utils",
               "evo.user",
               "evo.client.config"]);

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



describe('apiProvider', function() {
    var assert = chai.assert,
        expect = chai.expect,
        should = chai.should();

    var svc,socket,mockSockService,mockSock,mockPromise = {},mockUtils,mockWin,mockLog,config,user,context;
    var $timeout, $rootScope;

    beforeEach(function() {
        user = {};
        context = {};
        context.company = 'unitest';
        config = {};
        config.get = sinon.stub();
        config.get.withArgs('socket_server').returns('https://192.168.0.0');
        config.get.withArgs('socket_port').returns(3004);
        config.get.withArgs('socket_timeout').returns(100);

        mockLog = {};
        mockLog.error = sinon.spy();
        mockLog.info = sinon.spy();
        mockLog.setTransports = sinon.stub();
        mockLog.resetTransports = sinon.stub();


        socket = function() {
            var self = this, callbacks = {}, callObjs = [];

            self.on = function(name, cb) {
                callbacks[name] = cb;
            }
            self.write = function(params) {
                callObjs.push(params);
            }
            self.simulateConnect = function() {
                callbacks['open']();
            };
            self.simulateMessage = function() {
                callObjs.forEach(function(ele, index, array) {
                    callbacks['data']({
                        id : callObjs[index].id,
                        name : callObjs[index].name,
                        timeout : callObjs[index].timeout,
                        result : "YES!"
                    });
                })
            };
            self.simulateEvent = function(evt, data) {
                callbacks['data']({event: evt, message: data});
            };
        };

        mockSock = new socket();

        mockWin = {};
        mockWin.Primus = {};
        mockWin.Primus.connect = sinon.stub().returns(mockSock);

        angular.module('apiProvider', ["evo.utils","evo.user","evo.client.config","evo.api", 'ngCookies'])
            .factory('evoConfig', function() {
                return config;
            })
            .factory('evoUser', function() {
                return {data: user, context: context};
            })
            .factory('$log', function() {
                return mockLog;
            })
            .factory('$window', function() {
                return mockWin;
            });
    });

    describe('interface', function() {
        beforeEach(function() {
            module('apiProvider');

            inject(function(evoAPI) {
                svc = evoAPI;
            });
        });

        it('should contain an service', function() {
            expect(svc).to.not.equal(null);
        });
        it('should contain a callFunction function', function() {
            svc.callFunction.should.exist;
        });
    });

    describe('configuration', function() {
        describe('options passed', function() {
            beforeEach(function() {
                module('apiProvider');

                inject(function(evoAPI) {
                    svc = evoAPI;
                });
            });
            it('should connect on the configured port', function() {
                mockWin.Primus.connect.should.have.been.calledOnce;
                //mockWin.Primus.connect.should.have.been.calledWith("https://192.168.0.0:3004");
                expect(mockWin.Primus.connect.getCall(0).args[0]).to.equal("https://192.168.0.0:3004");
            });
        });
    });

    describe('connection', function() {
        beforeEach(function() {
            module('apiProvider');

            inject(['$timeout', 'evoAPI', function(_$timeout, evoAPI) {
                $timeout = _$timeout;
                svc = evoAPI;
            }
            ]);
        });

        it('should log message if connection is successful', function() {
            mockSock.simulateConnect();
            mockLog.info.should.have.been.calledOnce;
            //mockLog.info.should.have.been.calledWith("Socket connection initialized.");
            expect(mockLog.info.getCall(0).args[0]).to.equal("Primus socket connection initialized.");
        });

        it('should timeout with error if connection fails', function() {
            $timeout.flush();
            mockLog.error.should.have.been.calledOnce;
            //mockLog.error.should.have.been.calledWith("Socket connection timed out.");
            expect(mockLog.error.getCall(0).args[0]).to.equal("Socket connection timed out.");
        });

        it('should cancel timeout if connection is successful', function() {
            mockSock.simulateConnect();
            try {
                $timeout.flush();
            } catch (e) {}
            mockLog.error.should.not.have.been.called;
        });

        it('should handle any calls made before the connection was made', function(done) {
            svc.callFunction("testMethod").should.eventually.have.property("name", "testMethod").notify(done);
            svc.callFunction("testMethod2").should.eventually.have.property("name", "testMethod2").notify(done);
            mockSock.simulateConnect();
            mockSock.simulateMessage();
            mockSock.simulateMessage();
        });
    });

    describe('callFunction', function() {

        beforeEach(function() {
            module('apiProvider');

            inject(['$timeout', '$rootScope', 'evoAPI', function(_$timeout, _$rootScope, evoAPI) {
                $timeout = _$timeout;
                $rootScope = _$rootScope;
                svc = evoAPI;
            }
            ]);
        });

        it('should resolve calls to callFunction with no params', function(done) {
            mockSock.simulateConnect();
            svc.callFunction("testMethod").should.eventually.have.property("name", "testMethod").notify(done);
            mockSock.simulateMessage();
        });
        it('should resolve calls to callFunction with params', function(done) {
            mockSock.simulateConnect();
            svc.callFunction("testMethod", {
                "test" : true
            }).should.eventually.have.property("name", "testMethod").notify(done);
            mockSock.simulateMessage();
        });
        it('should resolve multiple calls', function(done) {
            mockSock.simulateConnect();
            svc.callFunction("testMethod1", {
                "test" : true
            }).should.eventually.have.property("name", "testMethod1");
            svc.callFunction("testMethod2", {
                "test" : true
            }).should.eventually.have.property("name", "testMethod2");
            svc.callFunction("testMethod3", {
                "test" : true
            }).should.eventually.have.property("name", "testMethod3");
            svc.callFunction("testMethod4", {
                "test" : true
            }).should.eventually.have.property("name", "testMethod4").notify(done);
            mockSock.simulateMessage();
            mockSock.simulateMessage();
            mockSock.simulateMessage();
            mockSock.simulateMessage();
        });
        it('should reject calls that timeout', function(done) {
            mockSock.simulateConnect();
            svc.callFunction("testMethod", {
                "test" : true
            }).should.be.rejected.then(function() {
                    mockLog.error.should.have.been.calledOnce;
                    //mockLog.error.should.have.been.calledWith("Call timed out: ", "testMethod")
                    expect(mockLog.error.getCall(0).args[0]).to.equal("Call timed out: testMethod");
                }).should.notify(done);
            $timeout.flush();
        });
    });

    describe('on event', function() {
        var handler1, handler2;

        beforeEach(function() {
            module('apiProvider');
            inject(['$rootScope', 'evoAPI', function(_$rootScope, evoAPI) {
                $rootScope = _$rootScope;
                svc = evoAPI;
            }
            ]);

            handler1 = sinon.stub();
            handler2 = sinon.stub();
            $rootScope.$on('foo', handler1);
            $rootScope.$on('foo', handler2);
        });

        it('should resolve calls to event handlers', function() {
            mockSock.simulateConnect();
            mockSock.simulateEvent('foo', {bar: 1});

            handler1.should.have.been.calledOnce;
            var args = handler1.getCall(0).args;
            expect(args[1]).to.deep.equal({bar: 1});
            //handler1.should.have.been.calledWith(sinon.match.any, {bar: 1});

            handler2.should.have.been.calledOnce;
            args = handler2.getCall(0).args;
            expect(args[1]).to.deep.equal({bar: 1});
            //handler2.should.have.been.calledWith(sinon.match.any, {bar: 1});
        });
    });

});

angular.module("evo.client.about")
    .directive("evoAboutModal", [
        "evoAbout",
        function (about) {
            return {
                restrict: "E",
                templateUrl: "client/about/about.html",
                link: function (scope, elem, attrs) {
                    scope.productTitle = attrs.productTitle;
                    scope.logo         = attrs.logo;
                    scope.meta         = about.meta;

                    scope.closeModal = about.closeModal;

                    scope.$watch(function () { return about.isOpen }, function () { scope.isOpen = arguments[0] });
                }
            };
        }
    ]);

angular.module("evo.client.about", ["evo.client.config"]);

angular.module("evo.client.about")
    .service("evoAbout", [
        "$window",
        "evoConfig",
        function (win, config) {

            if (!win.moment) throw new Error("Missing third-party library 'Moment'.");

            var srvc = this;

            srvc.meta = config.get("meta", {});

            try {
                srvc.meta.build.core.date = moment(srvc.meta.build.core.date,'YYYY-MM-DD HH:mm:ss Z').toDate();
                srvc.meta.build.app.date  = moment(srvc.meta.build.app.date,'YYYY-MM-DD HH:mm:ss Z').toDate();
            } catch (err) { /* pass */ }

            srvc.openModal = function () {
                if (!srvc.isOpen) srvc.isOpen = !0;
            };

            srvc.closeModal = function () {
                if (srvc.isOpen) srvc.isOpen = 0;
            };
        }
    ]);



describe('caiAbout',function() {

    var expect=chai.expect;
    var element,
        $scope,
        template;
    var env={};

    beforeEach(function() {

        env.clientData={
            config: {
                'clientA': 'value_a',
                'clientB': ['value_b0','value_b1'],
                'clientC': {
                    d: 'value_d'
                },
                log: { transports: [] }
            },
            meta: {
                build: {
                    core: {
                        version: '0.1.27',
                        date: '2015-01-16 22:20:01 -02:00'
                    },
                    app: {
                        version: '0.0.1',
                        date: '2015-01-17 22:20:01 -02:00'
                    }
                },
                copyright: {
                    currentYear: new Date().getFullYear()
                }
            }
        };

        module('evo.client');
        module('evo.client.config');
        angular.module('core',['evo.utils','ngCookies'])
            .factory('$cookies',function() { return { clientData: btoa(JSON.stringify(env.clientData)) }; });
        module('core');
    });

    beforeEach(inject(function($templateCache,$compile,$rootScope) {
        $scope=$rootScope;
        element=angular.element("<evo-About-Modal data-ng-model='aboutModal'></evo-About-Modal>");
        $compile(element)($rootScope);
        angular.element(document.body).append(element);
        $scope.$digest();

    }));

    it('should return build app version',function() {
        expect(angular.element(document.querySelector('#txtAppVersion')).text()).to.equal("0.0.1");
    });

    it('should return build app date',function() {
        expect(angular.element(document.querySelector('#txtAppDate')).text()).to.equal("January 17, 2015");
    });

    it('should return build core version',function() {
        expect(angular.element(document.querySelector('#txtCoreVersion')).text()).to.equal("0.1.27");
    });

    it('should return build core date',function() {
        expect(angular.element(document.querySelector('#txtCoreDate')).text()).to.equal("January 16, 2015");
    });

    it('should return Copyright Current Year',function() {
        var currentYear = new Date().getFullYear().toString();
        expect(angular.element(document.querySelector('#txtCopyrightCurrentYear')).text()).to.equal(currentYear);
    });
});

angular.module("evo.client.browser", []);

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



describe('browser service', function() {
    var expect = chai.expect;

    beforeEach(function() {
        angular.module('browser', ['evo.client.browser', 'ngCookies']);
        module('browser');
    });


    function initNavigator(ua, ver, vendor, platform) {
        module(function($provide) {
            $provide.service('navigatorService', function() {
                return {
                    userAgent: ua,
                    appVersion: ver,
                    vendor: vendor,
                    platform: platform
                };
            });
        });
    }

    describe('chrome', function() {

        beforeEach(function() {
            initNavigator('blahblah-Chrome-blah', '23.10', 'google', 'linux');
        });

        it('should identify chrome', inject(function(evoBrowser) {
            expect(evoBrowser.browser).to.equal('Chrome');
        }));
    });

    describe('IE 9', function() {

        beforeEach(function() {
            initNavigator('blahblah-MSIE-blah', 'MSIE 9', 'microsoft', 'windows');
        });

        it('should identify IE 9', inject(function(evoBrowser) {
            expect(evoBrowser.browser).to.equal('Explorer');
            expect(evoBrowser.version).to.equal(9);
        }));
    });

    describe('IE 11', function() {

        beforeEach(function() {
            initNavigator('blahblah-MSIE-blah', 'MSIE 11', 'microsoft', 'windows');
        });

        it('should identify IE 9', inject(function(evoBrowser) {
            expect(evoBrowser.browser).to.equal('Explorer');
            expect(evoBrowser.version).to.equal(11);
        }));
    });

});

angular.module("evo.client", [
               "ngCookies",
               "evo.utils",
               "evo.client.browser",
               "evo.client.about"]);

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



describe('client service', function() {
    var expect = chai.expect;
    var env = {};

    beforeEach(function() {
        env.clientData = {
            config: {
                'clientA': 'value_a',
                'clientB': ['value_b0', 'value_b1'],
                'clientC': {
                    d: 'value_d'
                },
                log: { transports: [] }
            }
        };

        angular.module('core', ['evo.client', 'ngCookies'])
            .factory('$cookies', function() { return { clientData: btoa(JSON.stringify(env.clientData)) }; } );
        module('core');
    });

    it('should return server data', inject(function(evoClientData) {
        expect(evoClientData.config).to.eql(env.clientData.config);
    }));

    it('should provide btoa and atob functionality', inject(function(evoClientData) {
        var val1 = 'hello world', val2 = btoa(val1);
        expect(evoClientData.btoa(val1)).to.equal(val2);
        expect(evoClientData.atob(val2)).to.equal(val1);
    }));
});

angular.module("evo.client.config", []);

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



describe('configuration service', function() {
    beforeEach(function() {
        angular.module('config', ['evo.client', 'ngCookies'])
            .factory('evoClientData', function() {
                return {
                    config: {
                        'clientA': 'value_a',
                        'clientB': ['value_b0', 'value_b1'],
                        'clientC': {
                            d: 'value_d'
                        },
                        log: { transports: [] }
                    }
                };
            });
        module('config');
    });

    it('should return config values', inject(function(evoConfig) {
        expect(evoConfig.get('clientA')).to.equal('value_a');
        expect(evoConfig.get('clientB')).to.eql(['value_b0', 'value_b1']);
        expect(evoConfig.get('clientC')).to.eql({ d: 'value_d' });
    }));

    it('should return undefined for non-existant config values', inject(function(evoConfig) {
        expect(evoConfig.get('clientD')).not.to.be.defined;
    }));

});

angular.module("evo.locale", ["i18n"]);

angular.module("evo.templates", []);

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



describe('templates service', function() {
    var expect = chai.expect;
    var env = {};

    beforeEach(function() {
        angular.module('templates', ['evo.templates', 'ngCookies']);
        module('templates');

        env.templates = [
            {
                name: 'foo',
                content: 'label'
            },
            {
                name: 'bar',
                content: 'input'
            }
        ];
    });

    describe('cache populated', function() {

        beforeEach(inject(function($templateCache, evoTemplates) {
            env.templates.forEach(function(template) {
                $templateCache.put(template.name, 'before');
            });
            evoTemplates.cacheTemplates(env.templates);
        }));

        it('should not default any templates', inject(function($templateCache) {
            env.templates.forEach(function(template) {
                expect($templateCache.get(template.name)).to.equal('before');
            });
        }));
    });

    describe('cache not populated', function() {

        beforeEach(inject(function($templateCache, evoTemplates) {
            evoTemplates.cacheTemplates(env.templates);
        }));

        it('should default all templates', inject(function($templateCache) {
            env.templates.forEach(function(template) {
                expect($templateCache.get(template.name)).to.equal(template.content);
            });
        }));
    });

    describe('cache partially populated', function() {

        beforeEach(inject(function($templateCache, evoTemplates) {
            $templateCache.put(env.templates[1].name, 'before');
            evoTemplates.cacheTemplates(env.templates);
        }));

        it('should default one template', inject(function($templateCache) {
            expect($templateCache.get(env.templates[0].name)).to.equal(env.templates[0].content);
            expect($templateCache.get(env.templates[1].name)).to.equal('before');
        }));
    });

    describe('cache partially populated, no content', function() {

        beforeEach(inject(function($templateCache, evoTemplates) {
            $templateCache.put(env.templates[1].name, 'before');
            delete env.templates[0].content;
            delete env.templates[1].content;
            evoTemplates.cacheTemplates(env.templates);
        }));

        it('should default one template', inject(function($templateCache) {
            expect($templateCache.get(env.templates[0].name)).to.equal('');
            expect($templateCache.get(env.templates[1].name)).to.equal('before');
        }));
    });

    describe('cache partially populated, reference template', function() {

        beforeEach(inject(function($templateCache, evoTemplates) {
            $templateCache.put('fubar', 'foo bar');
            $templateCache.put(env.templates[1].name, 'before');
            delete env.templates[0].content;
            env.templates[0].reference = 'fubar';
            delete env.templates[1].content;
            evoTemplates.cacheTemplates(env.templates);
        }));

        it('should default one template', inject(function($templateCache) {
            expect($templateCache.get(env.templates[0].name)).to.equal('foo bar');
            expect($templateCache.get(env.templates[1].name)).to.equal('before');
        }));
    });

});

angular.module("evo.user", [
               "ngCookies",
               "evo.utils",
               "evo.user.validation"]);

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



describe('user data service', function() {
    var expect = chai.expect;

    describe('if user is logged in', function() {
        beforeEach(function() {

            var user = {
                user: {
                    'clientA': 'value_a',
                    'clientB': ['value_b0', 'value_b1'],
                    'clientC': {
                        d: 'value_d'
                    }
                }
            };

            var encodedUser = btoa(JSON.stringify(user));

            angular.module('user', ['evo.user', 'ngCookies'])
                .factory('$cookies', function() { return { userData: encodedUser }; } );

            module('evo.utils');
            module('user');
        });

        it('user object should be defined', inject(function(evoUser) {
            expect(evoUser.data).to.be.defined;
        }));

        it('should return user values', inject(function(evoUser) {
            expect(evoUser.data['clientA']).to.equal('value_a');
            expect(evoUser.data['clientB']).to.eql(['value_b0', 'value_b1']);
            expect(evoUser.data['clientC']).to.eql({ d: 'value_d' });
        }));

        it('user isLoggedIn should return true', inject(function(evoUser) {
            expect(evoUser.isLoggedIn).to.be.true;
        }));
    });

    describe('if user is not logged in', function() {
        beforeEach(function() {
            var encodedUser = btoa(JSON.stringify({user: null}));

            angular.module('user', ['evo.user', 'ngCookies'])
                .factory('$cookies', function() { return { userData: encodedUser }; } );

            module('evo.utils');
            module('user');
        });

        it('user isLoggedIn should return false', inject(function(evoUser) {
            expect(evoUser.isLoggedIn).to.be.false;
        }));
    });

});

angular.module("evo.user.validation", ["evo.utils"]);

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



describe('string validation service', function() {
    var expect = chai.expect;

    beforeEach(function() {
        angular.module('validation', ['evo.user.validation', 'ngCookies']);
        module('validation');
    });

    /*
    describe('containsLowerAlpha', function() {
        it('should return true if string contains a lower-case char', inject(function(evoValidation) {
            expect(evoValidation.containsLowerAlpha('a')).to.be.true;
            expect(evoValidation.containsLowerAlpha('ABcDE')).to.be.true;
            expect(evoValidation.containsLowerAlpha('123d5')).to.be.true;
        }));
        it('should return false if string does not contain a lower-case char', inject(function(evoValidation) {
            expect(evoValidation.containsLowerAlpha('A')).to.be.false;
            expect(evoValidation.containsLowerAlpha('ABCDE')).to.be.false;
            expect(evoValidation.containsLowerAlpha('12345')).to.be.false;
        }));
    });

    describe('containsUpperAlpha', function() {
        it('should return true if string contains an upper-case char', inject(function(evoValidation) {
            expect(evoValidation.containsUpperAlpha('A')).to.be.true;
            expect(evoValidation.containsUpperAlpha('abCde')).to.be.true;
            expect(evoValidation.containsUpperAlpha('123D5')).to.be.true;
        }));
        it('should return false if string does not contain an upper-case char', inject(function(evoValidation) {
            expect(evoValidation.containsUpperAlpha('a')).to.be.false;
            expect(evoValidation.containsUpperAlpha('abcde')).to.be.false;
            expect(evoValidation.containsUpperAlpha('12345')).to.be.false;
        }));
    });

    describe('containsDigit', function() {
        it('should return true if string contains a digit', inject(function(evoValidation) {
            expect(evoValidation.containsDigit('1')).to.be.true;
            expect(evoValidation.containsDigit('ab3de')).to.be.true;
            expect(evoValidation.containsDigit('ABC4E')).to.be.true;
        }));
        it('should return false if string does not contain a digit', inject(function(evoValidation) {
            expect(evoValidation.containsDigit('a')).to.be.false;
            expect(evoValidation.containsDigit('abcde')).to.be.false;
            expect(evoValidation.containsDigit('ABCDE')).to.be.false;
        }));
    });

    describe('containsSpecialChar', function() {
        it('should return true if string contains a special character', inject(function(evoValidation) {
            expect(evoValidation.containsSpecialChar('*')).to.be.true;
            expect(evoValidation.containsSpecialChar('ab$de')).to.be.true;
            expect(evoValidation.containsSpecialChar('ABC&E')).to.be.true;
        }));
        it('should return false if string does not contain a special character', inject(function(evoValidation) {
            expect(evoValidation.containsSpecialChar('a')).to.be.false;
            expect(evoValidation.containsSpecialChar('abcde')).to.be.false;
            expect(evoValidation.containsSpecialChar('ABCDE')).to.be.false;
        }));
    });
    */

    describe('passwordStrength', function() {
        it('should return 0 if string is unacceptable password', inject(function(evoValidation) {
            expect(evoValidation.passwordStrength('abcdefghi')).to.equal(0);
            expect(evoValidation.passwordStrength('abcd1234')).to.equal(0);
            expect(evoValidation.passwordStrength('abc123!')).to.equal(0);
        }));
        it('should return 1 if string is weak password', inject(function(evoValidation) {
            expect(evoValidation.passwordStrength('abcdefghijk')).to.equal(1);
            expect(evoValidation.passwordStrength('abcd1234567')).to.equal(1);
            expect(evoValidation.passwordStrength('abcd123!')).to.equal(1);
        }));
        it('should return 2 if string is moderate password', inject(function(evoValidation) {
            expect(evoValidation.passwordStrength('abcdefghijklmno')).to.equal(2);
            expect(evoValidation.passwordStrength('abcdefg12345678')).to.equal(2);
            expect(evoValidation.passwordStrength('abcdefg123456!')).to.equal(2);
        }));
        it('should return 3 if string is strong password', inject(function(evoValidation) {
            expect(evoValidation.passwordStrength('abcdefghijklmnopqrst')).to.equal(3);
            expect(evoValidation.passwordStrength('abcdefghij1234567890')).to.equal(3);
            expect(evoValidation.passwordStrength('abcdefg123456!#')).to.equal(3);
        }));
    });
});

angular.module("evo.utils", []);

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



describe('utilities', function () {

    var expect = chai.expect;
    var util = {};

    beforeEach(function () {
        angular.module('utilities', ['evo.utils', 'ngCookies'])
    });

    describe('roundNumber function', function () {

        beforeEach(function () {
            module('utilities');

            inject(['evoUtils', function (evoUtils) {
                util = evoUtils;
            } ]);

        });

        it('should return null when values isn�t numeric', inject(function () {
            expect(function() {util.roundNumber('a', 1);}).to.throw(Error);
        }));

        it('should return null when values is empty', inject(function () {
            expect(function() {util.roundNumber('', 1);}).to.throw(Error);
        }));

        it('should return null when values is undefined', inject(function () {
            expect(function() {util.roundNumber(undefined, 1);}).to.throw(Error);
        }));

        it('should return null when values is blank', inject(function () {
            expect(function() {util.roundNumber(' ', 1);}).to.throw(Error);
        }));

        it('should return the number rounded to one decimal place', inject(function () {
            expect(util.roundNumber(500.15, 1)).to.equal(500.2);
            expect(util.roundNumber(500.1599999, 1)).to.equal(500.2);

            expect(util.roundNumber(500.14, 1)).to.equal(500.1);
            expect(util.roundNumber(500.144444, 1)).to.equal(500.1);
            expect(util.roundNumber(500.149999, 1)).to.equal(500.1);
        }));

        it('should return the number rounded to two decimal place', inject(function () {
            expect(util.roundNumber(500.159, 2)).to.equal(500.16);
            expect(util.roundNumber(500.1599999, 2)).to.equal(500.16);

            expect(util.roundNumber(500.144, 2)).to.equal(500.14);
            expect(util.roundNumber(500.144444, 2)).to.equal(500.14);
            expect(util.roundNumber(500.149999, 2)).to.equal(500.15);
        }));

    });

});

angular.module("evo.utils.uuid", []);

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



describe('Testing client-side Service', function() {
    var expect = chai.expect;

    describe("GUID", function () {

        var guidService;
        beforeEach(function() {
            angular.module('guid', ['evo.utils.uuid', 'ngCookies']);
            module('guid');
            inject(function(evoUUID) {
                guidService = evoUUID;
            });
        });

        it('should inject a service for guid and guid should exist', function() {
            guidService.should.exist;
        });

        it('should have a function named uuid4', function(){
            guidService.uuid4.should.exist;
        });

        it('should call uuid4 and get a string of the desired length', function() {
            var id = guidService.uuid4();
            expect(id.length).to.equal(36);
        });

        it('should return a value type string', function() {
            var id = guidService.uuid4();
            expect(typeof id).to.equal('string');
        });

        it('should not return an undefined value for the guid', function () {
            expect(guidService.uuid4()).to.not.equal(undefined);
        });

        it('should not return duplicate guids', function() {
            var id1 = guidService.uuid4();
            var id2 = guidService.uuid4();
            expect(id1).to.not.equal(id2);
        });

    });

});


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
