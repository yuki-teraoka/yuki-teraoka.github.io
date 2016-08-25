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
/******/ 	__webpack_require__.p = "";

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
	          return __webpack_require__(5);
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

	var YConnectProfileProvider,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	YConnectProfileProvider = (function(superClass) {
	  var AUTHORIZATION_END_POINT, BUTTON_LIBRARY_URL, REDIRECT_URI, YConnectProfile;

	  extend(YConnectProfileProvider, superClass);

	  BUTTON_LIBRARY_URL = 'https://s.yimg.jp/images/login/yconnect/button/1.0.1/button-min.js';

	  AUTHORIZATION_END_POINT = 'https://auth.login.yahoo.co.jp/yconnect/v1/authorization';

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
	    window.addEventListener("message", function(res) {
	      return console.log(res);
	    });
	  }

	  YConnectProfileProvider.prototype.initialize = function() {
	    this.loadYconnect();
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
	    url = AUTHORIZATION_END_POINT + "?" + ((function() {
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

	  YConnectProfileProvider.prototype.createProfile = function() {};

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

	  })(__webpack_require__(3));

	  return YConnectProfileProvider;

	})(__webpack_require__(4));

	module.exports = YConnectProfileProvider;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Profile;

	Profile = (function() {
	  var ATTRIBUTE_NAMES, attrName, i, len;

	  ATTRIBUTE_NAMES = ['givenName', 'familyName', 'email'];

	  function Profile(attributs) {
	    this.attributs = attributs != null ? attributs : {};
	  }

	  Profile.prototype.fullName = function() {
	    return (familyName()) + " " + (givenName());
	  };

	  for (i = 0, len = ATTRIBUTE_NAMES.length; i < len; i++) {
	    attrName = ATTRIBUTE_NAMES[i];
	    Profile.prototype.attrName = (function() {
	      return this.attributes[attrName];
	    });
	  }

	  return Profile;

	})();

	module.exports = Profile;


/***/ },
/* 4 */
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
/* 5 */
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

	  })(__webpack_require__(3));

	  return GoogleProfileProvider;

	})(__webpack_require__(4));

	module.exports = GoogleProfileProvider;


/***/ }
/******/ ])
});
;