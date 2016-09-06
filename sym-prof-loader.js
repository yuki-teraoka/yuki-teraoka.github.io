(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SymProfLoader"] = factory();
	else
		root["SymProfLoader"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/gab/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var SymProfLoader,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	SymProfLoader = (function() {
	  var extend, include;

	  window.__DEBUG__ = true;

	  extend = function(obj, mixin) {
	    var method, name;
	    for (name in mixin) {
	      method = mixin[name];
	      obj[name] = method;
	    }
	    return obj;
	  };

	  include = function(klass, mixin) {
	    return extend(klass.prototype, mixin);
	  };

	  SymProfLoader.init = function(options) {
	    if (__DEBUG__) {
	      console.log("INITIALIZING!!");
	    }
	    if (__DEBUG__) {
	      console.log(options);
	    }
	    return new SymProfLoader(options.attributes, options.providers);
	  };

	  function SymProfLoader(attributes, providerOptions) {
	    this.attributes = attributes;
	    this.providerOptions = providerOptions;
	    this.onProfileLoaded = bind(this.onProfileLoaded, this);
	    document.addEventListener('profileLoaded', this.onProfileLoaded);
	    this.initProviders();
	  }

	  SymProfLoader.prototype.onProfileLoaded = function(event) {
	    if (__DEBUG__) {
	      console.log(event);
	    }
	    return this.assignAttributes(event.profile);
	  };

	  SymProfLoader.prototype.assignAttributes = function(profile) {
	    var attrName, elem, ref, results, selector;
	    if (__DEBUG__) {
	      console.log(profile);
	    }
	    ref = this.attributes;
	    results = [];
	    for (selector in ref) {
	      attrName = ref[selector];
	      results.push((function() {
	        var i, len, ref1, results1;
	        ref1 = document.querySelectorAll(selector);
	        results1 = [];
	        for (i = 0, len = ref1.length; i < len; i++) {
	          elem = ref1[i];
	          results1.push(this.assignElementValue(elem, typeof profile[attrName] === "function" ? profile[attrName]() : void 0));
	        }
	        return results1;
	      }).call(this));
	    }
	    return results;
	  };

	  SymProfLoader.prototype.assignElementValue = function(elem, value) {
	    var i, len, option, ref, results, textNode;
	    switch (elem.tagName.toLowerCase()) {
	      case 'input':
	      case 'textarea':
	        if (value) {
	          return elem.value = value;
	        }
	        break;
	      case 'select':
	        ref = document.querySelectorAll(selector);
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          option = ref[i];
	          results.push(option.selected = value && value === option.value);
	        }
	        return results;
	        break;
	      case 'checkbox':
	        return elem.checked = value && value === elem.value;
	      default:
	        textNode = document.createTextNode(value);
	        while (elem.firstChild) {
	          elem.removeChild(elem.firstChild);
	        }
	        return elem.addChild(textNode);
	    }
	  };

	  SymProfLoader.prototype.initProviders = function() {
	    var attrName, attributeNames, providerConfig, providerName, selector;
	    attributeNames = (function() {
	      var ref, results;
	      ref = this.attributes;
	      results = [];
	      for (selector in ref) {
	        attrName = ref[selector];
	        results.push(attrName);
	      }
	      return results;
	    }).call(this);
	    return this.providers = (function() {
	      var ref, results;
	      ref = this.providerOptions;
	      results = [];
	      for (providerName in ref) {
	        providerConfig = ref[providerName];
	        results.push(this.initProvider(providerName, extend({
	          attributeNames: attributeNames
	        }, providerConfig)));
	      }
	      return results;
	    }).call(this);
	  };

	  SymProfLoader.prototype.initProvider = function(providerName, config) {
	    var providerClass;
	    if (__DEBUG__) {
	      console.log(providerName, config);
	    }
	    providerClass = (function() {
	      switch (providerName) {
	        case 'yconnect':
	          return __webpack_require__(2);
	        case 'google':
	          return __webpack_require__(10);
	        case 'facebook':
	          return __webpack_require__(11);
	        default:
	          return console.log("Unsupported Provider '" + providerName + "'");
	      }
	    })();
	    if (__DEBUG__) {
	      console.log("init provider");
	    }
	    return providerClass.load(config);
	  };

	  return SymProfLoader;

	})();

	module.exports = SymProfLoader;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {var YConnectProfileProvider,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	module.exports = YConnectProfileProvider = (function(superClass) {
	  var AUTHORIZATION_ENDPOINT, BUTTON_LIBRARY_URL, CHECK_TOKEN_ENDPOINT, REDIRECT_URI, USER_INFO_ENDPOINT, YConnectProfile, getJSON;

	  extend(YConnectProfileProvider, superClass);

	  BUTTON_LIBRARY_URL = 'https://s.yimg.jp/images/login/yconnect/button/1.0.1/button-min.js';

	  AUTHORIZATION_ENDPOINT = 'https://auth.login.yahoo.co.jp/yconnect/v1/authorization';

	  CHECK_TOKEN_ENDPOINT = 'https://auth.login.yahoo.co.jp/yconnect/v1/checktoken';

	  USER_INFO_ENDPOINT = 'https://dvrfk2yhj5.execute-api.ap-northeast-1.amazonaws.com/3_1/ycuinfo';

	  REDIRECT_URI = 'https://yuki-teraoka.github.io/cb.html';

	  YConnectProfileProvider.load = function(config) {
	    return new YConnectProfileProvider(config).initialize();
	  };

	  function YConnectProfileProvider(config1) {
	    this.config = config1;
	    this.initButton = bind(this.initButton, this);
	    this.onClientLoad = bind(this.onClientLoad, this);
	    this.updateSigninStatus = bind(this.updateSigninStatus, this);
	    this.onButtonClick = bind(this.onButtonClick, this);
	    this.validateToken = bind(this.validateToken, this);
	    this.parseToken = bind(this.parseToken, this);
	    this.onMessage = bind(this.onMessage, this);
	  }

	  getJSON = function(url, requestHeaders) {
	    if (requestHeaders == null) {
	      requestHeaders = {};
	    }
	    return new Promise(function(resolve, reject) {
	      var client, name, value;
	      client = new XMLHttpRequest();
	      client.open('GET', url);
	      client.onreadystatechange = function() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            return resolve(this.response);
	          } else {
	            return reject(this);
	          }
	        }
	      };
	      client.responseType = 'json';
	      client.setRequestHeader('Accept', 'application/json');
	      for (name in requestHeaders) {
	        value = requestHeaders[name];
	        client.setRequestHeader(name, value);
	      }
	      return client.send();
	    });
	  };

	  YConnectProfileProvider.prototype.onMessage = function(event) {
	    var data, idToken;
	    console.log(event);
	    if (event.origin !== 'https://yuki-teraoka.github.io') {
	      return;
	    }
	    data = event.data;
	    if (this.state !== data.state) {
	      return;
	    }
	    idToken = data.id_token;
	    return this.parseToken(idToken).then((function(_this) {
	      return function(params) {
	        return _this.getUserInfo(data.access_token);
	      };
	    })(this)).then(this.createProfile).then(this.profileLoaded);
	  };

	  YConnectProfileProvider.prototype.parseToken = function(idToken) {
	    return getJSON(CHECK_TOKEN_ENDPOINT + ("?id_token=" + idToken));
	  };

	  YConnectProfileProvider.prototype.validateToken = function(params) {
	    if (this.nonce !== params.nonce) {

	    }
	  };

	  YConnectProfileProvider.prototype.getUserInfo = function(accessToken) {
	    return getJSON(USER_INFO_ENDPOINT + "?schema=openid", {
	      Authorization: "Bearer " + accessToken
	    });
	  };

	  YConnectProfileProvider.prototype.initialize = function() {
	    this.loadYconnect();
	    window.addEventListener('message', this.onMessage);
	    return this;
	  };

	  YConnectProfileProvider.prototype.buildParams = function() {
	    this.state = Math.random().toString(36).slice(-8);
	    this.nonce = Math.random().toString(36).slice(-8);
	    return {
	      response_type: 'id_token token',
	      client_id: this.config.clientId,
	      redirect_uri: REDIRECT_URI,
	      state: this.state,
	      scope: this.scopes().join(' '),
	      nonce: this.nonce,
	      display: 'popup',
	      prompt: 'consent'
	    };
	  };

	  YConnectProfileProvider.prototype.onButtonClick = function(e) {
	    var height, key, left, params, top, url, value, width;
	    e.preventDefault();
	    width = 500;
	    height = 400;
	    params = this.buildParams();
	    url = AUTHORIZATION_ENDPOINT + "?" + ((function() {
	      var results;
	      results = [];
	      for (key in params) {
	        value = params[key];
	        results.push(key + '=' + encodeURIComponent(value));
	      }
	      return results;
	    })()).join('&');
	    left = (window.screen.availWidth - width) / 2;
	    top = (window.screen.availHeight - height) / 2;
	    window.open(url, 'yconnect', "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + ",menubar=yes,status=yes,scrollbars=yes");
	    return false;
	  };

	  YConnectProfileProvider.prototype.updateSigninStatus = function(isSignedIn) {
	    if (isSignedIn) {
	      return console.log("..");
	    }
	  };

	  YConnectProfileProvider.prototype.createProfile = function(attributes) {
	    return new YConnectProfile(attributes);
	  };

	  YConnectProfileProvider.prototype.loadYconnect = function() {
	    var ref;
	    if (typeof YAHOO !== "undefined" && YAHOO !== null ? (ref = YAHOO.JP) != null ? ref.yconnect : void 0 : void 0) {
	      return this.onClientLoad();
	    } else {
	      window.yconnectInit = this.onClientLoad;
	      return this.loadScript(BUTTON_LIBRARY_URL);
	    }
	  };

	  YConnectProfileProvider.prototype.onClientLoad = function() {
	    this.yconnect = YAHOO.JP.yconnect;
	    return this.initButton();
	  };

	  YConnectProfileProvider.prototype.initButton = function() {
	    var elem, i, len, ref, ref1, results;
	    this.yconnect.ImageButton.init(this.config.button);
	    ref1 = document.querySelectorAll('.' + (((ref = this.config.button) != null ? ref.className : void 0) || 'yconnectLogin'));
	    results = [];
	    for (i = 0, len = ref1.length; i < len; i++) {
	      elem = ref1[i];
	      results.push(elem.addEventListener('click', this.onButtonClick, false));
	    }
	    return results;
	  };

	  YConnectProfile = (function(superClass1) {
	    extend(YConnectProfile, superClass1);

	    function YConnectProfile() {
	      return YConnectProfile.__super__.constructor.apply(this, arguments);
	    }

	    return YConnectProfile;

	  })(__webpack_require__(8));

	  return YConnectProfileProvider;

	})(__webpack_require__(9));

	module.exports = YConnectProfileProvider;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(6);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;

	      var child = new this.constructor(lib$es6$promise$$internal$$noop);

	      if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
	        lib$es6$promise$$internal$$makePromise(child);
	      }

	      var state = parent._state;

	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }

	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    var lib$es6$promise$$internal$$id = 0;
	    function lib$es6$promise$$internal$$nextId() {
	      return lib$es6$promise$$internal$$id++;
	    }

	    function lib$es6$promise$$internal$$makePromise(promise) {
	      promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
	      promise._state = undefined;
	      promise._result = undefined;
	      promise._subscribers = [];
	    }

	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        return new Constructor(function(resolve, reject) {
	          reject(new TypeError('You must pass an array to race.'));
	        });
	      } else {
	        return new Constructor(function(resolve, reject) {
	          var length = entries.length;
	          for (var i = 0; i < length; i++) {
	            Constructor.resolve(entries[i]).then(resolve, reject);
	          }
	        });
	      }
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;


	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
	      this._result = this._state = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
	        lib$es6$promise$$internal$$makePromise(this.promise);
	      }

	      if (lib$es6$promise$utils$$isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;

	        this._result = new Array(this.length);

	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
	      }
	    }

	    function lib$es6$promise$enumerator$$validationError() {
	      return new Error('Array Methods must be provided an Array');
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;

	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;

	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);

	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }

	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(7)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);



	/*** EXPORTS FROM exports-loader ***/
	module.exports = global.Promise;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), (function() { return this; }()), __webpack_require__(5)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 8 */
/***/ function(module, exports) {

	var Profile;

	Profile = (function() {
	  var ATTRIBUTE_NAME_MAP, attrName, methodName;

	  ATTRIBUTE_NAME_MAP = {
	    givenName: 'given_name',
	    familyName: 'family_name',
	    email: 'email'
	  };

	  function Profile(attributes) {
	    this.attributes = attributes != null ? attributes : {};
	  }

	  Profile.prototype.fullName = function() {
	    return (familyName()) + " " + (givenName());
	  };

	  for (methodName in ATTRIBUTE_NAME_MAP) {
	    attrName = ATTRIBUTE_NAME_MAP[methodName];
	    Profile.prototype[methodName] = (function() {
	      var name;
	      name = attrName;
	      return function() {
	        return this.attributes[name];
	      };
	    })();
	  }

	  return Profile;

	})();

	module.exports = Profile;


/***/ },
/* 9 */
/***/ function(module, exports) {

	var ProfileProvider,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	ProfileProvider = (function() {
	  function ProfileProvider(config) {
	    this.config = config;
	    this.profileLoaded = bind(this.profileLoaded, this);
	  }

	  ProfileProvider.prototype.initButton = function(option) {
	    var elem, i, len, ref, results;
	    ref = document.querySelectorAll(option);
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      elem = ref[i];
	      elem.className.replace(/(?:^| ) *prof-button-loading *(?: |$)/, 'none');
	      if (elem.className) {
	        elem.className += ' ';
	      }
	      elem.className += 'prof-button-initialized';
	      results.push(elem.addEventListener('click', this.onButtonClick, false));
	    }
	    return results;
	  };

	  ProfileProvider.prototype.profileLoaded = function(profile) {
	    var event;
	    this.profile = profile;
	    event = document.createEvent('Event');
	    event.initEvent('profileLoaded', true, false);
	    event.profile = this.profile;
	    event.profileProvider = this;
	    return document.dispatchEvent(event);
	  };

	  ProfileProvider.prototype.scopes = function() {
	    return ['openid', 'profile', 'email'];
	  };

	  ProfileProvider.prototype.loadScript = function(url) {
	    var fs, script;
	    fs = document.getElementsByTagName('script')[0];
	    script = document.createElement('script');
	    script.setAttribute('src', url);
	    return fs.parentNode.insertBefore(script, fs);
	  };

	  return ProfileProvider;

	})();

	module.exports = ProfileProvider;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var GoogleProfileProvider,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	GoogleProfileProvider = (function(superClass) {
	  var BasicProfile, LIBRARY_URL;

	  extend(GoogleProfileProvider, superClass);

	  LIBRARY_URL = 'https://apis.google.com/js/api.js';

	  GoogleProfileProvider.load = function(config) {
	    return new GoogleProfileProvider(config).initialize();
	  };

	  function GoogleProfileProvider(config1) {
	    this.config = config1;
	    this.initAuth = bind(this.initAuth, this);
	    this.onClientLoad = bind(this.onClientLoad, this);
	    this.updateSigninStatus = bind(this.updateSigninStatus, this);
	    this.onButtonClick = bind(this.onButtonClick, this);
	  }

	  GoogleProfileProvider.prototype.initialize = function() {
	    this.loadGapi();
	    return this;
	  };

	  GoogleProfileProvider.prototype.onButtonClick = function() {
	    var authInstance;
	    authInstance = this.gapi.auth2.getAuthInstance();
	    return authInstance.signIn({
	      scope: this.scopes().join(' '),
	      prompt: 'select_account'
	    }).then((function(_this) {
	      return function() {
	        return _this.updateSigninStatus(authInstance.isSignedIn.get());
	      };
	    })(this));
	  };

	  GoogleProfileProvider.prototype.updateSigninStatus = function(isSignedIn) {
	    if (isSignedIn) {
	      return this.profileLoaded(this.createProfile());
	    }
	  };

	  GoogleProfileProvider.prototype.createProfile = function() {
	    var authInstance;
	    authInstance = this.gapi.auth2.getAuthInstance();
	    return new BasicProfile(authInstance.currentUser.get().getBasicProfile());
	  };

	  GoogleProfileProvider.prototype.loadGapi = function() {
	    if (window.gapi) {
	      return this.onClientLoad();
	    } else {
	      window.googleClientLoadHandler = this.onClientLoad;
	      return this.loadScript(LIBRARY_URL + "?onload=googleClientLoadHandler");
	    }
	  };

	  GoogleProfileProvider.prototype.onClientLoad = function() {
	    this.gapi = window.gapi;
	    return this.gapi.load('client:auth2', this.initAuth);
	  };

	  GoogleProfileProvider.prototype.initAuth = function() {
	    this.gapi.client.setApiKey(this.config.apiKey);
	    return this.gapi.auth2.init({
	      client_id: this.config.clientId,
	      scope: this.scopes().join(' ')
	    }).then((function(_this) {
	      return function() {
	        return _this.initButton(_this.config.button);
	      };
	    })(this));
	  };

	  BasicProfile = (function(superClass1) {
	    extend(BasicProfile, superClass1);

	    function BasicProfile(basicProfile) {
	      this.basicProfile = basicProfile;
	    }

	    BasicProfile.prototype.givenName = function() {
	      return this.basicProfile.getGivenName();
	    };

	    BasicProfile.prototype.familyName = function() {
	      return this.basicProfile.getFamilyName();
	    };

	    BasicProfile.prototype.email = function() {
	      return this.basicProfile.getEmail();
	    };

	    return BasicProfile;

	  })(__webpack_require__(8));

	  return GoogleProfileProvider;

	})(__webpack_require__(9));

	module.exports = GoogleProfileProvider;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {var FacebookProfileProvider,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	FacebookProfileProvider = (function(superClass) {
	  var FacebookProfile, LIBRARY_URL;

	  extend(FacebookProfileProvider, superClass);

	  LIBRARY_URL = 'https://connect.facebook.net/ja_JP/sdk.js';

	  FacebookProfileProvider.load = function(config) {
	    return new FacebookProfileProvider(config).initialize();
	  };

	  function FacebookProfileProvider(config1) {
	    this.config = config1;
	    this.initAuth = bind(this.initAuth, this);
	    this.onSdkLoad = bind(this.onSdkLoad, this);
	    this.loadSdk = bind(this.loadSdk, this);
	    this.loadProfile = bind(this.loadProfile, this);
	    this.updateSigninStatus = bind(this.updateSigninStatus, this);
	    this.onButtonClick = bind(this.onButtonClick, this);
	  }

	  FacebookProfileProvider.prototype.initialize = function() {
	    this.loadSdk();
	    return this;
	  };

	  FacebookProfileProvider.prototype.scopes = function() {
	    return ['public_profile', 'email'];
	  };

	  FacebookProfileProvider.prototype.onButtonClick = function(event) {
	    console.log(event);
	    return FB.login((function(_this) {
	      return function(response) {
	        if (response.authResponse) {
	          console.log(response.authResponse);
	          return _this.updateSigninStatus(response.authResponse);
	        }
	      };
	    })(this), {
	      scope: this.scopes().join(','),
	      enable_profile_selector: true
	    });
	  };

	  FacebookProfileProvider.prototype.updateSigninStatus = function(authResponse) {
	    if (authResponse) {
	      return this.loadProfile().then(this.profileLoaded);
	    }
	  };

	  FacebookProfileProvider.prototype.loadProfile = function() {
	    return new Promise((function(_this) {
	      return function(resolve, reject) {
	        return FB.api('/me', {
	          fields: 'last_name,first_name,email',
	          locale: 'ja_JP'
	        }, function(response) {
	          var profile;
	          profile = new FacebookProfile({
	            given_name: response.first_name,
	            family_name: response.last_name,
	            email: response.email
	          });
	          return resolve(profile);
	        });
	      };
	    })(this));
	  };

	  FacebookProfileProvider.prototype.loadSdk = function() {
	    return this.sdk = new Promise((function(_this) {
	      return function(resolve, reject) {
	        if (window.fbAsyncInit) {
	          _this.onSdkLoad();
	          return resolve(_this);
	        } else {
	          window.fbAsyncInit = function() {
	            _this.onSdkLoad();
	            return resolve(_this);
	          };
	          return _this.loadScript("" + LIBRARY_URL);
	        }
	      };
	    })(this));
	  };

	  FacebookProfileProvider.prototype.onSdkLoad = function() {
	    FB.init({
	      appId: this.config.appId,
	      cookie: true,
	      xfbml: false,
	      version: 'v2.7'
	    });
	    return this.initButton(this.config.button);
	  };

	  FacebookProfileProvider.prototype.initAuth = function() {
	    this.gapi.client.setApiKey(this.config.apiKey);
	    return this.gapi.auth2.init({
	      client_id: this.config.clientId,
	      scope: this.scopes().join(' ')
	    }).then((function(_this) {
	      return function() {
	        return _this.initButton(_this.config.button);
	      };
	    })(this));
	  };

	  FacebookProfile = (function(superClass1) {
	    extend(FacebookProfile, superClass1);

	    function FacebookProfile() {
	      return FacebookProfile.__super__.constructor.apply(this, arguments);
	    }

	    return FacebookProfile;

	  })(__webpack_require__(8));

	  return FacebookProfileProvider;

	})(__webpack_require__(9));

	module.exports = FacebookProfileProvider;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }
/******/ ])
});
;