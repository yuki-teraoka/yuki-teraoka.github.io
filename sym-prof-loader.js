(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SymProfileLoader"] = factory();
	else
		root["SymProfileLoader"] = factory();
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
	    return this.assignAttributes(event.profile);
	  };

	  SymProfLoader.prototype.assignAttributes = function(profile) {
	    var attrName, elem, ref, results, selector;
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
	          results1.push(assignElementValue(elem, typeof profile[attrName] === "function" ? profile[attrName]() : void 0));
	        }
	        return results1;
	      })());
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
	        case 'google':
	          return __webpack_require__(2);
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

	window.SymProfLoader = SymProfLoader;


/***/ },
/* 2 */
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
	    this.requestProfile = bind(this.requestProfile, this);
	  }

	  GoogleProfileProvider.prototype.initialize = function() {
	    this.loadGapi();
	    return this;
	  };

	  GoogleProfileProvider.prototype.requestProfile = function(event) {
	    this.gapi.auth2.signOut();
	    return this.gapi.auth2.signIn();
	  };

	  GoogleProfileProvider.prototype.updateSigninStatus = function(isSignedIn) {
	    if (isSignedIn) {
	      return this.profileLoaded(this.createProfile());
	    }
	  };

	  GoogleProfileProvider.prototype.createProfile = function() {
	    return new BasicProfile(auth2.currentUser.get().getBasicProfile());
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
	    this.initButton(this.config.button);
	    this.gapi.client.setApiKey(this.config.apiKey);
	    return this.gapi.auth2.init({
	      client_id: this.config.clientId,
	      scope: this.scopes().join(' ')
	    }).then((function(_this) {
	      return function() {
	        var auth2;
	        auth2 = _this.gapi.auth2.getAuthInstance();
	        auth2.isSignedIn.listen(_this.updateSigninStatus);
	        return _this.updateSigninStatus(auth2.isSignedIn.get());
	      };
	    })(this)).then(this.profileLoaded);
	  };

	  BasicProfile = (function(superClass1) {
	    extend(BasicProfile, superClass1);

	    function BasicProfile(basicProfile) {
	      this.basicProfile = basicProfile;
	    }

	    BasicProfile.prototype.givenName = function() {
	      return this.basicProfile.getGivenName();
	    };

	    BasicProfile.prototype.firstName = function() {
	      return this.basicProfile.getFirstName();
	    };

	    BasicProfile.prototype.email = function() {
	      return this.basicProfile.getEmail();
	    };

	    return BasicProfile;

	  })(__webpack_require__(3));

	  return GoogleProfileProvider;

	})(__webpack_require__(4));

	module.exports = GoogleProfileProvider;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Profile;

	Profile = (function() {
	  var ATTRIBUTE_NAMES, attrName, i, len;

	  ATTRIBUTE_NAMES = ['givenName', 'firstName', 'email'];

	  function Profile(attributs) {
	    this.attributs = attributs != null ? attributs : {};
	  }

	  Profile.prototype.fullName = function() {
	    return givenName + " " + firstName;
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

	var ProfileProvider;

	ProfileProvider = (function() {
	  function ProfileProvider(config) {
	    this.config = config;
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
	      results.push(elem.addEventListener('click', this.onButtonClick));
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
	    return ['profile', 'email'];
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


/***/ }
/******/ ])
});
;