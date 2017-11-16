/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 240);
/******/ })
/************************************************************************/
/******/ ({

/***/ 18:
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(241);

__webpack_require__(242);

__webpack_require__(243);

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
 */
(function (window, document) {
  /*jshint evil:true */
  /** version */
  var version = '3.7.3';

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

  /** Not all elements can be cloned in IE **/
  var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Name of the expando, to work with multiple documents or to re-shiv one document */
  var expando = '_html5shiv';

  /** The id for the the documents expando */
  var expanID = 0;

  /** Cached data for each document */
  var expandoData = {};

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;

  (function () {
    try {
      var a = document.createElement('a');
      a.innerHTML = '<xyz></xyz>';
      //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
      supportsHtml5Styles = 'hidden' in a;

      supportsUnknownElements = a.childNodes.length == 1 || function () {
        // assign a false positive if unable to shiv
        document.createElement('a');
        var frag = document.createDocumentFragment();
        return typeof frag.cloneNode == 'undefined' || typeof frag.createDocumentFragment == 'undefined' || typeof frag.createElement == 'undefined';
      }();
    } catch (e) {
      // assign a false positive if detection fails => unable to shiv
      supportsHtml5Styles = true;
      supportsUnknownElements = true;
    }
  })();

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

  /**
   * Extends the built-in list of html5 elements
   * @memberOf html5
   * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
   * @param {Document} ownerDocument The context document.
   */
  function addElements(newElements, ownerDocument) {
    var elements = html5.elements;
    if (typeof elements != 'string') {
      elements = elements.join(' ');
    }
    if (typeof newElements != 'string') {
      newElements = newElements.join(' ');
    }
    html5.elements = elements + ' ' + newElements;
    shivDocument(ownerDocument);
  }

  /**
   * Returns the data associated to the given document
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Object} An object of data.
   */
  function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]];
    if (!data) {
      data = {};
      expanID++;
      ownerDocument[expando] = expanID;
      expandoData[expanID] = data;
    }
    return data;
  }

  /**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document|DocumentFragment} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
  function createElement(nodeName, ownerDocument, data) {
    if (!ownerDocument) {
      ownerDocument = document;
    }
    if (supportsUnknownElements) {
      return ownerDocument.createElement(nodeName);
    }
    if (!data) {
      data = getExpandoData(ownerDocument);
    }
    var node;

    if (data.cache[nodeName]) {
      node = data.cache[nodeName].cloneNode();
    } else if (saveClones.test(nodeName)) {
      node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
    } else {
      node = data.createElem(nodeName);
    }

    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
  }

  /**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
  function createDocumentFragment(ownerDocument, data) {
    if (!ownerDocument) {
      ownerDocument = document;
    }
    if (supportsUnknownElements) {
      return ownerDocument.createDocumentFragment();
    }
    data = data || getExpandoData(ownerDocument);
    var clone = data.frag.cloneNode(),
        i = 0,
        elems = getElements(),
        l = elems.length;
    for (; i < l; i++) {
      clone.createElement(elems[i]);
    }
    return clone;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
  function shivMethods(ownerDocument, data) {
    if (!data.cache) {
      data.cache = {};
      data.createElem = ownerDocument.createElement;
      data.createFrag = ownerDocument.createDocumentFragment;
      data.frag = data.createFrag();
    }

    ownerDocument.createElement = function (nodeName) {
      //abort shiv
      if (!html5.shivMethods) {
        return data.createElem(nodeName);
      }
      return createElement(nodeName, ownerDocument, data);
    };

    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' + 'var n=f.cloneNode(),c=n.createElement;' + 'h.shivMethods&&(' +
    // unroll the `createElement` calls
    getElements().join().replace(/[\w\-:]+/g, function (nodeName) {
      data.createElem(nodeName);
      data.frag.createElement(nodeName);
      return 'c("' + nodeName + '")';
    }) + ');return n}')(html5, data.frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    if (!ownerDocument) {
      ownerDocument = document;
    }
    var data = getExpandoData(ownerDocument);

    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
      // corrects block display not defined in IE6/7/8/9
      'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
      // adds styling not present in IE6/7/8/9
      'mark{background:#FF0;color:#000}' +
      // hides non-rendered elements
      'template{display:none}');
    }
    if (!supportsUnknownElements) {
      shivMethods(ownerDocument, data);
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {
    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    elements: options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

    /**
     * current version of html5shiv
     */
    version: version,

    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    shivCSS: options.shivCSS !== false,

    /**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
    supportsUnknownElements: supportsUnknownElements,

    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    shivMethods: options.shivMethods !== false,

    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    type: 'default',

    // shivs the document according to the specified `html5` object options
    shivDocument: shivDocument,

    //creates a shived element
    createElement: createElement,

    //creates a shived documentFragment
    createDocumentFragment: createDocumentFragment,

    //extends list of elements
    addElements: addElements
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

  if (( false ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
    module.exports = html5;
  }
})(typeof window !== 'undefined' ? window : undefined, document);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)(module)))

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
css3-mediaqueries.js - CSS Helper and CSS3 Media Queries Enabler

author: Wouter van der Graaf <wouter at dynora nl>
version: 1.0 (20110330)
license: MIT
website: http://code.google.com/p/css3-mediaqueries-js/

W3C spec: http://www.w3.org/TR/css3-mediaqueries/

Note: use of embedded <style> is not recommended when using media queries, because IE  has no way of returning the raw literal css text from a <style> element.
*/

// true prototypal inheritance (http://javascript.crockford.com/prototypal.html)
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

// user agent sniffing shortcuts
var ua = {
  toString: function toString() {
    return navigator.userAgent;
  },
  test: function test(s) {
    return this.toString().toLowerCase().indexOf(s.toLowerCase()) > -1;
  }
};
ua.version = (ua.toString().toLowerCase().match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];
ua.webkit = ua.test('webkit');
ua.gecko = ua.test('gecko') && !ua.webkit;
ua.opera = ua.test('opera');
ua.ie = ua.test('msie') && !ua.opera;
ua.ie6 = ua.ie && document.compatMode && typeof document.documentElement.style.maxHeight === 'undefined';
ua.ie7 = ua.ie && document.documentElement && typeof document.documentElement.style.maxHeight !== 'undefined' && typeof XDomainRequest === 'undefined';
ua.ie8 = ua.ie && typeof XDomainRequest !== 'undefined';

// initialize when DOM content is loaded
var domReady = function () {
  var fns = [];
  var init = function init() {
    if (!arguments.callee.done) {
      // run init functions once
      arguments.callee.done = true;
      for (var i = 0; i < fns.length; i++) {
        fns[i]();
      }
    }
  };

  // listeners for different browsers
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', init, false);
  }
  if (ua.ie) {
    (function () {
      try {
        // throws errors until after ondocumentready
        document.documentElement.doScroll('left');

        // If we are in an iframe, the above does not work properly.
        // Trying to access the length attribute of document.body, however,
        // does throw an error until ondocumentready, fixing this issue.
        document.body.length;
      } catch (e) {
        setTimeout(arguments.callee, 50);
        return;
      }
      // no errors, fire
      init();
    })();
    // trying to always fire before onload
    document.onreadystatechange = function () {
      if (document.readyState === 'complete') {
        document.onreadystatechange = null;
        init();
      }
    };
  }
  if (ua.webkit && document.readyState) {
    (function () {
      if (document.readyState !== 'loading') {
        init();
      } else {
        setTimeout(arguments.callee, 10);
      }
    })();
  }
  window.onload = init; // fallback

  return function (fn) {
    // add fn to init functions
    if (typeof fn === 'function') {
      // If DOM ready has already been fired, fire the function
      // right away.
      if (init.done) {
        fn();
      } else {
        // Add to the queue
        fns[fns.length] = fn;
      }
    }
    return fn;
  };
}();

// helper library for parsing css to objects
var cssHelper = function () {
  var regExp = {
    BLOCKS: /[^\s{;][^{;]*\{(?:[^{}]*\{[^{}]*\}[^{}]*|[^{}]*)*\}/g,
    BLOCKS_INSIDE: /[^\s{][^{]*\{[^{}]*\}/g,
    DECLARATIONS: /[a-zA-Z\-]+[^;]*:[^;]+;/g,
    RELATIVE_URLS: /url\(['"]?([^\/\)'"][^:\)'"]+)['"]?\)/g,
    // strip whitespace and comments, @import is evil
    REDUNDANT_COMPONENTS: /(?:\/\*([^*\\\\]|\*(?!\/))+\*\/|@import[^;]+;|@-moz-document\s*url-prefix\(\)\s*{(([^{}])+{([^{}])+}([^{}])+)+})/g,
    REDUNDANT_WHITESPACE: /\s*(,|:|;|\{|\})\s*/g,
    WHITESPACE_IN_PARENTHESES: /\(\s*(\S*)\s*\)/g,
    MORE_WHITESPACE: /\s{2,}/g,
    FINAL_SEMICOLONS: /;\}/g,
    NOT_WHITESPACE: /\S+/g
  };

  var _parsed,
      parsing = false;

  var waiting = [];
  var wait = function wait(fn) {
    if (typeof fn === 'function') {
      waiting[waiting.length] = fn;
    }
  };
  var ready = function ready() {
    for (var i = 0; i < waiting.length; i++) {
      waiting[i](_parsed);
    }
  };
  var events = {};
  var broadcast = function broadcast(n, v) {
    if (events[n]) {
      var listeners = events[n].listeners;
      if (listeners) {
        for (var i = 0; i < listeners.length; i++) {
          listeners[i](v);
        }
      }
    }
  };

  var requestText = function requestText(url, fnSuccess, fnFailure) {
    if (ua.ie && !window.XMLHttpRequest) {
      window.XMLHttpRequest = function () {
        return new ActiveXObject('Microsoft.XMLHTTP');
      };
    }
    if (!XMLHttpRequest) {
      return '';
    }
    var r = new XMLHttpRequest();
    try {
      r.open('get', url, true);
      r.setRequestHeader('X_REQUESTED_WITH', 'XMLHttpRequest');
    } catch (e) {
      fnFailure();
      return;
    }
    var done = false;
    setTimeout(function () {
      done = true;
    }, 5000);
    document.documentElement.style.cursor = 'progress';
    r.onreadystatechange = function () {
      if (r.readyState === 4 && !done) {
        if (!r.status && location.protocol === 'file:' || r.status >= 200 && r.status < 300 || r.status === 304 || navigator.userAgent.indexOf('Safari') > -1 && typeof r.status === 'undefined') {
          fnSuccess(r.responseText);
        } else {
          fnFailure();
        }
        document.documentElement.style.cursor = '';
        r = null; // avoid memory leaks
      }
    };
    r.send('');
  };

  var sanitize = function sanitize(text) {
    text = text.replace(regExp.REDUNDANT_COMPONENTS, '');
    text = text.replace(regExp.REDUNDANT_WHITESPACE, '$1');
    text = text.replace(regExp.WHITESPACE_IN_PARENTHESES, '($1)');
    text = text.replace(regExp.MORE_WHITESPACE, ' ');
    text = text.replace(regExp.FINAL_SEMICOLONS, '}'); // optional final semicolons
    return text;
  };

  var objects = {
    stylesheet: function stylesheet(el) {
      var o = {};
      var amqs = [],
          mqls = [],
          rs = [],
          rsw = [];
      var s = el.cssHelperText;

      // add attribute media queries
      var attr = el.getAttribute('media');
      if (attr) {
        var qts = attr.toLowerCase().split(',');
      } else {
        var qts = ['all']; // imply 'all'
      }
      for (var i = 0; i < qts.length; i++) {
        amqs[amqs.length] = objects.mediaQuery(qts[i], o);
      }

      // add media query lists and rules (top down order)
      var blocks = s.match(regExp.BLOCKS); // @charset is not a block
      if (blocks !== null) {
        for (var i = 0; i < blocks.length; i++) {
          if (blocks[i].substring(0, 7) === '@media ') {
            // media query (list)
            var mql = objects.mediaQueryList(blocks[i], o);
            rs = rs.concat(mql.getRules());
            mqls[mqls.length] = mql;
          } else {
            // regular rule set, page context (@page) or font description (@font-face)
            rs[rs.length] = rsw[rsw.length] = objects.rule(blocks[i], o, null);
          }
        }
      }

      o.element = el;
      o.getCssText = function () {
        return s;
      };
      o.getAttrMediaQueries = function () {
        return amqs;
      };
      o.getMediaQueryLists = function () {
        return mqls;
      };
      o.getRules = function () {
        return rs;
      };
      o.getRulesWithoutMQ = function () {
        return rsw;
      };
      return o;
    },

    mediaQueryList: function mediaQueryList(s, stsh) {
      var o = {};
      var idx = s.indexOf('{');
      var lt = s.substring(0, idx);
      s = s.substring(idx + 1, s.length - 1);
      var mqs = [],
          rs = [];

      // add media queries
      var qts = lt.toLowerCase().substring(7).split(',');
      for (var i = 0; i < qts.length; i++) {
        // parse each media query
        mqs[mqs.length] = objects.mediaQuery(qts[i], o);
      }

      // add rule sets
      var rts = s.match(regExp.BLOCKS_INSIDE);
      if (rts !== null) {
        for (i = 0; i < rts.length; i++) {
          rs[rs.length] = objects.rule(rts[i], stsh, o);
        }
      }

      o.type = 'mediaQueryList';
      o.getMediaQueries = function () {
        return mqs;
      };
      o.getRules = function () {
        return rs;
      };
      o.getListText = function () {
        return lt;
      };
      o.getCssText = function () {
        return s;
      };
      return o;
    },

    mediaQuery: function mediaQuery(s, listOrSheet) {
      s = s || '';
      var mql, stsh;
      if (listOrSheet.type === 'mediaQueryList') {
        mql = listOrSheet;
      } else {
        stsh = listOrSheet;
      }
      var not = false,
          type;
      var expr = [];
      var valid = true;
      var tokens = s.match(regExp.NOT_WHITESPACE);

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (!type && (token === 'not' || token === 'only')) {
          // 'not' and 'only' keywords
          // keyword 'only' does nothing, as if it was not present
          if (token === 'not') {
            not = true;
          }
        } else if (!type) {
          // media type
          type = token;
        } else if (token.charAt(0) === '(') {
          // media feature expression
          var pair = token.substring(1, token.length - 1).split(':');
          expr[expr.length] = {
            mediaFeature: pair[0],
            value: pair[1] || null
          };
        }
      }

      return {
        getQueryText: function getQueryText() {
          return s;
        },
        getAttrStyleSheet: function getAttrStyleSheet() {
          return stsh || null;
        },
        getList: function getList() {
          return mql || null;
        },
        getValid: function getValid() {
          return valid;
        },
        getNot: function getNot() {
          return not;
        },
        getMediaType: function getMediaType() {
          return type;
        },
        getExpressions: function getExpressions() {
          return expr;
        }
      };
    },

    rule: function rule(s, stsh, mql) {
      var o = {};
      var idx = s.indexOf('{');
      var st = s.substring(0, idx);
      var ss = st.split(',');
      var ds = [];
      var dts = s.substring(idx + 1, s.length - 1).split(';');
      for (var i = 0; i < dts.length; i++) {
        ds[ds.length] = objects.declaration(dts[i], o);
      }

      o.getStylesheet = function () {
        return stsh || null;
      };
      o.getMediaQueryList = function () {
        return mql || null;
      };
      o.getSelectors = function () {
        return ss;
      };
      o.getSelectorText = function () {
        return st;
      };
      o.getDeclarations = function () {
        return ds;
      };
      o.getPropertyValue = function (n) {
        for (var i = 0; i < ds.length; i++) {
          if (ds[i].getProperty() === n) {
            return ds[i].getValue();
          }
        }
        return null;
      };
      return o;
    },

    declaration: function declaration(s, r) {
      var idx = s.indexOf(':');
      var p = s.substring(0, idx);
      var v = s.substring(idx + 1);
      return {
        getRule: function getRule() {
          return r || null;
        },
        getProperty: function getProperty() {
          return p;
        },
        getValue: function getValue() {
          return v;
        }
      };
    }
  };

  var parseText = function parseText(el) {
    if (typeof el.cssHelperText !== 'string') {
      return;
    }
    var o = {
      stylesheet: null,
      mediaQueryLists: [],
      rules: [],
      selectors: {},
      declarations: [],
      properties: {}
    };

    // build stylesheet object
    var stsh = o.stylesheet = objects.stylesheet(el);

    // collect media query lists
    var mqls = o.mediaQueryLists = stsh.getMediaQueryLists();

    // collect all rules
    var ors = o.rules = stsh.getRules();

    // collect all selectors
    var oss = o.selectors;
    var collectSelectors = function collectSelectors(r) {
      var ss = r.getSelectors();
      for (var i = 0; i < ss.length; i++) {
        var n = ss[i];
        if (!oss[n]) {
          oss[n] = [];
        }
        oss[n][oss[n].length] = r;
      }
    };
    for (i = 0; i < ors.length; i++) {
      collectSelectors(ors[i]);
    }

    // collect all declarations
    var ods = o.declarations;
    for (i = 0; i < ors.length; i++) {
      ods = o.declarations = ods.concat(ors[i].getDeclarations());
    }

    // collect all properties
    var ops = o.properties;
    for (i = 0; i < ods.length; i++) {
      var n = ods[i].getProperty();
      if (!ops[n]) {
        ops[n] = [];
      }
      ops[n][ops[n].length] = ods[i];
    }

    el.cssHelperParsed = o;
    _parsed[_parsed.length] = el;
    return o;
  };

  var parseEmbedded = function parseEmbedded(el, s) {
    return;
    // This function doesn't work because of a bug in IE, where innerHTML gives us parsed css instead of raw literal.
    el.cssHelperText = sanitize(s || el.innerHTML);
    return parseText(el);
  };

  var parse = function parse() {
    parsing = true;
    _parsed = [];
    var linked = [];
    var finish = function finish() {
      for (var i = 0; i < linked.length; i++) {
        parseText(linked[i]);
      }
      var styles = document.getElementsByTagName('style');
      for (i = 0; i < styles.length; i++) {
        parseEmbedded(styles[i]);
      }
      parsing = false;
      ready();
    };
    var links = document.getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (link.getAttribute('rel').indexOf('style') > -1 && link.href && link.href.length !== 0 && !link.disabled) {
        linked[linked.length] = link;
      }
    }
    if (linked.length > 0) {
      var c = 0;
      var checkForFinish = function checkForFinish() {
        c++;
        if (c === linked.length) {
          // parse in right order, so after last link is read
          finish();
        }
      };
      var processLink = function processLink(link) {
        var href = link.href;
        requestText(href, function (text) {
          // fix url's
          text = sanitize(text).replace(regExp.RELATIVE_URLS, 'url(' + href.substring(0, href.lastIndexOf('/')) + '/$1)');
          link.cssHelperText = text;
          checkForFinish();
        }, checkForFinish);
      };
      for (i = 0; i < linked.length; i++) {
        processLink(linked[i]);
      }
    } else {
      finish();
    }
  };

  var types = {
    stylesheets: 'array',
    mediaQueryLists: 'array',
    rules: 'array',
    selectors: 'object',
    declarations: 'array',
    properties: 'object'
  };

  var collections = {
    stylesheets: null,
    mediaQueryLists: null,
    rules: null,
    selectors: null,
    declarations: null,
    properties: null
  };

  var addToCollection = function addToCollection(name, v) {
    if (collections[name] !== null) {
      if (types[name] === 'array') {
        return collections[name] = collections[name].concat(v);
      } else {
        var c = collections[name];
        for (var n in v) {
          if (v.hasOwnProperty(n)) {
            if (!c[n]) {
              c[n] = v[n];
            } else {
              c[n] = c[n].concat(v[n]);
            }
          }
        }
        return c;
      }
    }
  };

  var collect = function collect(name) {
    collections[name] = types[name] === 'array' ? [] : {};
    for (var i = 0; i < _parsed.length; i++) {
      var pname = name === 'stylesheets' ? 'stylesheet' : name; // the exception
      addToCollection(name, _parsed[i].cssHelperParsed[pname]);
    }
    return collections[name];
  };

  // viewport size
  var getViewportSize = function getViewportSize(d) {
    if (typeof window.innerWidth != 'undefined') {
      return window['inner' + d];
    } else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth != 0) {
      return document.documentElement['client' + d];
    }
  };

  // public static functions
  return {
    addStyle: function addStyle(s, mediaTypes, process) {
      var el;
      var styleElId = 'css-mediaqueries-js';
      var styleMedia = '';

      var styleEl = document.getElementById(styleElId);

      if (mediaTypes && mediaTypes.length > 0) {
        styleMedia = mediaTypes.join(',');
        styleElId += styleMedia;
      }

      if (null !== styleEl) {
        el = styleEl;
      } else {
        el = document.createElement('style');
        el.setAttribute('type', 'text/css');
        el.setAttribute('id', styleElId);
        el.setAttribute('media', styleMedia);
        document.getElementsByTagName('head')[0].appendChild(el);
      }

      if (el.styleSheet) {
        // IE
        el.styleSheet.cssText += s;
      } else {
        el.appendChild(document.createTextNode(s));
      }

      el.addedWithCssHelper = true;

      if (typeof process === 'undefined' || process === true) {
        cssHelper.parsed(function (parsed) {
          var o = parseEmbedded(el, s);
          for (var n in o) {
            if (o.hasOwnProperty(n)) {
              addToCollection(n, o[n]);
            }
          }
          broadcast('newStyleParsed', el);
        });
      } else {
        el.parsingDisallowed = true;
      }
      return el;
    },

    removeStyle: function removeStyle(el) {
      if (el.parentNode) return el.parentNode.removeChild(el);
    },

    parsed: function parsed(fn) {
      if (parsing) {
        wait(fn);
      } else {
        if (typeof _parsed !== 'undefined') {
          if (typeof fn === 'function') {
            fn(_parsed);
          }
        } else {
          wait(fn);
          parse();
        }
      }
    },

    stylesheets: function stylesheets(fn) {
      cssHelper.parsed(function (parsed) {
        fn(collections.stylesheets || collect('stylesheets'));
      });
    },

    mediaQueryLists: function mediaQueryLists(fn) {
      cssHelper.parsed(function (parsed) {
        fn(collections.mediaQueryLists || collect('mediaQueryLists'));
      });
    },

    rules: function rules(fn) {
      cssHelper.parsed(function (parsed) {
        fn(collections.rules || collect('rules'));
      });
    },

    selectors: function selectors(fn) {
      cssHelper.parsed(function (parsed) {
        fn(collections.selectors || collect('selectors'));
      });
    },

    declarations: function declarations(fn) {
      cssHelper.parsed(function (parsed) {
        fn(collections.declarations || collect('declarations'));
      });
    },

    properties: function properties(fn) {
      cssHelper.parsed(function (parsed) {
        fn(collections.properties || collect('properties'));
      });
    },

    broadcast: broadcast,

    addListener: function addListener(n, fn) {
      // in case n is 'styleadd': added function is called everytime style is added and parsed
      if (typeof fn === 'function') {
        if (!events[n]) {
          events[n] = {
            listeners: []
          };
        }
        events[n].listeners[events[n].listeners.length] = fn;
      }
    },

    removeListener: function removeListener(n, fn) {
      if (typeof fn === 'function' && events[n]) {
        var ls = events[n].listeners;
        for (var i = 0; i < ls.length; i++) {
          if (ls[i] === fn) {
            ls.splice(i, 1);
            i -= 1;
          }
        }
      }
    },

    getViewportWidth: function getViewportWidth() {
      return getViewportSize('Width');
    },

    getViewportHeight: function getViewportHeight() {
      return getViewportSize('Height');
    }
  };
}();

// function to test and apply parsed media queries against browser capabilities
domReady(function enableCssMediaQueries() {
  var meter;

  var regExp = {
    LENGTH_UNIT: /[0-9]+(em|ex|px|in|cm|mm|pt|pc)$/,
    RESOLUTION_UNIT: /[0-9]+(dpi|dpcm)$/,
    ASPECT_RATIO: /^[0-9]+\/[0-9]+$/,
    ABSOLUTE_VALUE: /^[0-9]*(\.[0-9]+)*$/
  };

  var styles = [];

  var _nativeSupport = function nativeSupport() {
    // check support for media queries
    var id = 'css3-mediaqueries-test';
    var el = document.createElement('div');
    el.id = id;
    var style = cssHelper.addStyle('@media all and (width) { #' + id + ' { width: 1px !important; } }', [], false); // false means don't parse this temp style
    document.body.appendChild(el);
    var ret = el.offsetWidth === 1;
    style.parentNode.removeChild(style);
    el.parentNode.removeChild(el);
    _nativeSupport = function nativeSupport() {
      return ret;
    };
    return ret;
  };

  var createMeter = function createMeter() {
    // create measuring element
    meter = document.createElement('div');
    meter.style.cssText = 'position:absolute;top:-9999em;left:-9999em;' + 'margin:0;border:none;padding:0;width:1em;font-size:1em;'; // cssText is needed for IE, works for the others
    document.body.appendChild(meter);
    // meter must have browser default font size of 16px
    if (meter.offsetWidth !== 16) {
      meter.style.fontSize = 16 / meter.offsetWidth + 'em';
    }
    meter.style.width = '';
  };

  var measure = function measure(value) {
    meter.style.width = value;
    var amount = meter.offsetWidth;
    meter.style.width = '';
    return amount;
  };

  var testMediaFeature = function testMediaFeature(feature, value) {
    // non-testable features: monochrome|min-monochrome|max-monochrome|scan|grid
    var l = feature.length;
    var min = feature.substring(0, 4) === 'min-';
    var max = !min && feature.substring(0, 4) === 'max-';

    if (value !== null) {
      // determine value type and parse to usable amount
      var valueType;
      var amount;
      if (regExp.LENGTH_UNIT.exec(value)) {
        valueType = 'length';
        amount = measure(value);
      } else if (regExp.RESOLUTION_UNIT.exec(value)) {
        valueType = 'resolution';
        amount = parseInt(value, 10);
        var unit = value.substring((amount + '').length);
      } else if (regExp.ASPECT_RATIO.exec(value)) {
        valueType = 'aspect-ratio';
        amount = value.split('/');
      } else if (regExp.ABSOLUTE_VALUE) {
        valueType = 'absolute';
        amount = value;
      } else {
        valueType = 'unknown';
      }
    }

    var width, height;
    if ('device-width' === feature.substring(l - 12, l)) {
      // screen width
      width = screen.width;
      if (value !== null) {
        if (valueType === 'length') {
          return min && width >= amount || max && width < amount || !min && !max && width === amount;
        } else {
          return false;
        }
      } else {
        // test width without value
        return width > 0;
      }
    } else if ('device-height' === feature.substring(l - 13, l)) {
      // screen height
      height = screen.height;
      if (value !== null) {
        if (valueType === 'length') {
          return min && height >= amount || max && height < amount || !min && !max && height === amount;
        } else {
          return false;
        }
      } else {
        // test height without value
        return height > 0;
      }
    } else if ('width' === feature.substring(l - 5, l)) {
      // viewport width
      width = document.documentElement.clientWidth || document.body.clientWidth; // the latter for IE quirks mode
      if (value !== null) {
        if (valueType === 'length') {
          return min && width >= amount || max && width < amount || !min && !max && width === amount;
        } else {
          return false;
        }
      } else {
        // test width without value
        return width > 0;
      }
    } else if ('height' === feature.substring(l - 6, l)) {
      // viewport height
      height = document.documentElement.clientHeight || document.body.clientHeight; // the latter for IE quirks mode
      if (value !== null) {
        if (valueType === 'length') {
          return min && height >= amount || max && height < amount || !min && !max && height === amount;
        } else {
          return false;
        }
      } else {
        // test height without value
        return height > 0;
      }
    } else if ('orientation' === feature.substring(l - 11, l)) {
      // orientation

      width = document.documentElement.clientWidth || document.body.clientWidth; // the latter for IE quirks mode
      height = document.documentElement.clientHeight || document.body.clientHeight; // the latter for IE quirks mode

      if (valueType === 'absolute') {
        return amount === 'portrait' ? width <= height : width > height;
      } else {
        return false;
      }
    } else if ('aspect-ratio' === feature.substring(l - 12, l)) {
      // window aspect ratio
      width = document.documentElement.clientWidth || document.body.clientWidth; // the latter for IE quirks mode
      height = document.documentElement.clientHeight || document.body.clientHeight; // the latter for IE quirks mode

      var curRatio = width / height;
      var ratio = amount[1] / amount[0];

      if (valueType === 'aspect-ratio') {
        return min && curRatio >= ratio || max && curRatio < ratio || !min && !max && curRatio === ratio;
      } else {
        return false;
      }
    } else if ('device-aspect-ratio' === feature.substring(l - 19, l)) {
      // screen aspect ratio
      return valueType === 'aspect-ratio' && screen.width * amount[1] === screen.height * amount[0];
    } else if ('color-index' === feature.substring(l - 11, l)) {
      // number of colors
      var colors = Math.pow(2, screen.colorDepth);
      if (value !== null) {
        if (valueType === 'absolute') {
          return min && colors >= amount || max && colors < amount || !min && !max && colors === amount;
        } else {
          return false;
        }
      } else {
        // test height without value
        return colors > 0;
      }
    } else if ('color' === feature.substring(l - 5, l)) {
      // bits per color component
      var color = screen.colorDepth;
      if (value !== null) {
        if (valueType === 'absolute') {
          return min && color >= amount || max && color < amount || !min && !max && color === amount;
        } else {
          return false;
        }
      } else {
        // test height without value
        return color > 0;
      }
    } else if ('resolution' === feature.substring(l - 10, l)) {
      var res;
      if (unit === 'dpcm') {
        res = measure('1cm');
      } else {
        res = measure('1in');
      }
      if (value !== null) {
        if (valueType === 'resolution') {
          return min && res >= amount || max && res < amount || !min && !max && res === amount;
        } else {
          return false;
        }
      } else {
        // test height without value
        return res > 0;
      }
    } else {
      return false;
    }
  };

  var testMediaQuery = function testMediaQuery(mq) {
    var test = mq.getValid();
    var expressions = mq.getExpressions();
    var l = expressions.length;
    if (l > 0) {
      for (var i = 0; i < l && test; i++) {
        test = testMediaFeature(expressions[i].mediaFeature, expressions[i].value);
      }
      var not = mq.getNot();
      return test && !not || not && !test;
    }
    return test;
  };

  var testMediaQueryList = function testMediaQueryList(mql, ts) {
    // ts is null or an array with any media type but 'all'.
    var mqs = mql.getMediaQueries();
    var t = {};
    for (var i = 0; i < mqs.length; i++) {
      var type = mqs[i].getMediaType();
      if (mqs[i].getExpressions().length === 0) {
        continue;
        // TODO: Browser check! Assuming old browsers do apply the bare media types, even in a list with media queries.
      }
      var typeAllowed = true;
      if (type !== 'all' && ts && ts.length > 0) {
        typeAllowed = false;
        for (var j = 0; j < ts.length; j++) {
          if (ts[j] === type) {
            typeAllowed = true;
          }
        }
      }
      if (typeAllowed && testMediaQuery(mqs[i])) {
        t[type] = true;
      }
    }
    var s = [],
        c = 0;
    for (var n in t) {
      if (t.hasOwnProperty(n)) {
        if (c > 0) {
          s[c++] = ',';
        }
        s[c++] = n;
      }
    }
    if (s.length > 0) {
      styles[styles.length] = cssHelper.addStyle('@media ' + s.join('') + '{' + mql.getCssText() + '}', ts, false);
    }
  };

  var testMediaQueryLists = function testMediaQueryLists(mqls, ts) {
    for (var i = 0; i < mqls.length; i++) {
      testMediaQueryList(mqls[i], ts);
    }
  };

  var testStylesheet = function testStylesheet(stsh) {
    var amqs = stsh.getAttrMediaQueries();
    var allPassed = false;
    var t = {};
    for (var i = 0; i < amqs.length; i++) {
      if (testMediaQuery(amqs[i])) {
        t[amqs[i].getMediaType()] = amqs[i].getExpressions().length > 0;
      }
    }
    var ts = [],
        tswe = [];
    for (var n in t) {
      if (t.hasOwnProperty(n)) {
        ts[ts.length] = n;
        if (t[n]) {
          tswe[tswe.length] = n;
        }
        if (n === 'all') {
          allPassed = true;
        }
      }
    }
    if (tswe.length > 0) {
      // types with query expressions that passed the test
      styles[styles.length] = cssHelper.addStyle(stsh.getCssText(), tswe, false);
    }
    var mqls = stsh.getMediaQueryLists();
    if (allPassed) {
      // If 'all' in media attribute passed the test, then test all @media types in linked CSS and create style with those types.
      testMediaQueryLists(mqls);
    } else {
      // Or else, test only media attribute types that passed the test and also 'all'.
      // For positive '@media all', create style with attribute types that passed their test.
      testMediaQueryLists(mqls, ts);
    }
  };

  var testStylesheets = function testStylesheets(stshs) {
    for (var i = 0; i < stshs.length; i++) {
      testStylesheet(stshs[i]);
    }
    if (ua.ie) {
      // force repaint in IE
      document.documentElement.style.display = 'block';
      setTimeout(function () {
        document.documentElement.style.display = '';
      }, 0);
      // delay broadcast somewhat for IE
      setTimeout(function () {
        cssHelper.broadcast('cssMediaQueriesTested');
      }, 100);
    } else {
      cssHelper.broadcast('cssMediaQueriesTested');
    }
  };

  var test = function test() {
    for (var i = 0; i < styles.length; i++) {
      cssHelper.removeStyle(styles[i]);
    }
    styles = [];
    cssHelper.stylesheets(testStylesheets);
  };

  var scrollbarWidth = 0;
  var checkForResize = function checkForResize() {
    var cvpw = cssHelper.getViewportWidth();
    var cvph = cssHelper.getViewportHeight();

    // determine scrollbar width in IE, see resizeHandler
    if (ua.ie) {
      var el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.top = '-9999em';
      el.style.overflow = 'scroll';
      document.body.appendChild(el);
      scrollbarWidth = el.offsetWidth - el.clientWidth;
      document.body.removeChild(el);
    }

    var timer;
    var resizeHandler = function resizeHandler() {
      var vpw = cssHelper.getViewportWidth();
      var vph = cssHelper.getViewportHeight();
      // check whether vp size has really changed, because IE also triggers resize event when body size changes
      // 20px allowance to accomodate short appearance of scrollbars in IE in some cases
      if (Math.abs(vpw - cvpw) > scrollbarWidth || Math.abs(vph - cvph) > scrollbarWidth) {
        cvpw = vpw;
        cvph = vph;
        clearTimeout(timer);
        timer = setTimeout(function () {
          if (!_nativeSupport()) {
            test();
          } else {
            cssHelper.broadcast('cssMediaQueriesTested');
          }
        }, 500);
      }
    };

    window.onresize = function () {
      var x = window.onresize || function () {}; // save original
      return function () {
        x();
        resizeHandler();
      };
    }();
  };

  // prevent jumping of layout by hiding everything before painting <body>
  var docEl = document.documentElement;
  docEl.style.marginLeft = '-32767px';

  // make sure it comes back after a while
  setTimeout(function () {
    docEl.style.marginLeft = '';
  }, 5000);

  return function () {
    if (!_nativeSupport()) {
      // if browser doesn't support media queries
      cssHelper.addListener('newStyleParsed', function (el) {
        testStylesheet(el.cssHelperParsed.stylesheet);
      });
      // return visibility after media queries are tested
      cssHelper.addListener('cssMediaQueriesTested', function () {
        // force repaint in IE by changing width
        if (ua.ie) {
          docEl.style.width = '1px';
        }
        setTimeout(function () {
          docEl.style.width = ''; // undo width
          docEl.style.marginLeft = ''; // undo hide
        }, 0);
        // remove this listener to prevent following execution
        cssHelper.removeListener('cssMediaQueriesTested', arguments.callee);
      });
      createMeter();
      test();
    } else {
      docEl.style.marginLeft = ''; // undo visibility hidden
    }
    checkForResize();
  };
}());

// bonus: hotfix for IE6 SP1 (bug KB823727)
try {
  document.execCommand('BackgroundImageCache', false, true);
} catch (e) {}

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
    json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
  JSON = {};
}

(function () {
  'use strict';

  function f(n) {
    // Format integers to have at least two digits.
    return n < 10 ? '0' + n : n;
  }

  if (typeof Date.prototype.toJSON !== 'function') {
    Date.prototype.toJSON = function (key) {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
    };

    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
      return this.valueOf();
    };
  }

  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
    // table of character substitutions
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '\\"',
    '\\': '\\\\'
  },
      rep;

  function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
      var c = meta[a];
      return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
  }

  function str(key, holder) {
    // Produce a string from holder[key].

    var i,
        // The loop counter.
    k,
        // The member key.
    v,
        // The member value.
    length,
        mind = gap,
        partial,
        value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.

    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.

    if (typeof rep === 'function') {
      value = rep.call(holder, key, value);
    }

    // What happens next depends on the value's type.

    switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
      case 'string':
        return quote(value);

      case 'number':
        // JSON numbers must be finite. Encode non-finite numbers as null.

        return isFinite(value) ? String(value) : 'null';

      case 'boolean':
      case 'null':
        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce 'null'. The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

      // If the type is 'object', we might be dealing with an object or an array or
      // null.

      case 'object':
        // Due to a specification blunder in ECMAScript, typeof null is 'object',
        // so watch out for that case.

        if (!value) {
          return 'null';
        }

        // Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        partial = [];

        // Is the value an array?

        if (Object.prototype.toString.apply(value) === '[object Array]') {
          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || 'null';
          }

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.

          v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
          gap = mind;
          return v;
        }

        // If the replacer is an array, use it to select the members to be stringified.

        if (rep && (typeof rep === 'undefined' ? 'undefined' : _typeof(rep)) === 'object') {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === 'string') {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        } else {
          // Otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
  }

  // If the JSON object does not yet have a stringify method, give it one.

  if (typeof JSON.stringify !== 'function') {
    JSON.stringify = function (value, replacer, space) {
      // The stringify method takes a value and an optional replacer, and an optional
      // space parameter, and returns a JSON text. The replacer can be a function
      // that can replace values, or an array of strings that will select the keys.
      // A default replacer method can be provided. Use of the space parameter can
      // produce text that is more easily readable.

      var i;
      gap = '';
      indent = '';

      // If the space parameter is a number, make an indent string containing that
      // many spaces.

      if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
          indent += ' ';
        }

        // If the space parameter is a string, it will be used as the indent string.
      } else if (typeof space === 'string') {
        indent = space;
      }

      // If there is a replacer, it must be a function or an array.
      // Otherwise, throw an error.

      rep = replacer;
      if (replacer && typeof replacer !== 'function' && ((typeof replacer === 'undefined' ? 'undefined' : _typeof(replacer)) !== 'object' || typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
      }

      // Make a fake root object containing our value under the key of ''.
      // Return the result of stringifying the value.

      return str('', { '': value });
    };
  }

  // If the JSON object does not yet have a parse method, give it one.

  if (typeof JSON.parse !== 'function') {
    JSON.parse = function (text, reviver) {
      // The parse method takes a text and an optional reviver function, and returns
      // a JavaScript value if the text is a valid JSON text.

      var j;

      function walk(holder, key) {
        // The walk method is used to recursively walk the resulting structure so
        // that modifications can be made.

        var k,
            v,
            value = holder[key];
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }

      // Parsing happens in four stages. In the first stage, we replace certain
      // Unicode characters with escape sequences. JavaScript handles many characters
      // incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
        text = text.replace(cx, function (a) {
          return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }

      // In the second stage, we run the text against regular expressions that look
      // for non-JSON patterns. We are especially concerned with '()' and 'new'
      // because they can cause invocation, and '=' because it can cause mutation.
      // But just to be safe, we want to reject all unexpected forms.

      // We split the second stage into 4 regexp operations in order to work around
      // crippling inefficiencies in IE's and Safari's regexp engines. First we
      // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
      // replace all simple value tokens with ']' characters. Third, we delete all
      // open brackets that follow a colon or comma or that begin the text. Finally,
      // we look to see that the remaining characters are only whitespace or ']' or
      // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

      if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.

        j = eval('(' + text + ')');

        // In the optional fourth stage, we recursively walk the new structure, passing
        // each name/value pair to a reviver function for possible transformation.

        return typeof reviver === 'function' ? walk({ '': j }, '') : j;
      }

      // If the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError('JSON.parse');
    };
  }
})();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmJmZGNiY2Q3MmM1MzA4ZjFlYmYiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2pzL2llLXNoaW1zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvanMvaWUtc2hpbXMvaHRtbDUtc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2pzL2llLXNoaW1zL2NzczMtbWVkaWFxdWVyaWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvanMvaWUtc2hpbXMvaWUuanMiXSwibmFtZXMiOlsid2luZG93IiwiZG9jdW1lbnQiLCJ2ZXJzaW9uIiwib3B0aW9ucyIsImh0bWw1IiwicmVTa2lwIiwic2F2ZUNsb25lcyIsInN1cHBvcnRzSHRtbDVTdHlsZXMiLCJleHBhbmRvIiwiZXhwYW5JRCIsImV4cGFuZG9EYXRhIiwic3VwcG9ydHNVbmtub3duRWxlbWVudHMiLCJhIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImNoaWxkTm9kZXMiLCJsZW5ndGgiLCJmcmFnIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImNsb25lTm9kZSIsImUiLCJhZGRTdHlsZVNoZWV0Iiwib3duZXJEb2N1bWVudCIsImNzc1RleHQiLCJwIiwicGFyZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJkb2N1bWVudEVsZW1lbnQiLCJpbnNlcnRCZWZvcmUiLCJsYXN0Q2hpbGQiLCJmaXJzdENoaWxkIiwiZ2V0RWxlbWVudHMiLCJlbGVtZW50cyIsInNwbGl0IiwiYWRkRWxlbWVudHMiLCJuZXdFbGVtZW50cyIsImpvaW4iLCJzaGl2RG9jdW1lbnQiLCJnZXRFeHBhbmRvRGF0YSIsImRhdGEiLCJub2RlTmFtZSIsIm5vZGUiLCJjYWNoZSIsInRlc3QiLCJjcmVhdGVFbGVtIiwiY2FuSGF2ZUNoaWxkcmVuIiwidGFnVXJuIiwiYXBwZW5kQ2hpbGQiLCJjbG9uZSIsImkiLCJlbGVtcyIsImwiLCJzaGl2TWV0aG9kcyIsImNyZWF0ZUZyYWciLCJGdW5jdGlvbiIsInJlcGxhY2UiLCJzaGl2Q1NTIiwiaGFzQ1NTIiwidHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJjcmVhdGUiLCJvIiwiRiIsInByb3RvdHlwZSIsInVhIiwidG9TdHJpbmciLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJzIiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwibWF0Y2giLCJ3ZWJraXQiLCJnZWNrbyIsIm9wZXJhIiwiaWUiLCJpZTYiLCJjb21wYXRNb2RlIiwic3R5bGUiLCJtYXhIZWlnaHQiLCJpZTciLCJYRG9tYWluUmVxdWVzdCIsImllOCIsImRvbVJlYWR5IiwiZm5zIiwiaW5pdCIsImFyZ3VtZW50cyIsImNhbGxlZSIsImRvbmUiLCJhZGRFdmVudExpc3RlbmVyIiwiZG9TY3JvbGwiLCJib2R5Iiwic2V0VGltZW91dCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJvbmxvYWQiLCJmbiIsImNzc0hlbHBlciIsInJlZ0V4cCIsIkJMT0NLUyIsIkJMT0NLU19JTlNJREUiLCJERUNMQVJBVElPTlMiLCJSRUxBVElWRV9VUkxTIiwiUkVEVU5EQU5UX0NPTVBPTkVOVFMiLCJSRURVTkRBTlRfV0hJVEVTUEFDRSIsIldISVRFU1BBQ0VfSU5fUEFSRU5USEVTRVMiLCJNT1JFX1dISVRFU1BBQ0UiLCJGSU5BTF9TRU1JQ09MT05TIiwiTk9UX1dISVRFU1BBQ0UiLCJwYXJzZWQiLCJwYXJzaW5nIiwid2FpdGluZyIsIndhaXQiLCJyZWFkeSIsImV2ZW50cyIsImJyb2FkY2FzdCIsIm4iLCJ2IiwibGlzdGVuZXJzIiwicmVxdWVzdFRleHQiLCJ1cmwiLCJmblN1Y2Nlc3MiLCJmbkZhaWx1cmUiLCJYTUxIdHRwUmVxdWVzdCIsIkFjdGl2ZVhPYmplY3QiLCJyIiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJjdXJzb3IiLCJzdGF0dXMiLCJsb2NhdGlvbiIsInByb3RvY29sIiwicmVzcG9uc2VUZXh0Iiwic2VuZCIsInNhbml0aXplIiwidGV4dCIsIm9iamVjdHMiLCJzdHlsZXNoZWV0IiwiZWwiLCJhbXFzIiwibXFscyIsInJzIiwicnN3IiwiY3NzSGVscGVyVGV4dCIsImF0dHIiLCJnZXRBdHRyaWJ1dGUiLCJxdHMiLCJtZWRpYVF1ZXJ5IiwiYmxvY2tzIiwic3Vic3RyaW5nIiwibXFsIiwibWVkaWFRdWVyeUxpc3QiLCJjb25jYXQiLCJnZXRSdWxlcyIsInJ1bGUiLCJlbGVtZW50IiwiZ2V0Q3NzVGV4dCIsImdldEF0dHJNZWRpYVF1ZXJpZXMiLCJnZXRNZWRpYVF1ZXJ5TGlzdHMiLCJnZXRSdWxlc1dpdGhvdXRNUSIsInN0c2giLCJpZHgiLCJsdCIsIm1xcyIsInJ0cyIsImdldE1lZGlhUXVlcmllcyIsImdldExpc3RUZXh0IiwibGlzdE9yU2hlZXQiLCJub3QiLCJleHByIiwidmFsaWQiLCJ0b2tlbnMiLCJ0b2tlbiIsImNoYXJBdCIsInBhaXIiLCJtZWRpYUZlYXR1cmUiLCJ2YWx1ZSIsImdldFF1ZXJ5VGV4dCIsImdldEF0dHJTdHlsZVNoZWV0IiwiZ2V0TGlzdCIsImdldFZhbGlkIiwiZ2V0Tm90IiwiZ2V0TWVkaWFUeXBlIiwiZ2V0RXhwcmVzc2lvbnMiLCJzdCIsInNzIiwiZHMiLCJkdHMiLCJkZWNsYXJhdGlvbiIsImdldFN0eWxlc2hlZXQiLCJnZXRNZWRpYVF1ZXJ5TGlzdCIsImdldFNlbGVjdG9ycyIsImdldFNlbGVjdG9yVGV4dCIsImdldERlY2xhcmF0aW9ucyIsImdldFByb3BlcnR5VmFsdWUiLCJnZXRQcm9wZXJ0eSIsImdldFZhbHVlIiwiZ2V0UnVsZSIsInBhcnNlVGV4dCIsIm1lZGlhUXVlcnlMaXN0cyIsInJ1bGVzIiwic2VsZWN0b3JzIiwiZGVjbGFyYXRpb25zIiwicHJvcGVydGllcyIsIm9ycyIsIm9zcyIsImNvbGxlY3RTZWxlY3RvcnMiLCJvZHMiLCJvcHMiLCJjc3NIZWxwZXJQYXJzZWQiLCJwYXJzZUVtYmVkZGVkIiwicGFyc2UiLCJsaW5rZWQiLCJmaW5pc2giLCJzdHlsZXMiLCJsaW5rcyIsImxpbmsiLCJocmVmIiwiZGlzYWJsZWQiLCJjIiwiY2hlY2tGb3JGaW5pc2giLCJwcm9jZXNzTGluayIsImxhc3RJbmRleE9mIiwidHlwZXMiLCJzdHlsZXNoZWV0cyIsImNvbGxlY3Rpb25zIiwiYWRkVG9Db2xsZWN0aW9uIiwibmFtZSIsImhhc093blByb3BlcnR5IiwiY29sbGVjdCIsInBuYW1lIiwiZ2V0Vmlld3BvcnRTaXplIiwiZCIsImlubmVyV2lkdGgiLCJjbGllbnRXaWR0aCIsImFkZFN0eWxlIiwibWVkaWFUeXBlcyIsInByb2Nlc3MiLCJzdHlsZUVsSWQiLCJzdHlsZU1lZGlhIiwic3R5bGVFbCIsImdldEVsZW1lbnRCeUlkIiwic2V0QXR0cmlidXRlIiwic3R5bGVTaGVldCIsImNyZWF0ZVRleHROb2RlIiwiYWRkZWRXaXRoQ3NzSGVscGVyIiwicGFyc2luZ0Rpc2FsbG93ZWQiLCJyZW1vdmVTdHlsZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImFkZExpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJscyIsInNwbGljZSIsImdldFZpZXdwb3J0V2lkdGgiLCJnZXRWaWV3cG9ydEhlaWdodCIsImVuYWJsZUNzc01lZGlhUXVlcmllcyIsIm1ldGVyIiwiTEVOR1RIX1VOSVQiLCJSRVNPTFVUSU9OX1VOSVQiLCJBU1BFQ1RfUkFUSU8iLCJBQlNPTFVURV9WQUxVRSIsIm5hdGl2ZVN1cHBvcnQiLCJpZCIsInJldCIsIm9mZnNldFdpZHRoIiwiY3JlYXRlTWV0ZXIiLCJmb250U2l6ZSIsIndpZHRoIiwibWVhc3VyZSIsImFtb3VudCIsInRlc3RNZWRpYUZlYXR1cmUiLCJmZWF0dXJlIiwibWluIiwibWF4IiwidmFsdWVUeXBlIiwiZXhlYyIsInBhcnNlSW50IiwidW5pdCIsImhlaWdodCIsInNjcmVlbiIsImNsaWVudEhlaWdodCIsImN1clJhdGlvIiwicmF0aW8iLCJjb2xvcnMiLCJNYXRoIiwicG93IiwiY29sb3JEZXB0aCIsImNvbG9yIiwicmVzIiwidGVzdE1lZGlhUXVlcnkiLCJtcSIsImV4cHJlc3Npb25zIiwidGVzdE1lZGlhUXVlcnlMaXN0IiwidHMiLCJ0IiwidHlwZUFsbG93ZWQiLCJqIiwidGVzdE1lZGlhUXVlcnlMaXN0cyIsInRlc3RTdHlsZXNoZWV0IiwiYWxsUGFzc2VkIiwidHN3ZSIsInRlc3RTdHlsZXNoZWV0cyIsInN0c2hzIiwiZGlzcGxheSIsInNjcm9sbGJhcldpZHRoIiwiY2hlY2tGb3JSZXNpemUiLCJjdnB3IiwiY3ZwaCIsInBvc2l0aW9uIiwidG9wIiwib3ZlcmZsb3ciLCJ0aW1lciIsInJlc2l6ZUhhbmRsZXIiLCJ2cHciLCJ2cGgiLCJhYnMiLCJjbGVhclRpbWVvdXQiLCJvbnJlc2l6ZSIsIngiLCJkb2NFbCIsIm1hcmdpbkxlZnQiLCJleGVjQ29tbWFuZCIsIkpTT04iLCJmIiwiRGF0ZSIsInRvSlNPTiIsImtleSIsImlzRmluaXRlIiwidmFsdWVPZiIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJnZXRVVENEYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsIlN0cmluZyIsIk51bWJlciIsIkJvb2xlYW4iLCJjeCIsImVzY2FwYWJsZSIsImdhcCIsImluZGVudCIsIm1ldGEiLCJyZXAiLCJxdW90ZSIsInN0cmluZyIsImxhc3RJbmRleCIsImNoYXJDb2RlQXQiLCJzbGljZSIsInN0ciIsImhvbGRlciIsImsiLCJtaW5kIiwicGFydGlhbCIsImNhbGwiLCJhcHBseSIsInB1c2giLCJzdHJpbmdpZnkiLCJyZXBsYWNlciIsInNwYWNlIiwiRXJyb3IiLCJyZXZpdmVyIiwid2FsayIsInVuZGVmaW5lZCIsImV2YWwiLCJTeW50YXhFcnJvciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFnQjNSLFFBQWhCLENBQXlCLEVBQXpCLENBQVYsRUFBd0M0UixLQUF4QyxDQUE4QyxDQUFDLENBQS9DLENBQWY7QUFDRCxTQUZNLENBQVA7QUFHRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUNFLGdCQUFnQnBULElBQWhCLENBQ0U4RixLQUNHbEYsT0FESCxDQUNXLHFDQURYLEVBQ2tELEdBRGxELEVBRUdBLE9BRkgsQ0FFVyxrRUFGWCxFQUUrRSxHQUYvRSxFQUdHQSxPQUhILENBR1csc0JBSFgsRUFHbUMsRUFIbkMsQ0FERixDQURGLEVBT0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQW9QLFlBQUlvRSxLQUFLLE1BQU10TyxJQUFOLEdBQWEsR0FBbEIsQ0FBSjs7QUFFQTtBQUNBOztBQUVBLGVBQU8sT0FBT21PLE9BQVAsS0FBbUIsVUFBbkIsR0FBZ0NDLEtBQUssRUFBRSxJQUFJbEUsQ0FBTixFQUFMLEVBQWdCLEVBQWhCLENBQWhDLEdBQXNEQSxDQUE3RDtBQUNEOztBQUVEOztBQUVBLFlBQU0sSUFBSXFFLFdBQUosQ0FBZ0IsWUFBaEIsQ0FBTjtBQUNELEtBN0VEO0FBOEVEO0FBQ0YsQ0E5U0QsSSIsImZpbGUiOiJpZS1zaGltcy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJiZmRjYmNkNzJjNTMwOGYxZWJmIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZighbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCJpbXBvcnQgJy4vaHRtbDUtc2hpbSc7XG5pbXBvcnQgJy4vY3NzMy1tZWRpYXF1ZXJpZXMnO1xuaW1wb3J0ICcuL2llJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvaWUtc2hpbXMvaW5kZXguanMiLCIvKipcbiAqIEBwcmVzZXJ2ZSBIVE1MNSBTaGl2IDMuNy4zIHwgQGFmYXJrYXMgQGpkYWx0b24gQGpvbl9uZWFsIEByZW0gfCBNSVQvR1BMMiBMaWNlbnNlZFxuICovXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuICAvKmpzaGludCBldmlsOnRydWUgKi9cbiAgLyoqIHZlcnNpb24gKi9cbiAgdmFyIHZlcnNpb24gPSAnMy43LjMnO1xuXG4gIC8qKiBQcmVzZXQgb3B0aW9ucyAqL1xuICB2YXIgb3B0aW9ucyA9IHdpbmRvdy5odG1sNSB8fCB7fTtcblxuICAvKiogVXNlZCB0byBza2lwIHByb2JsZW0gZWxlbWVudHMgKi9cbiAgdmFyIHJlU2tpcCA9IC9ePHxeKD86YnV0dG9ufG1hcHxzZWxlY3R8dGV4dGFyZWF8b2JqZWN0fGlmcmFtZXxvcHRpb258b3B0Z3JvdXApJC9pO1xuXG4gIC8qKiBOb3QgYWxsIGVsZW1lbnRzIGNhbiBiZSBjbG9uZWQgaW4gSUUgKiovXG4gIHZhciBzYXZlQ2xvbmVzID0gL14oPzphfGJ8Y29kZXxkaXZ8ZmllbGRzZXR8aDF8aDJ8aDN8aDR8aDV8aDZ8aXxsYWJlbHxsaXxvbHxwfHF8c3BhbnxzdHJvbmd8c3R5bGV8dGFibGV8dGJvZHl8dGR8dGh8dHJ8dWwpJC9pO1xuXG4gIC8qKiBEZXRlY3Qgd2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyBkZWZhdWx0IGh0bWw1IHN0eWxlcyAqL1xuICB2YXIgc3VwcG9ydHNIdG1sNVN0eWxlcztcblxuICAvKiogTmFtZSBvZiB0aGUgZXhwYW5kbywgdG8gd29yayB3aXRoIG11bHRpcGxlIGRvY3VtZW50cyBvciB0byByZS1zaGl2IG9uZSBkb2N1bWVudCAqL1xuICB2YXIgZXhwYW5kbyA9ICdfaHRtbDVzaGl2JztcblxuICAvKiogVGhlIGlkIGZvciB0aGUgdGhlIGRvY3VtZW50cyBleHBhbmRvICovXG4gIHZhciBleHBhbklEID0gMDtcblxuICAvKiogQ2FjaGVkIGRhdGEgZm9yIGVhY2ggZG9jdW1lbnQgKi9cbiAgdmFyIGV4cGFuZG9EYXRhID0ge307XG5cbiAgLyoqIERldGVjdCB3aGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIHVua25vd24gZWxlbWVudHMgKi9cbiAgdmFyIHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzO1xuXG4gIChmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhLmlubmVySFRNTCA9ICc8eHl6PjwveHl6Pic7XG4gICAgICAvL2lmIHRoZSBoaWRkZW4gcHJvcGVydHkgaXMgaW1wbGVtZW50ZWQgd2UgY2FuIGFzc3VtZSwgdGhhdCB0aGUgYnJvd3NlciBzdXBwb3J0cyBiYXNpYyBIVE1MNSBTdHlsZXNcbiAgICAgIHN1cHBvcnRzSHRtbDVTdHlsZXMgPSAnaGlkZGVuJyBpbiBhO1xuXG4gICAgICBzdXBwb3J0c1Vua25vd25FbGVtZW50cyA9XG4gICAgICAgIGEuY2hpbGROb2Rlcy5sZW5ndGggPT0gMSB8fFxuICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gYXNzaWduIGEgZmFsc2UgcG9zaXRpdmUgaWYgdW5hYmxlIHRvIHNoaXZcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHR5cGVvZiBmcmFnLmNsb25lTm9kZSA9PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAgICAgdHlwZW9mIGZyYWcuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCA9PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAgICAgdHlwZW9mIGZyYWcuY3JlYXRlRWxlbWVudCA9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0pKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gYXNzaWduIGEgZmFsc2UgcG9zaXRpdmUgaWYgZGV0ZWN0aW9uIGZhaWxzID0+IHVuYWJsZSB0byBzaGl2XG4gICAgICBzdXBwb3J0c0h0bWw1U3R5bGVzID0gdHJ1ZTtcbiAgICAgIHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzID0gdHJ1ZTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBzdHlsZSBzaGVldCB3aXRoIHRoZSBnaXZlbiBDU1MgdGV4dCBhbmQgYWRkcyBpdCB0byB0aGUgZG9jdW1lbnQuXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IG93bmVyRG9jdW1lbnQgVGhlIGRvY3VtZW50LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY3NzVGV4dCBUaGUgQ1NTIHRleHQuXG4gICAqIEByZXR1cm5zIHtTdHlsZVNoZWV0fSBUaGUgc3R5bGUgZWxlbWVudC5cbiAgICovXG4gIGZ1bmN0aW9uIGFkZFN0eWxlU2hlZXQob3duZXJEb2N1bWVudCwgY3NzVGV4dCkge1xuICAgIHZhciBwID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyksXG4gICAgICBwYXJlbnQgPSBvd25lckRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0gfHwgb3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICBwLmlubmVySFRNTCA9ICd4PHN0eWxlPicgKyBjc3NUZXh0ICsgJzwvc3R5bGU+JztcbiAgICByZXR1cm4gcGFyZW50Lmluc2VydEJlZm9yZShwLmxhc3RDaGlsZCwgcGFyZW50LmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGBodG1sNS5lbGVtZW50c2AgYXMgYW4gYXJyYXkuXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm5zIHtBcnJheX0gQW4gYXJyYXkgb2Ygc2hpdmVkIGVsZW1lbnQgbm9kZSBuYW1lcy5cbiAgICovXG4gIGZ1bmN0aW9uIGdldEVsZW1lbnRzKCkge1xuICAgIHZhciBlbGVtZW50cyA9IGh0bWw1LmVsZW1lbnRzO1xuICAgIHJldHVybiB0eXBlb2YgZWxlbWVudHMgPT0gJ3N0cmluZycgPyBlbGVtZW50cy5zcGxpdCgnICcpIDogZWxlbWVudHM7XG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kcyB0aGUgYnVpbHQtaW4gbGlzdCBvZiBodG1sNSBlbGVtZW50c1xuICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG5ld0VsZW1lbnRzIHdoaXRlc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb3IgYXJyYXkgb2YgbmV3IGVsZW1lbnQgbmFtZXMgdG8gc2hpdlxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvd25lckRvY3VtZW50IFRoZSBjb250ZXh0IGRvY3VtZW50LlxuICAgKi9cbiAgZnVuY3Rpb24gYWRkRWxlbWVudHMobmV3RWxlbWVudHMsIG93bmVyRG9jdW1lbnQpIHtcbiAgICB2YXIgZWxlbWVudHMgPSBodG1sNS5lbGVtZW50cztcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzICE9ICdzdHJpbmcnKSB7XG4gICAgICBlbGVtZW50cyA9IGVsZW1lbnRzLmpvaW4oJyAnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBuZXdFbGVtZW50cyAhPSAnc3RyaW5nJykge1xuICAgICAgbmV3RWxlbWVudHMgPSBuZXdFbGVtZW50cy5qb2luKCcgJyk7XG4gICAgfVxuICAgIGh0bWw1LmVsZW1lbnRzID0gZWxlbWVudHMgKyAnICcgKyBuZXdFbGVtZW50cztcbiAgICBzaGl2RG9jdW1lbnQob3duZXJEb2N1bWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGF0YSBhc3NvY2lhdGVkIHRvIHRoZSBnaXZlbiBkb2N1bWVudFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvd25lckRvY3VtZW50IFRoZSBkb2N1bWVudC5cbiAgICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IG9mIGRhdGEuXG4gICAqL1xuICBmdW5jdGlvbiBnZXRFeHBhbmRvRGF0YShvd25lckRvY3VtZW50KSB7XG4gICAgdmFyIGRhdGEgPSBleHBhbmRvRGF0YVtvd25lckRvY3VtZW50W2V4cGFuZG9dXTtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIGRhdGEgPSB7fTtcbiAgICAgIGV4cGFuSUQrKztcbiAgICAgIG93bmVyRG9jdW1lbnRbZXhwYW5kb10gPSBleHBhbklEO1xuICAgICAgZXhwYW5kb0RhdGFbZXhwYW5JRF0gPSBkYXRhO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGEgc2hpdmVkIGVsZW1lbnQgZm9yIHRoZSBnaXZlbiBub2RlTmFtZSBhbmQgZG9jdW1lbnRcbiAgICogQG1lbWJlck9mIGh0bWw1XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBub2RlTmFtZSBuYW1lIG9mIHRoZSBlbGVtZW50XG4gICAqIEBwYXJhbSB7RG9jdW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gb3duZXJEb2N1bWVudCBUaGUgY29udGV4dCBkb2N1bWVudC5cbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIHNoaXZlZCBlbGVtZW50LlxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlTmFtZSwgb3duZXJEb2N1bWVudCwgZGF0YSkge1xuICAgIGlmICghb3duZXJEb2N1bWVudCkge1xuICAgICAgb3duZXJEb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIH1cbiAgICBpZiAoc3VwcG9ydHNVbmtub3duRWxlbWVudHMpIHtcbiAgICAgIHJldHVybiBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpO1xuICAgIH1cbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIGRhdGEgPSBnZXRFeHBhbmRvRGF0YShvd25lckRvY3VtZW50KTtcbiAgICB9XG4gICAgdmFyIG5vZGU7XG5cbiAgICBpZiAoZGF0YS5jYWNoZVtub2RlTmFtZV0pIHtcbiAgICAgIG5vZGUgPSBkYXRhLmNhY2hlW25vZGVOYW1lXS5jbG9uZU5vZGUoKTtcbiAgICB9IGVsc2UgaWYgKHNhdmVDbG9uZXMudGVzdChub2RlTmFtZSkpIHtcbiAgICAgIG5vZGUgPSAoZGF0YS5jYWNoZVtub2RlTmFtZV0gPSBkYXRhLmNyZWF0ZUVsZW0obm9kZU5hbWUpKS5jbG9uZU5vZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IGRhdGEuY3JlYXRlRWxlbShub2RlTmFtZSk7XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgYWRkaW5nIHNvbWUgZWxlbWVudHMgdG8gZnJhZ21lbnRzIGluIElFIDwgOSBiZWNhdXNlXG4gICAgLy8gKiBBdHRyaWJ1dGVzIGxpa2UgYG5hbWVgIG9yIGB0eXBlYCBjYW5ub3QgYmUgc2V0L2NoYW5nZWQgb25jZSBhbiBlbGVtZW50XG4gICAgLy8gICBpcyBpbnNlcnRlZCBpbnRvIGEgZG9jdW1lbnQvZnJhZ21lbnRcbiAgICAvLyAqIExpbmsgZWxlbWVudHMgd2l0aCBgc3JjYCBhdHRyaWJ1dGVzIHRoYXQgYXJlIGluYWNjZXNzaWJsZSwgYXMgd2l0aFxuICAgIC8vICAgYSA0MDMgcmVzcG9uc2UsIHdpbGwgY2F1c2UgdGhlIHRhYi93aW5kb3cgdG8gY3Jhc2hcbiAgICAvLyAqIFNjcmlwdCBlbGVtZW50cyBhcHBlbmRlZCB0byBmcmFnbWVudHMgd2lsbCBleGVjdXRlIHdoZW4gdGhlaXIgYHNyY2BcbiAgICAvLyAgIG9yIGB0ZXh0YCBwcm9wZXJ0eSBpcyBzZXRcbiAgICByZXR1cm4gbm9kZS5jYW5IYXZlQ2hpbGRyZW4gJiYgIXJlU2tpcC50ZXN0KG5vZGVOYW1lKSAmJiAhbm9kZS50YWdVcm4gPyBkYXRhLmZyYWcuYXBwZW5kQ2hpbGQobm9kZSkgOiBub2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYSBzaGl2ZWQgRG9jdW1lbnRGcmFnbWVudCBmb3IgdGhlIGdpdmVuIGRvY3VtZW50XG4gICAqIEBtZW1iZXJPZiBodG1sNVxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvd25lckRvY3VtZW50IFRoZSBjb250ZXh0IGRvY3VtZW50LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgc2hpdmVkIERvY3VtZW50RnJhZ21lbnQuXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVEb2N1bWVudEZyYWdtZW50KG93bmVyRG9jdW1lbnQsIGRhdGEpIHtcbiAgICBpZiAoIW93bmVyRG9jdW1lbnQpIHtcbiAgICAgIG93bmVyRG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB9XG4gICAgaWYgKHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzKSB7XG4gICAgICByZXR1cm4gb3duZXJEb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgfVxuICAgIGRhdGEgPSBkYXRhIHx8IGdldEV4cGFuZG9EYXRhKG93bmVyRG9jdW1lbnQpO1xuICAgIHZhciBjbG9uZSA9IGRhdGEuZnJhZy5jbG9uZU5vZGUoKSxcbiAgICAgIGkgPSAwLFxuICAgICAgZWxlbXMgPSBnZXRFbGVtZW50cygpLFxuICAgICAgbCA9IGVsZW1zLmxlbmd0aDtcbiAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgY2xvbmUuY3JlYXRlRWxlbWVudChlbGVtc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGl2cyB0aGUgYGNyZWF0ZUVsZW1lbnRgIGFuZCBgY3JlYXRlRG9jdW1lbnRGcmFnbWVudGAgbWV0aG9kcyBvZiB0aGUgZG9jdW1lbnQuXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gb3duZXJEb2N1bWVudCBUaGUgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIG9mIHRoZSBkb2N1bWVudC5cbiAgICovXG4gIGZ1bmN0aW9uIHNoaXZNZXRob2RzKG93bmVyRG9jdW1lbnQsIGRhdGEpIHtcbiAgICBpZiAoIWRhdGEuY2FjaGUpIHtcbiAgICAgIGRhdGEuY2FjaGUgPSB7fTtcbiAgICAgIGRhdGEuY3JlYXRlRWxlbSA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudDtcbiAgICAgIGRhdGEuY3JlYXRlRnJhZyA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudDtcbiAgICAgIGRhdGEuZnJhZyA9IGRhdGEuY3JlYXRlRnJhZygpO1xuICAgIH1cblxuICAgIG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKG5vZGVOYW1lKSB7XG4gICAgICAvL2Fib3J0IHNoaXZcbiAgICAgIGlmICghaHRtbDUuc2hpdk1ldGhvZHMpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuY3JlYXRlRWxlbShub2RlTmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChub2RlTmFtZSwgb3duZXJEb2N1bWVudCwgZGF0YSk7XG4gICAgfTtcblxuICAgIG93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCA9IEZ1bmN0aW9uKFxuICAgICAgJ2gsZicsXG4gICAgICAncmV0dXJuIGZ1bmN0aW9uKCl7JyArXG4gICAgICAgICd2YXIgbj1mLmNsb25lTm9kZSgpLGM9bi5jcmVhdGVFbGVtZW50OycgK1xuICAgICAgICAnaC5zaGl2TWV0aG9kcyYmKCcgK1xuICAgICAgICAvLyB1bnJvbGwgdGhlIGBjcmVhdGVFbGVtZW50YCBjYWxsc1xuICAgICAgICBnZXRFbGVtZW50cygpXG4gICAgICAgICAgLmpvaW4oKVxuICAgICAgICAgIC5yZXBsYWNlKC9bXFx3XFwtOl0rL2csIGZ1bmN0aW9uKG5vZGVOYW1lKSB7XG4gICAgICAgICAgICBkYXRhLmNyZWF0ZUVsZW0obm9kZU5hbWUpO1xuICAgICAgICAgICAgZGF0YS5mcmFnLmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuICdjKFwiJyArIG5vZGVOYW1lICsgJ1wiKSc7XG4gICAgICAgICAgfSkgK1xuICAgICAgICAnKTtyZXR1cm4gbn0nXG4gICAgKShodG1sNSwgZGF0YS5mcmFnKTtcbiAgfVxuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBTaGl2cyB0aGUgZ2l2ZW4gZG9jdW1lbnQuXG4gICAqIEBtZW1iZXJPZiBodG1sNVxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvd25lckRvY3VtZW50IFRoZSBkb2N1bWVudCB0byBzaGl2LlxuICAgKiBAcmV0dXJucyB7RG9jdW1lbnR9IFRoZSBzaGl2ZWQgZG9jdW1lbnQuXG4gICAqL1xuICBmdW5jdGlvbiBzaGl2RG9jdW1lbnQob3duZXJEb2N1bWVudCkge1xuICAgIGlmICghb3duZXJEb2N1bWVudCkge1xuICAgICAgb3duZXJEb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIH1cbiAgICB2YXIgZGF0YSA9IGdldEV4cGFuZG9EYXRhKG93bmVyRG9jdW1lbnQpO1xuXG4gICAgaWYgKGh0bWw1LnNoaXZDU1MgJiYgIXN1cHBvcnRzSHRtbDVTdHlsZXMgJiYgIWRhdGEuaGFzQ1NTKSB7XG4gICAgICBkYXRhLmhhc0NTUyA9ICEhYWRkU3R5bGVTaGVldChcbiAgICAgICAgb3duZXJEb2N1bWVudCxcbiAgICAgICAgLy8gY29ycmVjdHMgYmxvY2sgZGlzcGxheSBub3QgZGVmaW5lZCBpbiBJRTYvNy84LzlcbiAgICAgICAgJ2FydGljbGUsYXNpZGUsZGlhbG9nLGZpZ2NhcHRpb24sZmlndXJlLGZvb3RlcixoZWFkZXIsaGdyb3VwLG1haW4sbmF2LHNlY3Rpb257ZGlzcGxheTpibG9ja30nICtcbiAgICAgICAgICAvLyBhZGRzIHN0eWxpbmcgbm90IHByZXNlbnQgaW4gSUU2LzcvOC85XG4gICAgICAgICAgJ21hcmt7YmFja2dyb3VuZDojRkYwO2NvbG9yOiMwMDB9JyArXG4gICAgICAgICAgLy8gaGlkZXMgbm9uLXJlbmRlcmVkIGVsZW1lbnRzXG4gICAgICAgICAgJ3RlbXBsYXRle2Rpc3BsYXk6bm9uZX0nXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXN1cHBvcnRzVW5rbm93bkVsZW1lbnRzKSB7XG4gICAgICBzaGl2TWV0aG9kcyhvd25lckRvY3VtZW50LCBkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIG93bmVyRG9jdW1lbnQ7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogVGhlIGBodG1sNWAgb2JqZWN0IGlzIGV4cG9zZWQgc28gdGhhdCBtb3JlIGVsZW1lbnRzIGNhbiBiZSBzaGl2ZWQgYW5kXG4gICAqIGV4aXN0aW5nIHNoaXZpbmcgY2FuIGJlIGRldGVjdGVkIG9uIGlmcmFtZXMuXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiAvLyBvcHRpb25zIGNhbiBiZSBjaGFuZ2VkIGJlZm9yZSB0aGUgc2NyaXB0IGlzIGluY2x1ZGVkXG4gICAqIGh0bWw1ID0geyAnZWxlbWVudHMnOiAnbWFyayBzZWN0aW9uJywgJ3NoaXZDU1MnOiBmYWxzZSwgJ3NoaXZNZXRob2RzJzogZmFsc2UgfTtcbiAgICovXG4gIHZhciBodG1sNSA9IHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIG5vZGUgbmFtZXMgb2YgdGhlIGVsZW1lbnRzIHRvIHNoaXYuXG4gICAgICogQG1lbWJlck9mIGh0bWw1XG4gICAgICogQHR5cGUgQXJyYXl8U3RyaW5nXG4gICAgICovXG4gICAgZWxlbWVudHM6XG4gICAgICBvcHRpb25zLmVsZW1lbnRzIHx8XG4gICAgICAnYWJiciBhcnRpY2xlIGFzaWRlIGF1ZGlvIGJkaSBjYW52YXMgZGF0YSBkYXRhbGlzdCBkZXRhaWxzIGRpYWxvZyBmaWdjYXB0aW9uIGZpZ3VyZSBmb290ZXIgaGVhZGVyIGhncm91cCBtYWluIG1hcmsgbWV0ZXIgbmF2IG91dHB1dCBwaWN0dXJlIHByb2dyZXNzIHNlY3Rpb24gc3VtbWFyeSB0ZW1wbGF0ZSB0aW1lIHZpZGVvJyxcblxuICAgIC8qKlxuICAgICAqIGN1cnJlbnQgdmVyc2lvbiBvZiBodG1sNXNoaXZcbiAgICAgKi9cbiAgICB2ZXJzaW9uOiB2ZXJzaW9uLFxuXG4gICAgLyoqXG4gICAgICogQSBmbGFnIHRvIGluZGljYXRlIHRoYXQgdGhlIEhUTUw1IHN0eWxlIHNoZWV0IHNob3VsZCBiZSBpbnNlcnRlZC5cbiAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICovXG4gICAgc2hpdkNTUzogb3B0aW9ucy5zaGl2Q1NTICE9PSBmYWxzZSxcblxuICAgIC8qKlxuICAgICAqIElzIGVxdWFsIHRvIHRydWUgaWYgYSBicm93c2VyIHN1cHBvcnRzIGNyZWF0aW5nIHVua25vd24vSFRNTDUgZWxlbWVudHNcbiAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICovXG4gICAgc3VwcG9ydHNVbmtub3duRWxlbWVudHM6IHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzLFxuXG4gICAgLyoqXG4gICAgICogQSBmbGFnIHRvIGluZGljYXRlIHRoYXQgdGhlIGRvY3VtZW50J3MgYGNyZWF0ZUVsZW1lbnRgIGFuZCBgY3JlYXRlRG9jdW1lbnRGcmFnbWVudGBcbiAgICAgKiBtZXRob2RzIHNob3VsZCBiZSBvdmVyd3JpdHRlbi5cbiAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICovXG4gICAgc2hpdk1ldGhvZHM6IG9wdGlvbnMuc2hpdk1ldGhvZHMgIT09IGZhbHNlLFxuXG4gICAgLyoqXG4gICAgICogQSBzdHJpbmcgdG8gZGVzY3JpYmUgdGhlIHR5cGUgb2YgYGh0bWw1YCBvYmplY3QgKFwiZGVmYXVsdFwiIG9yIFwiZGVmYXVsdCBwcmludFwiKS5cbiAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgKi9cbiAgICB0eXBlOiAnZGVmYXVsdCcsXG5cbiAgICAvLyBzaGl2cyB0aGUgZG9jdW1lbnQgYWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpZWQgYGh0bWw1YCBvYmplY3Qgb3B0aW9uc1xuICAgIHNoaXZEb2N1bWVudDogc2hpdkRvY3VtZW50LFxuXG4gICAgLy9jcmVhdGVzIGEgc2hpdmVkIGVsZW1lbnRcbiAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuXG4gICAgLy9jcmVhdGVzIGEgc2hpdmVkIGRvY3VtZW50RnJhZ21lbnRcbiAgICBjcmVhdGVEb2N1bWVudEZyYWdtZW50OiBjcmVhdGVEb2N1bWVudEZyYWdtZW50LFxuXG4gICAgLy9leHRlbmRzIGxpc3Qgb2YgZWxlbWVudHNcbiAgICBhZGRFbGVtZW50czogYWRkRWxlbWVudHMsXG4gIH07XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLy8gZXhwb3NlIGh0bWw1XG4gIHdpbmRvdy5odG1sNSA9IGh0bWw1O1xuXG4gIC8vIHNoaXYgdGhlIGRvY3VtZW50XG4gIHNoaXZEb2N1bWVudChkb2N1bWVudCk7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGh0bWw1O1xuICB9XG59KSh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMsIGRvY3VtZW50KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvaWUtc2hpbXMvaHRtbDUtc2hpbS5qcyIsIi8qXG5jc3MzLW1lZGlhcXVlcmllcy5qcyAtIENTUyBIZWxwZXIgYW5kIENTUzMgTWVkaWEgUXVlcmllcyBFbmFibGVyXG5cbmF1dGhvcjogV291dGVyIHZhbiBkZXIgR3JhYWYgPHdvdXRlciBhdCBkeW5vcmEgbmw+XG52ZXJzaW9uOiAxLjAgKDIwMTEwMzMwKVxubGljZW5zZTogTUlUXG53ZWJzaXRlOiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvY3NzMy1tZWRpYXF1ZXJpZXMtanMvXG5cblczQyBzcGVjOiBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLW1lZGlhcXVlcmllcy9cblxuTm90ZTogdXNlIG9mIGVtYmVkZGVkIDxzdHlsZT4gaXMgbm90IHJlY29tbWVuZGVkIHdoZW4gdXNpbmcgbWVkaWEgcXVlcmllcywgYmVjYXVzZSBJRSAgaGFzIG5vIHdheSBvZiByZXR1cm5pbmcgdGhlIHJhdyBsaXRlcmFsIGNzcyB0ZXh0IGZyb20gYSA8c3R5bGU+IGVsZW1lbnQuXG4qL1xuXG4vLyB0cnVlIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UgKGh0dHA6Ly9qYXZhc2NyaXB0LmNyb2NrZm9yZC5jb20vcHJvdG90eXBhbC5odG1sKVxuaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gIE9iamVjdC5jcmVhdGUgPSBmdW5jdGlvbihvKSB7XG4gICAgZnVuY3Rpb24gRigpIHt9XG4gICAgRi5wcm90b3R5cGUgPSBvO1xuICAgIHJldHVybiBuZXcgRigpO1xuICB9O1xufVxuXG4vLyB1c2VyIGFnZW50IHNuaWZmaW5nIHNob3J0Y3V0c1xudmFyIHVhID0ge1xuICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIH0sXG4gIHRlc3Q6IGZ1bmN0aW9uKHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy50b1N0cmluZygpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC5pbmRleE9mKHMudG9Mb3dlckNhc2UoKSkgPiAtMVxuICAgICk7XG4gIH0sXG59O1xudWEudmVyc2lvbiA9ICh1YVxuICAudG9TdHJpbmcoKVxuICAudG9Mb3dlckNhc2UoKVxuICAubWF0Y2goL1tcXHNcXFNdKyg/OnJ2fGl0fHJhfGllKVtcXC86IF0oW1xcZC5dKykvKSB8fCBbXSlbMV07XG51YS53ZWJraXQgPSB1YS50ZXN0KCd3ZWJraXQnKTtcbnVhLmdlY2tvID0gdWEudGVzdCgnZ2Vja28nKSAmJiAhdWEud2Via2l0O1xudWEub3BlcmEgPSB1YS50ZXN0KCdvcGVyYScpO1xudWEuaWUgPSB1YS50ZXN0KCdtc2llJykgJiYgIXVhLm9wZXJhO1xudWEuaWU2ID0gdWEuaWUgJiYgZG9jdW1lbnQuY29tcGF0TW9kZSAmJiB0eXBlb2YgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm1heEhlaWdodCA9PT0gJ3VuZGVmaW5lZCc7XG51YS5pZTcgPVxuICB1YS5pZSAmJlxuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiZcbiAgdHlwZW9mIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgIT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiBYRG9tYWluUmVxdWVzdCA9PT0gJ3VuZGVmaW5lZCc7XG51YS5pZTggPSB1YS5pZSAmJiB0eXBlb2YgWERvbWFpblJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG4vLyBpbml0aWFsaXplIHdoZW4gRE9NIGNvbnRlbnQgaXMgbG9hZGVkXG52YXIgZG9tUmVhZHkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciBmbnMgPSBbXTtcbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5jYWxsZWUuZG9uZSkge1xuICAgICAgLy8gcnVuIGluaXQgZnVuY3Rpb25zIG9uY2VcbiAgICAgIGFyZ3VtZW50cy5jYWxsZWUuZG9uZSA9IHRydWU7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmbnNbaV0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gbGlzdGVuZXJzIGZvciBkaWZmZXJlbnQgYnJvd3NlcnNcbiAgaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdCwgZmFsc2UpO1xuICB9XG4gIGlmICh1YS5pZSkge1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHRocm93cyBlcnJvcnMgdW50aWwgYWZ0ZXIgb25kb2N1bWVudHJlYWR5XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbCgnbGVmdCcpO1xuXG4gICAgICAgIC8vIElmIHdlIGFyZSBpbiBhbiBpZnJhbWUsIHRoZSBhYm92ZSBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgICAgICAvLyBUcnlpbmcgdG8gYWNjZXNzIHRoZSBsZW5ndGggYXR0cmlidXRlIG9mIGRvY3VtZW50LmJvZHksIGhvd2V2ZXIsXG4gICAgICAgIC8vIGRvZXMgdGhyb3cgYW4gZXJyb3IgdW50aWwgb25kb2N1bWVudHJlYWR5LCBmaXhpbmcgdGhpcyBpc3N1ZS5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5sZW5ndGg7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwgNTApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBubyBlcnJvcnMsIGZpcmVcbiAgICAgIGluaXQoKTtcbiAgICB9KSgpO1xuICAgIC8vIHRyeWluZyB0byBhbHdheXMgZmlyZSBiZWZvcmUgb25sb2FkXG4gICAgZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICBkb2N1bWVudC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICBpbml0KCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBpZiAodWEud2Via2l0ICYmIGRvY3VtZW50LnJlYWR5U3RhdGUpIHtcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgICAgIGluaXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwgMTApO1xuICAgICAgfVxuICAgIH0pKCk7XG4gIH1cbiAgd2luZG93Lm9ubG9hZCA9IGluaXQ7IC8vIGZhbGxiYWNrXG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGZuKSB7XG4gICAgLy8gYWRkIGZuIHRvIGluaXQgZnVuY3Rpb25zXG4gICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gSWYgRE9NIHJlYWR5IGhhcyBhbHJlYWR5IGJlZW4gZmlyZWQsIGZpcmUgdGhlIGZ1bmN0aW9uXG4gICAgICAvLyByaWdodCBhd2F5LlxuICAgICAgaWYgKGluaXQuZG9uZSkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQWRkIHRvIHRoZSBxdWV1ZVxuICAgICAgICBmbnNbZm5zLmxlbmd0aF0gPSBmbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZuO1xuICB9O1xufSkoKTtcblxuLy8gaGVscGVyIGxpYnJhcnkgZm9yIHBhcnNpbmcgY3NzIHRvIG9iamVjdHNcbnZhciBjc3NIZWxwZXIgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciByZWdFeHAgPSB7XG4gICAgQkxPQ0tTOiAvW15cXHN7O11bXns7XSpcXHsoPzpbXnt9XSpcXHtbXnt9XSpcXH1bXnt9XSp8W157fV0qKSpcXH0vZyxcbiAgICBCTE9DS1NfSU5TSURFOiAvW15cXHN7XVtee10qXFx7W157fV0qXFx9L2csXG4gICAgREVDTEFSQVRJT05TOiAvW2EtekEtWlxcLV0rW147XSo6W147XSs7L2csXG4gICAgUkVMQVRJVkVfVVJMUzogL3VybFxcKFsnXCJdPyhbXlxcL1xcKSdcIl1bXjpcXCknXCJdKylbJ1wiXT9cXCkvZyxcbiAgICAvLyBzdHJpcCB3aGl0ZXNwYWNlIGFuZCBjb21tZW50cywgQGltcG9ydCBpcyBldmlsXG4gICAgUkVEVU5EQU5UX0NPTVBPTkVOVFM6IC8oPzpcXC9cXCooW14qXFxcXFxcXFxdfFxcKig/IVxcLykpK1xcKlxcL3xAaW1wb3J0W147XSs7fEAtbW96LWRvY3VtZW50XFxzKnVybC1wcmVmaXhcXChcXClcXHMqeygoW157fV0pK3soW157fV0pK30oW157fV0pKykrfSkvZyxcbiAgICBSRURVTkRBTlRfV0hJVEVTUEFDRTogL1xccyooLHw6fDt8XFx7fFxcfSlcXHMqL2csXG4gICAgV0hJVEVTUEFDRV9JTl9QQVJFTlRIRVNFUzogL1xcKFxccyooXFxTKilcXHMqXFwpL2csXG4gICAgTU9SRV9XSElURVNQQUNFOiAvXFxzezIsfS9nLFxuICAgIEZJTkFMX1NFTUlDT0xPTlM6IC87XFx9L2csXG4gICAgTk9UX1dISVRFU1BBQ0U6IC9cXFMrL2csXG4gIH07XG5cbiAgdmFyIHBhcnNlZCxcbiAgICBwYXJzaW5nID0gZmFsc2U7XG5cbiAgdmFyIHdhaXRpbmcgPSBbXTtcbiAgdmFyIHdhaXQgPSBmdW5jdGlvbihmbikge1xuICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHdhaXRpbmdbd2FpdGluZy5sZW5ndGhdID0gZm47XG4gICAgfVxuICB9O1xuICB2YXIgcmVhZHkgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdhaXRpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgIHdhaXRpbmdbaV0ocGFyc2VkKTtcbiAgICB9XG4gIH07XG4gIHZhciBldmVudHMgPSB7fTtcbiAgdmFyIGJyb2FkY2FzdCA9IGZ1bmN0aW9uKG4sIHYpIHtcbiAgICBpZiAoZXZlbnRzW25dKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gZXZlbnRzW25dLmxpc3RlbmVycztcbiAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsaXN0ZW5lcnNbaV0odik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHJlcXVlc3RUZXh0ID0gZnVuY3Rpb24odXJsLCBmblN1Y2Nlc3MsIGZuRmFpbHVyZSkge1xuICAgIGlmICh1YS5pZSAmJiAhd2luZG93LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFYTUxIdHRwUmVxdWVzdCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgciA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHRyeSB7XG4gICAgICByLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG4gICAgICByLnNldFJlcXVlc3RIZWFkZXIoJ1hfUkVRVUVTVEVEX1dJVEgnLCAnWE1MSHR0cFJlcXVlc3QnKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBmbkZhaWx1cmUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgfSwgNTAwMCk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9ICdwcm9ncmVzcyc7XG4gICAgci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChyLnJlYWR5U3RhdGUgPT09IDQgJiYgIWRvbmUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICghci5zdGF0dXMgJiYgbG9jYXRpb24ucHJvdG9jb2wgPT09ICdmaWxlOicpIHx8XG4gICAgICAgICAgKHIuc3RhdHVzID49IDIwMCAmJiByLnN0YXR1cyA8IDMwMCkgfHxcbiAgICAgICAgICByLnN0YXR1cyA9PT0gMzA0IHx8XG4gICAgICAgICAgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgPiAtMSAmJiB0eXBlb2Ygci5zdGF0dXMgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICApIHtcbiAgICAgICAgICBmblN1Y2Nlc3Moci5yZXNwb25zZVRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZuRmFpbHVyZSgpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnJztcbiAgICAgICAgciA9IG51bGw7IC8vIGF2b2lkIG1lbW9yeSBsZWFrc1xuICAgICAgfVxuICAgIH07XG4gICAgci5zZW5kKCcnKTtcbiAgfTtcblxuICB2YXIgc2FuaXRpemUgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShyZWdFeHAuUkVEVU5EQU5UX0NPTVBPTkVOVFMsICcnKTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlZ0V4cC5SRURVTkRBTlRfV0hJVEVTUEFDRSwgJyQxJyk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShyZWdFeHAuV0hJVEVTUEFDRV9JTl9QQVJFTlRIRVNFUywgJygkMSknKTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlZ0V4cC5NT1JFX1dISVRFU1BBQ0UsICcgJyk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShyZWdFeHAuRklOQUxfU0VNSUNPTE9OUywgJ30nKTsgLy8gb3B0aW9uYWwgZmluYWwgc2VtaWNvbG9uc1xuICAgIHJldHVybiB0ZXh0O1xuICB9O1xuXG4gIHZhciBvYmplY3RzID0ge1xuICAgIHN0eWxlc2hlZXQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICB2YXIgbyA9IHt9O1xuICAgICAgdmFyIGFtcXMgPSBbXSxcbiAgICAgICAgbXFscyA9IFtdLFxuICAgICAgICBycyA9IFtdLFxuICAgICAgICByc3cgPSBbXTtcbiAgICAgIHZhciBzID0gZWwuY3NzSGVscGVyVGV4dDtcblxuICAgICAgLy8gYWRkIGF0dHJpYnV0ZSBtZWRpYSBxdWVyaWVzXG4gICAgICB2YXIgYXR0ciA9IGVsLmdldEF0dHJpYnV0ZSgnbWVkaWEnKTtcbiAgICAgIGlmIChhdHRyKSB7XG4gICAgICAgIHZhciBxdHMgPSBhdHRyLnRvTG93ZXJDYXNlKCkuc3BsaXQoJywnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBxdHMgPSBbJ2FsbCddOyAvLyBpbXBseSAnYWxsJ1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYW1xc1thbXFzLmxlbmd0aF0gPSBvYmplY3RzLm1lZGlhUXVlcnkocXRzW2ldLCBvKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkIG1lZGlhIHF1ZXJ5IGxpc3RzIGFuZCBydWxlcyAodG9wIGRvd24gb3JkZXIpXG4gICAgICB2YXIgYmxvY2tzID0gcy5tYXRjaChyZWdFeHAuQkxPQ0tTKTsgLy8gQGNoYXJzZXQgaXMgbm90IGEgYmxvY2tcbiAgICAgIGlmIChibG9ja3MgIT09IG51bGwpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoYmxvY2tzW2ldLnN1YnN0cmluZygwLCA3KSA9PT0gJ0BtZWRpYSAnKSB7XG4gICAgICAgICAgICAvLyBtZWRpYSBxdWVyeSAobGlzdClcbiAgICAgICAgICAgIHZhciBtcWwgPSBvYmplY3RzLm1lZGlhUXVlcnlMaXN0KGJsb2Nrc1tpXSwgbyk7XG4gICAgICAgICAgICBycyA9IHJzLmNvbmNhdChtcWwuZ2V0UnVsZXMoKSk7XG4gICAgICAgICAgICBtcWxzW21xbHMubGVuZ3RoXSA9IG1xbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcmVndWxhciBydWxlIHNldCwgcGFnZSBjb250ZXh0IChAcGFnZSkgb3IgZm9udCBkZXNjcmlwdGlvbiAoQGZvbnQtZmFjZSlcbiAgICAgICAgICAgIHJzW3JzLmxlbmd0aF0gPSByc3dbcnN3Lmxlbmd0aF0gPSBvYmplY3RzLnJ1bGUoYmxvY2tzW2ldLCBvLCBudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgby5lbGVtZW50ID0gZWw7XG4gICAgICBvLmdldENzc1RleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgICB9O1xuICAgICAgby5nZXRBdHRyTWVkaWFRdWVyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhbXFzO1xuICAgICAgfTtcbiAgICAgIG8uZ2V0TWVkaWFRdWVyeUxpc3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBtcWxzO1xuICAgICAgfTtcbiAgICAgIG8uZ2V0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHJzO1xuICAgICAgfTtcbiAgICAgIG8uZ2V0UnVsZXNXaXRob3V0TVEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHJzdztcbiAgICAgIH07XG4gICAgICByZXR1cm4gbztcbiAgICB9LFxuXG4gICAgbWVkaWFRdWVyeUxpc3Q6IGZ1bmN0aW9uKHMsIHN0c2gpIHtcbiAgICAgIHZhciBvID0ge307XG4gICAgICB2YXIgaWR4ID0gcy5pbmRleE9mKCd7Jyk7XG4gICAgICB2YXIgbHQgPSBzLnN1YnN0cmluZygwLCBpZHgpO1xuICAgICAgcyA9IHMuc3Vic3RyaW5nKGlkeCArIDEsIHMubGVuZ3RoIC0gMSk7XG4gICAgICB2YXIgbXFzID0gW10sXG4gICAgICAgIHJzID0gW107XG5cbiAgICAgIC8vIGFkZCBtZWRpYSBxdWVyaWVzXG4gICAgICB2YXIgcXRzID0gbHRcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgLnN1YnN0cmluZyg3KVxuICAgICAgICAuc3BsaXQoJywnKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIHBhcnNlIGVhY2ggbWVkaWEgcXVlcnlcbiAgICAgICAgbXFzW21xcy5sZW5ndGhdID0gb2JqZWN0cy5tZWRpYVF1ZXJ5KHF0c1tpXSwgbyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCBydWxlIHNldHNcbiAgICAgIHZhciBydHMgPSBzLm1hdGNoKHJlZ0V4cC5CTE9DS1NfSU5TSURFKTtcbiAgICAgIGlmIChydHMgIT09IG51bGwpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHJzW3JzLmxlbmd0aF0gPSBvYmplY3RzLnJ1bGUocnRzW2ldLCBzdHNoLCBvKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvLnR5cGUgPSAnbWVkaWFRdWVyeUxpc3QnO1xuICAgICAgby5nZXRNZWRpYVF1ZXJpZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG1xcztcbiAgICAgIH07XG4gICAgICBvLmdldFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBycztcbiAgICAgIH07XG4gICAgICBvLmdldExpc3RUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBsdDtcbiAgICAgIH07XG4gICAgICBvLmdldENzc1RleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIG87XG4gICAgfSxcblxuICAgIG1lZGlhUXVlcnk6IGZ1bmN0aW9uKHMsIGxpc3RPclNoZWV0KSB7XG4gICAgICBzID0gcyB8fCAnJztcbiAgICAgIHZhciBtcWwsIHN0c2g7XG4gICAgICBpZiAobGlzdE9yU2hlZXQudHlwZSA9PT0gJ21lZGlhUXVlcnlMaXN0Jykge1xuICAgICAgICBtcWwgPSBsaXN0T3JTaGVldDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0c2ggPSBsaXN0T3JTaGVldDtcbiAgICAgIH1cbiAgICAgIHZhciBub3QgPSBmYWxzZSxcbiAgICAgICAgdHlwZTtcbiAgICAgIHZhciBleHByID0gW107XG4gICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgdmFyIHRva2VucyA9IHMubWF0Y2gocmVnRXhwLk5PVF9XSElURVNQQUNFKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBpZiAoIXR5cGUgJiYgKHRva2VuID09PSAnbm90JyB8fCB0b2tlbiA9PT0gJ29ubHknKSkge1xuICAgICAgICAgIC8vICdub3QnIGFuZCAnb25seScga2V5d29yZHNcbiAgICAgICAgICAvLyBrZXl3b3JkICdvbmx5JyBkb2VzIG5vdGhpbmcsIGFzIGlmIGl0IHdhcyBub3QgcHJlc2VudFxuICAgICAgICAgIGlmICh0b2tlbiA9PT0gJ25vdCcpIHtcbiAgICAgICAgICAgIG5vdCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgLy8gbWVkaWEgdHlwZVxuICAgICAgICAgIHR5cGUgPSB0b2tlbjtcbiAgICAgICAgfSBlbHNlIGlmICh0b2tlbi5jaGFyQXQoMCkgPT09ICcoJykge1xuICAgICAgICAgIC8vIG1lZGlhIGZlYXR1cmUgZXhwcmVzc2lvblxuICAgICAgICAgIHZhciBwYWlyID0gdG9rZW4uc3Vic3RyaW5nKDEsIHRva2VuLmxlbmd0aCAtIDEpLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgZXhwcltleHByLmxlbmd0aF0gPSB7XG4gICAgICAgICAgICBtZWRpYUZlYXR1cmU6IHBhaXJbMF0sXG4gICAgICAgICAgICB2YWx1ZTogcGFpclsxXSB8fCBudWxsLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UXVlcnlUZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0QXR0clN0eWxlU2hlZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBzdHNoIHx8IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGdldExpc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBtcWwgfHwgbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VmFsaWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Tm90OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gbm90O1xuICAgICAgICB9LFxuICAgICAgICBnZXRNZWRpYVR5cGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRFeHByZXNzaW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBydWxlOiBmdW5jdGlvbihzLCBzdHNoLCBtcWwpIHtcbiAgICAgIHZhciBvID0ge307XG4gICAgICB2YXIgaWR4ID0gcy5pbmRleE9mKCd7Jyk7XG4gICAgICB2YXIgc3QgPSBzLnN1YnN0cmluZygwLCBpZHgpO1xuICAgICAgdmFyIHNzID0gc3Quc3BsaXQoJywnKTtcbiAgICAgIHZhciBkcyA9IFtdO1xuICAgICAgdmFyIGR0cyA9IHMuc3Vic3RyaW5nKGlkeCArIDEsIHMubGVuZ3RoIC0gMSkuc3BsaXQoJzsnKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRzW2RzLmxlbmd0aF0gPSBvYmplY3RzLmRlY2xhcmF0aW9uKGR0c1tpXSwgbyk7XG4gICAgICB9XG5cbiAgICAgIG8uZ2V0U3R5bGVzaGVldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc3RzaCB8fCBudWxsO1xuICAgICAgfTtcbiAgICAgIG8uZ2V0TWVkaWFRdWVyeUxpc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG1xbCB8fCBudWxsO1xuICAgICAgfTtcbiAgICAgIG8uZ2V0U2VsZWN0b3JzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzcztcbiAgICAgIH07XG4gICAgICBvLmdldFNlbGVjdG9yVGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc3Q7XG4gICAgICB9O1xuICAgICAgby5nZXREZWNsYXJhdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGRzO1xuICAgICAgfTtcbiAgICAgIG8uZ2V0UHJvcGVydHlWYWx1ZSA9IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChkc1tpXS5nZXRQcm9wZXJ0eSgpID09PSBuKSB7XG4gICAgICAgICAgICByZXR1cm4gZHNbaV0uZ2V0VmFsdWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIG87XG4gICAgfSxcblxuICAgIGRlY2xhcmF0aW9uOiBmdW5jdGlvbihzLCByKSB7XG4gICAgICB2YXIgaWR4ID0gcy5pbmRleE9mKCc6Jyk7XG4gICAgICB2YXIgcCA9IHMuc3Vic3RyaW5nKDAsIGlkeCk7XG4gICAgICB2YXIgdiA9IHMuc3Vic3RyaW5nKGlkeCArIDEpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UnVsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHIgfHwgbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UHJvcGVydHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9LFxuICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0sXG4gIH07XG5cbiAgdmFyIHBhcnNlVGV4dCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgaWYgKHR5cGVvZiBlbC5jc3NIZWxwZXJUZXh0ICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbyA9IHtcbiAgICAgIHN0eWxlc2hlZXQ6IG51bGwsXG4gICAgICBtZWRpYVF1ZXJ5TGlzdHM6IFtdLFxuICAgICAgcnVsZXM6IFtdLFxuICAgICAgc2VsZWN0b3JzOiB7fSxcbiAgICAgIGRlY2xhcmF0aW9uczogW10sXG4gICAgICBwcm9wZXJ0aWVzOiB7fSxcbiAgICB9O1xuXG4gICAgLy8gYnVpbGQgc3R5bGVzaGVldCBvYmplY3RcbiAgICB2YXIgc3RzaCA9IChvLnN0eWxlc2hlZXQgPSBvYmplY3RzLnN0eWxlc2hlZXQoZWwpKTtcblxuICAgIC8vIGNvbGxlY3QgbWVkaWEgcXVlcnkgbGlzdHNcbiAgICB2YXIgbXFscyA9IChvLm1lZGlhUXVlcnlMaXN0cyA9IHN0c2guZ2V0TWVkaWFRdWVyeUxpc3RzKCkpO1xuXG4gICAgLy8gY29sbGVjdCBhbGwgcnVsZXNcbiAgICB2YXIgb3JzID0gKG8ucnVsZXMgPSBzdHNoLmdldFJ1bGVzKCkpO1xuXG4gICAgLy8gY29sbGVjdCBhbGwgc2VsZWN0b3JzXG4gICAgdmFyIG9zcyA9IG8uc2VsZWN0b3JzO1xuICAgIHZhciBjb2xsZWN0U2VsZWN0b3JzID0gZnVuY3Rpb24ocikge1xuICAgICAgdmFyIHNzID0gci5nZXRTZWxlY3RvcnMoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG4gPSBzc1tpXTtcbiAgICAgICAgaWYgKCFvc3Nbbl0pIHtcbiAgICAgICAgICBvc3Nbbl0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBvc3Nbbl1bb3NzW25dLmxlbmd0aF0gPSByO1xuICAgICAgfVxuICAgIH07XG4gICAgZm9yIChpID0gMDsgaSA8IG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29sbGVjdFNlbGVjdG9ycyhvcnNbaV0pO1xuICAgIH1cblxuICAgIC8vIGNvbGxlY3QgYWxsIGRlY2xhcmF0aW9uc1xuICAgIHZhciBvZHMgPSBvLmRlY2xhcmF0aW9ucztcbiAgICBmb3IgKGkgPSAwOyBpIDwgb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvZHMgPSBvLmRlY2xhcmF0aW9ucyA9IG9kcy5jb25jYXQob3JzW2ldLmdldERlY2xhcmF0aW9ucygpKTtcbiAgICB9XG5cbiAgICAvLyBjb2xsZWN0IGFsbCBwcm9wZXJ0aWVzXG4gICAgdmFyIG9wcyA9IG8ucHJvcGVydGllcztcbiAgICBmb3IgKGkgPSAwOyBpIDwgb2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbiA9IG9kc1tpXS5nZXRQcm9wZXJ0eSgpO1xuICAgICAgaWYgKCFvcHNbbl0pIHtcbiAgICAgICAgb3BzW25dID0gW107XG4gICAgICB9XG4gICAgICBvcHNbbl1bb3BzW25dLmxlbmd0aF0gPSBvZHNbaV07XG4gICAgfVxuXG4gICAgZWwuY3NzSGVscGVyUGFyc2VkID0gbztcbiAgICBwYXJzZWRbcGFyc2VkLmxlbmd0aF0gPSBlbDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICB2YXIgcGFyc2VFbWJlZGRlZCA9IGZ1bmN0aW9uKGVsLCBzKSB7XG4gICAgcmV0dXJuO1xuICAgIC8vIFRoaXMgZnVuY3Rpb24gZG9lc24ndCB3b3JrIGJlY2F1c2Ugb2YgYSBidWcgaW4gSUUsIHdoZXJlIGlubmVySFRNTCBnaXZlcyB1cyBwYXJzZWQgY3NzIGluc3RlYWQgb2YgcmF3IGxpdGVyYWwuXG4gICAgZWwuY3NzSGVscGVyVGV4dCA9IHNhbml0aXplKHMgfHwgZWwuaW5uZXJIVE1MKTtcbiAgICByZXR1cm4gcGFyc2VUZXh0KGVsKTtcbiAgfTtcblxuICB2YXIgcGFyc2UgPSBmdW5jdGlvbigpIHtcbiAgICBwYXJzaW5nID0gdHJ1ZTtcbiAgICBwYXJzZWQgPSBbXTtcbiAgICB2YXIgbGlua2VkID0gW107XG4gICAgdmFyIGZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5rZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFyc2VUZXh0KGxpbmtlZFtpXSk7XG4gICAgICB9XG4gICAgICB2YXIgc3R5bGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0eWxlJyk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhcnNlRW1iZWRkZWQoc3R5bGVzW2ldKTtcbiAgICAgIH1cbiAgICAgIHBhcnNpbmcgPSBmYWxzZTtcbiAgICAgIHJlYWR5KCk7XG4gICAgfTtcbiAgICB2YXIgbGlua3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGluaycpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsaW5rID0gbGlua3NbaV07XG4gICAgICBpZiAobGluay5nZXRBdHRyaWJ1dGUoJ3JlbCcpLmluZGV4T2YoJ3N0eWxlJykgPiAtMSAmJiBsaW5rLmhyZWYgJiYgbGluay5ocmVmLmxlbmd0aCAhPT0gMCAmJiAhbGluay5kaXNhYmxlZCkge1xuICAgICAgICBsaW5rZWRbbGlua2VkLmxlbmd0aF0gPSBsaW5rO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobGlua2VkLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBjID0gMDtcbiAgICAgIHZhciBjaGVja0ZvckZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjKys7XG4gICAgICAgIGlmIChjID09PSBsaW5rZWQubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gcGFyc2UgaW4gcmlnaHQgb3JkZXIsIHNvIGFmdGVyIGxhc3QgbGluayBpcyByZWFkXG4gICAgICAgICAgZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgcHJvY2Vzc0xpbmsgPSBmdW5jdGlvbihsaW5rKSB7XG4gICAgICAgIHZhciBocmVmID0gbGluay5ocmVmO1xuICAgICAgICByZXF1ZXN0VGV4dChcbiAgICAgICAgICBocmVmLFxuICAgICAgICAgIGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICAgIC8vIGZpeCB1cmwnc1xuICAgICAgICAgICAgdGV4dCA9IHNhbml0aXplKHRleHQpLnJlcGxhY2UocmVnRXhwLlJFTEFUSVZFX1VSTFMsICd1cmwoJyArIGhyZWYuc3Vic3RyaW5nKDAsIGhyZWYubGFzdEluZGV4T2YoJy8nKSkgKyAnLyQxKScpO1xuICAgICAgICAgICAgbGluay5jc3NIZWxwZXJUZXh0ID0gdGV4dDtcbiAgICAgICAgICAgIGNoZWNrRm9yRmluaXNoKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaGVja0ZvckZpbmlzaFxuICAgICAgICApO1xuICAgICAgfTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsaW5rZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcHJvY2Vzc0xpbmsobGlua2VkW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZmluaXNoKCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciB0eXBlcyA9IHtcbiAgICBzdHlsZXNoZWV0czogJ2FycmF5JyxcbiAgICBtZWRpYVF1ZXJ5TGlzdHM6ICdhcnJheScsXG4gICAgcnVsZXM6ICdhcnJheScsXG4gICAgc2VsZWN0b3JzOiAnb2JqZWN0JyxcbiAgICBkZWNsYXJhdGlvbnM6ICdhcnJheScsXG4gICAgcHJvcGVydGllczogJ29iamVjdCcsXG4gIH07XG5cbiAgdmFyIGNvbGxlY3Rpb25zID0ge1xuICAgIHN0eWxlc2hlZXRzOiBudWxsLFxuICAgIG1lZGlhUXVlcnlMaXN0czogbnVsbCxcbiAgICBydWxlczogbnVsbCxcbiAgICBzZWxlY3RvcnM6IG51bGwsXG4gICAgZGVjbGFyYXRpb25zOiBudWxsLFxuICAgIHByb3BlcnRpZXM6IG51bGwsXG4gIH07XG5cbiAgdmFyIGFkZFRvQ29sbGVjdGlvbiA9IGZ1bmN0aW9uKG5hbWUsIHYpIHtcbiAgICBpZiAoY29sbGVjdGlvbnNbbmFtZV0gIT09IG51bGwpIHtcbiAgICAgIGlmICh0eXBlc1tuYW1lXSA9PT0gJ2FycmF5Jykge1xuICAgICAgICByZXR1cm4gKGNvbGxlY3Rpb25zW25hbWVdID0gY29sbGVjdGlvbnNbbmFtZV0uY29uY2F0KHYpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBjID0gY29sbGVjdGlvbnNbbmFtZV07XG4gICAgICAgIGZvciAodmFyIG4gaW4gdikge1xuICAgICAgICAgIGlmICh2Lmhhc093blByb3BlcnR5KG4pKSB7XG4gICAgICAgICAgICBpZiAoIWNbbl0pIHtcbiAgICAgICAgICAgICAgY1tuXSA9IHZbbl07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjW25dID0gY1tuXS5jb25jYXQodltuXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgY29sbGVjdCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBjb2xsZWN0aW9uc1tuYW1lXSA9IHR5cGVzW25hbWVdID09PSAnYXJyYXknID8gW10gOiB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnNlZC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBuYW1lID0gbmFtZSA9PT0gJ3N0eWxlc2hlZXRzJyA/ICdzdHlsZXNoZWV0JyA6IG5hbWU7IC8vIHRoZSBleGNlcHRpb25cbiAgICAgIGFkZFRvQ29sbGVjdGlvbihuYW1lLCBwYXJzZWRbaV0uY3NzSGVscGVyUGFyc2VkW3BuYW1lXSk7XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uc1tuYW1lXTtcbiAgfTtcblxuICAvLyB2aWV3cG9ydCBzaXplXG4gIHZhciBnZXRWaWV3cG9ydFNpemUgPSBmdW5jdGlvbihkKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuaW5uZXJXaWR0aCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHdpbmRvd1snaW5uZXInICsgZF07XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHR5cGVvZiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoICE9IDBcbiAgICApIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbJ2NsaWVudCcgKyBkXTtcbiAgICB9XG4gIH07XG5cbiAgLy8gcHVibGljIHN0YXRpYyBmdW5jdGlvbnNcbiAgcmV0dXJuIHtcbiAgICBhZGRTdHlsZTogZnVuY3Rpb24ocywgbWVkaWFUeXBlcywgcHJvY2Vzcykge1xuICAgICAgdmFyIGVsO1xuICAgICAgdmFyIHN0eWxlRWxJZCA9ICdjc3MtbWVkaWFxdWVyaWVzLWpzJztcbiAgICAgIHZhciBzdHlsZU1lZGlhID0gJyc7XG5cbiAgICAgIHZhciBzdHlsZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3R5bGVFbElkKTtcblxuICAgICAgaWYgKG1lZGlhVHlwZXMgJiYgbWVkaWFUeXBlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHN0eWxlTWVkaWEgPSBtZWRpYVR5cGVzLmpvaW4oJywnKTtcbiAgICAgICAgc3R5bGVFbElkICs9IHN0eWxlTWVkaWE7XG4gICAgICB9XG5cbiAgICAgIGlmIChudWxsICE9PSBzdHlsZUVsKSB7XG4gICAgICAgIGVsID0gc3R5bGVFbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnaWQnLCBzdHlsZUVsSWQpO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgc3R5bGVNZWRpYSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwuc3R5bGVTaGVldCkge1xuICAgICAgICAvLyBJRVxuICAgICAgICBlbC5zdHlsZVNoZWV0LmNzc1RleHQgKz0gcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHMpKTtcbiAgICAgIH1cblxuICAgICAgZWwuYWRkZWRXaXRoQ3NzSGVscGVyID0gdHJ1ZTtcblxuICAgICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJyB8fCBwcm9jZXNzID09PSB0cnVlKSB7XG4gICAgICAgIGNzc0hlbHBlci5wYXJzZWQoZnVuY3Rpb24ocGFyc2VkKSB7XG4gICAgICAgICAgdmFyIG8gPSBwYXJzZUVtYmVkZGVkKGVsLCBzKTtcbiAgICAgICAgICBmb3IgKHZhciBuIGluIG8pIHtcbiAgICAgICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KG4pKSB7XG4gICAgICAgICAgICAgIGFkZFRvQ29sbGVjdGlvbihuLCBvW25dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJvYWRjYXN0KCduZXdTdHlsZVBhcnNlZCcsIGVsKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5wYXJzaW5nRGlzYWxsb3dlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWw7XG4gICAgfSxcblxuICAgIHJlbW92ZVN0eWxlOiBmdW5jdGlvbihlbCkge1xuICAgICAgaWYgKGVsLnBhcmVudE5vZGUpIHJldHVybiBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICB9LFxuXG4gICAgcGFyc2VkOiBmdW5jdGlvbihmbikge1xuICAgICAgaWYgKHBhcnNpbmcpIHtcbiAgICAgICAgd2FpdChmbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIHBhcnNlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBmbihwYXJzZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3YWl0KGZuKTtcbiAgICAgICAgICBwYXJzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0eWxlc2hlZXRzOiBmdW5jdGlvbihmbikge1xuICAgICAgY3NzSGVscGVyLnBhcnNlZChmdW5jdGlvbihwYXJzZWQpIHtcbiAgICAgICAgZm4oY29sbGVjdGlvbnMuc3R5bGVzaGVldHMgfHwgY29sbGVjdCgnc3R5bGVzaGVldHMnKSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgbWVkaWFRdWVyeUxpc3RzOiBmdW5jdGlvbihmbikge1xuICAgICAgY3NzSGVscGVyLnBhcnNlZChmdW5jdGlvbihwYXJzZWQpIHtcbiAgICAgICAgZm4oY29sbGVjdGlvbnMubWVkaWFRdWVyeUxpc3RzIHx8IGNvbGxlY3QoJ21lZGlhUXVlcnlMaXN0cycpKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBydWxlczogZnVuY3Rpb24oZm4pIHtcbiAgICAgIGNzc0hlbHBlci5wYXJzZWQoZnVuY3Rpb24ocGFyc2VkKSB7XG4gICAgICAgIGZuKGNvbGxlY3Rpb25zLnJ1bGVzIHx8IGNvbGxlY3QoJ3J1bGVzJykpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNlbGVjdG9yczogZnVuY3Rpb24oZm4pIHtcbiAgICAgIGNzc0hlbHBlci5wYXJzZWQoZnVuY3Rpb24ocGFyc2VkKSB7XG4gICAgICAgIGZuKGNvbGxlY3Rpb25zLnNlbGVjdG9ycyB8fCBjb2xsZWN0KCdzZWxlY3RvcnMnKSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgZGVjbGFyYXRpb25zOiBmdW5jdGlvbihmbikge1xuICAgICAgY3NzSGVscGVyLnBhcnNlZChmdW5jdGlvbihwYXJzZWQpIHtcbiAgICAgICAgZm4oY29sbGVjdGlvbnMuZGVjbGFyYXRpb25zIHx8IGNvbGxlY3QoJ2RlY2xhcmF0aW9ucycpKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiBmdW5jdGlvbihmbikge1xuICAgICAgY3NzSGVscGVyLnBhcnNlZChmdW5jdGlvbihwYXJzZWQpIHtcbiAgICAgICAgZm4oY29sbGVjdGlvbnMucHJvcGVydGllcyB8fCBjb2xsZWN0KCdwcm9wZXJ0aWVzJykpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGJyb2FkY2FzdDogYnJvYWRjYXN0LFxuXG4gICAgYWRkTGlzdGVuZXI6IGZ1bmN0aW9uKG4sIGZuKSB7XG4gICAgICAvLyBpbiBjYXNlIG4gaXMgJ3N0eWxlYWRkJzogYWRkZWQgZnVuY3Rpb24gaXMgY2FsbGVkIGV2ZXJ5dGltZSBzdHlsZSBpcyBhZGRlZCBhbmQgcGFyc2VkXG4gICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmICghZXZlbnRzW25dKSB7XG4gICAgICAgICAgZXZlbnRzW25dID0ge1xuICAgICAgICAgICAgbGlzdGVuZXJzOiBbXSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50c1tuXS5saXN0ZW5lcnNbZXZlbnRzW25dLmxpc3RlbmVycy5sZW5ndGhdID0gZm47XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUxpc3RlbmVyOiBmdW5jdGlvbihuLCBmbikge1xuICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiBldmVudHNbbl0pIHtcbiAgICAgICAgdmFyIGxzID0gZXZlbnRzW25dLmxpc3RlbmVycztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChsc1tpXSA9PT0gZm4pIHtcbiAgICAgICAgICAgIGxzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0Vmlld3BvcnRXaWR0aDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZ2V0Vmlld3BvcnRTaXplKCdXaWR0aCcpO1xuICAgIH0sXG5cbiAgICBnZXRWaWV3cG9ydEhlaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZ2V0Vmlld3BvcnRTaXplKCdIZWlnaHQnKTtcbiAgICB9LFxuICB9O1xufSkoKTtcblxuLy8gZnVuY3Rpb24gdG8gdGVzdCBhbmQgYXBwbHkgcGFyc2VkIG1lZGlhIHF1ZXJpZXMgYWdhaW5zdCBicm93c2VyIGNhcGFiaWxpdGllc1xuZG9tUmVhZHkoXG4gIChmdW5jdGlvbiBlbmFibGVDc3NNZWRpYVF1ZXJpZXMoKSB7XG4gICAgdmFyIG1ldGVyO1xuXG4gICAgdmFyIHJlZ0V4cCA9IHtcbiAgICAgIExFTkdUSF9VTklUOiAvWzAtOV0rKGVtfGV4fHB4fGlufGNtfG1tfHB0fHBjKSQvLFxuICAgICAgUkVTT0xVVElPTl9VTklUOiAvWzAtOV0rKGRwaXxkcGNtKSQvLFxuICAgICAgQVNQRUNUX1JBVElPOiAvXlswLTldK1xcL1swLTldKyQvLFxuICAgICAgQUJTT0xVVEVfVkFMVUU6IC9eWzAtOV0qKFxcLlswLTldKykqJC8sXG4gICAgfTtcblxuICAgIHZhciBzdHlsZXMgPSBbXTtcblxuICAgIHZhciBuYXRpdmVTdXBwb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjaGVjayBzdXBwb3J0IGZvciBtZWRpYSBxdWVyaWVzXG4gICAgICB2YXIgaWQgPSAnY3NzMy1tZWRpYXF1ZXJpZXMtdGVzdCc7XG4gICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGVsLmlkID0gaWQ7XG4gICAgICB2YXIgc3R5bGUgPSBjc3NIZWxwZXIuYWRkU3R5bGUoJ0BtZWRpYSBhbGwgYW5kICh3aWR0aCkgeyAjJyArIGlkICsgJyB7IHdpZHRoOiAxcHggIWltcG9ydGFudDsgfSB9JywgW10sIGZhbHNlKTsgLy8gZmFsc2UgbWVhbnMgZG9uJ3QgcGFyc2UgdGhpcyB0ZW1wIHN0eWxlXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgIHZhciByZXQgPSBlbC5vZmZzZXRXaWR0aCA9PT0gMTtcbiAgICAgIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICBuYXRpdmVTdXBwb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZU1ldGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjcmVhdGUgbWVhc3VyaW5nIGVsZW1lbnRcbiAgICAgIG1ldGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBtZXRlci5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmFic29sdXRlO3RvcDotOTk5OWVtO2xlZnQ6LTk5OTllbTsnICsgJ21hcmdpbjowO2JvcmRlcjpub25lO3BhZGRpbmc6MDt3aWR0aDoxZW07Zm9udC1zaXplOjFlbTsnOyAvLyBjc3NUZXh0IGlzIG5lZWRlZCBmb3IgSUUsIHdvcmtzIGZvciB0aGUgb3RoZXJzXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1ldGVyKTtcbiAgICAgIC8vIG1ldGVyIG11c3QgaGF2ZSBicm93c2VyIGRlZmF1bHQgZm9udCBzaXplIG9mIDE2cHhcbiAgICAgIGlmIChtZXRlci5vZmZzZXRXaWR0aCAhPT0gMTYpIHtcbiAgICAgICAgbWV0ZXIuc3R5bGUuZm9udFNpemUgPSAxNiAvIG1ldGVyLm9mZnNldFdpZHRoICsgJ2VtJztcbiAgICAgIH1cbiAgICAgIG1ldGVyLnN0eWxlLndpZHRoID0gJyc7XG4gICAgfTtcblxuICAgIHZhciBtZWFzdXJlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIG1ldGVyLnN0eWxlLndpZHRoID0gdmFsdWU7XG4gICAgICB2YXIgYW1vdW50ID0gbWV0ZXIub2Zmc2V0V2lkdGg7XG4gICAgICBtZXRlci5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgcmV0dXJuIGFtb3VudDtcbiAgICB9O1xuXG4gICAgdmFyIHRlc3RNZWRpYUZlYXR1cmUgPSBmdW5jdGlvbihmZWF0dXJlLCB2YWx1ZSkge1xuICAgICAgLy8gbm9uLXRlc3RhYmxlIGZlYXR1cmVzOiBtb25vY2hyb21lfG1pbi1tb25vY2hyb21lfG1heC1tb25vY2hyb21lfHNjYW58Z3JpZFxuICAgICAgdmFyIGwgPSBmZWF0dXJlLmxlbmd0aDtcbiAgICAgIHZhciBtaW4gPSBmZWF0dXJlLnN1YnN0cmluZygwLCA0KSA9PT0gJ21pbi0nO1xuICAgICAgdmFyIG1heCA9ICFtaW4gJiYgZmVhdHVyZS5zdWJzdHJpbmcoMCwgNCkgPT09ICdtYXgtJztcblxuICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIC8vIGRldGVybWluZSB2YWx1ZSB0eXBlIGFuZCBwYXJzZSB0byB1c2FibGUgYW1vdW50XG4gICAgICAgIHZhciB2YWx1ZVR5cGU7XG4gICAgICAgIHZhciBhbW91bnQ7XG4gICAgICAgIGlmIChyZWdFeHAuTEVOR1RIX1VOSVQuZXhlYyh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZVR5cGUgPSAnbGVuZ3RoJztcbiAgICAgICAgICBhbW91bnQgPSBtZWFzdXJlKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZWdFeHAuUkVTT0xVVElPTl9VTklULmV4ZWModmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWVUeXBlID0gJ3Jlc29sdXRpb24nO1xuICAgICAgICAgIGFtb3VudCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICAgICAgdmFyIHVuaXQgPSB2YWx1ZS5zdWJzdHJpbmcoKGFtb3VudCArICcnKS5sZW5ndGgpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlZ0V4cC5BU1BFQ1RfUkFUSU8uZXhlYyh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZVR5cGUgPSAnYXNwZWN0LXJhdGlvJztcbiAgICAgICAgICBhbW91bnQgPSB2YWx1ZS5zcGxpdCgnLycpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlZ0V4cC5BQlNPTFVURV9WQUxVRSkge1xuICAgICAgICAgIHZhbHVlVHlwZSA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgYW1vdW50ID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWVUeXBlID0gJ3Vua25vd24nO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB3aWR0aCwgaGVpZ2h0O1xuICAgICAgaWYgKCdkZXZpY2Utd2lkdGgnID09PSBmZWF0dXJlLnN1YnN0cmluZyhsIC0gMTIsIGwpKSB7XG4gICAgICAgIC8vIHNjcmVlbiB3aWR0aFxuICAgICAgICB3aWR0aCA9IHNjcmVlbi53aWR0aDtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHZhbHVlVHlwZSA9PT0gJ2xlbmd0aCcpIHtcbiAgICAgICAgICAgIHJldHVybiAobWluICYmIHdpZHRoID49IGFtb3VudCkgfHwgKG1heCAmJiB3aWR0aCA8IGFtb3VudCkgfHwgKCFtaW4gJiYgIW1heCAmJiB3aWR0aCA9PT0gYW1vdW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0ZXN0IHdpZHRoIHdpdGhvdXQgdmFsdWVcbiAgICAgICAgICByZXR1cm4gd2lkdGggPiAwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCdkZXZpY2UtaGVpZ2h0JyA9PT0gZmVhdHVyZS5zdWJzdHJpbmcobCAtIDEzLCBsKSkge1xuICAgICAgICAvLyBzY3JlZW4gaGVpZ2h0XG4gICAgICAgIGhlaWdodCA9IHNjcmVlbi5oZWlnaHQ7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmICh2YWx1ZVR5cGUgPT09ICdsZW5ndGgnKSB7XG4gICAgICAgICAgICByZXR1cm4gKG1pbiAmJiBoZWlnaHQgPj0gYW1vdW50KSB8fCAobWF4ICYmIGhlaWdodCA8IGFtb3VudCkgfHwgKCFtaW4gJiYgIW1heCAmJiBoZWlnaHQgPT09IGFtb3VudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gdGVzdCBoZWlnaHQgd2l0aG91dCB2YWx1ZVxuICAgICAgICAgIHJldHVybiBoZWlnaHQgPiAwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCd3aWR0aCcgPT09IGZlYXR1cmUuc3Vic3RyaW5nKGwgLSA1LCBsKSkge1xuICAgICAgICAvLyB2aWV3cG9ydCB3aWR0aFxuICAgICAgICB3aWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoOyAvLyB0aGUgbGF0dGVyIGZvciBJRSBxdWlya3MgbW9kZVxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBpZiAodmFsdWVUeXBlID09PSAnbGVuZ3RoJykge1xuICAgICAgICAgICAgcmV0dXJuIChtaW4gJiYgd2lkdGggPj0gYW1vdW50KSB8fCAobWF4ICYmIHdpZHRoIDwgYW1vdW50KSB8fCAoIW1pbiAmJiAhbWF4ICYmIHdpZHRoID09PSBhbW91bnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRlc3Qgd2lkdGggd2l0aG91dCB2YWx1ZVxuICAgICAgICAgIHJldHVybiB3aWR0aCA+IDA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoJ2hlaWdodCcgPT09IGZlYXR1cmUuc3Vic3RyaW5nKGwgLSA2LCBsKSkge1xuICAgICAgICAvLyB2aWV3cG9ydCBoZWlnaHRcbiAgICAgICAgaGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodDsgLy8gdGhlIGxhdHRlciBmb3IgSUUgcXVpcmtzIG1vZGVcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHZhbHVlVHlwZSA9PT0gJ2xlbmd0aCcpIHtcbiAgICAgICAgICAgIHJldHVybiAobWluICYmIGhlaWdodCA+PSBhbW91bnQpIHx8IChtYXggJiYgaGVpZ2h0IDwgYW1vdW50KSB8fCAoIW1pbiAmJiAhbWF4ICYmIGhlaWdodCA9PT0gYW1vdW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0ZXN0IGhlaWdodCB3aXRob3V0IHZhbHVlXG4gICAgICAgICAgcmV0dXJuIGhlaWdodCA+IDA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoJ29yaWVudGF0aW9uJyA9PT0gZmVhdHVyZS5zdWJzdHJpbmcobCAtIDExLCBsKSkge1xuICAgICAgICAvLyBvcmllbnRhdGlvblxuXG4gICAgICAgIHdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7IC8vIHRoZSBsYXR0ZXIgZm9yIElFIHF1aXJrcyBtb2RlXG4gICAgICAgIGhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7IC8vIHRoZSBsYXR0ZXIgZm9yIElFIHF1aXJrcyBtb2RlXG5cbiAgICAgICAgaWYgKHZhbHVlVHlwZSA9PT0gJ2Fic29sdXRlJykge1xuICAgICAgICAgIHJldHVybiBhbW91bnQgPT09ICdwb3J0cmFpdCcgPyB3aWR0aCA8PSBoZWlnaHQgOiB3aWR0aCA+IGhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoJ2FzcGVjdC1yYXRpbycgPT09IGZlYXR1cmUuc3Vic3RyaW5nKGwgLSAxMiwgbCkpIHtcbiAgICAgICAgLy8gd2luZG93IGFzcGVjdCByYXRpb1xuICAgICAgICB3aWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoOyAvLyB0aGUgbGF0dGVyIGZvciBJRSBxdWlya3MgbW9kZVxuICAgICAgICBoZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0OyAvLyB0aGUgbGF0dGVyIGZvciBJRSBxdWlya3MgbW9kZVxuXG4gICAgICAgIHZhciBjdXJSYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgICB2YXIgcmF0aW8gPSBhbW91bnRbMV0gLyBhbW91bnRbMF07XG5cbiAgICAgICAgaWYgKHZhbHVlVHlwZSA9PT0gJ2FzcGVjdC1yYXRpbycpIHtcbiAgICAgICAgICByZXR1cm4gKG1pbiAmJiBjdXJSYXRpbyA+PSByYXRpbykgfHwgKG1heCAmJiBjdXJSYXRpbyA8IHJhdGlvKSB8fCAoIW1pbiAmJiAhbWF4ICYmIGN1clJhdGlvID09PSByYXRpbyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCdkZXZpY2UtYXNwZWN0LXJhdGlvJyA9PT0gZmVhdHVyZS5zdWJzdHJpbmcobCAtIDE5LCBsKSkge1xuICAgICAgICAvLyBzY3JlZW4gYXNwZWN0IHJhdGlvXG4gICAgICAgIHJldHVybiB2YWx1ZVR5cGUgPT09ICdhc3BlY3QtcmF0aW8nICYmIHNjcmVlbi53aWR0aCAqIGFtb3VudFsxXSA9PT0gc2NyZWVuLmhlaWdodCAqIGFtb3VudFswXTtcbiAgICAgIH0gZWxzZSBpZiAoJ2NvbG9yLWluZGV4JyA9PT0gZmVhdHVyZS5zdWJzdHJpbmcobCAtIDExLCBsKSkge1xuICAgICAgICAvLyBudW1iZXIgb2YgY29sb3JzXG4gICAgICAgIHZhciBjb2xvcnMgPSBNYXRoLnBvdygyLCBzY3JlZW4uY29sb3JEZXB0aCk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmICh2YWx1ZVR5cGUgPT09ICdhYnNvbHV0ZScpIHtcbiAgICAgICAgICAgIHJldHVybiAobWluICYmIGNvbG9ycyA+PSBhbW91bnQpIHx8IChtYXggJiYgY29sb3JzIDwgYW1vdW50KSB8fCAoIW1pbiAmJiAhbWF4ICYmIGNvbG9ycyA9PT0gYW1vdW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0ZXN0IGhlaWdodCB3aXRob3V0IHZhbHVlXG4gICAgICAgICAgcmV0dXJuIGNvbG9ycyA+IDA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoJ2NvbG9yJyA9PT0gZmVhdHVyZS5zdWJzdHJpbmcobCAtIDUsIGwpKSB7XG4gICAgICAgIC8vIGJpdHMgcGVyIGNvbG9yIGNvbXBvbmVudFxuICAgICAgICB2YXIgY29sb3IgPSBzY3JlZW4uY29sb3JEZXB0aDtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHZhbHVlVHlwZSA9PT0gJ2Fic29sdXRlJykge1xuICAgICAgICAgICAgcmV0dXJuIChtaW4gJiYgY29sb3IgPj0gYW1vdW50KSB8fCAobWF4ICYmIGNvbG9yIDwgYW1vdW50KSB8fCAoIW1pbiAmJiAhbWF4ICYmIGNvbG9yID09PSBhbW91bnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRlc3QgaGVpZ2h0IHdpdGhvdXQgdmFsdWVcbiAgICAgICAgICByZXR1cm4gY29sb3IgPiAwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCdyZXNvbHV0aW9uJyA9PT0gZmVhdHVyZS5zdWJzdHJpbmcobCAtIDEwLCBsKSkge1xuICAgICAgICB2YXIgcmVzO1xuICAgICAgICBpZiAodW5pdCA9PT0gJ2RwY20nKSB7XG4gICAgICAgICAgcmVzID0gbWVhc3VyZSgnMWNtJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gbWVhc3VyZSgnMWluJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHZhbHVlVHlwZSA9PT0gJ3Jlc29sdXRpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gKG1pbiAmJiByZXMgPj0gYW1vdW50KSB8fCAobWF4ICYmIHJlcyA8IGFtb3VudCkgfHwgKCFtaW4gJiYgIW1heCAmJiByZXMgPT09IGFtb3VudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gdGVzdCBoZWlnaHQgd2l0aG91dCB2YWx1ZVxuICAgICAgICAgIHJldHVybiByZXMgPiAwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciB0ZXN0TWVkaWFRdWVyeSA9IGZ1bmN0aW9uKG1xKSB7XG4gICAgICB2YXIgdGVzdCA9IG1xLmdldFZhbGlkKCk7XG4gICAgICB2YXIgZXhwcmVzc2lvbnMgPSBtcS5nZXRFeHByZXNzaW9ucygpO1xuICAgICAgdmFyIGwgPSBleHByZXNzaW9ucy5sZW5ndGg7XG4gICAgICBpZiAobCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsICYmIHRlc3Q7IGkrKykge1xuICAgICAgICAgIHRlc3QgPSB0ZXN0TWVkaWFGZWF0dXJlKGV4cHJlc3Npb25zW2ldLm1lZGlhRmVhdHVyZSwgZXhwcmVzc2lvbnNbaV0udmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBub3QgPSBtcS5nZXROb3QoKTtcbiAgICAgICAgcmV0dXJuICh0ZXN0ICYmICFub3QpIHx8IChub3QgJiYgIXRlc3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgfTtcblxuICAgIHZhciB0ZXN0TWVkaWFRdWVyeUxpc3QgPSBmdW5jdGlvbihtcWwsIHRzKSB7XG4gICAgICAvLyB0cyBpcyBudWxsIG9yIGFuIGFycmF5IHdpdGggYW55IG1lZGlhIHR5cGUgYnV0ICdhbGwnLlxuICAgICAgdmFyIG1xcyA9IG1xbC5nZXRNZWRpYVF1ZXJpZXMoKTtcbiAgICAgIHZhciB0ID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1xcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHlwZSA9IG1xc1tpXS5nZXRNZWRpYVR5cGUoKTtcbiAgICAgICAgaWYgKG1xc1tpXS5nZXRFeHByZXNzaW9ucygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIC8vIFRPRE86IEJyb3dzZXIgY2hlY2shIEFzc3VtaW5nIG9sZCBicm93c2VycyBkbyBhcHBseSB0aGUgYmFyZSBtZWRpYSB0eXBlcywgZXZlbiBpbiBhIGxpc3Qgd2l0aCBtZWRpYSBxdWVyaWVzLlxuICAgICAgICB9XG4gICAgICAgIHZhciB0eXBlQWxsb3dlZCA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlICE9PSAnYWxsJyAmJiB0cyAmJiB0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdHlwZUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAodHNbal0gPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgdHlwZUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZUFsbG93ZWQgJiYgdGVzdE1lZGlhUXVlcnkobXFzW2ldKSkge1xuICAgICAgICAgIHRbdHlwZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgcyA9IFtdLFxuICAgICAgICBjID0gMDtcbiAgICAgIGZvciAodmFyIG4gaW4gdCkge1xuICAgICAgICBpZiAodC5oYXNPd25Qcm9wZXJ0eShuKSkge1xuICAgICAgICAgIGlmIChjID4gMCkge1xuICAgICAgICAgICAgc1tjKytdID0gJywnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzW2MrK10gPSBuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHN0eWxlc1tzdHlsZXMubGVuZ3RoXSA9IGNzc0hlbHBlci5hZGRTdHlsZSgnQG1lZGlhICcgKyBzLmpvaW4oJycpICsgJ3snICsgbXFsLmdldENzc1RleHQoKSArICd9JywgdHMsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHRlc3RNZWRpYVF1ZXJ5TGlzdHMgPSBmdW5jdGlvbihtcWxzLCB0cykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtcWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRlc3RNZWRpYVF1ZXJ5TGlzdChtcWxzW2ldLCB0cyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciB0ZXN0U3R5bGVzaGVldCA9IGZ1bmN0aW9uKHN0c2gpIHtcbiAgICAgIHZhciBhbXFzID0gc3RzaC5nZXRBdHRyTWVkaWFRdWVyaWVzKCk7XG4gICAgICB2YXIgYWxsUGFzc2VkID0gZmFsc2U7XG4gICAgICB2YXIgdCA9IHt9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbXFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0ZXN0TWVkaWFRdWVyeShhbXFzW2ldKSkge1xuICAgICAgICAgIHRbYW1xc1tpXS5nZXRNZWRpYVR5cGUoKV0gPSBhbXFzW2ldLmdldEV4cHJlc3Npb25zKCkubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHRzID0gW10sXG4gICAgICAgIHRzd2UgPSBbXTtcbiAgICAgIGZvciAodmFyIG4gaW4gdCkge1xuICAgICAgICBpZiAodC5oYXNPd25Qcm9wZXJ0eShuKSkge1xuICAgICAgICAgIHRzW3RzLmxlbmd0aF0gPSBuO1xuICAgICAgICAgIGlmICh0W25dKSB7XG4gICAgICAgICAgICB0c3dlW3Rzd2UubGVuZ3RoXSA9IG47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChuID09PSAnYWxsJykge1xuICAgICAgICAgICAgYWxsUGFzc2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0c3dlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gdHlwZXMgd2l0aCBxdWVyeSBleHByZXNzaW9ucyB0aGF0IHBhc3NlZCB0aGUgdGVzdFxuICAgICAgICBzdHlsZXNbc3R5bGVzLmxlbmd0aF0gPSBjc3NIZWxwZXIuYWRkU3R5bGUoc3RzaC5nZXRDc3NUZXh0KCksIHRzd2UsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHZhciBtcWxzID0gc3RzaC5nZXRNZWRpYVF1ZXJ5TGlzdHMoKTtcbiAgICAgIGlmIChhbGxQYXNzZWQpIHtcbiAgICAgICAgLy8gSWYgJ2FsbCcgaW4gbWVkaWEgYXR0cmlidXRlIHBhc3NlZCB0aGUgdGVzdCwgdGhlbiB0ZXN0IGFsbCBAbWVkaWEgdHlwZXMgaW4gbGlua2VkIENTUyBhbmQgY3JlYXRlIHN0eWxlIHdpdGggdGhvc2UgdHlwZXMuXG4gICAgICAgIHRlc3RNZWRpYVF1ZXJ5TGlzdHMobXFscyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPciBlbHNlLCB0ZXN0IG9ubHkgbWVkaWEgYXR0cmlidXRlIHR5cGVzIHRoYXQgcGFzc2VkIHRoZSB0ZXN0IGFuZCBhbHNvICdhbGwnLlxuICAgICAgICAvLyBGb3IgcG9zaXRpdmUgJ0BtZWRpYSBhbGwnLCBjcmVhdGUgc3R5bGUgd2l0aCBhdHRyaWJ1dGUgdHlwZXMgdGhhdCBwYXNzZWQgdGhlaXIgdGVzdC5cbiAgICAgICAgdGVzdE1lZGlhUXVlcnlMaXN0cyhtcWxzLCB0cyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciB0ZXN0U3R5bGVzaGVldHMgPSBmdW5jdGlvbihzdHNocykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHNocy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0ZXN0U3R5bGVzaGVldChzdHNoc1tpXSk7XG4gICAgICB9XG4gICAgICBpZiAodWEuaWUpIHtcbiAgICAgICAgLy8gZm9yY2UgcmVwYWludCBpbiBJRVxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfSwgMCk7XG4gICAgICAgIC8vIGRlbGF5IGJyb2FkY2FzdCBzb21ld2hhdCBmb3IgSUVcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjc3NIZWxwZXIuYnJvYWRjYXN0KCdjc3NNZWRpYVF1ZXJpZXNUZXN0ZWQnKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNzc0hlbHBlci5icm9hZGNhc3QoJ2Nzc01lZGlhUXVlcmllc1Rlc3RlZCcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgdGVzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY3NzSGVscGVyLnJlbW92ZVN0eWxlKHN0eWxlc1tpXSk7XG4gICAgICB9XG4gICAgICBzdHlsZXMgPSBbXTtcbiAgICAgIGNzc0hlbHBlci5zdHlsZXNoZWV0cyh0ZXN0U3R5bGVzaGVldHMpO1xuICAgIH07XG5cbiAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSAwO1xuICAgIHZhciBjaGVja0ZvclJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGN2cHcgPSBjc3NIZWxwZXIuZ2V0Vmlld3BvcnRXaWR0aCgpO1xuICAgICAgdmFyIGN2cGggPSBjc3NIZWxwZXIuZ2V0Vmlld3BvcnRIZWlnaHQoKTtcblxuICAgICAgLy8gZGV0ZXJtaW5lIHNjcm9sbGJhciB3aWR0aCBpbiBJRSwgc2VlIHJlc2l6ZUhhbmRsZXJcbiAgICAgIGlmICh1YS5pZSkge1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBlbC5zdHlsZS50b3AgPSAnLTk5OTllbSc7XG4gICAgICAgIGVsLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICBzY3JvbGxiYXJXaWR0aCA9IGVsLm9mZnNldFdpZHRoIC0gZWwuY2xpZW50V2lkdGg7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGltZXI7XG4gICAgICB2YXIgcmVzaXplSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdnB3ID0gY3NzSGVscGVyLmdldFZpZXdwb3J0V2lkdGgoKTtcbiAgICAgICAgdmFyIHZwaCA9IGNzc0hlbHBlci5nZXRWaWV3cG9ydEhlaWdodCgpO1xuICAgICAgICAvLyBjaGVjayB3aGV0aGVyIHZwIHNpemUgaGFzIHJlYWxseSBjaGFuZ2VkLCBiZWNhdXNlIElFIGFsc28gdHJpZ2dlcnMgcmVzaXplIGV2ZW50IHdoZW4gYm9keSBzaXplIGNoYW5nZXNcbiAgICAgICAgLy8gMjBweCBhbGxvd2FuY2UgdG8gYWNjb21vZGF0ZSBzaG9ydCBhcHBlYXJhbmNlIG9mIHNjcm9sbGJhcnMgaW4gSUUgaW4gc29tZSBjYXNlc1xuICAgICAgICBpZiAoTWF0aC5hYnModnB3IC0gY3ZwdykgPiBzY3JvbGxiYXJXaWR0aCB8fCBNYXRoLmFicyh2cGggLSBjdnBoKSA+IHNjcm9sbGJhcldpZHRoKSB7XG4gICAgICAgICAgY3ZwdyA9IHZwdztcbiAgICAgICAgICBjdnBoID0gdnBoO1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFuYXRpdmVTdXBwb3J0KCkpIHtcbiAgICAgICAgICAgICAgdGVzdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY3NzSGVscGVyLmJyb2FkY2FzdCgnY3NzTWVkaWFRdWVyaWVzVGVzdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgd2luZG93Lm9ucmVzaXplID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeCA9IHdpbmRvdy5vbnJlc2l6ZSB8fCBmdW5jdGlvbigpIHt9OyAvLyBzYXZlIG9yaWdpbmFsXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB4KCk7XG4gICAgICAgICAgcmVzaXplSGFuZGxlcigpO1xuICAgICAgICB9O1xuICAgICAgfSkoKTtcbiAgICB9O1xuXG4gICAgLy8gcHJldmVudCBqdW1waW5nIG9mIGxheW91dCBieSBoaWRpbmcgZXZlcnl0aGluZyBiZWZvcmUgcGFpbnRpbmcgPGJvZHk+XG4gICAgdmFyIGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGRvY0VsLnN0eWxlLm1hcmdpbkxlZnQgPSAnLTMyNzY3cHgnO1xuXG4gICAgLy8gbWFrZSBzdXJlIGl0IGNvbWVzIGJhY2sgYWZ0ZXIgYSB3aGlsZVxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBkb2NFbC5zdHlsZS5tYXJnaW5MZWZ0ID0gJyc7XG4gICAgfSwgNTAwMCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIW5hdGl2ZVN1cHBvcnQoKSkge1xuICAgICAgICAvLyBpZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBtZWRpYSBxdWVyaWVzXG4gICAgICAgIGNzc0hlbHBlci5hZGRMaXN0ZW5lcignbmV3U3R5bGVQYXJzZWQnLCBmdW5jdGlvbihlbCkge1xuICAgICAgICAgIHRlc3RTdHlsZXNoZWV0KGVsLmNzc0hlbHBlclBhcnNlZC5zdHlsZXNoZWV0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHJldHVybiB2aXNpYmlsaXR5IGFmdGVyIG1lZGlhIHF1ZXJpZXMgYXJlIHRlc3RlZFxuICAgICAgICBjc3NIZWxwZXIuYWRkTGlzdGVuZXIoJ2Nzc01lZGlhUXVlcmllc1Rlc3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIGZvcmNlIHJlcGFpbnQgaW4gSUUgYnkgY2hhbmdpbmcgd2lkdGhcbiAgICAgICAgICBpZiAodWEuaWUpIHtcbiAgICAgICAgICAgIGRvY0VsLnN0eWxlLndpZHRoID0gJzFweCc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2NFbC5zdHlsZS53aWR0aCA9ICcnOyAvLyB1bmRvIHdpZHRoXG4gICAgICAgICAgICBkb2NFbC5zdHlsZS5tYXJnaW5MZWZ0ID0gJyc7IC8vIHVuZG8gaGlkZVxuICAgICAgICAgIH0sIDApO1xuICAgICAgICAgIC8vIHJlbW92ZSB0aGlzIGxpc3RlbmVyIHRvIHByZXZlbnQgZm9sbG93aW5nIGV4ZWN1dGlvblxuICAgICAgICAgIGNzc0hlbHBlci5yZW1vdmVMaXN0ZW5lcignY3NzTWVkaWFRdWVyaWVzVGVzdGVkJywgYXJndW1lbnRzLmNhbGxlZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjcmVhdGVNZXRlcigpO1xuICAgICAgICB0ZXN0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2NFbC5zdHlsZS5tYXJnaW5MZWZ0ID0gJyc7IC8vIHVuZG8gdmlzaWJpbGl0eSBoaWRkZW5cbiAgICAgIH1cbiAgICAgIGNoZWNrRm9yUmVzaXplKCk7XG4gICAgfTtcbiAgfSkoKVxuKTtcblxuLy8gYm9udXM6IGhvdGZpeCBmb3IgSUU2IFNQMSAoYnVnIEtCODIzNzI3KVxudHJ5IHtcbiAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0JhY2tncm91bmRJbWFnZUNhY2hlJywgZmFsc2UsIHRydWUpO1xufSBjYXRjaCAoZSkge31cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvaWUtc2hpbXMvY3NzMy1tZWRpYXF1ZXJpZXMuanMiLCIvKlxuICAgIGpzb24yLmpzXG4gICAgMjAxMS0xMC0xOVxuXG4gICAgUHVibGljIERvbWFpbi5cblxuICAgIE5PIFdBUlJBTlRZIEVYUFJFU1NFRCBPUiBJTVBMSUVELiBVU0UgQVQgWU9VUiBPV04gUklTSy5cblxuICAgIFNlZSBodHRwOi8vd3d3LkpTT04ub3JnL2pzLmh0bWxcblxuXG4gICAgVGhpcyBjb2RlIHNob3VsZCBiZSBtaW5pZmllZCBiZWZvcmUgZGVwbG95bWVudC5cbiAgICBTZWUgaHR0cDovL2phdmFzY3JpcHQuY3JvY2tmb3JkLmNvbS9qc21pbi5odG1sXG5cbiAgICBVU0UgWU9VUiBPV04gQ09QWS4gSVQgSVMgRVhUUkVNRUxZIFVOV0lTRSBUTyBMT0FEIENPREUgRlJPTSBTRVJWRVJTIFlPVSBET1xuICAgIE5PVCBDT05UUk9MLlxuXG5cbiAgICBUaGlzIGZpbGUgY3JlYXRlcyBhIGdsb2JhbCBKU09OIG9iamVjdCBjb250YWluaW5nIHR3byBtZXRob2RzOiBzdHJpbmdpZnlcbiAgICBhbmQgcGFyc2UuXG5cbiAgICAgICAgSlNPTi5zdHJpbmdpZnkodmFsdWUsIHJlcGxhY2VyLCBzcGFjZSlcbiAgICAgICAgICAgIHZhbHVlICAgICAgIGFueSBKYXZhU2NyaXB0IHZhbHVlLCB1c3VhbGx5IGFuIG9iamVjdCBvciBhcnJheS5cblxuICAgICAgICAgICAgcmVwbGFjZXIgICAgYW4gb3B0aW9uYWwgcGFyYW1ldGVyIHRoYXQgZGV0ZXJtaW5lcyBob3cgb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgYXJlIHN0cmluZ2lmaWVkIGZvciBvYmplY3RzLiBJdCBjYW4gYmUgYVxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncy5cblxuICAgICAgICAgICAgc3BhY2UgICAgICAgYW4gb3B0aW9uYWwgcGFyYW1ldGVyIHRoYXQgc3BlY2lmaWVzIHRoZSBpbmRlbnRhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgb2YgbmVzdGVkIHN0cnVjdHVyZXMuIElmIGl0IGlzIG9taXR0ZWQsIHRoZSB0ZXh0IHdpbGxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlIHBhY2tlZCB3aXRob3V0IGV4dHJhIHdoaXRlc3BhY2UuIElmIGl0IGlzIGEgbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXQgd2lsbCBzcGVjaWZ5IHRoZSBudW1iZXIgb2Ygc3BhY2VzIHRvIGluZGVudCBhdCBlYWNoXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXZlbC4gSWYgaXQgaXMgYSBzdHJpbmcgKHN1Y2ggYXMgJ1xcdCcgb3IgJyZuYnNwOycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXQgY29udGFpbnMgdGhlIGNoYXJhY3RlcnMgdXNlZCB0byBpbmRlbnQgYXQgZWFjaCBsZXZlbC5cblxuICAgICAgICAgICAgVGhpcyBtZXRob2QgcHJvZHVjZXMgYSBKU09OIHRleHQgZnJvbSBhIEphdmFTY3JpcHQgdmFsdWUuXG5cbiAgICAgICAgICAgIFdoZW4gYW4gb2JqZWN0IHZhbHVlIGlzIGZvdW5kLCBpZiB0aGUgb2JqZWN0IGNvbnRhaW5zIGEgdG9KU09OXG4gICAgICAgICAgICBtZXRob2QsIGl0cyB0b0pTT04gbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGFuZCB0aGUgcmVzdWx0IHdpbGwgYmVcbiAgICAgICAgICAgIHN0cmluZ2lmaWVkLiBBIHRvSlNPTiBtZXRob2QgZG9lcyBub3Qgc2VyaWFsaXplOiBpdCByZXR1cm5zIHRoZVxuICAgICAgICAgICAgdmFsdWUgcmVwcmVzZW50ZWQgYnkgdGhlIG5hbWUvdmFsdWUgcGFpciB0aGF0IHNob3VsZCBiZSBzZXJpYWxpemVkLFxuICAgICAgICAgICAgb3IgdW5kZWZpbmVkIGlmIG5vdGhpbmcgc2hvdWxkIGJlIHNlcmlhbGl6ZWQuIFRoZSB0b0pTT04gbWV0aG9kXG4gICAgICAgICAgICB3aWxsIGJlIHBhc3NlZCB0aGUga2V5IGFzc29jaWF0ZWQgd2l0aCB0aGUgdmFsdWUsIGFuZCB0aGlzIHdpbGwgYmVcbiAgICAgICAgICAgIGJvdW5kIHRvIHRoZSB2YWx1ZVxuXG4gICAgICAgICAgICBGb3IgZXhhbXBsZSwgdGhpcyB3b3VsZCBzZXJpYWxpemUgRGF0ZXMgYXMgSVNPIHN0cmluZ3MuXG5cbiAgICAgICAgICAgICAgICBEYXRlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGYobikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9ybWF0IGludGVnZXJzIHRvIGhhdmUgYXQgbGVhc3QgdHdvIGRpZ2l0cy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuIDogbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFVUQ0Z1bGxZZWFyKCkgICArICctJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgZih0aGlzLmdldFVUQ01vbnRoKCkgKyAxKSArICctJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgZih0aGlzLmdldFVUQ0RhdGUoKSkgICAgICArICdUJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgZih0aGlzLmdldFVUQ0hvdXJzKCkpICAgICArICc6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgZih0aGlzLmdldFVUQ01pbnV0ZXMoKSkgICArICc6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgZih0aGlzLmdldFVUQ1NlY29uZHMoKSkgICArICdaJztcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBZb3UgY2FuIHByb3ZpZGUgYW4gb3B0aW9uYWwgcmVwbGFjZXIgbWV0aG9kLiBJdCB3aWxsIGJlIHBhc3NlZCB0aGVcbiAgICAgICAgICAgIGtleSBhbmQgdmFsdWUgb2YgZWFjaCBtZW1iZXIsIHdpdGggdGhpcyBib3VuZCB0byB0aGUgY29udGFpbmluZ1xuICAgICAgICAgICAgb2JqZWN0LiBUaGUgdmFsdWUgdGhhdCBpcyByZXR1cm5lZCBmcm9tIHlvdXIgbWV0aG9kIHdpbGwgYmVcbiAgICAgICAgICAgIHNlcmlhbGl6ZWQuIElmIHlvdXIgbWV0aG9kIHJldHVybnMgdW5kZWZpbmVkLCB0aGVuIHRoZSBtZW1iZXIgd2lsbFxuICAgICAgICAgICAgYmUgZXhjbHVkZWQgZnJvbSB0aGUgc2VyaWFsaXphdGlvbi5cblxuICAgICAgICAgICAgSWYgdGhlIHJlcGxhY2VyIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiBzdHJpbmdzLCB0aGVuIGl0IHdpbGwgYmVcbiAgICAgICAgICAgIHVzZWQgdG8gc2VsZWN0IHRoZSBtZW1iZXJzIHRvIGJlIHNlcmlhbGl6ZWQuIEl0IGZpbHRlcnMgdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIHN1Y2ggdGhhdCBvbmx5IG1lbWJlcnMgd2l0aCBrZXlzIGxpc3RlZCBpbiB0aGUgcmVwbGFjZXIgYXJyYXkgYXJlXG4gICAgICAgICAgICBzdHJpbmdpZmllZC5cblxuICAgICAgICAgICAgVmFsdWVzIHRoYXQgZG8gbm90IGhhdmUgSlNPTiByZXByZXNlbnRhdGlvbnMsIHN1Y2ggYXMgdW5kZWZpbmVkIG9yXG4gICAgICAgICAgICBmdW5jdGlvbnMsIHdpbGwgbm90IGJlIHNlcmlhbGl6ZWQuIFN1Y2ggdmFsdWVzIGluIG9iamVjdHMgd2lsbCBiZVxuICAgICAgICAgICAgZHJvcHBlZDsgaW4gYXJyYXlzIHRoZXkgd2lsbCBiZSByZXBsYWNlZCB3aXRoIG51bGwuIFlvdSBjYW4gdXNlXG4gICAgICAgICAgICBhIHJlcGxhY2VyIGZ1bmN0aW9uIHRvIHJlcGxhY2UgdGhvc2Ugd2l0aCBKU09OIHZhbHVlcy5cbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHVuZGVmaW5lZCkgcmV0dXJucyB1bmRlZmluZWQuXG5cbiAgICAgICAgICAgIFRoZSBvcHRpb25hbCBzcGFjZSBwYXJhbWV0ZXIgcHJvZHVjZXMgYSBzdHJpbmdpZmljYXRpb24gb2YgdGhlXG4gICAgICAgICAgICB2YWx1ZSB0aGF0IGlzIGZpbGxlZCB3aXRoIGxpbmUgYnJlYWtzIGFuZCBpbmRlbnRhdGlvbiB0byBtYWtlIGl0XG4gICAgICAgICAgICBlYXNpZXIgdG8gcmVhZC5cblxuICAgICAgICAgICAgSWYgdGhlIHNwYWNlIHBhcmFtZXRlciBpcyBhIG5vbi1lbXB0eSBzdHJpbmcsIHRoZW4gdGhhdCBzdHJpbmcgd2lsbFxuICAgICAgICAgICAgYmUgdXNlZCBmb3IgaW5kZW50YXRpb24uIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBudW1iZXIsIHRoZW5cbiAgICAgICAgICAgIHRoZSBpbmRlbnRhdGlvbiB3aWxsIGJlIHRoYXQgbWFueSBzcGFjZXMuXG5cbiAgICAgICAgICAgIEV4YW1wbGU6XG5cbiAgICAgICAgICAgIHRleHQgPSBKU09OLnN0cmluZ2lmeShbJ2UnLCB7cGx1cmlidXM6ICd1bnVtJ31dKTtcbiAgICAgICAgICAgIC8vIHRleHQgaXMgJ1tcImVcIix7XCJwbHVyaWJ1c1wiOlwidW51bVwifV0nXG5cblxuICAgICAgICAgICAgdGV4dCA9IEpTT04uc3RyaW5naWZ5KFsnZScsIHtwbHVyaWJ1czogJ3VudW0nfV0sIG51bGwsICdcXHQnKTtcbiAgICAgICAgICAgIC8vIHRleHQgaXMgJ1tcXG5cXHRcImVcIixcXG5cXHR7XFxuXFx0XFx0XCJwbHVyaWJ1c1wiOiBcInVudW1cIlxcblxcdH1cXG5dJ1xuXG4gICAgICAgICAgICB0ZXh0ID0gSlNPTi5zdHJpbmdpZnkoW25ldyBEYXRlKCldLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW2tleV0gaW5zdGFuY2VvZiBEYXRlID9cbiAgICAgICAgICAgICAgICAgICAgJ0RhdGUoJyArIHRoaXNba2V5XSArICcpJyA6IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyB0ZXh0IGlzICdbXCJEYXRlKC0tLWN1cnJlbnQgdGltZS0tLSlcIl0nXG5cblxuICAgICAgICBKU09OLnBhcnNlKHRleHQsIHJldml2ZXIpXG4gICAgICAgICAgICBUaGlzIG1ldGhvZCBwYXJzZXMgYSBKU09OIHRleHQgdG8gcHJvZHVjZSBhbiBvYmplY3Qgb3IgYXJyYXkuXG4gICAgICAgICAgICBJdCBjYW4gdGhyb3cgYSBTeW50YXhFcnJvciBleGNlcHRpb24uXG5cbiAgICAgICAgICAgIFRoZSBvcHRpb25hbCByZXZpdmVyIHBhcmFtZXRlciBpcyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGZpbHRlciBhbmRcbiAgICAgICAgICAgIHRyYW5zZm9ybSB0aGUgcmVzdWx0cy4gSXQgcmVjZWl2ZXMgZWFjaCBvZiB0aGUga2V5cyBhbmQgdmFsdWVzLFxuICAgICAgICAgICAgYW5kIGl0cyByZXR1cm4gdmFsdWUgaXMgdXNlZCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCB2YWx1ZS5cbiAgICAgICAgICAgIElmIGl0IHJldHVybnMgd2hhdCBpdCByZWNlaXZlZCwgdGhlbiB0aGUgc3RydWN0dXJlIGlzIG5vdCBtb2RpZmllZC5cbiAgICAgICAgICAgIElmIGl0IHJldHVybnMgdW5kZWZpbmVkIHRoZW4gdGhlIG1lbWJlciBpcyBkZWxldGVkLlxuXG4gICAgICAgICAgICBFeGFtcGxlOlxuXG4gICAgICAgICAgICAvLyBQYXJzZSB0aGUgdGV4dC4gVmFsdWVzIHRoYXQgbG9vayBsaWtlIElTTyBkYXRlIHN0cmluZ3Mgd2lsbFxuICAgICAgICAgICAgLy8gYmUgY29udmVydGVkIHRvIERhdGUgb2JqZWN0cy5cblxuICAgICAgICAgICAgbXlEYXRhID0gSlNPTi5wYXJzZSh0ZXh0LCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBhO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGEgPVxuL14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KD86XFwuXFxkKik/KVokLy5leGVjKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygrYVsxXSwgK2FbMl0gLSAxLCArYVszXSwgK2FbNF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgK2FbNV0sICthWzZdKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG15RGF0YSA9IEpTT04ucGFyc2UoJ1tcIkRhdGUoMDkvMDkvMjAwMSlcIl0nLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBkO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5zbGljZSgwLCA1KSA9PT0gJ0RhdGUoJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuc2xpY2UoLTEpID09PSAnKScpIHtcbiAgICAgICAgICAgICAgICAgICAgZCA9IG5ldyBEYXRlKHZhbHVlLnNsaWNlKDUsIC0xKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgVGhpcyBpcyBhIHJlZmVyZW5jZSBpbXBsZW1lbnRhdGlvbi4gWW91IGFyZSBmcmVlIHRvIGNvcHksIG1vZGlmeSwgb3JcbiAgICByZWRpc3RyaWJ1dGUuXG4qL1xuXG4vKmpzbGludCBldmlsOiB0cnVlLCByZWdleHA6IHRydWUgKi9cblxuLyptZW1iZXJzIFwiXCIsIFwiXFxiXCIsIFwiXFx0XCIsIFwiXFxuXCIsIFwiXFxmXCIsIFwiXFxyXCIsIFwiXFxcIlwiLCBKU09OLCBcIlxcXFxcIiwgYXBwbHksXG4gICAgY2FsbCwgY2hhckNvZGVBdCwgZ2V0VVRDRGF0ZSwgZ2V0VVRDRnVsbFllYXIsIGdldFVUQ0hvdXJzLFxuICAgIGdldFVUQ01pbnV0ZXMsIGdldFVUQ01vbnRoLCBnZXRVVENTZWNvbmRzLCBoYXNPd25Qcm9wZXJ0eSwgam9pbixcbiAgICBsYXN0SW5kZXgsIGxlbmd0aCwgcGFyc2UsIHByb3RvdHlwZSwgcHVzaCwgcmVwbGFjZSwgc2xpY2UsIHN0cmluZ2lmeSxcbiAgICB0ZXN0LCB0b0pTT04sIHRvU3RyaW5nLCB2YWx1ZU9mXG4qL1xuXG4vLyBDcmVhdGUgYSBKU09OIG9iamVjdCBvbmx5IGlmIG9uZSBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LiBXZSBjcmVhdGUgdGhlXG4vLyBtZXRob2RzIGluIGEgY2xvc3VyZSB0byBhdm9pZCBjcmVhdGluZyBnbG9iYWwgdmFyaWFibGVzLlxuXG52YXIgSlNPTjtcbmlmICghSlNPTikge1xuICBKU09OID0ge307XG59XG5cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIGYobikge1xuICAgIC8vIEZvcm1hdCBpbnRlZ2VycyB0byBoYXZlIGF0IGxlYXN0IHR3byBkaWdpdHMuXG4gICAgcmV0dXJuIG4gPCAxMCA/ICcwJyArIG4gOiBuO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBEYXRlLnByb3RvdHlwZS50b0pTT04gIT09ICdmdW5jdGlvbicpIHtcbiAgICBEYXRlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBpc0Zpbml0ZSh0aGlzLnZhbHVlT2YoKSlcbiAgICAgICAgPyB0aGlzLmdldFVUQ0Z1bGxZZWFyKCkgK1xuICAgICAgICAgICAgJy0nICtcbiAgICAgICAgICAgIGYodGhpcy5nZXRVVENNb250aCgpICsgMSkgK1xuICAgICAgICAgICAgJy0nICtcbiAgICAgICAgICAgIGYodGhpcy5nZXRVVENEYXRlKCkpICtcbiAgICAgICAgICAgICdUJyArXG4gICAgICAgICAgICBmKHRoaXMuZ2V0VVRDSG91cnMoKSkgK1xuICAgICAgICAgICAgJzonICtcbiAgICAgICAgICAgIGYodGhpcy5nZXRVVENNaW51dGVzKCkpICtcbiAgICAgICAgICAgICc6JyArXG4gICAgICAgICAgICBmKHRoaXMuZ2V0VVRDU2Vjb25kcygpKSArXG4gICAgICAgICAgICAnWidcbiAgICAgICAgOiBudWxsO1xuICAgIH07XG5cbiAgICBTdHJpbmcucHJvdG90eXBlLnRvSlNPTiA9IE51bWJlci5wcm90b3R5cGUudG9KU09OID0gQm9vbGVhbi5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBjeCA9IC9bXFx1MDAwMFxcdTAwYWRcXHUwNjAwLVxcdTA2MDRcXHUwNzBmXFx1MTdiNFxcdTE3YjVcXHUyMDBjLVxcdTIwMGZcXHUyMDI4LVxcdTIwMmZcXHUyMDYwLVxcdTIwNmZcXHVmZWZmXFx1ZmZmMC1cXHVmZmZmXS9nLFxuICAgIGVzY2FwYWJsZSA9IC9bXFxcXFxcXCJcXHgwMC1cXHgxZlxceDdmLVxceDlmXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2csXG4gICAgZ2FwLFxuICAgIGluZGVudCxcbiAgICBtZXRhID0ge1xuICAgICAgLy8gdGFibGUgb2YgY2hhcmFjdGVyIHN1YnN0aXR1dGlvbnNcbiAgICAgICdcXGInOiAnXFxcXGInLFxuICAgICAgJ1xcdCc6ICdcXFxcdCcsXG4gICAgICAnXFxuJzogJ1xcXFxuJyxcbiAgICAgICdcXGYnOiAnXFxcXGYnLFxuICAgICAgJ1xccic6ICdcXFxccicsXG4gICAgICAnXCInOiAnXFxcXFwiJyxcbiAgICAgICdcXFxcJzogJ1xcXFxcXFxcJyxcbiAgICB9LFxuICAgIHJlcDtcblxuICBmdW5jdGlvbiBxdW90ZShzdHJpbmcpIHtcbiAgICAvLyBJZiB0aGUgc3RyaW5nIGNvbnRhaW5zIG5vIGNvbnRyb2wgY2hhcmFjdGVycywgbm8gcXVvdGUgY2hhcmFjdGVycywgYW5kIG5vXG4gICAgLy8gYmFja3NsYXNoIGNoYXJhY3RlcnMsIHRoZW4gd2UgY2FuIHNhZmVseSBzbGFwIHNvbWUgcXVvdGVzIGFyb3VuZCBpdC5cbiAgICAvLyBPdGhlcndpc2Ugd2UgbXVzdCBhbHNvIHJlcGxhY2UgdGhlIG9mZmVuZGluZyBjaGFyYWN0ZXJzIHdpdGggc2FmZSBlc2NhcGVcbiAgICAvLyBzZXF1ZW5jZXMuXG5cbiAgICBlc2NhcGFibGUubGFzdEluZGV4ID0gMDtcbiAgICByZXR1cm4gZXNjYXBhYmxlLnRlc3Qoc3RyaW5nKVxuICAgICAgPyAnXCInICtcbiAgICAgICAgICBzdHJpbmcucmVwbGFjZShlc2NhcGFibGUsIGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgIHZhciBjID0gbWV0YVthXTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgYyA9PT0gJ3N0cmluZycgPyBjIDogJ1xcXFx1JyArICgnMDAwMCcgKyBhLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNCk7XG4gICAgICAgICAgfSkgK1xuICAgICAgICAgICdcIidcbiAgICAgIDogJ1wiJyArIHN0cmluZyArICdcIic7XG4gIH1cblxuICBmdW5jdGlvbiBzdHIoa2V5LCBob2xkZXIpIHtcbiAgICAvLyBQcm9kdWNlIGEgc3RyaW5nIGZyb20gaG9sZGVyW2tleV0uXG5cbiAgICB2YXIgaSwgLy8gVGhlIGxvb3AgY291bnRlci5cbiAgICAgIGssIC8vIFRoZSBtZW1iZXIga2V5LlxuICAgICAgdiwgLy8gVGhlIG1lbWJlciB2YWx1ZS5cbiAgICAgIGxlbmd0aCxcbiAgICAgIG1pbmQgPSBnYXAsXG4gICAgICBwYXJ0aWFsLFxuICAgICAgdmFsdWUgPSBob2xkZXJba2V5XTtcblxuICAgIC8vIElmIHRoZSB2YWx1ZSBoYXMgYSB0b0pTT04gbWV0aG9kLCBjYWxsIGl0IHRvIG9idGFpbiBhIHJlcGxhY2VtZW50IHZhbHVlLlxuXG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZS50b0pTT04oa2V5KTtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSB3ZXJlIGNhbGxlZCB3aXRoIGEgcmVwbGFjZXIgZnVuY3Rpb24sIHRoZW4gY2FsbCB0aGUgcmVwbGFjZXIgdG9cbiAgICAvLyBvYnRhaW4gYSByZXBsYWNlbWVudCB2YWx1ZS5cblxuICAgIGlmICh0eXBlb2YgcmVwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YWx1ZSA9IHJlcC5jYWxsKGhvbGRlciwga2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gV2hhdCBoYXBwZW5zIG5leHQgZGVwZW5kcyBvbiB0aGUgdmFsdWUncyB0eXBlLlxuXG4gICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBxdW90ZSh2YWx1ZSk7XG5cbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIC8vIEpTT04gbnVtYmVycyBtdXN0IGJlIGZpbml0ZS4gRW5jb2RlIG5vbi1maW5pdGUgbnVtYmVycyBhcyBudWxsLlxuXG4gICAgICAgIHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgPyBTdHJpbmcodmFsdWUpIDogJ251bGwnO1xuXG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ251bGwnOlxuICAgICAgICAvLyBJZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuIG9yIG51bGwsIGNvbnZlcnQgaXQgdG8gYSBzdHJpbmcuIE5vdGU6XG4gICAgICAgIC8vIHR5cGVvZiBudWxsIGRvZXMgbm90IHByb2R1Y2UgJ251bGwnLiBUaGUgY2FzZSBpcyBpbmNsdWRlZCBoZXJlIGluXG4gICAgICAgIC8vIHRoZSByZW1vdGUgY2hhbmNlIHRoYXQgdGhpcyBnZXRzIGZpeGVkIHNvbWVkYXkuXG5cbiAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG5cbiAgICAgIC8vIElmIHRoZSB0eXBlIGlzICdvYmplY3QnLCB3ZSBtaWdodCBiZSBkZWFsaW5nIHdpdGggYW4gb2JqZWN0IG9yIGFuIGFycmF5IG9yXG4gICAgICAvLyBudWxsLlxuXG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAvLyBEdWUgdG8gYSBzcGVjaWZpY2F0aW9uIGJsdW5kZXIgaW4gRUNNQVNjcmlwdCwgdHlwZW9mIG51bGwgaXMgJ29iamVjdCcsXG4gICAgICAgIC8vIHNvIHdhdGNoIG91dCBmb3IgdGhhdCBjYXNlLlxuXG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWFrZSBhbiBhcnJheSB0byBob2xkIHRoZSBwYXJ0aWFsIHJlc3VsdHMgb2Ygc3RyaW5naWZ5aW5nIHRoaXMgb2JqZWN0IHZhbHVlLlxuXG4gICAgICAgIGdhcCArPSBpbmRlbnQ7XG4gICAgICAgIHBhcnRpYWwgPSBbXTtcblxuICAgICAgICAvLyBJcyB0aGUgdmFsdWUgYW4gYXJyYXk/XG5cbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgLy8gVGhlIHZhbHVlIGlzIGFuIGFycmF5LiBTdHJpbmdpZnkgZXZlcnkgZWxlbWVudC4gVXNlIG51bGwgYXMgYSBwbGFjZWhvbGRlclxuICAgICAgICAgIC8vIGZvciBub24tSlNPTiB2YWx1ZXMuXG5cbiAgICAgICAgICBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBwYXJ0aWFsW2ldID0gc3RyKGksIHZhbHVlKSB8fCAnbnVsbCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSm9pbiBhbGwgb2YgdGhlIGVsZW1lbnRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsIGFuZCB3cmFwIHRoZW0gaW5cbiAgICAgICAgICAvLyBicmFja2V0cy5cblxuICAgICAgICAgIHYgPVxuICAgICAgICAgICAgcGFydGlhbC5sZW5ndGggPT09IDAgPyAnW10nIDogZ2FwID8gJ1tcXG4nICsgZ2FwICsgcGFydGlhbC5qb2luKCcsXFxuJyArIGdhcCkgKyAnXFxuJyArIG1pbmQgKyAnXScgOiAnWycgKyBwYXJ0aWFsLmpvaW4oJywnKSArICddJztcbiAgICAgICAgICBnYXAgPSBtaW5kO1xuICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIHJlcGxhY2VyIGlzIGFuIGFycmF5LCB1c2UgaXQgdG8gc2VsZWN0IHRoZSBtZW1iZXJzIHRvIGJlIHN0cmluZ2lmaWVkLlxuXG4gICAgICAgIGlmIChyZXAgJiYgdHlwZW9mIHJlcCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBsZW5ndGggPSByZXAubGVuZ3RoO1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXBbaV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGsgPSByZXBbaV07XG4gICAgICAgICAgICAgIHYgPSBzdHIoaywgdmFsdWUpO1xuICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgIHBhcnRpYWwucHVzaChxdW90ZShrKSArIChnYXAgPyAnOiAnIDogJzonKSArIHYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSwgaXRlcmF0ZSB0aHJvdWdoIGFsbCBvZiB0aGUga2V5cyBpbiB0aGUgb2JqZWN0LlxuXG4gICAgICAgICAgZm9yIChrIGluIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgICAgICAgICB2ID0gc3RyKGssIHZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsLnB1c2gocXVvdGUoaykgKyAoZ2FwID8gJzogJyA6ICc6JykgKyB2KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEpvaW4gYWxsIG9mIHRoZSBtZW1iZXIgdGV4dHMgdG9nZXRoZXIsIHNlcGFyYXRlZCB3aXRoIGNvbW1hcyxcbiAgICAgICAgLy8gYW5kIHdyYXAgdGhlbSBpbiBicmFjZXMuXG5cbiAgICAgICAgdiA9IHBhcnRpYWwubGVuZ3RoID09PSAwID8gJ3t9JyA6IGdhcCA/ICd7XFxuJyArIGdhcCArIHBhcnRpYWwuam9pbignLFxcbicgKyBnYXApICsgJ1xcbicgKyBtaW5kICsgJ30nIDogJ3snICsgcGFydGlhbC5qb2luKCcsJykgKyAnfSc7XG4gICAgICAgIGdhcCA9IG1pbmQ7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgfVxuXG4gIC8vIElmIHRoZSBKU09OIG9iamVjdCBkb2VzIG5vdCB5ZXQgaGF2ZSBhIHN0cmluZ2lmeSBtZXRob2QsIGdpdmUgaXQgb25lLlxuXG4gIGlmICh0eXBlb2YgSlNPTi5zdHJpbmdpZnkgIT09ICdmdW5jdGlvbicpIHtcbiAgICBKU09OLnN0cmluZ2lmeSA9IGZ1bmN0aW9uKHZhbHVlLCByZXBsYWNlciwgc3BhY2UpIHtcbiAgICAgIC8vIFRoZSBzdHJpbmdpZnkgbWV0aG9kIHRha2VzIGEgdmFsdWUgYW5kIGFuIG9wdGlvbmFsIHJlcGxhY2VyLCBhbmQgYW4gb3B0aW9uYWxcbiAgICAgIC8vIHNwYWNlIHBhcmFtZXRlciwgYW5kIHJldHVybnMgYSBKU09OIHRleHQuIFRoZSByZXBsYWNlciBjYW4gYmUgYSBmdW5jdGlvblxuICAgICAgLy8gdGhhdCBjYW4gcmVwbGFjZSB2YWx1ZXMsIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MgdGhhdCB3aWxsIHNlbGVjdCB0aGUga2V5cy5cbiAgICAgIC8vIEEgZGVmYXVsdCByZXBsYWNlciBtZXRob2QgY2FuIGJlIHByb3ZpZGVkLiBVc2Ugb2YgdGhlIHNwYWNlIHBhcmFtZXRlciBjYW5cbiAgICAgIC8vIHByb2R1Y2UgdGV4dCB0aGF0IGlzIG1vcmUgZWFzaWx5IHJlYWRhYmxlLlxuXG4gICAgICB2YXIgaTtcbiAgICAgIGdhcCA9ICcnO1xuICAgICAgaW5kZW50ID0gJyc7XG5cbiAgICAgIC8vIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBudW1iZXIsIG1ha2UgYW4gaW5kZW50IHN0cmluZyBjb250YWluaW5nIHRoYXRcbiAgICAgIC8vIG1hbnkgc3BhY2VzLlxuXG4gICAgICBpZiAodHlwZW9mIHNwYWNlID09PSAnbnVtYmVyJykge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3BhY2U7IGkgKz0gMSkge1xuICAgICAgICAgIGluZGVudCArPSAnICc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGlzIGEgc3RyaW5nLCBpdCB3aWxsIGJlIHVzZWQgYXMgdGhlIGluZGVudCBzdHJpbmcuXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzcGFjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaW5kZW50ID0gc3BhY2U7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZXJlIGlzIGEgcmVwbGFjZXIsIGl0IG11c3QgYmUgYSBmdW5jdGlvbiBvciBhbiBhcnJheS5cbiAgICAgIC8vIE90aGVyd2lzZSwgdGhyb3cgYW4gZXJyb3IuXG5cbiAgICAgIHJlcCA9IHJlcGxhY2VyO1xuICAgICAgaWYgKHJlcGxhY2VyICYmIHR5cGVvZiByZXBsYWNlciAhPT0gJ2Z1bmN0aW9uJyAmJiAodHlwZW9mIHJlcGxhY2VyICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgcmVwbGFjZXIubGVuZ3RoICE9PSAnbnVtYmVyJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdKU09OLnN0cmluZ2lmeScpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYWtlIGEgZmFrZSByb290IG9iamVjdCBjb250YWluaW5nIG91ciB2YWx1ZSB1bmRlciB0aGUga2V5IG9mICcnLlxuICAgICAgLy8gUmV0dXJuIHRoZSByZXN1bHQgb2Ygc3RyaW5naWZ5aW5nIHRoZSB2YWx1ZS5cblxuICAgICAgcmV0dXJuIHN0cignJywgeyAnJzogdmFsdWUgfSk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIElmIHRoZSBKU09OIG9iamVjdCBkb2VzIG5vdCB5ZXQgaGF2ZSBhIHBhcnNlIG1ldGhvZCwgZ2l2ZSBpdCBvbmUuXG5cbiAgaWYgKHR5cGVvZiBKU09OLnBhcnNlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgSlNPTi5wYXJzZSA9IGZ1bmN0aW9uKHRleHQsIHJldml2ZXIpIHtcbiAgICAgIC8vIFRoZSBwYXJzZSBtZXRob2QgdGFrZXMgYSB0ZXh0IGFuZCBhbiBvcHRpb25hbCByZXZpdmVyIGZ1bmN0aW9uLCBhbmQgcmV0dXJuc1xuICAgICAgLy8gYSBKYXZhU2NyaXB0IHZhbHVlIGlmIHRoZSB0ZXh0IGlzIGEgdmFsaWQgSlNPTiB0ZXh0LlxuXG4gICAgICB2YXIgajtcblxuICAgICAgZnVuY3Rpb24gd2Fsayhob2xkZXIsIGtleSkge1xuICAgICAgICAvLyBUaGUgd2FsayBtZXRob2QgaXMgdXNlZCB0byByZWN1cnNpdmVseSB3YWxrIHRoZSByZXN1bHRpbmcgc3RydWN0dXJlIHNvXG4gICAgICAgIC8vIHRoYXQgbW9kaWZpY2F0aW9ucyBjYW4gYmUgbWFkZS5cblxuICAgICAgICB2YXIgayxcbiAgICAgICAgICB2LFxuICAgICAgICAgIHZhbHVlID0gaG9sZGVyW2tleV07XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgZm9yIChrIGluIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgICAgICAgICB2ID0gd2Fsayh2YWx1ZSwgayk7XG4gICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVtrXSA9IHY7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlW2tdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXZpdmVyLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgLy8gUGFyc2luZyBoYXBwZW5zIGluIGZvdXIgc3RhZ2VzLiBJbiB0aGUgZmlyc3Qgc3RhZ2UsIHdlIHJlcGxhY2UgY2VydGFpblxuICAgICAgLy8gVW5pY29kZSBjaGFyYWN0ZXJzIHdpdGggZXNjYXBlIHNlcXVlbmNlcy4gSmF2YVNjcmlwdCBoYW5kbGVzIG1hbnkgY2hhcmFjdGVyc1xuICAgICAgLy8gaW5jb3JyZWN0bHksIGVpdGhlciBzaWxlbnRseSBkZWxldGluZyB0aGVtLCBvciB0cmVhdGluZyB0aGVtIGFzIGxpbmUgZW5kaW5ncy5cblxuICAgICAgdGV4dCA9IFN0cmluZyh0ZXh0KTtcbiAgICAgIGN4Lmxhc3RJbmRleCA9IDA7XG4gICAgICBpZiAoY3gudGVzdCh0ZXh0KSkge1xuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGN4LCBmdW5jdGlvbihhKSB7XG4gICAgICAgICAgcmV0dXJuICdcXFxcdScgKyAoJzAwMDAnICsgYS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gSW4gdGhlIHNlY29uZCBzdGFnZSwgd2UgcnVuIHRoZSB0ZXh0IGFnYWluc3QgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGxvb2tcbiAgICAgIC8vIGZvciBub24tSlNPTiBwYXR0ZXJucy4gV2UgYXJlIGVzcGVjaWFsbHkgY29uY2VybmVkIHdpdGggJygpJyBhbmQgJ25ldydcbiAgICAgIC8vIGJlY2F1c2UgdGhleSBjYW4gY2F1c2UgaW52b2NhdGlvbiwgYW5kICc9JyBiZWNhdXNlIGl0IGNhbiBjYXVzZSBtdXRhdGlvbi5cbiAgICAgIC8vIEJ1dCBqdXN0IHRvIGJlIHNhZmUsIHdlIHdhbnQgdG8gcmVqZWN0IGFsbCB1bmV4cGVjdGVkIGZvcm1zLlxuXG4gICAgICAvLyBXZSBzcGxpdCB0aGUgc2Vjb25kIHN0YWdlIGludG8gNCByZWdleHAgb3BlcmF0aW9ucyBpbiBvcmRlciB0byB3b3JrIGFyb3VuZFxuICAgICAgLy8gY3JpcHBsaW5nIGluZWZmaWNpZW5jaWVzIGluIElFJ3MgYW5kIFNhZmFyaSdzIHJlZ2V4cCBlbmdpbmVzLiBGaXJzdCB3ZVxuICAgICAgLy8gcmVwbGFjZSB0aGUgSlNPTiBiYWNrc2xhc2ggcGFpcnMgd2l0aCAnQCcgKGEgbm9uLUpTT04gY2hhcmFjdGVyKS4gU2Vjb25kLCB3ZVxuICAgICAgLy8gcmVwbGFjZSBhbGwgc2ltcGxlIHZhbHVlIHRva2VucyB3aXRoICddJyBjaGFyYWN0ZXJzLiBUaGlyZCwgd2UgZGVsZXRlIGFsbFxuICAgICAgLy8gb3BlbiBicmFja2V0cyB0aGF0IGZvbGxvdyBhIGNvbG9uIG9yIGNvbW1hIG9yIHRoYXQgYmVnaW4gdGhlIHRleHQuIEZpbmFsbHksXG4gICAgICAvLyB3ZSBsb29rIHRvIHNlZSB0aGF0IHRoZSByZW1haW5pbmcgY2hhcmFjdGVycyBhcmUgb25seSB3aGl0ZXNwYWNlIG9yICddJyBvclxuICAgICAgLy8gJywnIG9yICc6JyBvciAneycgb3IgJ30nLiBJZiB0aGF0IGlzIHNvLCB0aGVuIHRoZSB0ZXh0IGlzIHNhZmUgZm9yIGV2YWwuXG5cbiAgICAgIGlmIChcbiAgICAgICAgL15bXFxdLDp7fVxcc10qJC8udGVzdChcbiAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAucmVwbGFjZSgvXFxcXCg/OltcIlxcXFxcXC9iZm5ydF18dVswLTlhLWZBLUZdezR9KS9nLCAnQCcpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCJbXlwiXFxcXFxcblxccl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/XFxkKyg/OlxcLlxcZCopPyg/OltlRV1bK1xcLV0/XFxkKyk/L2csICddJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8oPzpefDp8LCkoPzpcXHMqXFxbKSsvZywgJycpXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICAvLyBJbiB0aGUgdGhpcmQgc3RhZ2Ugd2UgdXNlIHRoZSBldmFsIGZ1bmN0aW9uIHRvIGNvbXBpbGUgdGhlIHRleHQgaW50byBhXG4gICAgICAgIC8vIEphdmFTY3JpcHQgc3RydWN0dXJlLiBUaGUgJ3snIG9wZXJhdG9yIGlzIHN1YmplY3QgdG8gYSBzeW50YWN0aWMgYW1iaWd1aXR5XG4gICAgICAgIC8vIGluIEphdmFTY3JpcHQ6IGl0IGNhbiBiZWdpbiBhIGJsb2NrIG9yIGFuIG9iamVjdCBsaXRlcmFsLiBXZSB3cmFwIHRoZSB0ZXh0XG4gICAgICAgIC8vIGluIHBhcmVucyB0byBlbGltaW5hdGUgdGhlIGFtYmlndWl0eS5cblxuICAgICAgICBqID0gZXZhbCgnKCcgKyB0ZXh0ICsgJyknKTtcblxuICAgICAgICAvLyBJbiB0aGUgb3B0aW9uYWwgZm91cnRoIHN0YWdlLCB3ZSByZWN1cnNpdmVseSB3YWxrIHRoZSBuZXcgc3RydWN0dXJlLCBwYXNzaW5nXG4gICAgICAgIC8vIGVhY2ggbmFtZS92YWx1ZSBwYWlyIHRvIGEgcmV2aXZlciBmdW5jdGlvbiBmb3IgcG9zc2libGUgdHJhbnNmb3JtYXRpb24uXG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiByZXZpdmVyID09PSAnZnVuY3Rpb24nID8gd2Fsayh7ICcnOiBqIH0sICcnKSA6IGo7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSB0ZXh0IGlzIG5vdCBKU09OIHBhcnNlYWJsZSwgdGhlbiBhIFN5bnRheEVycm9yIGlzIHRocm93bi5cblxuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdKU09OLnBhcnNlJyk7XG4gICAgfTtcbiAgfVxufSkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvaWUtc2hpbXMvaWUuanMiXSwic291cmNlUm9vdCI6IiJ9