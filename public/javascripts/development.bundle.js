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
/******/ 	return __webpack_require__(__webpack_require__.s = 244);
/******/ })
/************************************************************************/
/******/ ({

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(245);

__webpack_require__(246);

__webpack_require__(247);

__webpack_require__(248);

__webpack_require__(45);

var _misc = __webpack_require__(5);

var _modules = __webpack_require__(249);

(0, _misc.domReady)(function () {
  new _modules.initModules();
});

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/* **********************************************
     Begin prism-core.js
********************************************** */

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function(){

// Private helper vars
var lang = /\blang(?:uage)?-(\w+)\b/i;
var uniqueId = 0;

var _ = _self.Prism = {
	manual: _self.Prism && _self.Prism.manual,
	disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
			} else if (_.util.type(tokens) === 'Array') {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
		},

		objId: function (obj) {
			if (!obj['__id']) {
				Object.defineProperty(obj, '__id', { value: ++uniqueId });
			}
			return obj['__id'];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function (o) {
			var type = _.util.type(o);

			switch (type) {
				case 'Object':
					var clone = {};

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key]);
						}
					}

					return clone;

				case 'Array':
					return o.map(function(v) { return _.util.clone(v); });
			}

			return o;
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need anobject and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before. If not provided, the function appends instead.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];

			if (arguments.length == 2) {
				insert = arguments[1];

				for (var newToken in insert) {
					if (insert.hasOwnProperty(newToken)) {
						grammar[newToken] = insert[newToken];
					}
				}

				return grammar;
			}

			var ret = {};

			for (var token in grammar) {

				if (grammar.hasOwnProperty(token)) {

					if (token == before) {

						for (var newToken in insert) {

							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					ret[token] = grammar[token];
				}
			}

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === root[inside] && key != inside) {
					this[key] = ret;
				}
			});

			return root[inside] = ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function(o, callback, type, visited) {
			visited = visited || {};
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, null, visited);
					}
					else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, i, visited);
					}
				}
			}
		}
	},
	plugins: {},

	highlightAll: function(async, callback) {
		var env = {
			callback: callback,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run("before-highlightall", env);

		var elements = env.elements || document.querySelectorAll(env.selector);

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, env.callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1].toLowerCase();
			grammar = _.languages[language];
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		if (element.parentNode) {
			// Set language on the parent, for styling
			parent = element.parentNode;

			if (/pre/i.test(parent.nodeName)) {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		_.hooks.run('before-sanity-check', env);

		if (!env.code || !env.grammar) {
			if (env.code) {
				_.hooks.run('before-highlight', env);
				env.element.textContent = env.code;
				_.hooks.run('after-highlight', env);
			}
			_.hooks.run('complete', env);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				env.highlightedCode = evt.data;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(env.element);
				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
		}
	},

	highlight: function (text, grammar, language) {
		var tokens = _.tokenize(text, grammar);
		return Token.stringify(_.util.encode(tokens), language);
	},

	matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
		var Token = _.Token;

		for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			if (token == target) {
				return;
			}

			var patterns = grammar[token];
			patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j],
					inside = pattern.inside,
					lookbehind = !!pattern.lookbehind,
					greedy = !!pattern.greedy,
					lookbehindLength = 0,
					alias = pattern.alias;

				if (greedy && !pattern.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
					pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
				}

				pattern = pattern.pattern || pattern;

				// Don’t cache length as it changes during the loop
				for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

					var str = strarr[i];

					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					pattern.lastIndex = 0;

					var match = pattern.exec(str),
					    delNum = 1;

					// Greedy patterns can override/remove up to two previously matched tokens
					if (!match && greedy && i != strarr.length - 1) {
						pattern.lastIndex = pos;
						match = pattern.exec(text);
						if (!match) {
							break;
						}

						var from = match.index + (lookbehind ? match[1].length : 0),
						    to = match.index + match[0].length,
						    k = i,
						    p = pos;

						for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
							p += strarr[k].length;
							// Move the index i to the element in strarr that is closest to from
							if (from >= p) {
								++i;
								pos = p;
							}
						}

						/*
						 * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
						 * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
						 */
						if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
							continue;
						}

						// Number of tokens to delete and replace with the new match
						delNum = k - i;
						str = text.slice(pos, p);
						match.index -= pos;
					}

					if (!match) {
						if (oneshot) {
							break;
						}

						continue;
					}

					if(lookbehind) {
						lookbehindLength = match[1].length;
					}

					var from = match.index + lookbehindLength,
					    match = match[0].slice(lookbehindLength),
					    to = from + match.length,
					    before = str.slice(0, from),
					    after = str.slice(to);

					var args = [i, delNum];

					if (before) {
						++i;
						pos += before.length;
						args.push(before);
					}

					var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

					args.push(wrapped);

					if (after) {
						args.push(after);
					}

					Array.prototype.splice.apply(strarr, args);

					if (delNum != 1)
						_.matchGrammar(text, strarr, grammar, i, pos, true, token);

					if (oneshot)
						break;
				}
			}
		}
	},

	tokenize: function(text, grammar, language) {
		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		_.matchGrammar(text, strarr, grammar, 0, 0, false);

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	}
};

var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
	this.type = type;
	this.content = content;
	this.alias = alias;
	// Copy of the full string this token was created from
	this.length = (matchedStr || "").length|0;
	this.greedy = !!greedy;
};

Token.stringify = function(o, language, parent) {
	if (typeof o == 'string') {
		return o;
	}

	if (_.util.type(o) === 'Array') {
		return o.map(function(element) {
			return Token.stringify(element, language, o);
		}).join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (o.alias) {
		var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
		Array.prototype.push.apply(env.classes, aliases);
	}

	_.hooks.run('wrap', env);

	var attributes = Object.keys(env.attributes).map(function(name) {
		return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
	}).join(' ');

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

};

if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _self.Prism;
	}

	if (!_.disableWorkerMessageHandler) {
		// In worker
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
				lang = message.language,
				code = message.code,
				immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);
	}

	return _self.Prism;
}

//Get current script and highlight
var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

if (script) {
	_.filename = script.src;

	if (!_.manual && !script.hasAttribute('data-manual')) {
		if(document.readyState !== "loading") {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(_.highlightAll);
			} else {
				window.setTimeout(_.highlightAll, 16);
			}
		}
		else {
			document.addEventListener('DOMContentLoaded', _.highlightAll);
		}
	}
}

return _self.Prism;

})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': /<!--[\s\S]*?-->/,
	'prolog': /<\?[\s\S]+?\?>/,
	'doctype': /<!DOCTYPE[\s\S]+?>/i,
	'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
				inside: {
					'punctuation': [
						/^=/,
						{
							pattern: /(^|[^\\])["']/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;


/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
	'comment': /\/\*[\s\S]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^{}\s][^{};]*?(?=\s*\{)/,
	'string': {
		pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'property': /[\w-]+(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css'
		}
	});
	
	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
}

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /[.\\]/
		}
	},
	'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(?:true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+(?:[Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\s*\()/i,
	'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true,
		greedy: true
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)\s*=>))/i,
		alias: 'function'
	}
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\[\s\S]|[^\\`])*`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript'
		}
	});
}

Prism.languages.js = Prism.languages.javascript;


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
		return;
	}

	self.Prism.fileHighlight = function() {

		var Extensions = {
			'js': 'javascript',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell',
			'sh': 'bash',
			'bat': 'batch',
			'h': 'c',
			'tex': 'latex'
		};

		Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
			var src = pre.getAttribute('data-src');

			var language, parent = pre;
			var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (pre.className.match(lang) || [, ''])[1];
			}

			if (!language) {
				var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
				language = Extensions[extension] || extension;
			}

			var code = document.createElement('code');
			code.className = 'language-' + language;

			pre.textContent = '';

			code.textContent = 'Loading…';

			pre.appendChild(code);

			var xhr = new XMLHttpRequest();

			xhr.open('GET', src, true);

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {

					if (xhr.status < 400 && xhr.responseText) {
						code.textContent = xhr.responseText;

						Prism.highlightElement(code);
					}
					else if (xhr.status >= 400) {
						code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
					}
					else {
						code.textContent = '✖ Error: File does not exist or is empty';
					}
				}
			};

			xhr.send(null);
		});

	};

	document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);

})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),

/***/ 246:
/***/ (function(module, exports) {

(function(){
	if (typeof self === 'undefined' || !self.Prism || !self.document) {
		return;
	}

	var callbacks = [];
	var map = {};
	var noop = function() {};

	Prism.plugins.toolbar = {};

	/**
	 * Register a button callback with the toolbar.
	 *
	 * @param {string} key
	 * @param {Object|Function} opts
	 */
	var registerButton = Prism.plugins.toolbar.registerButton = function (key, opts) {
		var callback;

		if (typeof opts === 'function') {
			callback = opts;
		} else {
			callback = function (env) {
				var element;

				if (typeof opts.onClick === 'function') {
					element = document.createElement('button');
					element.type = 'button';
					element.addEventListener('click', function () {
						opts.onClick.call(this, env);
					});
				} else if (typeof opts.url === 'string') {
					element = document.createElement('a');
					element.href = opts.url;
				} else {
					element = document.createElement('span');
				}

				element.textContent = opts.text;

				return element;
			};
		}

		callbacks.push(map[key] = callback);
	};

	/**
	 * Post-highlight Prism hook callback.
	 *
	 * @param env
	 */
	var hook = Prism.plugins.toolbar.hook = function (env) {
		// Check if inline or actual code block (credit to line-numbers plugin)
		var pre = env.element.parentNode;
		if (!pre || !/pre/i.test(pre.nodeName)) {
			return;
		}

		// Autoloader rehighlights, so only do this once.
		if (pre.classList.contains('code-toolbar')) {
			return;
		}

		pre.classList.add('code-toolbar');

		// Setup the toolbar
		var toolbar = document.createElement('div');
		toolbar.classList.add('toolbar');

		if (document.body.hasAttribute('data-toolbar-order')) {
			callbacks = document.body.getAttribute('data-toolbar-order').split(',').map(function(key) {
				return map[key] || noop;
			});
		}

		callbacks.forEach(function(callback) {
			var element = callback(env);

			if (!element) {
				return;
			}

			var item = document.createElement('div');
			item.classList.add('toolbar-item');

			item.appendChild(element);
			toolbar.appendChild(item);
		});

		// Add our toolbar to the <pre> tag
		pre.appendChild(toolbar);
	};

	registerButton('label', function(env) {
		var pre = env.element.parentNode;
		if (!pre || !/pre/i.test(pre.nodeName)) {
			return;
		}

		if (!pre.hasAttribute('data-label')) {
			return;
		}

		var element, template;
		var text = pre.getAttribute('data-label');
		try {
			// Any normal text will blow up this selector.
			template = document.querySelector('template#' + text);
		} catch (e) {}

		if (template) {
			element = template.content;
		} else {
			if (pre.hasAttribute('data-url')) {
				element = document.createElement('a');
				element.href = pre.getAttribute('data-url');
			} else {
				element = document.createElement('span');
			}

			element.textContent = text;
		}

		return element;
	});

	/**
	 * Register the toolbar with Prism.
	 */
	Prism.hooks.add('complete', hook);
})();


/***/ }),

/***/ 247:
/***/ (function(module, exports) {

(function() {

var assign = Object.assign || function (obj1, obj2) {
	for (var name in obj2) {
		if (obj2.hasOwnProperty(name))
			obj1[name] = obj2[name];
	}
	return obj1;
}

function NormalizeWhitespace(defaults) {
	this.defaults = assign({}, defaults);
}

function toCamelCase(value) {
	return value.replace(/-(\w)/g, function(match, firstChar) {
		return firstChar.toUpperCase();
	});
}

function tabLen(str) {
	var res = 0;
	for (var i = 0; i < str.length; ++i) {
		if (str.charCodeAt(i) == '\t'.charCodeAt(0))
			res += 3;
	}
	return str.length + res;
}

NormalizeWhitespace.prototype = {
	setDefaults: function (defaults) {
		this.defaults = assign(this.defaults, defaults);
	},
	normalize: function (input, settings) {
		settings = assign(this.defaults, settings);

		for (var name in settings) {
			var methodName = toCamelCase(name);
			if (name !== "normalize" && methodName !== 'setDefaults' &&
					settings[name] && this[methodName]) {
				input = this[methodName].call(this, input, settings[name]);
			}
		}

		return input;
	},

	/*
	 * Normalization methods
	 */
	leftTrim: function (input) {
		return input.replace(/^\s+/, '');
	},
	rightTrim: function (input) {
		return input.replace(/\s+$/, '');
	},
	tabsToSpaces: function (input, spaces) {
		spaces = spaces|0 || 4;
		return input.replace(/\t/g, new Array(++spaces).join(' '));
	},
	spacesToTabs: function (input, spaces) {
		spaces = spaces|0 || 4;
		return input.replace(new RegExp(' {' + spaces + '}', 'g'), '\t');
	},
	removeTrailing: function (input) {
		return input.replace(/\s*?$/gm, '');
	},
	// Support for deprecated plugin remove-initial-line-feed
	removeInitialLineFeed: function (input) {
		return input.replace(/^(?:\r?\n|\r)/, '');
	},
	removeIndent: function (input) {
		var indents = input.match(/^[^\S\n\r]*(?=\S)/gm);

		if (!indents || !indents[0].length)
			return input;

		indents.sort(function(a, b){return a.length - b.length; });

		if (!indents[0].length)
			return input;

		return input.replace(new RegExp('^' + indents[0], 'gm'), '');
	},
	indent: function (input, tabs) {
		return input.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++tabs).join('\t') + '$&');
	},
	breakLines: function (input, characters) {
		characters = (characters === true) ? 80 : characters|0 || 80;

		var lines = input.split('\n');
		for (var i = 0; i < lines.length; ++i) {
			if (tabLen(lines[i]) <= characters)
				continue;

			var line = lines[i].split(/(\s+)/g),
			    len = 0;

			for (var j = 0; j < line.length; ++j) {
				var tl = tabLen(line[j]);
				len += tl;
				if (len > characters) {
					line[j] = '\n' + line[j];
					len = tl;
				}
			}
			lines[i] = line.join('');
		}
		return lines.join('\n');
	}
};

// Support node modules
if (typeof module !== 'undefined' && module.exports) {
	module.exports = NormalizeWhitespace;
}

// Exit if prism is not loaded
if (typeof Prism === 'undefined') {
	return;
}

Prism.plugins.NormalizeWhitespace = new NormalizeWhitespace({
	'remove-trailing': true,
	'remove-indent': true,
	'left-trim': true,
	'right-trim': true,
	/*'break-lines': 80,
	'indent': 2,
	'remove-initial-line-feed': false,
	'tabs-to-spaces': 4,
	'spaces-to-tabs': 4*/
});

Prism.hooks.add('before-sanity-check', function (env) {
	var Normalizer = Prism.plugins.NormalizeWhitespace;

	// Check settings
	if (env.settings && env.settings['whitespace-normalization'] === false) {
		return;
	}

	// Simple mode if there is no env.element
	if ((!env.element || !env.element.parentNode) && env.code) {
		env.code = Normalizer.normalize(env.code, env.settings);
		return;
	}

	// Normal mode
	var pre = env.element.parentNode;
	var clsReg = /\bno-whitespace-normalization\b/;
	if (!env.code || !pre || pre.nodeName.toLowerCase() !== 'pre' ||
			clsReg.test(pre.className) || clsReg.test(env.element.className))
		return;

	var children = pre.childNodes,
	    before = '',
	    after = '',
	    codeFound = false;

	// Move surrounding whitespace from the <pre> tag into the <code> tag
	for (var i = 0; i < children.length; ++i) {
		var node = children[i];

		if (node == env.element) {
			codeFound = true;
		} else if (node.nodeName === "#text") {
			if (codeFound) {
				after += node.nodeValue;
			} else {
				before += node.nodeValue;
			}

			pre.removeChild(node);
			--i;
		}
	}

	if (!env.element.children.length || !Prism.plugins.KeepMarkup) {
		env.code = before + env.code + after;
		env.code = Normalizer.normalize(env.code, env.settings);
	} else {
		// Preserve markup for keep-markup plugin
		var html = before + env.element.innerHTML + after;
		env.element.innerHTML = Normalizer.normalize(html, env.settings);
		env.code = env.element.textContent;
	}
});

}());

/***/ }),

/***/ 248:
/***/ (function(module, exports) {

(function () {

	if (typeof self === 'undefined' || !self.Prism || !self.document) {
		return;
	}

	/**
	 * Class name for <pre> which is activating the plugin
	 * @type {String}
	 */
	var PLUGIN_CLASS = 'line-numbers';

	/**
	 * Resizes line numbers spans according to height of line of code
	 * @param  {Element} element <pre> element
	 */
	var _resizeElement = function (element) {
		var codeStyles = getStyles(element);
		var whiteSpace = codeStyles['white-space'];

		if (whiteSpace === 'pre-wrap' || whiteSpace === 'pre-line') {
			var codeElement = element.querySelector('code');
			var lineNumbersWrapper = element.querySelector('.line-numbers-rows');
			var lineNumberSizer = element.querySelector('.line-numbers-sizer');
			var codeLines = element.textContent.split('\n');

			if (!lineNumberSizer) {
				lineNumberSizer = document.createElement('span');
				lineNumberSizer.className = 'line-numbers-sizer';

				codeElement.appendChild(lineNumberSizer);
			}

			lineNumberSizer.style.display = 'block';

			codeLines.forEach(function (line, lineNumber) {
				lineNumberSizer.textContent = line || '\n';
				var lineSize = lineNumberSizer.getBoundingClientRect().height;
				lineNumbersWrapper.children[lineNumber].style.height = lineSize + 'px';
			});

			lineNumberSizer.textContent = '';
			lineNumberSizer.style.display = 'none';
		}
	};

	/**
	 * Returns style declarations for the element
	 * @param {Element} element
	 */
	var getStyles = function (element) {
		if (!element) {
			return null;
		}

		return window.getComputedStyle ? getComputedStyle(element) : (element.currentStyle || null);
	};

	window.addEventListener('resize', function () {
		Array.prototype.forEach.call(document.querySelectorAll('pre.' + PLUGIN_CLASS), _resizeElement);
	});

	Prism.hooks.add('complete', function (env) {
		if (!env.code) {
			return;
		}

		// works only for <code> wrapped inside <pre> (not inline)
		var pre = env.element.parentNode;
		var clsReg = /\s*\bline-numbers\b\s*/;
		if (
			!pre || !/pre/i.test(pre.nodeName) ||
			// Abort only if nor the <pre> nor the <code> have the class
			(!clsReg.test(pre.className) && !clsReg.test(env.element.className))
		) {
			return;
		}

		if (env.element.querySelector(".line-numbers-rows")) {
			// Abort if line numbers already exists
			return;
		}

		if (clsReg.test(env.element.className)) {
			// Remove the class "line-numbers" from the <code>
			env.element.className = env.element.className.replace(clsReg, ' ');
		}
		if (!clsReg.test(pre.className)) {
			// Add the class "line-numbers" to the <pre>
			pre.className += ' line-numbers';
		}

		var match = env.code.match(/\n(?!$)/g);
		var linesNum = match ? match.length + 1 : 1;
		var lineNumbersWrapper;

		var lines = new Array(linesNum + 1);
		lines = lines.join('<span></span>');

		lineNumbersWrapper = document.createElement('span');
		lineNumbersWrapper.setAttribute('aria-hidden', 'true');
		lineNumbersWrapper.className = 'line-numbers-rows';
		lineNumbersWrapper.innerHTML = lines;

		if (pre.hasAttribute('data-start')) {
			pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
		}

		env.element.appendChild(lineNumbersWrapper);

		_resizeElement(pre);
	});

}());

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initModules = undefined;

var _libraryPageNavigation = __webpack_require__(250);

var initModules = exports.initModules = function initModules() {
  new _libraryPageNavigation.LibraryPageNavigation();
};

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LibraryPageNavigation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _misc = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LibraryPageNavigation = exports.LibraryPageNavigation = function () {
  function LibraryPageNavigation() {
    var _this = this;

    _classCallCheck(this, LibraryPageNavigation);

    this.reizeHandler = function () {
      _this.initSidebar();
    };

    this.mobileNavigationClickHandler = function () {
      (0, _misc.toggleClass)(_this.navigationInner, _this.navigationInnerOpenClassName);
    };

    // Create values for later use
    this.sidebar = false;
    this.maxWidth = 800;

    // Create variables for later use
    this.navigationId = 'styleguide-navigation';
    this.navigationInnerClassName = 'styleguide-navigation__inner';
    this.navigationInnerOpenClassName = 'styleguide-navigation__inner--open';
    this.contentId = 'styleguide-content';
    this.mobileNavigationClassName = 'styleguide-navigation__mobile-nav';
    this.mobileNavigationContainerClassName = 'styleguide-navigation__mobile';
    this.libraryContainerId = 'library-container';

    // Get elements
    this.libraryContainerElement = document.getElementById(this.libraryContainerId);
    this.navigation = document.getElementById(this.navigationId);
    if (!this.navigation || !this.libraryContainerElement) return;

    this.mobileNavigationContainer = document.querySelector('.' + this.mobileNavigationClassName);

    this.navigationInner = this.navigation.querySelector('.' + this.navigationInnerClassName);
    this.content = document.getElementById(this.contentId);
    this.mobileNavigation = document.querySelector('.' + this.mobileNavigationClassName);

    if (!this.navigation || !this.content) return;

    this.setup();
  }

  /**
   * Setup functions
   * - Create sticky sidebar
   * - Add resize event listener
   * - Setup events for mobile menu
   */


  _createClass(LibraryPageNavigation, [{
    key: 'setup',
    value: function setup() {
      // Add resize event listener
      $.events(window, {
        resize: this.reizeHandler
      });
      // Mobile navigation
      $.delegate(document, 'click', '.' + this.mobileNavigationContainerClassName, this.mobileNavigationClickHandler);
      // Create sticky sidebar
      this.initSidebar();
    }

    /**
     * Resize handler
     * - Reset and reinitalize the current sticky sidebar
     */

  }, {
    key: 'initSidebar',


    /**
     * Initialize sticky sidebar
     * - Set minimum height of the content to be the height of the sidebar
     * - Create new instance of sticky sidebar
     * @todo: Create sticky sidebar
     */
    value: function initSidebar() {
      // Check the window width so it shouldn't run the sticky sidebar
      // when less than a certain width
      if (window.innerWidth <= this.maxWidth) return;
    }

    /**
     * Mobile navigation toggle
     * - Toggles the open class
     */

  }]);

  return LibraryPageNavigation;
}();

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.domReady = domReady;
/**
 * domReady
 *
 * Runs a callback function when the DOM is ready.
 *
 * Supported: IE8+
 *
 * @param {function} fn Callback for when the DOM is fully loaded.
 */

function domReady(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState != 'loading') fn();
    });
  }
}

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elHasClass = elHasClass;
/**
 * elHasClass
 *
 * Checks if the element has the class.
 *
 * Supported: IE8+
 *
 * @param {DOMElement} el Element to check the class of.
 * @param {string} class Name of the class to check for.
 */
function elHasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleClass = toggleClass;
/**
 * toggleClass
 *
 * Toggles the class for a DOM element.
 *
 * Supported: IE8+
 *
 * @param {DOMElement} el Element to toggle the class for.
 * @param {string} className Name of the class to toggle.
 */
function toggleClass(el, className, force) {
  // Check if new classList API is avaliagle
  if (el.classList) {
    el.classList.toggle(className, force);
    return;
  }

  // Get all of the class names as an array
  var classes = el.className.split(' ');
  var existingIndex = -1;

  // Find the index of the className in the array
  for (var i = classes.length; i--;) {
    if (classes[i] === className) existingIndex = i;
  }

  // Remove class
  if (existingIndex >= 0 && force !== true) {
    classes.splice(existingIndex, 1);
  } else {
    if (force !== false) {
      classes.push(className);
    }
  }

  // Re-add all of the classes
  el.className = classes.join(' ');
}

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListenerToEl = addEventListenerToEl;
exports.removeEventListenerFromEl = removeEventListenerFromEl;
exports.removeAllEventsFromEl = removeAllEventsFromEl;
/**
 * addEventListenerToEl
 *
 * Adds an event listener to an element.
 *
 * Supported: IE8+
 *
 * @param {DOMElement} el Element to add the event to.
 * @param {string} eventName Name of the event.
 * @param {function} handler Callback function to handle event.
 */
function addEventListenerToEl(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
    return;
  }
  el.attachEvent('on' + eventName, function () {
    handler.call(el);
  });
}

/**
 * removeEventListenerFromEl
 *
 * Removes an event handler from an element.
 *
 * Supported: IE8+
 *
 * @param {DOMElement} el DOM element
 * @param {string} eventName Name of the event.
 * @param {function} handler Callback function to remove from event.
 */
function removeEventListenerFromEl(el, eventName, handler) {
  if (el.removeEventListener) {
    el.removeEventListener(eventName, handler);
    return;
  }
  el.detachEvent('on' + eventName, handler);
}

/**
 * removeAllEventsFromEl
 *
 * Removes all event handlers from an element.
 *
 * Supported: IE8+
 *
 * @param {DOMElement} el DOM element
 */
function removeAllEventsFromEl(el) {
  var clone = el.cloneNode(true);
  el.parentNode.replaceChild(clone, el);
}

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closestParentOfEl = closestParentOfEl;
/**
 * closestParentOfEl
 *
 * Loops up the DOM tree until it finds a parent with the class name.
 *
 * @param {DOMElement} el Element to start and traverse up from.
 * @param {string} className Class name to look for in parent.
 */
function closestParentOfEl(el, className) {
  var matches = (document || el.ownerDocument).querySelectorAll(className);
  var i = void 0;
  do {
    i = matches.length;
    while (--i >= 0 && matches.item(i) !== el) {}
  } while (i < 0 && (el = el.parentElement));
  return el;
}

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

(function() {
"use strict";

function overload(callback, start, end) {
	start = start === undefined ? 1 : start;
	end = end || start + 1;

	if (end - start <= 1) {
		return function() {
			if (arguments.length <= start || $.type(arguments[start]) === "string") {
				return callback.apply(this, arguments);
			}

			var obj = arguments[start], ret;

			for (var key in obj) {
				var args = Array.from(arguments);
				args.splice(start, 1, key, obj[key]);
				ret = callback.apply(this, args);
			}

			return ret;
		};
	}

	return overload(overload(callback, start + 1, end), start, end - 1);
}

// Copy properties from one object to another. Overwrites allowed.
// Subtle difference of array vs string whitelist: If property doesn't exist in from, array will not define it.
function extend(to, from, whitelist) {
	var whitelistType = type(whitelist);

	if (whitelistType === "string") {
		// To copy gettters/setters, preserve flags etc
		var descriptor = Object.getOwnPropertyDescriptor(from, whitelist);

		if (descriptor && (!descriptor.writable || !descriptor.configurable || !descriptor.enumerable || descriptor.get || descriptor.set)) {
			delete to[whitelist];
			Object.defineProperty(to, whitelist, descriptor);
		}
		else {
			to[whitelist] = from[whitelist];
		}
	}
	else if (whitelistType === "array") {
		whitelist.forEach(function(property) {
			if (property in from) {
				extend(to, from, property);
			}
		});
	}
	else {
		for (var property in from) {
			if (whitelist) {
				if (whitelistType === "regexp" && !whitelist.test(property) ||
					whitelistType === "function" && !whitelist.call(from, property)) {
					continue;
				}
			}

			extend(to, from, property);
		}
	}

	return to;
}

/**
 * Returns the [[Class]] of an object in lowercase (eg. array, date, regexp, string etc)
 */
function type(obj) {
	if (obj === null) {
		return "null";
	}

	if (obj === undefined) {
		return "undefined";
	}

	var ret = (Object.prototype.toString.call(obj).match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();

	if (ret == "number" && isNaN(obj)) {
		return "nan";
	}

	return ret;
}

var $ = self.Bliss = extend(function(expr, context) {
	if (arguments.length == 2 && !context || !expr) {
		return null;
	}

	return $.type(expr) === "string"? (context || document).querySelector(expr) : expr || null;
}, self.Bliss);

extend($, {
	extend: extend,
	overload: overload,
	type: type,

	property: $.property || "_",

	sources: {},

	noop: function() {},

	$: function(expr, context) {
		if (expr instanceof Node || expr instanceof Window) {
			return [expr];
		}

		if (arguments.length == 2 && !context) {
			return [];
		}

		return Array.from(typeof expr == "string"? (context || document).querySelectorAll(expr) : expr || []);
	},

	/*
	 * Return first non-undefined value. Mainly used internally.
	 */
	defined: function () {
		for (var i=0; i<arguments.length; i++) {
			if (arguments[i] !== undefined) {
				return arguments[i];
			}
		}
	},

	create: function (tag, o) {
		if (tag instanceof Node) {
			return $.set(tag, o);
		}

		// 4 signatures: (tag, o), (tag), (o), ()
		if (arguments.length === 1) {
			if ($.type(tag) === "string") {
				o = {};
			}
			else {
				o = tag;
				tag = o.tag;
				o = $.extend({}, o, function(property) {
					return property !== "tag";
				});
			}
		}

		return $.set(document.createElement(tag || "div"), o);
	},

	each: function(obj, callback, ret) {
		ret = ret || {};

		for (var property in obj) {
			ret[property] = callback.call(obj, property, obj[property]);
		}

		return ret;
	},

	ready: function(context) {
		context = context || document;

		return new Promise(function(resolve, reject) {
			if (context.readyState !== "loading") {
				resolve();
			}
			else {
				context.addEventListener("DOMContentLoaded", function() {
					resolve();
				});
			}
		});
	},

	// Helper for defining OOP-like “classes”
	Class: function(o) {
		var special = ["constructor", "extends", "abstract", "static"].concat(Object.keys($.classProps));
		var init = o.hasOwnProperty("constructor")? o.constructor : $.noop;

		var Class = function() {
			if (this.constructor.__abstract && this.constructor === Class) {
				throw new Error("Abstract classes cannot be directly instantiated.");
			}

			Class.super && Class.super.apply(this, arguments);

			init.apply(this, arguments);
		};

		Class.super = o.extends || null;

		Class.prototype = $.extend(Object.create(Class.super? Class.super.prototype : Object), {
			constructor: Class
		});

		var specialFilter = function(property) {
			return this.hasOwnProperty(property) && special.indexOf(property) === -1;
		};

		// Static methods
		if (o.static) {
			$.extend(Class, o.static, specialFilter);

			for (var property in $.classProps) {
				if (property in o.static) {
					$.classProps[property](Class, o.static[property]);
				}
			}
		}

		// Instance methods
		$.extend(Class.prototype, o, specialFilter);

		for (var property in $.classProps) {
			if (property in o) {
				$.classProps[property](Class.prototype, o[property]);
			}
		}

		// For easier calling of super methods
		// This doesn't save us from having to use .call(this) though
		Class.prototype.super = Class.super? Class.super.prototype : null;

		Class.__abstract = !!o.abstract;

		return Class;
	},

	// Properties with special handling in classes
	classProps: {
		// Lazily evaluated properties
		lazy: overload(function(obj, property, getter) {
			Object.defineProperty(obj, property, {
				get: function() {
					var value = getter.call(this);

					Object.defineProperty(this, property, {
						value: value,
						configurable: true,
						enumerable: true,
						writable: true
					});

					return value;
				},
				set: function(value) {
					// Blind write: skip running the getter
					Object.defineProperty(this, property, {
						value: value,
						configurable: true,
						enumerable: true,
						writable: true
					});
				},
				configurable: true,
				enumerable: true
			});

			return obj;
		}),

		// Properties that behave like normal properties but also execute code upon getting/setting
		live: overload(function(obj, property, descriptor) {
			if ($.type(descriptor) === "function") {
				descriptor = {set: descriptor};
			}

			Object.defineProperty(obj, property, {
				get: function() {
					var value = this["_" + property];
					var ret = descriptor.get && descriptor.get.call(this, value);
					return ret !== undefined? ret : value;
				},
				set: function(v) {
					var value = this["_" + property];
					var ret = descriptor.set && descriptor.set.call(this, v, value);
					this["_" + property] = ret !== undefined? ret : v;
				},
				configurable: descriptor.configurable,
				enumerable: descriptor.enumerable
			});

			return obj;
		})

	},

	// Includes a script, returns a promise
	include: function() {
		var url = arguments[arguments.length - 1];
		var loaded = arguments.length === 2? arguments[0] : false;

		var script = document.createElement("script");

		return loaded? Promise.resolve() : new Promise(function(resolve, reject) {
			$.set(script, {
				async: true,
				onload: function() {
					resolve();
					$.remove(script);
				},
				onerror: function() {
					reject();
				},
				src: url,
				inside: document.head
			});
		});

	},

	/*
	 * Fetch API inspired XHR wrapper. Returns promise.
	 */
	fetch: function(url, o) {
		if (!url) {
			throw new TypeError("URL parameter is mandatory and cannot be " + url);
		}

		// Set defaults & fixup arguments
		var env = extend({
			url: new URL(url, location),
			data: "",
			method: "GET",
			headers: {},
			xhr: new XMLHttpRequest()
		}, o);

		env.method = env.method.toUpperCase();

		$.hooks.run("fetch-args", env);

		// Start sending the request

		if (env.method === "GET" && env.data) {
			env.url.search += env.data;
		}

		document.body.setAttribute("data-loading", env.url);

		env.xhr.open(env.method, env.url.href, env.async !== false, env.user, env.password);

		for (var property in o) {
			if (property in env.xhr) {
				try {
					env.xhr[property] = o[property];
				}
				catch (e) {
					self.console && console.error(e);
				}
			}
		}

		if (env.method !== "GET" && !env.headers["Content-type"] && !env.headers["Content-Type"]) {
			env.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}

		for (var header in env.headers) {
			env.xhr.setRequestHeader(header, env.headers[header]);
		}

		return new Promise(function(resolve, reject) {
			env.xhr.onload = function() {
				document.body.removeAttribute("data-loading");

				if (env.xhr.status === 0 || env.xhr.status >= 200 && env.xhr.status < 300 || env.xhr.status === 304) {
					// Success!
					resolve(env.xhr);
				}
				else {
					reject($.extend(Error(env.xhr.statusText), {
						xhr: env.xhr,
						get status() {
							return this.xhr.status;
						}
					}));
				}
			};

			env.xhr.onerror = function() {
				document.body.removeAttribute("data-loading");
				reject($.extend(Error("Network Error"), {xhr: env.xhr}));
			};

			env.xhr.ontimeout = function() {
			    document.body.removeAttribute("data-loading");
			    reject($.extend(Error("Network Timeout"), {xhr: env.xhr}));
			};

			env.xhr.send(env.method === "GET"? null : env.data);
		});
	},

	value: function(obj) {
		var hasRoot = $.type(obj) !== "string";

		return $.$(arguments).slice(+hasRoot).reduce(function(obj, property) {
	        return obj && obj[property];
	    }, hasRoot? obj : self);
	}
});

$.Hooks = new $.Class({
	add: function (name, callback, first) {
		(Array.isArray(name)? name : [name]).forEach(function(name) {
			this[name] = this[name] || [];
			this[name][first? "unshift" : "push"](callback);
		}, this);
	},

	run: function (name, env) {
		this[name] = this[name] || [];
		this[name].forEach(function(callback) {
			callback.call(env && env.context? env.context : env, env);
		});
	}
});

$.hooks = new $.Hooks();

var _ = $.property;

$.Element = function (subject) {
	this.subject = subject;

	// Author-defined element-related data
	this.data = {};

	// Internal Bliss element-related data
	this.bliss = {};
};

$.Element.prototype = {
	set: overload(function(property, value) {

		if (property in $.setProps) {
			$.setProps[property].call(this, value);
		}
		else if (property in this) {
			this[property] = value;
		}
		else {
			this.setAttribute(property, value);
		}

	}, 0),

	// Run a CSS transition, return promise
	transition: function(props, duration) {
		duration = +duration || 400;

		return new Promise(function(resolve, reject) {
			if ("transition" in this.style) {
				// Get existing style
				var previous = $.extend({}, this.style, /^transition(Duration|Property)$/);

				$.style(this, {
					transitionDuration: (duration || 400) + "ms",
					transitionProperty: Object.keys(props).join(", ")
				});

				$.once(this, "transitionend", function() {
					clearTimeout(i);
					$.style(this, previous);
					resolve(this);
				});

				// Failsafe, in case transitionend doesn’t fire
				var i = setTimeout(resolve, duration+50, this);

				$.style(this, props);
			}
			else {
				$.style(this, props);
				resolve(this);
			}
		}.bind(this));
	},

	// Fire a synthesized event on the element
	fire: function (type, properties) {
		var evt = document.createEvent("HTMLEvents");

		evt.initEvent(type, true, true );

		// Return the result of dispatching the event, so we
		// can know if `e.preventDefault` was called inside it
		return this.dispatchEvent($.extend(evt, properties));
	},

	unbind: overload(function(events, callback) {
		(events || "").split(/\s+/).forEach(function (type) {
			if ((_ in this) && (type.indexOf(".") > -1 || !callback)) {
				// Mass unbinding, need to go through listeners
				type = (type || "").split(".");
				var className = type[1];
				type = type[0];
				// man, can’t wait to be able to do [type, className] = type.split(".");

				var listeners = this[_].bliss.listeners = this[_].bliss.listeners || {};

				for (var ltype in listeners) {
					if (!type || ltype === type) {
						// No forEach, because we’re mutating the array
						for (var i=0, l; l=listeners[ltype][i]; i++) {
							if ((!className || className === l.className) &&
							    (!callback || callback === l.callback )) { // TODO what about capture?
								this.removeEventListener(ltype, l.callback, l.capture);
								i--;
							}
						}

					}
				}
			}
			else {
				// Normal event unbinding, defer to native JS
				this.removeEventListener(type, callback);
			}
		}, this);
	}, 0)
};

/*
 * Properties with custom handling in $.set()
 * Also available as functions directly on element._ and on $
 */
$.setProps = {
	// Set a bunch of inline CSS styles
	style: function (val) {
		$.extend(this.style, val);
	},

	// Set a bunch of attributes
	attributes: function (o) {
		for (var attribute in o) {
			this.setAttribute(attribute, o[attribute]);
		}
	},

	// Set a bunch of properties on the element
	properties: function (val) {
		$.extend(this, val);
	},

	// Bind one or more events to the element
	events: function (val) {
		if (val && val.addEventListener) {
			// Copy events from other element (requires Bliss Full)
			var me = this;

			// Copy listeners
			if (val[_] && val[_].bliss) {
				var listeners = val[_].bliss.listeners;

				for (var type in listeners) {
					listeners[type].forEach(function(l) {
						me.addEventListener(type, l.callback, l.capture);
					});
				}
			}

			// Copy inline events
			for (var onevent in val) {
				if (onevent.indexOf("on") === 0) {
					this[onevent] = val[onevent];
				}
			}
		}
		else if (arguments.length > 1 && $.type(val) === "string") {
			var callback = arguments[1], capture = arguments[2];

			val.split(/\s+/).forEach(function (event) {
				this.addEventListener(event, callback, capture);
			}, this);
		}
		else {
			for (var events in val) {
				$.events(this, events, val[events]);
			}
		}
	},

	once: overload(function(events, callback) {
		events = events.split(/\s+/);
		var me = this;
		var once = function() {
			events.forEach(function(event) {
				me.removeEventListener(event, once);
			});

			return callback.apply(me, arguments);
		};

		events.forEach(function (event) {
			me.addEventListener(event, once);
		});
	}, 0),

	// Event delegation
	delegate: overload(function (type, selector, callback) {
		this.addEventListener(type, function(evt) {
			if (evt.target.closest(selector)) {
				callback.call(this, evt);
			}
		});
	}, 0, 2),

	// Set the contents as a string, an element, an object to create an element or an array of these
	contents: function (val) {
		if (val || val === 0) {
			(Array.isArray(val)? val : [val]).forEach(function (child) {
				var type = $.type(child);

				if (/^(string|number)$/.test(type)) {
					child = document.createTextNode(child + "");
				}
				else if (type === "object") {
					child = $.create(child);
				}

				if (child instanceof Node) {
					this.appendChild(child);
				}
			}, this);
		}
	},

	// Append the element inside another element
	inside: function (element) {
		element.appendChild(this);
	},

	// Insert the element before another element
	before: function (element) {
		element.parentNode.insertBefore(this, element);
	},

	// Insert the element after another element
	after: function (element) {
		element.parentNode.insertBefore(this, element.nextSibling);
	},

	// Insert the element before another element's contents
	start: function (element) {
		element.insertBefore(this, element.firstChild);
	},

	// Wrap the element around another element
	around: function (element) {
		if (element.parentNode) {
			$.before(this, element);
		}

		(/^template$/i.test(this.nodeName)? this.content || this : this).appendChild(element);
	}
};

$.Array = function (subject) {
	this.subject = subject;
};

$.Array.prototype = {
	all: function(method) {
		var args = $$(arguments).slice(1);

		return this[method].apply(this, args);
	}
};

// Extends Bliss with more methods
$.add = overload(function(method, callback, on, noOverwrite) {
	on = $.extend({$: true, element: true, array: true}, on);

	if ($.type(callback) == "function") {
		if (on.element && (!(method in $.Element.prototype) || !noOverwrite)) {
			$.Element.prototype[method] = function () {
				return this.subject && $.defined(callback.apply(this.subject, arguments), this.subject);
			};
		}

		if (on.array && (!(method in $.Array.prototype) || !noOverwrite)) {
			$.Array.prototype[method] = function() {
				var args = arguments;
				return this.subject.map(function(element) {
					return element && $.defined(callback.apply(element, args), element);
				});
			};
		}

		if (on.$) {
			$.sources[method] = $[method] = callback;

			if (on.array || on.element) {
				$[method] = function () {
					var args = [].slice.apply(arguments);
					var subject = args.shift();
					var Type = on.array && Array.isArray(subject)? "Array" : "Element";

					return $[Type].prototype[method].apply({subject: subject}, args);
				};
			}
		}
	}
}, 0);

$.add($.Array.prototype, {element: false});
$.add($.Element.prototype);
$.add($.setProps);
$.add($.classProps, {element: false, array: false});

// Add native methods on $ and _
var dummy = document.createElement("_");
$.add($.extend({}, HTMLElement.prototype, function(method) {
	return $.type(dummy[method]) === "function";
}), null, true);


})();

(function($) {
"use strict";

if (!Bliss || Bliss.shy) {
	return;
}

var _ = Bliss.property;

// Methods requiring Bliss Full
$.add({
	// Clone elements, with events and data
	clone: function () {
		var clone = this.cloneNode(true);
		var descendants = $.$("*", clone).concat(clone);

		$.$("*", this).concat(this).forEach(function(element, i, arr) {
			$.events(descendants[i], element);
			descendants[i]._.data = $.extend({}, element._.data);
		});

		return clone;
	}
}, {array: false});

// Define the _ property on arrays and elements

Object.defineProperty(Node.prototype, _, {
	// Written for IE compatability (see #49)
	get: function getter () {
		Object.defineProperty(Node.prototype, _, {
			get: undefined
		});
		Object.defineProperty(this, _, {
			value: new $.Element(this)
		});
		Object.defineProperty(Node.prototype, _, {
			get: getter
		});
		return this[_];
	},
	configurable: true
});

Object.defineProperty(Array.prototype, _, {
	get: function () {
		Object.defineProperty(this, _, {
			value: new $.Array(this)
		});

		return this[_];
	},
	configurable: true
});

// Hijack addEventListener and removeEventListener to store callbacks

if (self.EventTarget && "addEventListener" in EventTarget.prototype) {
	var addEventListener = EventTarget.prototype.addEventListener,
	    removeEventListener = EventTarget.prototype.removeEventListener,
	    equal = function(callback, capture, l) {
			return l.callback === callback && l.capture == capture;
	    },
	    notEqual = function() { 
			return !equal.apply(this, arguments); 
		};

	EventTarget.prototype.addEventListener = function(type, callback, capture) {
		if (this && this[_] && this[_].bliss && callback) {
			var listeners = this[_].bliss.listeners = this[_].bliss.listeners || {};

			if (type.indexOf(".") > -1) {
				type = type.split(".");
				var className = type[1];
				type = type[0];
			}

			listeners[type] = listeners[type] || [];

			if (listeners[type].filter(equal.bind(null, callback, capture)).length === 0) {
				listeners[type].push({callback: callback, capture: capture, className: className});
			}
		}

		return addEventListener.call(this, type, callback, capture);
	};

	EventTarget.prototype.removeEventListener = function(type, callback, capture) {
		if (this && this[_] && this[_].bliss  && callback) {
			var listeners = this[_].bliss.listeners = this[_].bliss.listeners || {};

			if (listeners[type]) {
				listeners[type] = listeners[type].filter(notEqual.bind(null, callback, capture));
			}
		}

		return removeEventListener.call(this, type, callback, capture);
	};
}

// Set $ and $$ convenience methods, if not taken
self.$ = self.$ || $;
self.$$ = self.$$ || $.$;

})(Bliss);


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domReady = __webpack_require__(28);

Object.keys(_domReady).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _domReady[key];
    }
  });
});

var _hasClass = __webpack_require__(29);

Object.keys(_hasClass).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hasClass[key];
    }
  });
});

var _toggleClass = __webpack_require__(30);

Object.keys(_toggleClass).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _toggleClass[key];
    }
  });
});

var _events = __webpack_require__(31);

Object.keys(_events).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _events[key];
    }
  });
});

var _closestParent = __webpack_require__(32);

Object.keys(_closestParent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _closestParent[key];
    }
  });
});

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmJmZGNiY2Q3MmM1MzA4ZjFlYmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9kZXZlbG9wbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJpc21qcy9wcmlzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJpc21qcy9wbHVnaW5zL3Rvb2xiYXIvcHJpc20tdG9vbGJhci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJpc21qcy9wbHVnaW5zL25vcm1hbGl6ZS13aGl0ZXNwYWNlL3ByaXNtLW5vcm1hbGl6ZS13aGl0ZXNwYWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcmlzbWpzL3BsdWdpbnMvbGluZS1udW1iZXJzL3ByaXNtLWxpbmUtbnVtYmVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2pzL2RldmVsb3BtZW50L21vZHVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9kZXZlbG9wbWVudC9tb2R1bGVzL2xpYnJhcnktcGFnZS1uYXZpZ2F0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvZG9tLXJlYWR5LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvaGFzLWNsYXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvdG9nZ2xlLWNsYXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvY2xvc2VzdC1wYXJlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JsaXNzZnVsanMvYmxpc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9zaGFyZWQvbWlzYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIl0sIm5hbWVzIjpbImluaXRNb2R1bGVzIiwiTGlicmFyeVBhZ2VOYXZpZ2F0aW9uIiwicmVpemVIYW5kbGVyIiwiaW5pdFNpZGViYXIiLCJtb2JpbGVOYXZpZ2F0aW9uQ2xpY2tIYW5kbGVyIiwibmF2aWdhdGlvbklubmVyIiwibmF2aWdhdGlvbklubmVyT3BlbkNsYXNzTmFtZSIsInNpZGViYXIiLCJtYXhXaWR0aCIsIm5hdmlnYXRpb25JZCIsIm5hdmlnYXRpb25Jbm5lckNsYXNzTmFtZSIsImNvbnRlbnRJZCIsIm1vYmlsZU5hdmlnYXRpb25DbGFzc05hbWUiLCJtb2JpbGVOYXZpZ2F0aW9uQ29udGFpbmVyQ2xhc3NOYW1lIiwibGlicmFyeUNvbnRhaW5lcklkIiwibGlicmFyeUNvbnRhaW5lckVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibmF2aWdhdGlvbiIsIm1vYmlsZU5hdmlnYXRpb25Db250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsIm1vYmlsZU5hdmlnYXRpb24iLCJzZXR1cCIsIiQiLCJldmVudHMiLCJ3aW5kb3ciLCJyZXNpemUiLCJkZWxlZ2F0ZSIsImlubmVyV2lkdGgiLCJkb21SZWFkeSIsImZuIiwicmVhZHlTdGF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImVsSGFzQ2xhc3MiLCJlbCIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiUmVnRXhwIiwidGVzdCIsInRvZ2dsZUNsYXNzIiwiZm9yY2UiLCJ0b2dnbGUiLCJjbGFzc2VzIiwic3BsaXQiLCJleGlzdGluZ0luZGV4IiwiaSIsImxlbmd0aCIsInNwbGljZSIsInB1c2giLCJqb2luIiwiYWRkRXZlbnRMaXN0ZW5lclRvRWwiLCJyZW1vdmVFdmVudExpc3RlbmVyRnJvbUVsIiwicmVtb3ZlQWxsRXZlbnRzRnJvbUVsIiwiZXZlbnROYW1lIiwiaGFuZGxlciIsImNhbGwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGV0YWNoRXZlbnQiLCJjbG9uZSIsImNsb25lTm9kZSIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJjbG9zZXN0UGFyZW50T2ZFbCIsIm1hdGNoZXMiLCJvd25lckRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIml0ZW0iLCJwYXJlbnRFbGVtZW50Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0RBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUVBLG9CQUFTLFlBQVc7QUFDbEI7QUFDRCxDQUZELEU7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0osc0NBQXNDLHNCQUFzQjtBQUM1RDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLHdDQUF3QyxvQkFBb0I7QUFDNUQ7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsK0JBQStCLHdCQUF3QixFQUFFO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHdCQUF3Qix5QkFBeUI7QUFDakQ7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHFCQUFxQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHVDQUF1QyxtQkFBbUI7O0FBRTFEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1DQUFtQyxtRUFBbUU7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLDJCQUEyQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxZQUFZOztBQUVaLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0JBQW9CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0EsR0FBRzs7QUFFSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2Q0FBNkMsYUFBYTtBQUMxRDs7QUFFQTtBQUNBO0FBQ0Esa0RBQWtELGFBQWE7QUFDL0Q7O0FBRUE7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdUJBQXVCO0FBQzdDO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixvQ0FBb0M7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZDQUE2QyxpQkFBaUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELDBCQUEwQixlQUFlO0FBQ3pDO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCOztBQUVsRDtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsQ0FBQzs7O0FBR0QsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQztBQUN0QyxHQUFHOztBQUVIO0FBQ0E7QUFDQSxDQUFDLEdBQUcsYUFBYTs7QUFFakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLEVBQUU7QUFDRjtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiw0QjtBQUNBLHdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwwQkFBMEIsMkRBQTJEO0FBQ3JGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzV6QkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7Ozs7QUNKQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QyIsImZpbGUiOiJkZXZlbG9wbWVudC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJiZmRjYmNkNzJjNTMwOGYxZWJmIiwiaW1wb3J0ICdwcmlzbWpzJztcbmltcG9ydCAncHJpc21qcy9wbHVnaW5zL3Rvb2xiYXIvcHJpc20tdG9vbGJhci5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvcGx1Z2lucy9ub3JtYWxpemUtd2hpdGVzcGFjZS9wcmlzbS1ub3JtYWxpemUtd2hpdGVzcGFjZSc7XG5pbXBvcnQgJ3ByaXNtanMvcGx1Z2lucy9saW5lLW51bWJlcnMvcHJpc20tbGluZS1udW1iZXJzJztcbmltcG9ydCAnYmxpc3NmdWxqcyc7XG5cbmltcG9ydCB7IGRvbVJlYWR5IH0gZnJvbSAnLi8uLi9zaGFyZWQvbWlzYyc7XG5pbXBvcnQgeyBpbml0TW9kdWxlcyB9IGZyb20gJy4vbW9kdWxlcyc7XG5cbmRvbVJlYWR5KGZ1bmN0aW9uKCkge1xuICBuZXcgaW5pdE1vZHVsZXMoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qcy9kZXZlbG9wbWVudC9pbmRleC5qcyIsIlxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1jb3JlLmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbnZhciBfc2VsZiA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJylcblx0PyB3aW5kb3cgICAvLyBpZiBpbiBicm93c2VyXG5cdDogKFxuXHRcdCh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSlcblx0XHQ/IHNlbGYgLy8gaWYgaW4gd29ya2VyXG5cdFx0OiB7fSAgIC8vIGlmIGluIG5vZGUganNcblx0KTtcblxuLyoqXG4gKiBQcmlzbTogTGlnaHR3ZWlnaHQsIHJvYnVzdCwgZWxlZ2FudCBzeW50YXggaGlnaGxpZ2h0aW5nXG4gKiBNSVQgbGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocC9cbiAqIEBhdXRob3IgTGVhIFZlcm91IGh0dHA6Ly9sZWEudmVyb3UubWVcbiAqL1xuXG52YXIgUHJpc20gPSAoZnVuY3Rpb24oKXtcblxuLy8gUHJpdmF0ZSBoZWxwZXIgdmFyc1xudmFyIGxhbmcgPSAvXFxibGFuZyg/OnVhZ2UpPy0oXFx3KylcXGIvaTtcbnZhciB1bmlxdWVJZCA9IDA7XG5cbnZhciBfID0gX3NlbGYuUHJpc20gPSB7XG5cdG1hbnVhbDogX3NlbGYuUHJpc20gJiYgX3NlbGYuUHJpc20ubWFudWFsLFxuXHRkaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXI6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcixcblx0dXRpbDoge1xuXHRcdGVuY29kZTogZnVuY3Rpb24gKHRva2Vucykge1xuXHRcdFx0aWYgKHRva2VucyBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVG9rZW4odG9rZW5zLnR5cGUsIF8udXRpbC5lbmNvZGUodG9rZW5zLmNvbnRlbnQpLCB0b2tlbnMuYWxpYXMpO1xuXHRcdFx0fSBlbHNlIGlmIChfLnV0aWwudHlwZSh0b2tlbnMpID09PSAnQXJyYXknKSB7XG5cdFx0XHRcdHJldHVybiB0b2tlbnMubWFwKF8udXRpbC5lbmNvZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRva2Vucy5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC9cXHUwMGEwL2csICcgJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHR5cGU6IGZ1bmN0aW9uIChvKSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLm1hdGNoKC9cXFtvYmplY3QgKFxcdyspXFxdLylbMV07XG5cdFx0fSxcblxuXHRcdG9iaklkOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRpZiAoIW9ialsnX19pZCddKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdfX2lkJywgeyB2YWx1ZTogKyt1bmlxdWVJZCB9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmpbJ19faWQnXTtcblx0XHR9LFxuXG5cdFx0Ly8gRGVlcCBjbG9uZSBhIGxhbmd1YWdlIGRlZmluaXRpb24gKGUuZy4gdG8gZXh0ZW5kIGl0KVxuXHRcdGNsb25lOiBmdW5jdGlvbiAobykge1xuXHRcdFx0dmFyIHR5cGUgPSBfLnV0aWwudHlwZShvKTtcblxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdGNhc2UgJ09iamVjdCc6XG5cdFx0XHRcdFx0dmFyIGNsb25lID0ge307XG5cblx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gbykge1xuXHRcdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0XHRjbG9uZVtrZXldID0gXy51dGlsLmNsb25lKG9ba2V5XSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGNsb25lO1xuXG5cdFx0XHRcdGNhc2UgJ0FycmF5Jzpcblx0XHRcdFx0XHRyZXR1cm4gby5tYXAoZnVuY3Rpb24odikgeyByZXR1cm4gXy51dGlsLmNsb25lKHYpOyB9KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG87XG5cdFx0fVxuXHR9LFxuXG5cdGxhbmd1YWdlczoge1xuXHRcdGV4dGVuZDogZnVuY3Rpb24gKGlkLCByZWRlZikge1xuXHRcdFx0dmFyIGxhbmcgPSBfLnV0aWwuY2xvbmUoXy5sYW5ndWFnZXNbaWRdKTtcblxuXHRcdFx0Zm9yICh2YXIga2V5IGluIHJlZGVmKSB7XG5cdFx0XHRcdGxhbmdba2V5XSA9IHJlZGVmW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBsYW5nO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbnNlcnQgYSB0b2tlbiBiZWZvcmUgYW5vdGhlciB0b2tlbiBpbiBhIGxhbmd1YWdlIGxpdGVyYWxcblx0XHQgKiBBcyB0aGlzIG5lZWRzIHRvIHJlY3JlYXRlIHRoZSBvYmplY3QgKHdlIGNhbm5vdCBhY3R1YWxseSBpbnNlcnQgYmVmb3JlIGtleXMgaW4gb2JqZWN0IGxpdGVyYWxzKSxcblx0XHQgKiB3ZSBjYW5ub3QganVzdCBwcm92aWRlIGFuIG9iamVjdCwgd2UgbmVlZCBhbm9iamVjdCBhbmQgYSBrZXkuXG5cdFx0ICogQHBhcmFtIGluc2lkZSBUaGUga2V5IChvciBsYW5ndWFnZSBpZCkgb2YgdGhlIHBhcmVudFxuXHRcdCAqIEBwYXJhbSBiZWZvcmUgVGhlIGtleSB0byBpbnNlcnQgYmVmb3JlLiBJZiBub3QgcHJvdmlkZWQsIHRoZSBmdW5jdGlvbiBhcHBlbmRzIGluc3RlYWQuXG5cdFx0ICogQHBhcmFtIGluc2VydCBPYmplY3Qgd2l0aCB0aGUga2V5L3ZhbHVlIHBhaXJzIHRvIGluc2VydFxuXHRcdCAqIEBwYXJhbSByb290IFRoZSBvYmplY3QgdGhhdCBjb250YWlucyBgaW5zaWRlYC4gSWYgZXF1YWwgdG8gUHJpc20ubGFuZ3VhZ2VzLCBpdCBjYW4gYmUgb21pdHRlZC5cblx0XHQgKi9cblx0XHRpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIChpbnNpZGUsIGJlZm9yZSwgaW5zZXJ0LCByb290KSB7XG5cdFx0XHRyb290ID0gcm9vdCB8fCBfLmxhbmd1YWdlcztcblx0XHRcdHZhciBncmFtbWFyID0gcm9vdFtpbnNpZGVdO1xuXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSB7XG5cdFx0XHRcdGluc2VydCA9IGFyZ3VtZW50c1sxXTtcblxuXHRcdFx0XHRmb3IgKHZhciBuZXdUb2tlbiBpbiBpbnNlcnQpIHtcblx0XHRcdFx0XHRpZiAoaW5zZXJ0Lmhhc093blByb3BlcnR5KG5ld1Rva2VuKSkge1xuXHRcdFx0XHRcdFx0Z3JhbW1hcltuZXdUb2tlbl0gPSBpbnNlcnRbbmV3VG9rZW5dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBncmFtbWFyO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcmV0ID0ge307XG5cblx0XHRcdGZvciAodmFyIHRva2VuIGluIGdyYW1tYXIpIHtcblxuXHRcdFx0XHRpZiAoZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcblxuXHRcdFx0XHRcdGlmICh0b2tlbiA9PSBiZWZvcmUpIHtcblxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXRbbmV3VG9rZW5dID0gaW5zZXJ0W25ld1Rva2VuXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldFt0b2tlbl0gPSBncmFtbWFyW3Rva2VuXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBVcGRhdGUgcmVmZXJlbmNlcyBpbiBvdGhlciBsYW5ndWFnZSBkZWZpbml0aW9uc1xuXHRcdFx0Xy5sYW5ndWFnZXMuREZTKF8ubGFuZ3VhZ2VzLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gcm9vdFtpbnNpZGVdICYmIGtleSAhPSBpbnNpZGUpIHtcblx0XHRcdFx0XHR0aGlzW2tleV0gPSByZXQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcm9vdFtpbnNpZGVdID0gcmV0O1xuXHRcdH0sXG5cblx0XHQvLyBUcmF2ZXJzZSBhIGxhbmd1YWdlIGRlZmluaXRpb24gd2l0aCBEZXB0aCBGaXJzdCBTZWFyY2hcblx0XHRERlM6IGZ1bmN0aW9uKG8sIGNhbGxiYWNrLCB0eXBlLCB2aXNpdGVkKSB7XG5cdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblx0XHRcdGZvciAodmFyIGkgaW4gbykge1xuXHRcdFx0XHRpZiAoby5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobywgaSwgb1tpXSwgdHlwZSB8fCBpKTtcblxuXHRcdFx0XHRcdGlmIChfLnV0aWwudHlwZShvW2ldKSA9PT0gJ09iamVjdCcgJiYgIXZpc2l0ZWRbXy51dGlsLm9iaklkKG9baV0pXSkge1xuXHRcdFx0XHRcdFx0dmlzaXRlZFtfLnV0aWwub2JqSWQob1tpXSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhvW2ldLCBjYWxsYmFjaywgbnVsbCwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKF8udXRpbC50eXBlKG9baV0pID09PSAnQXJyYXknICYmICF2aXNpdGVkW18udXRpbC5vYmpJZChvW2ldKV0pIHtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbXy51dGlsLm9iaklkKG9baV0pXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRfLmxhbmd1YWdlcy5ERlMob1tpXSwgY2FsbGJhY2ssIGksIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0cGx1Z2luczoge30sXG5cblx0aGlnaGxpZ2h0QWxsOiBmdW5jdGlvbihhc3luYywgY2FsbGJhY2spIHtcblx0XHR2YXIgZW52ID0ge1xuXHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0c2VsZWN0b3I6ICdjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSwgW2NsYXNzKj1cImxhbmd1YWdlLVwiXSBjb2RlLCBjb2RlW2NsYXNzKj1cImxhbmctXCJdLCBbY2xhc3MqPVwibGFuZy1cIl0gY29kZSdcblx0XHR9O1xuXG5cdFx0Xy5ob29rcy5ydW4oXCJiZWZvcmUtaGlnaGxpZ2h0YWxsXCIsIGVudik7XG5cblx0XHR2YXIgZWxlbWVudHMgPSBlbnYuZWxlbWVudHMgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbnYuc2VsZWN0b3IpO1xuXG5cdFx0Zm9yICh2YXIgaT0wLCBlbGVtZW50OyBlbGVtZW50ID0gZWxlbWVudHNbaSsrXTspIHtcblx0XHRcdF8uaGlnaGxpZ2h0RWxlbWVudChlbGVtZW50LCBhc3luYyA9PT0gdHJ1ZSwgZW52LmNhbGxiYWNrKTtcblx0XHR9XG5cdH0sXG5cblx0aGlnaGxpZ2h0RWxlbWVudDogZnVuY3Rpb24oZWxlbWVudCwgYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0Ly8gRmluZCBsYW5ndWFnZVxuXHRcdHZhciBsYW5ndWFnZSwgZ3JhbW1hciwgcGFyZW50ID0gZWxlbWVudDtcblxuXHRcdHdoaWxlIChwYXJlbnQgJiYgIWxhbmcudGVzdChwYXJlbnQuY2xhc3NOYW1lKSkge1xuXHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0aWYgKHBhcmVudCkge1xuXHRcdFx0bGFuZ3VhZ2UgPSAocGFyZW50LmNsYXNzTmFtZS5tYXRjaChsYW5nKSB8fCBbLCcnXSlbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdGdyYW1tYXIgPSBfLmxhbmd1YWdlc1tsYW5ndWFnZV07XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBlbGVtZW50LCBpZiBub3QgcHJlc2VudFxuXHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShsYW5nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpICsgJyBsYW5ndWFnZS0nICsgbGFuZ3VhZ2U7XG5cblx0XHRpZiAoZWxlbWVudC5wYXJlbnROb2RlKSB7XG5cdFx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIHBhcmVudCwgZm9yIHN0eWxpbmdcblx0XHRcdHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuXHRcdFx0aWYgKC9wcmUvaS50ZXN0KHBhcmVudC5ub2RlTmFtZSkpIHtcblx0XHRcdFx0cGFyZW50LmNsYXNzTmFtZSA9IHBhcmVudC5jbGFzc05hbWUucmVwbGFjZShsYW5nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpICsgJyBsYW5ndWFnZS0nICsgbGFuZ3VhZ2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIGNvZGUgPSBlbGVtZW50LnRleHRDb250ZW50O1xuXG5cdFx0dmFyIGVudiA9IHtcblx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRsYW5ndWFnZTogbGFuZ3VhZ2UsXG5cdFx0XHRncmFtbWFyOiBncmFtbWFyLFxuXHRcdFx0Y29kZTogY29kZVxuXHRcdH07XG5cblx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLXNhbml0eS1jaGVjaycsIGVudik7XG5cblx0XHRpZiAoIWVudi5jb2RlIHx8ICFlbnYuZ3JhbW1hcikge1xuXHRcdFx0aWYgKGVudi5jb2RlKSB7XG5cdFx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0JywgZW52KTtcblx0XHRcdFx0ZW52LmVsZW1lbnQudGV4dENvbnRlbnQgPSBlbnYuY29kZTtcblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLWhpZ2hsaWdodCcsIGVudik7XG5cdFx0XHR9XG5cdFx0XHRfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0JywgZW52KTtcblxuXHRcdGlmIChhc3luYyAmJiBfc2VsZi5Xb3JrZXIpIHtcblx0XHRcdHZhciB3b3JrZXIgPSBuZXcgV29ya2VyKF8uZmlsZW5hbWUpO1xuXG5cdFx0XHR3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdGVudi5oaWdobGlnaHRlZENvZGUgPSBldnQuZGF0YTtcblxuXHRcdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWluc2VydCcsIGVudik7XG5cblx0XHRcdFx0ZW52LmVsZW1lbnQuaW5uZXJIVE1MID0gZW52LmhpZ2hsaWdodGVkQ29kZTtcblxuXHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGVudi5lbGVtZW50KTtcblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLWhpZ2hsaWdodCcsIGVudik7XG5cdFx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0XHR9O1xuXG5cdFx0XHR3b3JrZXIucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRsYW5ndWFnZTogZW52Lmxhbmd1YWdlLFxuXHRcdFx0XHRjb2RlOiBlbnYuY29kZSxcblx0XHRcdFx0aW1tZWRpYXRlQ2xvc2U6IHRydWVcblx0XHRcdH0pKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRlbnYuaGlnaGxpZ2h0ZWRDb2RlID0gXy5oaWdobGlnaHQoZW52LmNvZGUsIGVudi5ncmFtbWFyLCBlbnYubGFuZ3VhZ2UpO1xuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWluc2VydCcsIGVudik7XG5cblx0XHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZWxlbWVudCk7XG5cblx0XHRcdF8uaG9va3MucnVuKCdhZnRlci1oaWdobGlnaHQnLCBlbnYpO1xuXHRcdFx0Xy5ob29rcy5ydW4oJ2NvbXBsZXRlJywgZW52KTtcblx0XHR9XG5cdH0sXG5cblx0aGlnaGxpZ2h0OiBmdW5jdGlvbiAodGV4dCwgZ3JhbW1hciwgbGFuZ3VhZ2UpIHtcblx0XHR2YXIgdG9rZW5zID0gXy50b2tlbml6ZSh0ZXh0LCBncmFtbWFyKTtcblx0XHRyZXR1cm4gVG9rZW4uc3RyaW5naWZ5KF8udXRpbC5lbmNvZGUodG9rZW5zKSwgbGFuZ3VhZ2UpO1xuXHR9LFxuXG5cdG1hdGNoR3JhbW1hcjogZnVuY3Rpb24gKHRleHQsIHN0cmFyciwgZ3JhbW1hciwgaW5kZXgsIHN0YXJ0UG9zLCBvbmVzaG90LCB0YXJnZXQpIHtcblx0XHR2YXIgVG9rZW4gPSBfLlRva2VuO1xuXG5cdFx0Zm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuXHRcdFx0aWYoIWdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pIHx8ICFncmFtbWFyW3Rva2VuXSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRva2VuID09IHRhcmdldCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBwYXR0ZXJucyA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdFx0cGF0dGVybnMgPSAoXy51dGlsLnR5cGUocGF0dGVybnMpID09PSBcIkFycmF5XCIpID8gcGF0dGVybnMgOiBbcGF0dGVybnNdO1xuXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHBhdHRlcm5zLmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdHZhciBwYXR0ZXJuID0gcGF0dGVybnNbal0sXG5cdFx0XHRcdFx0aW5zaWRlID0gcGF0dGVybi5pbnNpZGUsXG5cdFx0XHRcdFx0bG9va2JlaGluZCA9ICEhcGF0dGVybi5sb29rYmVoaW5kLFxuXHRcdFx0XHRcdGdyZWVkeSA9ICEhcGF0dGVybi5ncmVlZHksXG5cdFx0XHRcdFx0bG9va2JlaGluZExlbmd0aCA9IDAsXG5cdFx0XHRcdFx0YWxpYXMgPSBwYXR0ZXJuLmFsaWFzO1xuXG5cdFx0XHRcdGlmIChncmVlZHkgJiYgIXBhdHRlcm4ucGF0dGVybi5nbG9iYWwpIHtcblx0XHRcdFx0XHQvLyBXaXRob3V0IHRoZSBnbG9iYWwgZmxhZywgbGFzdEluZGV4IHdvbid0IHdvcmtcblx0XHRcdFx0XHR2YXIgZmxhZ3MgPSBwYXR0ZXJuLnBhdHRlcm4udG9TdHJpbmcoKS5tYXRjaCgvW2ltdXldKiQvKVswXTtcblx0XHRcdFx0XHRwYXR0ZXJuLnBhdHRlcm4gPSBSZWdFeHAocGF0dGVybi5wYXR0ZXJuLnNvdXJjZSwgZmxhZ3MgKyBcImdcIik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwYXR0ZXJuID0gcGF0dGVybi5wYXR0ZXJuIHx8IHBhdHRlcm47XG5cblx0XHRcdFx0Ly8gRG9u4oCZdCBjYWNoZSBsZW5ndGggYXMgaXQgY2hhbmdlcyBkdXJpbmcgdGhlIGxvb3Bcblx0XHRcdFx0Zm9yICh2YXIgaSA9IGluZGV4LCBwb3MgPSBzdGFydFBvczsgaSA8IHN0cmFyci5sZW5ndGg7IHBvcyArPSBzdHJhcnJbaV0ubGVuZ3RoLCArK2kpIHtcblxuXHRcdFx0XHRcdHZhciBzdHIgPSBzdHJhcnJbaV07XG5cblx0XHRcdFx0XHRpZiAoc3RyYXJyLmxlbmd0aCA+IHRleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHQvLyBTb21ldGhpbmcgd2VudCB0ZXJyaWJseSB3cm9uZywgQUJPUlQsIEFCT1JUIVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzdHIgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cGF0dGVybi5sYXN0SW5kZXggPSAwO1xuXG5cdFx0XHRcdFx0dmFyIG1hdGNoID0gcGF0dGVybi5leGVjKHN0ciksXG5cdFx0XHRcdFx0ICAgIGRlbE51bSA9IDE7XG5cblx0XHRcdFx0XHQvLyBHcmVlZHkgcGF0dGVybnMgY2FuIG92ZXJyaWRlL3JlbW92ZSB1cCB0byB0d28gcHJldmlvdXNseSBtYXRjaGVkIHRva2Vuc1xuXHRcdFx0XHRcdGlmICghbWF0Y2ggJiYgZ3JlZWR5ICYmIGkgIT0gc3RyYXJyLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0XHRcdHBhdHRlcm4ubGFzdEluZGV4ID0gcG9zO1xuXHRcdFx0XHRcdFx0bWF0Y2ggPSBwYXR0ZXJuLmV4ZWModGV4dCk7XG5cdFx0XHRcdFx0XHRpZiAoIW1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgZnJvbSA9IG1hdGNoLmluZGV4ICsgKGxvb2tiZWhpbmQgPyBtYXRjaFsxXS5sZW5ndGggOiAwKSxcblx0XHRcdFx0XHRcdCAgICB0byA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoLFxuXHRcdFx0XHRcdFx0ICAgIGsgPSBpLFxuXHRcdFx0XHRcdFx0ICAgIHAgPSBwb3M7XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIGxlbiA9IHN0cmFyci5sZW5ndGg7IGsgPCBsZW4gJiYgKHAgPCB0byB8fCAoIXN0cmFycltrXS50eXBlICYmICFzdHJhcnJbayAtIDFdLmdyZWVkeSkpOyArK2spIHtcblx0XHRcdFx0XHRcdFx0cCArPSBzdHJhcnJba10ubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHQvLyBNb3ZlIHRoZSBpbmRleCBpIHRvIHRoZSBlbGVtZW50IGluIHN0cmFyciB0aGF0IGlzIGNsb3Nlc3QgdG8gZnJvbVxuXHRcdFx0XHRcdFx0XHRpZiAoZnJvbSA+PSBwKSB7XG5cdFx0XHRcdFx0XHRcdFx0KytpO1xuXHRcdFx0XHRcdFx0XHRcdHBvcyA9IHA7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdCAqIElmIHN0cmFycltpXSBpcyBhIFRva2VuLCB0aGVuIHRoZSBtYXRjaCBzdGFydHMgaW5zaWRlIGFub3RoZXIgVG9rZW4sIHdoaWNoIGlzIGludmFsaWRcblx0XHRcdFx0XHRcdCAqIElmIHN0cmFycltrIC0gMV0gaXMgZ3JlZWR5IHdlIGFyZSBpbiBjb25mbGljdCB3aXRoIGFub3RoZXIgZ3JlZWR5IHBhdHRlcm5cblx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0aWYgKHN0cmFycltpXSBpbnN0YW5jZW9mIFRva2VuIHx8IHN0cmFycltrIC0gMV0uZ3JlZWR5KSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBOdW1iZXIgb2YgdG9rZW5zIHRvIGRlbGV0ZSBhbmQgcmVwbGFjZSB3aXRoIHRoZSBuZXcgbWF0Y2hcblx0XHRcdFx0XHRcdGRlbE51bSA9IGsgLSBpO1xuXHRcdFx0XHRcdFx0c3RyID0gdGV4dC5zbGljZShwb3MsIHApO1xuXHRcdFx0XHRcdFx0bWF0Y2guaW5kZXggLT0gcG9zO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghbWF0Y2gpIHtcblx0XHRcdFx0XHRcdGlmIChvbmVzaG90KSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihsb29rYmVoaW5kKSB7XG5cdFx0XHRcdFx0XHRsb29rYmVoaW5kTGVuZ3RoID0gbWF0Y2hbMV0ubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBmcm9tID0gbWF0Y2guaW5kZXggKyBsb29rYmVoaW5kTGVuZ3RoLFxuXHRcdFx0XHRcdCAgICBtYXRjaCA9IG1hdGNoWzBdLnNsaWNlKGxvb2tiZWhpbmRMZW5ndGgpLFxuXHRcdFx0XHRcdCAgICB0byA9IGZyb20gKyBtYXRjaC5sZW5ndGgsXG5cdFx0XHRcdFx0ICAgIGJlZm9yZSA9IHN0ci5zbGljZSgwLCBmcm9tKSxcblx0XHRcdFx0XHQgICAgYWZ0ZXIgPSBzdHIuc2xpY2UodG8pO1xuXG5cdFx0XHRcdFx0dmFyIGFyZ3MgPSBbaSwgZGVsTnVtXTtcblxuXHRcdFx0XHRcdGlmIChiZWZvcmUpIHtcblx0XHRcdFx0XHRcdCsraTtcblx0XHRcdFx0XHRcdHBvcyArPSBiZWZvcmUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0YXJncy5wdXNoKGJlZm9yZSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHdyYXBwZWQgPSBuZXcgVG9rZW4odG9rZW4sIGluc2lkZT8gXy50b2tlbml6ZShtYXRjaCwgaW5zaWRlKSA6IG1hdGNoLCBhbGlhcywgbWF0Y2gsIGdyZWVkeSk7XG5cblx0XHRcdFx0XHRhcmdzLnB1c2god3JhcHBlZCk7XG5cblx0XHRcdFx0XHRpZiAoYWZ0ZXIpIHtcblx0XHRcdFx0XHRcdGFyZ3MucHVzaChhZnRlcik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0QXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShzdHJhcnIsIGFyZ3MpO1xuXG5cdFx0XHRcdFx0aWYgKGRlbE51bSAhPSAxKVxuXHRcdFx0XHRcdFx0Xy5tYXRjaEdyYW1tYXIodGV4dCwgc3RyYXJyLCBncmFtbWFyLCBpLCBwb3MsIHRydWUsIHRva2VuKTtcblxuXHRcdFx0XHRcdGlmIChvbmVzaG90KVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0dG9rZW5pemU6IGZ1bmN0aW9uKHRleHQsIGdyYW1tYXIsIGxhbmd1YWdlKSB7XG5cdFx0dmFyIHN0cmFyciA9IFt0ZXh0XTtcblxuXHRcdHZhciByZXN0ID0gZ3JhbW1hci5yZXN0O1xuXG5cdFx0aWYgKHJlc3QpIHtcblx0XHRcdGZvciAodmFyIHRva2VuIGluIHJlc3QpIHtcblx0XHRcdFx0Z3JhbW1hclt0b2tlbl0gPSByZXN0W3Rva2VuXTtcblx0XHRcdH1cblxuXHRcdFx0ZGVsZXRlIGdyYW1tYXIucmVzdDtcblx0XHR9XG5cblx0XHRfLm1hdGNoR3JhbW1hcih0ZXh0LCBzdHJhcnIsIGdyYW1tYXIsIDAsIDAsIGZhbHNlKTtcblxuXHRcdHJldHVybiBzdHJhcnI7XG5cdH0sXG5cblx0aG9va3M6IHtcblx0XHRhbGw6IHt9LFxuXG5cdFx0YWRkOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spIHtcblx0XHRcdHZhciBob29rcyA9IF8uaG9va3MuYWxsO1xuXG5cdFx0XHRob29rc1tuYW1lXSA9IGhvb2tzW25hbWVdIHx8IFtdO1xuXG5cdFx0XHRob29rc1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcblx0XHR9LFxuXG5cdFx0cnVuOiBmdW5jdGlvbiAobmFtZSwgZW52KSB7XG5cdFx0XHR2YXIgY2FsbGJhY2tzID0gXy5ob29rcy5hbGxbbmFtZV07XG5cblx0XHRcdGlmICghY2FsbGJhY2tzIHx8ICFjYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgaT0wLCBjYWxsYmFjazsgY2FsbGJhY2sgPSBjYWxsYmFja3NbaSsrXTspIHtcblx0XHRcdFx0Y2FsbGJhY2soZW52KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbnZhciBUb2tlbiA9IF8uVG9rZW4gPSBmdW5jdGlvbih0eXBlLCBjb250ZW50LCBhbGlhcywgbWF0Y2hlZFN0ciwgZ3JlZWR5KSB7XG5cdHRoaXMudHlwZSA9IHR5cGU7XG5cdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG5cdHRoaXMuYWxpYXMgPSBhbGlhcztcblx0Ly8gQ29weSBvZiB0aGUgZnVsbCBzdHJpbmcgdGhpcyB0b2tlbiB3YXMgY3JlYXRlZCBmcm9tXG5cdHRoaXMubGVuZ3RoID0gKG1hdGNoZWRTdHIgfHwgXCJcIikubGVuZ3RofDA7XG5cdHRoaXMuZ3JlZWR5ID0gISFncmVlZHk7XG59O1xuXG5Ub2tlbi5zdHJpbmdpZnkgPSBmdW5jdGlvbihvLCBsYW5ndWFnZSwgcGFyZW50KSB7XG5cdGlmICh0eXBlb2YgbyA9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBvO1xuXHR9XG5cblx0aWYgKF8udXRpbC50eXBlKG8pID09PSAnQXJyYXknKSB7XG5cdFx0cmV0dXJuIG8ubWFwKGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRcdHJldHVybiBUb2tlbi5zdHJpbmdpZnkoZWxlbWVudCwgbGFuZ3VhZ2UsIG8pO1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0dmFyIGVudiA9IHtcblx0XHR0eXBlOiBvLnR5cGUsXG5cdFx0Y29udGVudDogVG9rZW4uc3RyaW5naWZ5KG8uY29udGVudCwgbGFuZ3VhZ2UsIHBhcmVudCksXG5cdFx0dGFnOiAnc3BhbicsXG5cdFx0Y2xhc3NlczogWyd0b2tlbicsIG8udHlwZV0sXG5cdFx0YXR0cmlidXRlczoge30sXG5cdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlLFxuXHRcdHBhcmVudDogcGFyZW50XG5cdH07XG5cblx0aWYgKG8uYWxpYXMpIHtcblx0XHR2YXIgYWxpYXNlcyA9IF8udXRpbC50eXBlKG8uYWxpYXMpID09PSAnQXJyYXknID8gby5hbGlhcyA6IFtvLmFsaWFzXTtcblx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShlbnYuY2xhc3NlcywgYWxpYXNlcyk7XG5cdH1cblxuXHRfLmhvb2tzLnJ1bignd3JhcCcsIGVudik7XG5cblx0dmFyIGF0dHJpYnV0ZXMgPSBPYmplY3Qua2V5cyhlbnYuYXR0cmlidXRlcykubWFwKGZ1bmN0aW9uKG5hbWUpIHtcblx0XHRyZXR1cm4gbmFtZSArICc9XCInICsgKGVudi5hdHRyaWJ1dGVzW25hbWVdIHx8ICcnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JykgKyAnXCInO1xuXHR9KS5qb2luKCcgJyk7XG5cblx0cmV0dXJuICc8JyArIGVudi50YWcgKyAnIGNsYXNzPVwiJyArIGVudi5jbGFzc2VzLmpvaW4oJyAnKSArICdcIicgKyAoYXR0cmlidXRlcyA/ICcgJyArIGF0dHJpYnV0ZXMgOiAnJykgKyAnPicgKyBlbnYuY29udGVudCArICc8LycgKyBlbnYudGFnICsgJz4nO1xuXG59O1xuXG5pZiAoIV9zZWxmLmRvY3VtZW50KSB7XG5cdGlmICghX3NlbGYuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdC8vIGluIE5vZGUuanNcblx0XHRyZXR1cm4gX3NlbGYuUHJpc207XG5cdH1cblxuXHRpZiAoIV8uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyKSB7XG5cdFx0Ly8gSW4gd29ya2VyXG5cdFx0X3NlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShldnQuZGF0YSksXG5cdFx0XHRcdGxhbmcgPSBtZXNzYWdlLmxhbmd1YWdlLFxuXHRcdFx0XHRjb2RlID0gbWVzc2FnZS5jb2RlLFxuXHRcdFx0XHRpbW1lZGlhdGVDbG9zZSA9IG1lc3NhZ2UuaW1tZWRpYXRlQ2xvc2U7XG5cblx0XHRcdF9zZWxmLnBvc3RNZXNzYWdlKF8uaGlnaGxpZ2h0KGNvZGUsIF8ubGFuZ3VhZ2VzW2xhbmddLCBsYW5nKSk7XG5cdFx0XHRpZiAoaW1tZWRpYXRlQ2xvc2UpIHtcblx0XHRcdFx0X3NlbGYuY2xvc2UoKTtcblx0XHRcdH1cblx0XHR9LCBmYWxzZSk7XG5cdH1cblxuXHRyZXR1cm4gX3NlbGYuUHJpc207XG59XG5cbi8vR2V0IGN1cnJlbnQgc2NyaXB0IGFuZCBoaWdobGlnaHRcbnZhciBzY3JpcHQgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0IHx8IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIikpLnBvcCgpO1xuXG5pZiAoc2NyaXB0KSB7XG5cdF8uZmlsZW5hbWUgPSBzY3JpcHQuc3JjO1xuXG5cdGlmICghXy5tYW51YWwgJiYgIXNjcmlwdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbWFudWFsJykpIHtcblx0XHRpZihkb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIikge1xuXHRcdFx0aWYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcblx0XHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfLmhpZ2hsaWdodEFsbCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChfLmhpZ2hsaWdodEFsbCwgMTYpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBfLmhpZ2hsaWdodEFsbCk7XG5cdFx0fVxuXHR9XG59XG5cbnJldHVybiBfc2VsZi5QcmlzbTtcblxufSkoKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gUHJpc207XG59XG5cbi8vIGhhY2sgZm9yIGNvbXBvbmVudHMgdG8gd29yayBjb3JyZWN0bHkgaW4gbm9kZS5qc1xuaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdGdsb2JhbC5QcmlzbSA9IFByaXNtO1xufVxuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tbWFya3VwLmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblByaXNtLmxhbmd1YWdlcy5tYXJrdXAgPSB7XG5cdCdjb21tZW50JzogLzwhLS1bXFxzXFxTXSo/LS0+Lyxcblx0J3Byb2xvZyc6IC88XFw/W1xcc1xcU10rP1xcPz4vLFxuXHQnZG9jdHlwZSc6IC88IURPQ1RZUEVbXFxzXFxTXSs/Pi9pLFxuXHQnY2RhdGEnOiAvPCFcXFtDREFUQVxcW1tcXHNcXFNdKj9dXT4vaSxcblx0J3RhZyc6IHtcblx0XHRwYXR0ZXJuOiAvPFxcLz8oPyFcXGQpW15cXHM+XFwvPSQ8XSsoPzpcXHMrW15cXHM+XFwvPV0rKD86PSg/OihcInwnKSg/OlxcXFxbXFxzXFxTXXwoPyFcXDEpW15cXFxcXSkqXFwxfFteXFxzJ1wiPj1dKykpPykqXFxzKlxcLz8+L2ksXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQndGFnJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXjxcXC8/W15cXHM+XFwvXSsvaSxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL148XFwvPy8sXG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW15cXHM+XFwvOl0rOi9cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvPSg/OihcInwnKSg/OlxcXFxbXFxzXFxTXXwoPyFcXDEpW15cXFxcXSkqXFwxfFteXFxzJ1wiPj1dKykvaSxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogW1xuXHRcdFx0XHRcdFx0L149Lyxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0cGF0dGVybjogLyhefFteXFxcXF0pW1wiJ10vLFxuXHRcdFx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3B1bmN0dWF0aW9uJzogL1xcLz8+Lyxcblx0XHRcdCdhdHRyLW5hbWUnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9bXlxccz5cXC9dKy8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH1cblx0fSxcblx0J2VudGl0eSc6IC8mIz9bXFxkYS16XXsxLDh9Oy9pXG59O1xuXG5QcmlzbS5sYW5ndWFnZXMubWFya3VwWyd0YWcnXS5pbnNpZGVbJ2F0dHItdmFsdWUnXS5pbnNpZGVbJ2VudGl0eSddID1cblx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFsnZW50aXR5J107XG5cbi8vIFBsdWdpbiB0byBtYWtlIGVudGl0eSB0aXRsZSBzaG93IHRoZSByZWFsIGVudGl0eSwgaWRlYSBieSBSb21hbiBLb21hcm92XG5QcmlzbS5ob29rcy5hZGQoJ3dyYXAnLCBmdW5jdGlvbihlbnYpIHtcblxuXHRpZiAoZW52LnR5cGUgPT09ICdlbnRpdHknKSB7XG5cdFx0ZW52LmF0dHJpYnV0ZXNbJ3RpdGxlJ10gPSBlbnYuY29udGVudC5yZXBsYWNlKC8mYW1wOy8sICcmJyk7XG5cdH1cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMueG1sID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblByaXNtLmxhbmd1YWdlcy5odG1sID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblByaXNtLmxhbmd1YWdlcy5tYXRobWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLnN2ZyA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1jc3MuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuUHJpc20ubGFuZ3VhZ2VzLmNzcyA9IHtcblx0J2NvbW1lbnQnOiAvXFwvXFwqW1xcc1xcU10qP1xcKlxcLy8sXG5cdCdhdHJ1bGUnOiB7XG5cdFx0cGF0dGVybjogL0BbXFx3LV0rPy4qPyg/Ojt8KD89XFxzKlxceykpL2ksXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQncnVsZSc6IC9AW1xcdy1dKy9cblx0XHRcdC8vIFNlZSByZXN0IGJlbG93XG5cdFx0fVxuXHR9LFxuXHQndXJsJzogL3VybFxcKCg/OihbXCInXSkoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxfC4qPylcXCkvaSxcblx0J3NlbGVjdG9yJzogL1tee31cXHNdW157fTtdKj8oPz1cXHMqXFx7KS8sXG5cdCdzdHJpbmcnOiB7XG5cdFx0cGF0dGVybjogLyhcInwnKSg/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDEvLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQncHJvcGVydHknOiAvW1xcdy1dKyg/PVxccyo6KS9pLFxuXHQnaW1wb3J0YW50JzogL1xcQiFpbXBvcnRhbnRcXGIvaSxcblx0J2Z1bmN0aW9uJzogL1stYS16MC05XSsoPz1cXCgpL2ksXG5cdCdwdW5jdHVhdGlvbic6IC9bKCl7fTs6XS9cbn07XG5cblByaXNtLmxhbmd1YWdlcy5jc3NbJ2F0cnVsZSddLmluc2lkZS5yZXN0ID0gUHJpc20udXRpbC5jbG9uZShQcmlzbS5sYW5ndWFnZXMuY3NzKTtcblxuaWYgKFByaXNtLmxhbmd1YWdlcy5tYXJrdXApIHtcblx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ3RhZycsIHtcblx0XHQnc3R5bGUnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKDxzdHlsZVtcXHNcXFNdKj8+KVtcXHNcXFNdKj8oPz08XFwvc3R5bGU+KS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmNzcyxcblx0XHRcdGFsaWFzOiAnbGFuZ3VhZ2UtY3NzJ1xuXHRcdH1cblx0fSk7XG5cdFxuXHRQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdpbnNpZGUnLCAnYXR0ci12YWx1ZScsIHtcblx0XHQnc3R5bGUtYXR0cic6IHtcblx0XHRcdHBhdHRlcm46IC9cXHMqc3R5bGU9KFwifCcpKD86XFxcXFtcXHNcXFNdfCg/IVxcMSlbXlxcXFxdKSpcXDEvaSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnYXR0ci1uYW1lJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC9eXFxzKnN0eWxlL2ksXG5cdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5pbnNpZGVcblx0XHRcdFx0fSxcblx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL15cXHMqPVxccypbJ1wiXXxbJ1wiXVxccyokLyxcblx0XHRcdFx0J2F0dHItdmFsdWUnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLy4rL2ksXG5cdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuY3NzXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRhbGlhczogJ2xhbmd1YWdlLWNzcydcblx0XHR9XG5cdH0sIFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnKTtcbn1cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1jbGlrZS5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5QcmlzbS5sYW5ndWFnZXMuY2xpa2UgPSB7XG5cdCdjb21tZW50JzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKVxcL1xcKltcXHNcXFNdKj8oPzpcXCpcXC98JCkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteXFxcXDpdKVxcL1xcLy4qLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9XG5cdF0sXG5cdCdzdHJpbmcnOiB7XG5cdFx0cGF0dGVybjogLyhbXCInXSkoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxLyxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J2NsYXNzLW5hbWUnOiB7XG5cdFx0cGF0dGVybjogLygoPzpcXGIoPzpjbGFzc3xpbnRlcmZhY2V8ZXh0ZW5kc3xpbXBsZW1lbnRzfHRyYWl0fGluc3RhbmNlb2Z8bmV3KVxccyspfCg/OmNhdGNoXFxzK1xcKCkpW1xcdy5cXFxcXSsvaSxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0cHVuY3R1YXRpb246IC9bLlxcXFxdL1xuXHRcdH1cblx0fSxcblx0J2tleXdvcmQnOiAvXFxiKD86aWZ8ZWxzZXx3aGlsZXxkb3xmb3J8cmV0dXJufGlufGluc3RhbmNlb2Z8ZnVuY3Rpb258bmV3fHRyeXx0aHJvd3xjYXRjaHxmaW5hbGx5fG51bGx8YnJlYWt8Y29udGludWUpXFxiLyxcblx0J2Jvb2xlYW4nOiAvXFxiKD86dHJ1ZXxmYWxzZSlcXGIvLFxuXHQnZnVuY3Rpb24nOiAvW2EtejAtOV9dKyg/PVxcKCkvaSxcblx0J251bWJlcic6IC9cXGItPyg/OjB4W1xcZGEtZl0rfFxcZCpcXC4/XFxkKyg/OmVbKy1dP1xcZCspPylcXGIvaSxcblx0J29wZXJhdG9yJzogLy0tP3xcXCtcXCs/fCE9Pz0/fDw9P3w+PT98PT0/PT98JiY/fFxcfFxcfD98XFw/fFxcKnxcXC98fnxcXF58JS8sXG5cdCdwdW5jdHVhdGlvbic6IC9be31bXFxdOygpLC46XS9cbn07XG5cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1qYXZhc2NyaXB0LmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0ID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY2xpa2UnLCB7XG5cdCdrZXl3b3JkJzogL1xcYig/OmFzfGFzeW5jfGF3YWl0fGJyZWFrfGNhc2V8Y2F0Y2h8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVidWdnZXJ8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxlbnVtfGV4cG9ydHxleHRlbmRzfGZpbmFsbHl8Zm9yfGZyb218ZnVuY3Rpb258Z2V0fGlmfGltcGxlbWVudHN8aW1wb3J0fGlufGluc3RhbmNlb2Z8aW50ZXJmYWNlfGxldHxuZXd8bnVsbHxvZnxwYWNrYWdlfHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xyZXR1cm58c2V0fHN0YXRpY3xzdXBlcnxzd2l0Y2h8dGhpc3x0aHJvd3x0cnl8dHlwZW9mfHZhcnx2b2lkfHdoaWxlfHdpdGh8eWllbGQpXFxiLyxcblx0J251bWJlcic6IC9cXGItPyg/OjBbeFhdW1xcZEEtRmEtZl0rfDBbYkJdWzAxXSt8MFtvT11bMC03XSt8XFxkKlxcLj9cXGQrKD86W0VlXVsrLV0/XFxkKyk/fE5hTnxJbmZpbml0eSlcXGIvLFxuXHQvLyBBbGxvdyBmb3IgYWxsIG5vbi1BU0NJSSBjaGFyYWN0ZXJzIChTZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjAwODQ0NClcblx0J2Z1bmN0aW9uJzogL1tfJGEtekEtWlxceEEwLVxcdUZGRkZdW18kYS16QS1aMC05XFx4QTAtXFx1RkZGRl0qKD89XFxzKlxcKCkvaSxcblx0J29wZXJhdG9yJzogLy1bLT1dP3xcXCtbKz1dP3whPT89P3w8PD89P3w+Pj8+Pz0/fD0oPzo9PT98Pik/fCZbJj1dP3xcXHxbfD1dP3xcXCpcXCo/PT98XFwvPT98fnxcXF49P3wlPT98XFw/fFxcLnszfS9cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdqYXZhc2NyaXB0JywgJ2tleXdvcmQnLCB7XG5cdCdyZWdleCc6IHtcblx0XHRwYXR0ZXJuOiAvKF58W14vXSlcXC8oPyFcXC8pKFxcW1teXFxdXFxyXFxuXStdfFxcXFwufFteL1xcXFxcXFtcXHJcXG5dKStcXC9bZ2lteXVdezAsNX0oPz1cXHMqKCR8W1xcclxcbiwuO30pXSkpLyxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQvLyBUaGlzIG11c3QgYmUgZGVjbGFyZWQgYmVmb3JlIGtleXdvcmQgYmVjYXVzZSB3ZSB1c2UgXCJmdW5jdGlvblwiIGluc2lkZSB0aGUgbG9vay1mb3J3YXJkXG5cdCdmdW5jdGlvbi12YXJpYWJsZSc6IHtcblx0XHRwYXR0ZXJuOiAvW18kYS16QS1aXFx4QTAtXFx1RkZGRl1bXyRhLXpBLVowLTlcXHhBMC1cXHVGRkZGXSooPz1cXHMqPVxccyooPzpmdW5jdGlvblxcYnwoPzpcXChbXigpXSpcXCl8W18kYS16QS1aXFx4QTAtXFx1RkZGRl1bXyRhLXpBLVowLTlcXHhBMC1cXHVGRkZGXSopXFxzKj0+KSkvaSxcblx0XHRhbGlhczogJ2Z1bmN0aW9uJ1xuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdzdHJpbmcnLCB7XG5cdCd0ZW1wbGF0ZS1zdHJpbmcnOiB7XG5cdFx0cGF0dGVybjogL2AoPzpcXFxcW1xcc1xcU118W15cXFxcYF0pKmAvLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdpbnRlcnBvbGF0aW9uJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXFwkXFx7W159XStcXH0vLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQnaW50ZXJwb2xhdGlvbi1wdW5jdHVhdGlvbic6IHtcblx0XHRcdFx0XHRcdHBhdHRlcm46IC9eXFwkXFx7fFxcfSQvLFxuXHRcdFx0XHRcdFx0YWxpYXM6ICdwdW5jdHVhdGlvbidcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHJlc3Q6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnc3RyaW5nJzogL1tcXHNcXFNdKy9cblx0XHR9XG5cdH1cbn0pO1xuXG5pZiAoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCkge1xuXHRQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAndGFnJywge1xuXHRcdCdzY3JpcHQnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKDxzY3JpcHRbXFxzXFxTXSo/PilbXFxzXFxTXSo/KD89PFxcL3NjcmlwdD4pL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdCxcblx0XHRcdGFsaWFzOiAnbGFuZ3VhZ2UtamF2YXNjcmlwdCdcblx0XHR9XG5cdH0pO1xufVxuXG5QcmlzbS5sYW5ndWFnZXMuanMgPSBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdDtcblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLWZpbGUtaGlnaGxpZ2h0LmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdGlmICh0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcgfHwgIXNlbGYuUHJpc20gfHwgIXNlbGYuZG9jdW1lbnQgfHwgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRzZWxmLlByaXNtLmZpbGVIaWdobGlnaHQgPSBmdW5jdGlvbigpIHtcblxuXHRcdHZhciBFeHRlbnNpb25zID0ge1xuXHRcdFx0J2pzJzogJ2phdmFzY3JpcHQnLFxuXHRcdFx0J3B5JzogJ3B5dGhvbicsXG5cdFx0XHQncmInOiAncnVieScsXG5cdFx0XHQncHMxJzogJ3Bvd2Vyc2hlbGwnLFxuXHRcdFx0J3BzbTEnOiAncG93ZXJzaGVsbCcsXG5cdFx0XHQnc2gnOiAnYmFzaCcsXG5cdFx0XHQnYmF0JzogJ2JhdGNoJyxcblx0XHRcdCdoJzogJ2MnLFxuXHRcdFx0J3RleCc6ICdsYXRleCdcblx0XHR9O1xuXG5cdFx0QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgncHJlW2RhdGEtc3JjXScpKS5mb3JFYWNoKGZ1bmN0aW9uIChwcmUpIHtcblx0XHRcdHZhciBzcmMgPSBwcmUuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXG5cdFx0XHR2YXIgbGFuZ3VhZ2UsIHBhcmVudCA9IHByZTtcblx0XHRcdHZhciBsYW5nID0gL1xcYmxhbmcoPzp1YWdlKT8tKD8hXFwqKShcXHcrKVxcYi9pO1xuXHRcdFx0d2hpbGUgKHBhcmVudCAmJiAhbGFuZy50ZXN0KHBhcmVudC5jbGFzc05hbWUpKSB7XG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocGFyZW50KSB7XG5cdFx0XHRcdGxhbmd1YWdlID0gKHByZS5jbGFzc05hbWUubWF0Y2gobGFuZykgfHwgWywgJyddKVsxXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFsYW5ndWFnZSkge1xuXHRcdFx0XHR2YXIgZXh0ZW5zaW9uID0gKHNyYy5tYXRjaCgvXFwuKFxcdyspJC8pIHx8IFssICcnXSlbMV07XG5cdFx0XHRcdGxhbmd1YWdlID0gRXh0ZW5zaW9uc1tleHRlbnNpb25dIHx8IGV4dGVuc2lvbjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb2RlJyk7XG5cdFx0XHRjb2RlLmNsYXNzTmFtZSA9ICdsYW5ndWFnZS0nICsgbGFuZ3VhZ2U7XG5cblx0XHRcdHByZS50ZXh0Q29udGVudCA9ICcnO1xuXG5cdFx0XHRjb2RlLnRleHRDb250ZW50ID0gJ0xvYWRpbmfigKYnO1xuXG5cdFx0XHRwcmUuYXBwZW5kQ2hpbGQoY29kZSk7XG5cblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXHRcdFx0eGhyLm9wZW4oJ0dFVCcsIHNyYywgdHJ1ZSk7XG5cblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cblx0XHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA8IDQwMCAmJiB4aHIucmVzcG9uc2VUZXh0KSB7XG5cdFx0XHRcdFx0XHRjb2RlLnRleHRDb250ZW50ID0geGhyLnJlc3BvbnNlVGV4dDtcblxuXHRcdFx0XHRcdFx0UHJpc20uaGlnaGxpZ2h0RWxlbWVudChjb2RlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAoeGhyLnN0YXR1cyA+PSA0MDApIHtcblx0XHRcdFx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSAn4pyWIEVycm9yICcgKyB4aHIuc3RhdHVzICsgJyB3aGlsZSBmZXRjaGluZyBmaWxlOiAnICsgeGhyLnN0YXR1c1RleHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29kZS50ZXh0Q29udGVudCA9ICfinJYgRXJyb3I6IEZpbGUgZG9lcyBub3QgZXhpc3Qgb3IgaXMgZW1wdHknO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0eGhyLnNlbmQobnVsbCk7XG5cdFx0fSk7XG5cblx0fTtcblxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2VsZi5QcmlzbS5maWxlSGlnaGxpZ2h0KTtcblxufSkoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ByaXNtanMvcHJpc20uanNcbi8vIG1vZHVsZSBpZCA9IDI0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIoZnVuY3Rpb24oKXtcblx0aWYgKHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyB8fCAhc2VsZi5QcmlzbSB8fCAhc2VsZi5kb2N1bWVudCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHZhciBjYWxsYmFja3MgPSBbXTtcblx0dmFyIG1hcCA9IHt9O1xuXHR2YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XG5cblx0UHJpc20ucGx1Z2lucy50b29sYmFyID0ge307XG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVyIGEgYnV0dG9uIGNhbGxiYWNrIHdpdGggdGhlIHRvb2xiYXIuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcblx0ICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IG9wdHNcblx0ICovXG5cdHZhciByZWdpc3RlckJ1dHRvbiA9IFByaXNtLnBsdWdpbnMudG9vbGJhci5yZWdpc3RlckJ1dHRvbiA9IGZ1bmN0aW9uIChrZXksIG9wdHMpIHtcblx0XHR2YXIgY2FsbGJhY2s7XG5cblx0XHRpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNhbGxiYWNrID0gb3B0cztcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2FsbGJhY2sgPSBmdW5jdGlvbiAoZW52KSB7XG5cdFx0XHRcdHZhciBlbGVtZW50O1xuXG5cdFx0XHRcdGlmICh0eXBlb2Ygb3B0cy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdFx0XHRcdGVsZW1lbnQudHlwZSA9ICdidXR0b24nO1xuXHRcdFx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRvcHRzLm9uQ2xpY2suY2FsbCh0aGlzLCBlbnYpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLnVybCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdFx0XHRcdGVsZW1lbnQuaHJlZiA9IG9wdHMudXJsO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtZW50LnRleHRDb250ZW50ID0gb3B0cy50ZXh0O1xuXG5cdFx0XHRcdHJldHVybiBlbGVtZW50O1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRjYWxsYmFja3MucHVzaChtYXBba2V5XSA9IGNhbGxiYWNrKTtcblx0fTtcblxuXHQvKipcblx0ICogUG9zdC1oaWdobGlnaHQgUHJpc20gaG9vayBjYWxsYmFjay5cblx0ICpcblx0ICogQHBhcmFtIGVudlxuXHQgKi9cblx0dmFyIGhvb2sgPSBQcmlzbS5wbHVnaW5zLnRvb2xiYXIuaG9vayA9IGZ1bmN0aW9uIChlbnYpIHtcblx0XHQvLyBDaGVjayBpZiBpbmxpbmUgb3IgYWN0dWFsIGNvZGUgYmxvY2sgKGNyZWRpdCB0byBsaW5lLW51bWJlcnMgcGx1Z2luKVxuXHRcdHZhciBwcmUgPSBlbnYuZWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdGlmICghcHJlIHx8ICEvcHJlL2kudGVzdChwcmUubm9kZU5hbWUpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQXV0b2xvYWRlciByZWhpZ2hsaWdodHMsIHNvIG9ubHkgZG8gdGhpcyBvbmNlLlxuXHRcdGlmIChwcmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2RlLXRvb2xiYXInKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHByZS5jbGFzc0xpc3QuYWRkKCdjb2RlLXRvb2xiYXInKTtcblxuXHRcdC8vIFNldHVwIHRoZSB0b29sYmFyXG5cdFx0dmFyIHRvb2xiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHR0b29sYmFyLmNsYXNzTGlzdC5hZGQoJ3Rvb2xiYXInKTtcblxuXHRcdGlmIChkb2N1bWVudC5ib2R5Lmhhc0F0dHJpYnV0ZSgnZGF0YS10b29sYmFyLW9yZGVyJykpIHtcblx0XHRcdGNhbGxiYWNrcyA9IGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2xiYXItb3JkZXInKS5zcGxpdCgnLCcpLm1hcChmdW5jdGlvbihrZXkpIHtcblx0XHRcdFx0cmV0dXJuIG1hcFtrZXldIHx8IG5vb3A7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaykge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSBjYWxsYmFjayhlbnYpO1xuXG5cdFx0XHRpZiAoIWVsZW1lbnQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0aXRlbS5jbGFzc0xpc3QuYWRkKCd0b29sYmFyLWl0ZW0nKTtcblxuXHRcdFx0aXRlbS5hcHBlbmRDaGlsZChlbGVtZW50KTtcblx0XHRcdHRvb2xiYXIuYXBwZW5kQ2hpbGQoaXRlbSk7XG5cdFx0fSk7XG5cblx0XHQvLyBBZGQgb3VyIHRvb2xiYXIgdG8gdGhlIDxwcmU+IHRhZ1xuXHRcdHByZS5hcHBlbmRDaGlsZCh0b29sYmFyKTtcblx0fTtcblxuXHRyZWdpc3RlckJ1dHRvbignbGFiZWwnLCBmdW5jdGlvbihlbnYpIHtcblx0XHR2YXIgcHJlID0gZW52LmVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHRpZiAoIXByZSB8fCAhL3ByZS9pLnRlc3QocHJlLm5vZGVOYW1lKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICghcHJlLmhhc0F0dHJpYnV0ZSgnZGF0YS1sYWJlbCcpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIGVsZW1lbnQsIHRlbXBsYXRlO1xuXHRcdHZhciB0ZXh0ID0gcHJlLmdldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbCcpO1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBBbnkgbm9ybWFsIHRleHQgd2lsbCBibG93IHVwIHRoaXMgc2VsZWN0b3IuXG5cdFx0XHR0ZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RlbXBsYXRlIycgKyB0ZXh0KTtcblx0XHR9IGNhdGNoIChlKSB7fVxuXG5cdFx0aWYgKHRlbXBsYXRlKSB7XG5cdFx0XHRlbGVtZW50ID0gdGVtcGxhdGUuY29udGVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHByZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtdXJsJykpIHtcblx0XHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRcdFx0ZWxlbWVudC5ocmVmID0gcHJlLmdldEF0dHJpYnV0ZSgnZGF0YS11cmwnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0XHR9XG5cblx0XHRcdGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHJldHVybiBlbGVtZW50O1xuXHR9KTtcblxuXHQvKipcblx0ICogUmVnaXN0ZXIgdGhlIHRvb2xiYXIgd2l0aCBQcmlzbS5cblx0ICovXG5cdFByaXNtLmhvb2tzLmFkZCgnY29tcGxldGUnLCBob29rKTtcbn0pKCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcmlzbWpzL3BsdWdpbnMvdG9vbGJhci9wcmlzbS10b29sYmFyLmpzXG4vLyBtb2R1bGUgaWQgPSAyNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiKGZ1bmN0aW9uKCkge1xuXG52YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAob2JqMSwgb2JqMikge1xuXHRmb3IgKHZhciBuYW1lIGluIG9iajIpIHtcblx0XHRpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcblx0XHRcdG9iajFbbmFtZV0gPSBvYmoyW25hbWVdO1xuXHR9XG5cdHJldHVybiBvYmoxO1xufVxuXG5mdW5jdGlvbiBOb3JtYWxpemVXaGl0ZXNwYWNlKGRlZmF1bHRzKSB7XG5cdHRoaXMuZGVmYXVsdHMgPSBhc3NpZ24oe30sIGRlZmF1bHRzKTtcbn1cblxuZnVuY3Rpb24gdG9DYW1lbENhc2UodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoLy0oXFx3KS9nLCBmdW5jdGlvbihtYXRjaCwgZmlyc3RDaGFyKSB7XG5cdFx0cmV0dXJuIGZpcnN0Q2hhci50b1VwcGVyQ2FzZSgpO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gdGFiTGVuKHN0cikge1xuXHR2YXIgcmVzID0gMDtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcblx0XHRpZiAoc3RyLmNoYXJDb2RlQXQoaSkgPT0gJ1xcdCcuY2hhckNvZGVBdCgwKSlcblx0XHRcdHJlcyArPSAzO1xuXHR9XG5cdHJldHVybiBzdHIubGVuZ3RoICsgcmVzO1xufVxuXG5Ob3JtYWxpemVXaGl0ZXNwYWNlLnByb3RvdHlwZSA9IHtcblx0c2V0RGVmYXVsdHM6IGZ1bmN0aW9uIChkZWZhdWx0cykge1xuXHRcdHRoaXMuZGVmYXVsdHMgPSBhc3NpZ24odGhpcy5kZWZhdWx0cywgZGVmYXVsdHMpO1xuXHR9LFxuXHRub3JtYWxpemU6IGZ1bmN0aW9uIChpbnB1dCwgc2V0dGluZ3MpIHtcblx0XHRzZXR0aW5ncyA9IGFzc2lnbih0aGlzLmRlZmF1bHRzLCBzZXR0aW5ncyk7XG5cblx0XHRmb3IgKHZhciBuYW1lIGluIHNldHRpbmdzKSB7XG5cdFx0XHR2YXIgbWV0aG9kTmFtZSA9IHRvQ2FtZWxDYXNlKG5hbWUpO1xuXHRcdFx0aWYgKG5hbWUgIT09IFwibm9ybWFsaXplXCIgJiYgbWV0aG9kTmFtZSAhPT0gJ3NldERlZmF1bHRzJyAmJlxuXHRcdFx0XHRcdHNldHRpbmdzW25hbWVdICYmIHRoaXNbbWV0aG9kTmFtZV0pIHtcblx0XHRcdFx0aW5wdXQgPSB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaW5wdXQsIHNldHRpbmdzW25hbWVdKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH0sXG5cblx0Lypcblx0ICogTm9ybWFsaXphdGlvbiBtZXRob2RzXG5cdCAqL1xuXHRsZWZ0VHJpbTogZnVuY3Rpb24gKGlucHV0KSB7XG5cdFx0cmV0dXJuIGlucHV0LnJlcGxhY2UoL15cXHMrLywgJycpO1xuXHR9LFxuXHRyaWdodFRyaW06IGZ1bmN0aW9uIChpbnB1dCkge1xuXHRcdHJldHVybiBpbnB1dC5yZXBsYWNlKC9cXHMrJC8sICcnKTtcblx0fSxcblx0dGFic1RvU3BhY2VzOiBmdW5jdGlvbiAoaW5wdXQsIHNwYWNlcykge1xuXHRcdHNwYWNlcyA9IHNwYWNlc3wwIHx8IDQ7XG5cdFx0cmV0dXJuIGlucHV0LnJlcGxhY2UoL1xcdC9nLCBuZXcgQXJyYXkoKytzcGFjZXMpLmpvaW4oJyAnKSk7XG5cdH0sXG5cdHNwYWNlc1RvVGFiczogZnVuY3Rpb24gKGlucHV0LCBzcGFjZXMpIHtcblx0XHRzcGFjZXMgPSBzcGFjZXN8MCB8fCA0O1xuXHRcdHJldHVybiBpbnB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoJyB7JyArIHNwYWNlcyArICd9JywgJ2cnKSwgJ1xcdCcpO1xuXHR9LFxuXHRyZW1vdmVUcmFpbGluZzogZnVuY3Rpb24gKGlucHV0KSB7XG5cdFx0cmV0dXJuIGlucHV0LnJlcGxhY2UoL1xccyo/JC9nbSwgJycpO1xuXHR9LFxuXHQvLyBTdXBwb3J0IGZvciBkZXByZWNhdGVkIHBsdWdpbiByZW1vdmUtaW5pdGlhbC1saW5lLWZlZWRcblx0cmVtb3ZlSW5pdGlhbExpbmVGZWVkOiBmdW5jdGlvbiAoaW5wdXQpIHtcblx0XHRyZXR1cm4gaW5wdXQucmVwbGFjZSgvXig/Olxccj9cXG58XFxyKS8sICcnKTtcblx0fSxcblx0cmVtb3ZlSW5kZW50OiBmdW5jdGlvbiAoaW5wdXQpIHtcblx0XHR2YXIgaW5kZW50cyA9IGlucHV0Lm1hdGNoKC9eW15cXFNcXG5cXHJdKig/PVxcUykvZ20pO1xuXG5cdFx0aWYgKCFpbmRlbnRzIHx8ICFpbmRlbnRzWzBdLmxlbmd0aClcblx0XHRcdHJldHVybiBpbnB1dDtcblxuXHRcdGluZGVudHMuc29ydChmdW5jdGlvbihhLCBiKXtyZXR1cm4gYS5sZW5ndGggLSBiLmxlbmd0aDsgfSk7XG5cblx0XHRpZiAoIWluZGVudHNbMF0ubGVuZ3RoKVxuXHRcdFx0cmV0dXJuIGlucHV0O1xuXG5cdFx0cmV0dXJuIGlucHV0LnJlcGxhY2UobmV3IFJlZ0V4cCgnXicgKyBpbmRlbnRzWzBdLCAnZ20nKSwgJycpO1xuXHR9LFxuXHRpbmRlbnQ6IGZ1bmN0aW9uIChpbnB1dCwgdGFicykge1xuXHRcdHJldHVybiBpbnB1dC5yZXBsYWNlKC9eW15cXFNcXG5cXHJdKig/PVxcUykvZ20sIG5ldyBBcnJheSgrK3RhYnMpLmpvaW4oJ1xcdCcpICsgJyQmJyk7XG5cdH0sXG5cdGJyZWFrTGluZXM6IGZ1bmN0aW9uIChpbnB1dCwgY2hhcmFjdGVycykge1xuXHRcdGNoYXJhY3RlcnMgPSAoY2hhcmFjdGVycyA9PT0gdHJ1ZSkgPyA4MCA6IGNoYXJhY3RlcnN8MCB8fCA4MDtcblxuXHRcdHZhciBsaW5lcyA9IGlucHV0LnNwbGl0KCdcXG4nKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRpZiAodGFiTGVuKGxpbmVzW2ldKSA8PSBjaGFyYWN0ZXJzKVxuXHRcdFx0XHRjb250aW51ZTtcblxuXHRcdFx0dmFyIGxpbmUgPSBsaW5lc1tpXS5zcGxpdCgvKFxccyspL2cpLFxuXHRcdFx0ICAgIGxlbiA9IDA7XG5cblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgbGluZS5sZW5ndGg7ICsraikge1xuXHRcdFx0XHR2YXIgdGwgPSB0YWJMZW4obGluZVtqXSk7XG5cdFx0XHRcdGxlbiArPSB0bDtcblx0XHRcdFx0aWYgKGxlbiA+IGNoYXJhY3RlcnMpIHtcblx0XHRcdFx0XHRsaW5lW2pdID0gJ1xcbicgKyBsaW5lW2pdO1xuXHRcdFx0XHRcdGxlbiA9IHRsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRsaW5lc1tpXSA9IGxpbmUuam9pbignJyk7XG5cdFx0fVxuXHRcdHJldHVybiBsaW5lcy5qb2luKCdcXG4nKTtcblx0fVxufTtcblxuLy8gU3VwcG9ydCBub2RlIG1vZHVsZXNcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IE5vcm1hbGl6ZVdoaXRlc3BhY2U7XG59XG5cbi8vIEV4aXQgaWYgcHJpc20gaXMgbm90IGxvYWRlZFxuaWYgKHR5cGVvZiBQcmlzbSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0cmV0dXJuO1xufVxuXG5QcmlzbS5wbHVnaW5zLk5vcm1hbGl6ZVdoaXRlc3BhY2UgPSBuZXcgTm9ybWFsaXplV2hpdGVzcGFjZSh7XG5cdCdyZW1vdmUtdHJhaWxpbmcnOiB0cnVlLFxuXHQncmVtb3ZlLWluZGVudCc6IHRydWUsXG5cdCdsZWZ0LXRyaW0nOiB0cnVlLFxuXHQncmlnaHQtdHJpbSc6IHRydWUsXG5cdC8qJ2JyZWFrLWxpbmVzJzogODAsXG5cdCdpbmRlbnQnOiAyLFxuXHQncmVtb3ZlLWluaXRpYWwtbGluZS1mZWVkJzogZmFsc2UsXG5cdCd0YWJzLXRvLXNwYWNlcyc6IDQsXG5cdCdzcGFjZXMtdG8tdGFicyc6IDQqL1xufSk7XG5cblByaXNtLmhvb2tzLmFkZCgnYmVmb3JlLXNhbml0eS1jaGVjaycsIGZ1bmN0aW9uIChlbnYpIHtcblx0dmFyIE5vcm1hbGl6ZXIgPSBQcmlzbS5wbHVnaW5zLk5vcm1hbGl6ZVdoaXRlc3BhY2U7XG5cblx0Ly8gQ2hlY2sgc2V0dGluZ3Ncblx0aWYgKGVudi5zZXR0aW5ncyAmJiBlbnYuc2V0dGluZ3NbJ3doaXRlc3BhY2Utbm9ybWFsaXphdGlvbiddID09PSBmYWxzZSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIFNpbXBsZSBtb2RlIGlmIHRoZXJlIGlzIG5vIGVudi5lbGVtZW50XG5cdGlmICgoIWVudi5lbGVtZW50IHx8ICFlbnYuZWxlbWVudC5wYXJlbnROb2RlKSAmJiBlbnYuY29kZSkge1xuXHRcdGVudi5jb2RlID0gTm9ybWFsaXplci5ub3JtYWxpemUoZW52LmNvZGUsIGVudi5zZXR0aW5ncyk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gTm9ybWFsIG1vZGVcblx0dmFyIHByZSA9IGVudi5lbGVtZW50LnBhcmVudE5vZGU7XG5cdHZhciBjbHNSZWcgPSAvXFxibm8td2hpdGVzcGFjZS1ub3JtYWxpemF0aW9uXFxiLztcblx0aWYgKCFlbnYuY29kZSB8fCAhcHJlIHx8IHByZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAncHJlJyB8fFxuXHRcdFx0Y2xzUmVnLnRlc3QocHJlLmNsYXNzTmFtZSkgfHwgY2xzUmVnLnRlc3QoZW52LmVsZW1lbnQuY2xhc3NOYW1lKSlcblx0XHRyZXR1cm47XG5cblx0dmFyIGNoaWxkcmVuID0gcHJlLmNoaWxkTm9kZXMsXG5cdCAgICBiZWZvcmUgPSAnJyxcblx0ICAgIGFmdGVyID0gJycsXG5cdCAgICBjb2RlRm91bmQgPSBmYWxzZTtcblxuXHQvLyBNb3ZlIHN1cnJvdW5kaW5nIHdoaXRlc3BhY2UgZnJvbSB0aGUgPHByZT4gdGFnIGludG8gdGhlIDxjb2RlPiB0YWdcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuXHRcdHZhciBub2RlID0gY2hpbGRyZW5baV07XG5cblx0XHRpZiAobm9kZSA9PSBlbnYuZWxlbWVudCkge1xuXHRcdFx0Y29kZUZvdW5kID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKG5vZGUubm9kZU5hbWUgPT09IFwiI3RleHRcIikge1xuXHRcdFx0aWYgKGNvZGVGb3VuZCkge1xuXHRcdFx0XHRhZnRlciArPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJlZm9yZSArPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0cHJlLnJlbW92ZUNoaWxkKG5vZGUpO1xuXHRcdFx0LS1pO1xuXHRcdH1cblx0fVxuXG5cdGlmICghZW52LmVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoIHx8ICFQcmlzbS5wbHVnaW5zLktlZXBNYXJrdXApIHtcblx0XHRlbnYuY29kZSA9IGJlZm9yZSArIGVudi5jb2RlICsgYWZ0ZXI7XG5cdFx0ZW52LmNvZGUgPSBOb3JtYWxpemVyLm5vcm1hbGl6ZShlbnYuY29kZSwgZW52LnNldHRpbmdzKTtcblx0fSBlbHNlIHtcblx0XHQvLyBQcmVzZXJ2ZSBtYXJrdXAgZm9yIGtlZXAtbWFya3VwIHBsdWdpblxuXHRcdHZhciBodG1sID0gYmVmb3JlICsgZW52LmVsZW1lbnQuaW5uZXJIVE1MICsgYWZ0ZXI7XG5cdFx0ZW52LmVsZW1lbnQuaW5uZXJIVE1MID0gTm9ybWFsaXplci5ub3JtYWxpemUoaHRtbCwgZW52LnNldHRpbmdzKTtcblx0XHRlbnYuY29kZSA9IGVudi5lbGVtZW50LnRleHRDb250ZW50O1xuXHR9XG59KTtcblxufSgpKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcmlzbWpzL3BsdWdpbnMvbm9ybWFsaXplLXdoaXRlc3BhY2UvcHJpc20tbm9ybWFsaXplLXdoaXRlc3BhY2UuanNcbi8vIG1vZHVsZSBpZCA9IDI0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIoZnVuY3Rpb24gKCkge1xuXG5cdGlmICh0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcgfHwgIXNlbGYuUHJpc20gfHwgIXNlbGYuZG9jdW1lbnQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvKipcblx0ICogQ2xhc3MgbmFtZSBmb3IgPHByZT4gd2hpY2ggaXMgYWN0aXZhdGluZyB0aGUgcGx1Z2luXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqL1xuXHR2YXIgUExVR0lOX0NMQVNTID0gJ2xpbmUtbnVtYmVycyc7XG5cblx0LyoqXG5cdCAqIFJlc2l6ZXMgbGluZSBudW1iZXJzIHNwYW5zIGFjY29yZGluZyB0byBoZWlnaHQgb2YgbGluZSBvZiBjb2RlXG5cdCAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnQgPHByZT4gZWxlbWVudFxuXHQgKi9cblx0dmFyIF9yZXNpemVFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHR2YXIgY29kZVN0eWxlcyA9IGdldFN0eWxlcyhlbGVtZW50KTtcblx0XHR2YXIgd2hpdGVTcGFjZSA9IGNvZGVTdHlsZXNbJ3doaXRlLXNwYWNlJ107XG5cblx0XHRpZiAod2hpdGVTcGFjZSA9PT0gJ3ByZS13cmFwJyB8fCB3aGl0ZVNwYWNlID09PSAncHJlLWxpbmUnKSB7XG5cdFx0XHR2YXIgY29kZUVsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NvZGUnKTtcblx0XHRcdHZhciBsaW5lTnVtYmVyc1dyYXBwZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lLW51bWJlcnMtcm93cycpO1xuXHRcdFx0dmFyIGxpbmVOdW1iZXJTaXplciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmUtbnVtYmVycy1zaXplcicpO1xuXHRcdFx0dmFyIGNvZGVMaW5lcyA9IGVsZW1lbnQudGV4dENvbnRlbnQuc3BsaXQoJ1xcbicpO1xuXG5cdFx0XHRpZiAoIWxpbmVOdW1iZXJTaXplcikge1xuXHRcdFx0XHRsaW5lTnVtYmVyU2l6ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0XHRcdGxpbmVOdW1iZXJTaXplci5jbGFzc05hbWUgPSAnbGluZS1udW1iZXJzLXNpemVyJztcblxuXHRcdFx0XHRjb2RlRWxlbWVudC5hcHBlbmRDaGlsZChsaW5lTnVtYmVyU2l6ZXIpO1xuXHRcdFx0fVxuXG5cdFx0XHRsaW5lTnVtYmVyU2l6ZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cblx0XHRcdGNvZGVMaW5lcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lLCBsaW5lTnVtYmVyKSB7XG5cdFx0XHRcdGxpbmVOdW1iZXJTaXplci50ZXh0Q29udGVudCA9IGxpbmUgfHwgJ1xcbic7XG5cdFx0XHRcdHZhciBsaW5lU2l6ZSA9IGxpbmVOdW1iZXJTaXplci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRcdGxpbmVOdW1iZXJzV3JhcHBlci5jaGlsZHJlbltsaW5lTnVtYmVyXS5zdHlsZS5oZWlnaHQgPSBsaW5lU2l6ZSArICdweCc7XG5cdFx0XHR9KTtcblxuXHRcdFx0bGluZU51bWJlclNpemVyLnRleHRDb250ZW50ID0gJyc7XG5cdFx0XHRsaW5lTnVtYmVyU2l6ZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIFJldHVybnMgc3R5bGUgZGVjbGFyYXRpb25zIGZvciB0aGUgZWxlbWVudFxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0ICovXG5cdHZhciBnZXRTdHlsZXMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdGlmICghZWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSA6IChlbGVtZW50LmN1cnJlbnRTdHlsZSB8fCBudWxsKTtcblx0fTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuXHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgncHJlLicgKyBQTFVHSU5fQ0xBU1MpLCBfcmVzaXplRWxlbWVudCk7XG5cdH0pO1xuXG5cdFByaXNtLmhvb2tzLmFkZCgnY29tcGxldGUnLCBmdW5jdGlvbiAoZW52KSB7XG5cdFx0aWYgKCFlbnYuY29kZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIHdvcmtzIG9ubHkgZm9yIDxjb2RlPiB3cmFwcGVkIGluc2lkZSA8cHJlPiAobm90IGlubGluZSlcblx0XHR2YXIgcHJlID0gZW52LmVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHR2YXIgY2xzUmVnID0gL1xccypcXGJsaW5lLW51bWJlcnNcXGJcXHMqLztcblx0XHRpZiAoXG5cdFx0XHQhcHJlIHx8ICEvcHJlL2kudGVzdChwcmUubm9kZU5hbWUpIHx8XG5cdFx0XHQvLyBBYm9ydCBvbmx5IGlmIG5vciB0aGUgPHByZT4gbm9yIHRoZSA8Y29kZT4gaGF2ZSB0aGUgY2xhc3Ncblx0XHRcdCghY2xzUmVnLnRlc3QocHJlLmNsYXNzTmFtZSkgJiYgIWNsc1JlZy50ZXN0KGVudi5lbGVtZW50LmNsYXNzTmFtZSkpXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGVudi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGluZS1udW1iZXJzLXJvd3NcIikpIHtcblx0XHRcdC8vIEFib3J0IGlmIGxpbmUgbnVtYmVycyBhbHJlYWR5IGV4aXN0c1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChjbHNSZWcudGVzdChlbnYuZWxlbWVudC5jbGFzc05hbWUpKSB7XG5cdFx0XHQvLyBSZW1vdmUgdGhlIGNsYXNzIFwibGluZS1udW1iZXJzXCIgZnJvbSB0aGUgPGNvZGU+XG5cdFx0XHRlbnYuZWxlbWVudC5jbGFzc05hbWUgPSBlbnYuZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShjbHNSZWcsICcgJyk7XG5cdFx0fVxuXHRcdGlmICghY2xzUmVnLnRlc3QocHJlLmNsYXNzTmFtZSkpIHtcblx0XHRcdC8vIEFkZCB0aGUgY2xhc3MgXCJsaW5lLW51bWJlcnNcIiB0byB0aGUgPHByZT5cblx0XHRcdHByZS5jbGFzc05hbWUgKz0gJyBsaW5lLW51bWJlcnMnO1xuXHRcdH1cblxuXHRcdHZhciBtYXRjaCA9IGVudi5jb2RlLm1hdGNoKC9cXG4oPyEkKS9nKTtcblx0XHR2YXIgbGluZXNOdW0gPSBtYXRjaCA/IG1hdGNoLmxlbmd0aCArIDEgOiAxO1xuXHRcdHZhciBsaW5lTnVtYmVyc1dyYXBwZXI7XG5cblx0XHR2YXIgbGluZXMgPSBuZXcgQXJyYXkobGluZXNOdW0gKyAxKTtcblx0XHRsaW5lcyA9IGxpbmVzLmpvaW4oJzxzcGFuPjwvc3Bhbj4nKTtcblxuXHRcdGxpbmVOdW1iZXJzV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRsaW5lTnVtYmVyc1dyYXBwZXIuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cdFx0bGluZU51bWJlcnNXcmFwcGVyLmNsYXNzTmFtZSA9ICdsaW5lLW51bWJlcnMtcm93cyc7XG5cdFx0bGluZU51bWJlcnNXcmFwcGVyLmlubmVySFRNTCA9IGxpbmVzO1xuXG5cdFx0aWYgKHByZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3RhcnQnKSkge1xuXHRcdFx0cHJlLnN0eWxlLmNvdW50ZXJSZXNldCA9ICdsaW5lbnVtYmVyICcgKyAocGFyc2VJbnQocHJlLmdldEF0dHJpYnV0ZSgnZGF0YS1zdGFydCcpLCAxMCkgLSAxKTtcblx0XHR9XG5cblx0XHRlbnYuZWxlbWVudC5hcHBlbmRDaGlsZChsaW5lTnVtYmVyc1dyYXBwZXIpO1xuXG5cdFx0X3Jlc2l6ZUVsZW1lbnQocHJlKTtcblx0fSk7XG5cbn0oKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJpc21qcy9wbHVnaW5zL2xpbmUtbnVtYmVycy9wcmlzbS1saW5lLW51bWJlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDI0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgeyBMaWJyYXJ5UGFnZU5hdmlnYXRpb24gfSBmcm9tICcuL2xpYnJhcnktcGFnZS1uYXZpZ2F0aW9uJztcblxuZXhwb3J0IGNvbnN0IGluaXRNb2R1bGVzID0gKCkgPT4ge1xuICBuZXcgTGlicmFyeVBhZ2VOYXZpZ2F0aW9uKCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qcy9kZXZlbG9wbWVudC9tb2R1bGVzL2luZGV4LmpzIiwiaW1wb3J0IHsgYWRkRXZlbnRMaXN0ZW5lclRvRWwsIHJlbW92ZUFsbEV2ZW50c0Zyb21FbCwgdG9nZ2xlQ2xhc3MgfSBmcm9tICcuLy4uLy4uLy4uL3NoYXJlZC9taXNjJztcblxuZXhwb3J0IGNsYXNzIExpYnJhcnlQYWdlTmF2aWdhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIENyZWF0ZSB2YWx1ZXMgZm9yIGxhdGVyIHVzZVxuICAgIHRoaXMuc2lkZWJhciA9IGZhbHNlO1xuICAgIHRoaXMubWF4V2lkdGggPSA4MDA7XG5cbiAgICAvLyBDcmVhdGUgdmFyaWFibGVzIGZvciBsYXRlciB1c2VcbiAgICB0aGlzLm5hdmlnYXRpb25JZCA9ICdzdHlsZWd1aWRlLW5hdmlnYXRpb24nO1xuICAgIHRoaXMubmF2aWdhdGlvbklubmVyQ2xhc3NOYW1lID0gJ3N0eWxlZ3VpZGUtbmF2aWdhdGlvbl9faW5uZXInO1xuICAgIHRoaXMubmF2aWdhdGlvbklubmVyT3BlbkNsYXNzTmFtZSA9ICdzdHlsZWd1aWRlLW5hdmlnYXRpb25fX2lubmVyLS1vcGVuJztcbiAgICB0aGlzLmNvbnRlbnRJZCA9ICdzdHlsZWd1aWRlLWNvbnRlbnQnO1xuICAgIHRoaXMubW9iaWxlTmF2aWdhdGlvbkNsYXNzTmFtZSA9ICdzdHlsZWd1aWRlLW5hdmlnYXRpb25fX21vYmlsZS1uYXYnO1xuICAgIHRoaXMubW9iaWxlTmF2aWdhdGlvbkNvbnRhaW5lckNsYXNzTmFtZSA9ICdzdHlsZWd1aWRlLW5hdmlnYXRpb25fX21vYmlsZSc7XG4gICAgdGhpcy5saWJyYXJ5Q29udGFpbmVySWQgPSAnbGlicmFyeS1jb250YWluZXInO1xuXG4gICAgLy8gR2V0IGVsZW1lbnRzXG4gICAgdGhpcy5saWJyYXJ5Q29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubGlicmFyeUNvbnRhaW5lcklkKTtcbiAgICB0aGlzLm5hdmlnYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLm5hdmlnYXRpb25JZCk7XG4gICAgaWYgKCF0aGlzLm5hdmlnYXRpb24gfHwgIXRoaXMubGlicmFyeUNvbnRhaW5lckVsZW1lbnQpIHJldHVybjtcblxuICAgIHRoaXMubW9iaWxlTmF2aWdhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgdGhpcy5tb2JpbGVOYXZpZ2F0aW9uQ2xhc3NOYW1lKTtcblxuICAgIHRoaXMubmF2aWdhdGlvbklubmVyID0gdGhpcy5uYXZpZ2F0aW9uLnF1ZXJ5U2VsZWN0b3IoJy4nICsgdGhpcy5uYXZpZ2F0aW9uSW5uZXJDbGFzc05hbWUpO1xuICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuY29udGVudElkKTtcbiAgICB0aGlzLm1vYmlsZU5hdmlnYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIHRoaXMubW9iaWxlTmF2aWdhdGlvbkNsYXNzTmFtZSk7XG5cbiAgICBpZiAoIXRoaXMubmF2aWdhdGlvbiB8fCAhdGhpcy5jb250ZW50KSByZXR1cm47XG5cbiAgICB0aGlzLnNldHVwKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0dXAgZnVuY3Rpb25zXG4gICAqIC0gQ3JlYXRlIHN0aWNreSBzaWRlYmFyXG4gICAqIC0gQWRkIHJlc2l6ZSBldmVudCBsaXN0ZW5lclxuICAgKiAtIFNldHVwIGV2ZW50cyBmb3IgbW9iaWxlIG1lbnVcbiAgICovXG4gIHNldHVwKCkge1xuICAgIC8vIEFkZCByZXNpemUgZXZlbnQgbGlzdGVuZXJcbiAgICAkLmV2ZW50cyh3aW5kb3csIHtcbiAgICAgIHJlc2l6ZTogdGhpcy5yZWl6ZUhhbmRsZXIsXG4gICAgfSk7XG4gICAgLy8gTW9iaWxlIG5hdmlnYXRpb25cbiAgICAkLmRlbGVnYXRlKGRvY3VtZW50LCAnY2xpY2snLCAnLicgKyB0aGlzLm1vYmlsZU5hdmlnYXRpb25Db250YWluZXJDbGFzc05hbWUsIHRoaXMubW9iaWxlTmF2aWdhdGlvbkNsaWNrSGFuZGxlcik7XG4gICAgLy8gQ3JlYXRlIHN0aWNreSBzaWRlYmFyXG4gICAgdGhpcy5pbml0U2lkZWJhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZSBoYW5kbGVyXG4gICAqIC0gUmVzZXQgYW5kIHJlaW5pdGFsaXplIHRoZSBjdXJyZW50IHN0aWNreSBzaWRlYmFyXG4gICAqL1xuICByZWl6ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5pbml0U2lkZWJhcigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHN0aWNreSBzaWRlYmFyXG4gICAqIC0gU2V0IG1pbmltdW0gaGVpZ2h0IG9mIHRoZSBjb250ZW50IHRvIGJlIHRoZSBoZWlnaHQgb2YgdGhlIHNpZGViYXJcbiAgICogLSBDcmVhdGUgbmV3IGluc3RhbmNlIG9mIHN0aWNreSBzaWRlYmFyXG4gICAqIEB0b2RvOiBDcmVhdGUgc3RpY2t5IHNpZGViYXJcbiAgICovXG4gIGluaXRTaWRlYmFyKCkge1xuICAgIC8vIENoZWNrIHRoZSB3aW5kb3cgd2lkdGggc28gaXQgc2hvdWxkbid0IHJ1biB0aGUgc3RpY2t5IHNpZGViYXJcbiAgICAvLyB3aGVuIGxlc3MgdGhhbiBhIGNlcnRhaW4gd2lkdGhcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gdGhpcy5tYXhXaWR0aCkgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vYmlsZSBuYXZpZ2F0aW9uIHRvZ2dsZVxuICAgKiAtIFRvZ2dsZXMgdGhlIG9wZW4gY2xhc3NcbiAgICovXG4gIG1vYmlsZU5hdmlnYXRpb25DbGlja0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgdG9nZ2xlQ2xhc3ModGhpcy5uYXZpZ2F0aW9uSW5uZXIsIHRoaXMubmF2aWdhdGlvbklubmVyT3BlbkNsYXNzTmFtZSk7XG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2pzL2RldmVsb3BtZW50L21vZHVsZXMvbGlicmFyeS1wYWdlLW5hdmlnYXRpb24vaW5kZXguanMiLCIvKipcbiAqIGRvbVJlYWR5XG4gKlxuICogUnVucyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIERPTSBpcyByZWFkeS5cbiAqXG4gKiBTdXBwb3J0ZWQ6IElFOCtcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiBDYWxsYmFjayBmb3Igd2hlbiB0aGUgRE9NIGlzIGZ1bGx5IGxvYWRlZC5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZG9tUmVhZHkoZm4pIHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gJ2xvYWRpbmcnKSB7XG4gICAgZm4oKTtcbiAgfSBlbHNlIGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZuKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hdHRhY2hFdmVudCgnb25yZWFkeXN0YXRlY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSAnbG9hZGluZycpIGZuKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvZG9tLXJlYWR5LmpzIiwiLyoqXG4gKiBlbEhhc0NsYXNzXG4gKlxuICogQ2hlY2tzIGlmIHRoZSBlbGVtZW50IGhhcyB0aGUgY2xhc3MuXG4gKlxuICogU3VwcG9ydGVkOiBJRTgrXG4gKlxuICogQHBhcmFtIHtET01FbGVtZW50fSBlbCBFbGVtZW50IHRvIGNoZWNrIHRoZSBjbGFzcyBvZi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzcyBOYW1lIG9mIHRoZSBjbGFzcyB0byBjaGVjayBmb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbEhhc0NsYXNzKGVsLCBjbGFzc05hbWUpIHtcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfVxuICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgY2xhc3NOYW1lICsgJyggfCQpJywgJ2dpJykudGVzdChlbC5jbGFzc05hbWUpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qcy9zaGFyZWQvbWlzYy9oYXMtY2xhc3MuanMiLCIvKipcbiAqIHRvZ2dsZUNsYXNzXG4gKlxuICogVG9nZ2xlcyB0aGUgY2xhc3MgZm9yIGEgRE9NIGVsZW1lbnQuXG4gKlxuICogU3VwcG9ydGVkOiBJRTgrXG4gKlxuICogQHBhcmFtIHtET01FbGVtZW50fSBlbCBFbGVtZW50IHRvIHRvZ2dsZSB0aGUgY2xhc3MgZm9yLlxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSBOYW1lIG9mIHRoZSBjbGFzcyB0byB0b2dnbGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVDbGFzcyhlbCwgY2xhc3NOYW1lLCBmb3JjZSkge1xuICAvLyBDaGVjayBpZiBuZXcgY2xhc3NMaXN0IEFQSSBpcyBhdmFsaWFnbGVcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lLCBmb3JjZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gR2V0IGFsbCBvZiB0aGUgY2xhc3MgbmFtZXMgYXMgYW4gYXJyYXlcbiAgbGV0IGNsYXNzZXMgPSBlbC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgbGV0IGV4aXN0aW5nSW5kZXggPSAtMTtcblxuICAvLyBGaW5kIHRoZSBpbmRleCBvZiB0aGUgY2xhc3NOYW1lIGluIHRoZSBhcnJheVxuICBmb3IgKHZhciBpID0gY2xhc3Nlcy5sZW5ndGg7IGktLTsgKSB7XG4gICAgaWYgKGNsYXNzZXNbaV0gPT09IGNsYXNzTmFtZSkgZXhpc3RpbmdJbmRleCA9IGk7XG4gIH1cblxuICAvLyBSZW1vdmUgY2xhc3NcbiAgaWYgKGV4aXN0aW5nSW5kZXggPj0gMCAmJiBmb3JjZSAhPT0gdHJ1ZSkge1xuICAgIGNsYXNzZXMuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIDEpO1xuICB9IGVsc2Uge1xuICAgIGlmIChmb3JjZSAhPT0gZmFsc2UpIHtcbiAgICAgIGNsYXNzZXMucHVzaChjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlLWFkZCBhbGwgb2YgdGhlIGNsYXNzZXNcbiAgZWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2pzL3NoYXJlZC9taXNjL3RvZ2dsZS1jbGFzcy5qcyIsIi8qKlxuICogYWRkRXZlbnRMaXN0ZW5lclRvRWxcbiAqXG4gKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGFuIGVsZW1lbnQuXG4gKlxuICogU3VwcG9ydGVkOiBJRTgrXG4gKlxuICogQHBhcmFtIHtET01FbGVtZW50fSBlbCBFbGVtZW50IHRvIGFkZCB0aGUgZXZlbnQgdG8uXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gaGFuZGxlciBDYWxsYmFjayBmdW5jdGlvbiB0byBoYW5kbGUgZXZlbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyVG9FbChlbCwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gIGlmIChlbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgIHJldHVybjtcbiAgfVxuICBlbC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBmdW5jdGlvbigpIHtcbiAgICBoYW5kbGVyLmNhbGwoZWwpO1xuICB9KTtcbn1cblxuLyoqXG4gKiByZW1vdmVFdmVudExpc3RlbmVyRnJvbUVsXG4gKlxuICogUmVtb3ZlcyBhbiBldmVudCBoYW5kbGVyIGZyb20gYW4gZWxlbWVudC5cbiAqXG4gKiBTdXBwb3J0ZWQ6IElFOCtcbiAqXG4gKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsIERPTSBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gaGFuZGxlciBDYWxsYmFjayBmdW5jdGlvbiB0byByZW1vdmUgZnJvbSBldmVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJGcm9tRWwoZWwsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICBpZiAoZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICByZXR1cm47XG4gIH1cbiAgZWwuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50TmFtZSwgaGFuZGxlcik7XG59XG5cbi8qKlxuICogcmVtb3ZlQWxsRXZlbnRzRnJvbUVsXG4gKlxuICogUmVtb3ZlcyBhbGwgZXZlbnQgaGFuZGxlcnMgZnJvbSBhbiBlbGVtZW50LlxuICpcbiAqIFN1cHBvcnRlZDogSUU4K1xuICpcbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWwgRE9NIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUFsbEV2ZW50c0Zyb21FbChlbCkge1xuICB2YXIgY2xvbmUgPSBlbC5jbG9uZU5vZGUodHJ1ZSk7XG4gIGVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNsb25lLCBlbCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2pzL3NoYXJlZC9taXNjL2V2ZW50cy5qcyIsIi8qKlxuICogY2xvc2VzdFBhcmVudE9mRWxcbiAqXG4gKiBMb29wcyB1cCB0aGUgRE9NIHRyZWUgdW50aWwgaXQgZmluZHMgYSBwYXJlbnQgd2l0aCB0aGUgY2xhc3MgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsIEVsZW1lbnQgdG8gc3RhcnQgYW5kIHRyYXZlcnNlIHVwIGZyb20uXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIENsYXNzIG5hbWUgdG8gbG9vayBmb3IgaW4gcGFyZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VzdFBhcmVudE9mRWwoZWwsIGNsYXNzTmFtZSkge1xuICBsZXQgbWF0Y2hlcyA9IChkb2N1bWVudCB8fCBlbC5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzTmFtZSk7XG4gIGxldCBpO1xuICBkbyB7XG4gICAgaSA9IG1hdGNoZXMubGVuZ3RoO1xuICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IGVsKSB7fVxuICB9IHdoaWxlIChpIDwgMCAmJiAoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSk7XG4gIHJldHVybiBlbDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvY2xvc2VzdC1wYXJlbnQuanMiLCIoZnVuY3Rpb24oKSB7XG5cInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gb3ZlcmxvYWQoY2FsbGJhY2ssIHN0YXJ0LCBlbmQpIHtcblx0c3RhcnQgPSBzdGFydCA9PT0gdW5kZWZpbmVkID8gMSA6IHN0YXJ0O1xuXHRlbmQgPSBlbmQgfHwgc3RhcnQgKyAxO1xuXG5cdGlmIChlbmQgLSBzdGFydCA8PSAxKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPD0gc3RhcnQgfHwgJC50eXBlKGFyZ3VtZW50c1tzdGFydF0pID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdHJldHVybiBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgb2JqID0gYXJndW1lbnRzW3N0YXJ0XSwgcmV0O1xuXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdHZhciBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuXHRcdFx0XHRhcmdzLnNwbGljZShzdGFydCwgMSwga2V5LCBvYmpba2V5XSk7XG5cdFx0XHRcdHJldCA9IGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gb3ZlcmxvYWQob3ZlcmxvYWQoY2FsbGJhY2ssIHN0YXJ0ICsgMSwgZW5kKSwgc3RhcnQsIGVuZCAtIDEpO1xufVxuXG4vLyBDb3B5IHByb3BlcnRpZXMgZnJvbSBvbmUgb2JqZWN0IHRvIGFub3RoZXIuIE92ZXJ3cml0ZXMgYWxsb3dlZC5cbi8vIFN1YnRsZSBkaWZmZXJlbmNlIG9mIGFycmF5IHZzIHN0cmluZyB3aGl0ZWxpc3Q6IElmIHByb3BlcnR5IGRvZXNuJ3QgZXhpc3QgaW4gZnJvbSwgYXJyYXkgd2lsbCBub3QgZGVmaW5lIGl0LlxuZnVuY3Rpb24gZXh0ZW5kKHRvLCBmcm9tLCB3aGl0ZWxpc3QpIHtcblx0dmFyIHdoaXRlbGlzdFR5cGUgPSB0eXBlKHdoaXRlbGlzdCk7XG5cblx0aWYgKHdoaXRlbGlzdFR5cGUgPT09IFwic3RyaW5nXCIpIHtcblx0XHQvLyBUbyBjb3B5IGdldHR0ZXJzL3NldHRlcnMsIHByZXNlcnZlIGZsYWdzIGV0Y1xuXHRcdHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihmcm9tLCB3aGl0ZWxpc3QpO1xuXG5cdFx0aWYgKGRlc2NyaXB0b3IgJiYgKCFkZXNjcmlwdG9yLndyaXRhYmxlIHx8ICFkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSB8fCAhZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGRlc2NyaXB0b3IuZ2V0IHx8IGRlc2NyaXB0b3Iuc2V0KSkge1xuXHRcdFx0ZGVsZXRlIHRvW3doaXRlbGlzdF07XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodG8sIHdoaXRlbGlzdCwgZGVzY3JpcHRvcik7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dG9bd2hpdGVsaXN0XSA9IGZyb21bd2hpdGVsaXN0XTtcblx0XHR9XG5cdH1cblx0ZWxzZSBpZiAod2hpdGVsaXN0VHlwZSA9PT0gXCJhcnJheVwiKSB7XG5cdFx0d2hpdGVsaXN0LmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcblx0XHRcdGlmIChwcm9wZXJ0eSBpbiBmcm9tKSB7XG5cdFx0XHRcdGV4dGVuZCh0bywgZnJvbSwgcHJvcGVydHkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGZvciAodmFyIHByb3BlcnR5IGluIGZyb20pIHtcblx0XHRcdGlmICh3aGl0ZWxpc3QpIHtcblx0XHRcdFx0aWYgKHdoaXRlbGlzdFR5cGUgPT09IFwicmVnZXhwXCIgJiYgIXdoaXRlbGlzdC50ZXN0KHByb3BlcnR5KSB8fFxuXHRcdFx0XHRcdHdoaXRlbGlzdFR5cGUgPT09IFwiZnVuY3Rpb25cIiAmJiAhd2hpdGVsaXN0LmNhbGwoZnJvbSwgcHJvcGVydHkpKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZXh0ZW5kKHRvLCBmcm9tLCBwcm9wZXJ0eSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIFtbQ2xhc3NdXSBvZiBhbiBvYmplY3QgaW4gbG93ZXJjYXNlIChlZy4gYXJyYXksIGRhdGUsIHJlZ2V4cCwgc3RyaW5nIGV0YylcbiAqL1xuZnVuY3Rpb24gdHlwZShvYmopIHtcblx0aWYgKG9iaiA9PT0gbnVsbCkge1xuXHRcdHJldHVybiBcIm51bGxcIjtcblx0fVxuXG5cdGlmIChvYmogPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBcInVuZGVmaW5lZFwiO1xuXHR9XG5cblx0dmFyIHJldCA9IChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5tYXRjaCgvXlxcW29iamVjdFxccysoLio/KVxcXSQvKVsxXSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuXG5cdGlmIChyZXQgPT0gXCJudW1iZXJcIiAmJiBpc05hTihvYmopKSB7XG5cdFx0cmV0dXJuIFwibmFuXCI7XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufVxuXG52YXIgJCA9IHNlbGYuQmxpc3MgPSBleHRlbmQoZnVuY3Rpb24oZXhwciwgY29udGV4dCkge1xuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyICYmICFjb250ZXh0IHx8ICFleHByKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gJC50eXBlKGV4cHIpID09PSBcInN0cmluZ1wiPyAoY29udGV4dCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihleHByKSA6IGV4cHIgfHwgbnVsbDtcbn0sIHNlbGYuQmxpc3MpO1xuXG5leHRlbmQoJCwge1xuXHRleHRlbmQ6IGV4dGVuZCxcblx0b3ZlcmxvYWQ6IG92ZXJsb2FkLFxuXHR0eXBlOiB0eXBlLFxuXG5cdHByb3BlcnR5OiAkLnByb3BlcnR5IHx8IFwiX1wiLFxuXG5cdHNvdXJjZXM6IHt9LFxuXG5cdG5vb3A6IGZ1bmN0aW9uKCkge30sXG5cblx0JDogZnVuY3Rpb24oZXhwciwgY29udGV4dCkge1xuXHRcdGlmIChleHByIGluc3RhbmNlb2YgTm9kZSB8fCBleHByIGluc3RhbmNlb2YgV2luZG93KSB7XG5cdFx0XHRyZXR1cm4gW2V4cHJdO1xuXHRcdH1cblxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIgJiYgIWNvbnRleHQpIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh0eXBlb2YgZXhwciA9PSBcInN0cmluZ1wiPyAoY29udGV4dCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChleHByKSA6IGV4cHIgfHwgW10pO1xuXHR9LFxuXG5cdC8qXG5cdCAqIFJldHVybiBmaXJzdCBub24tdW5kZWZpbmVkIHZhbHVlLiBNYWlubHkgdXNlZCBpbnRlcm5hbGx5LlxuXHQgKi9cblx0ZGVmaW5lZDogZnVuY3Rpb24gKCkge1xuXHRcdGZvciAodmFyIGk9MDsgaTxhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChhcmd1bWVudHNbaV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRjcmVhdGU6IGZ1bmN0aW9uICh0YWcsIG8pIHtcblx0XHRpZiAodGFnIGluc3RhbmNlb2YgTm9kZSkge1xuXHRcdFx0cmV0dXJuICQuc2V0KHRhZywgbyk7XG5cdFx0fVxuXG5cdFx0Ly8gNCBzaWduYXR1cmVzOiAodGFnLCBvKSwgKHRhZyksIChvKSwgKClcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0aWYgKCQudHlwZSh0YWcpID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdG8gPSB7fTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvID0gdGFnO1xuXHRcdFx0XHR0YWcgPSBvLnRhZztcblx0XHRcdFx0byA9ICQuZXh0ZW5kKHt9LCBvLCBmdW5jdGlvbihwcm9wZXJ0eSkge1xuXHRcdFx0XHRcdHJldHVybiBwcm9wZXJ0eSAhPT0gXCJ0YWdcIjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICQuc2V0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnIHx8IFwiZGl2XCIpLCBvKTtcblx0fSxcblxuXHRlYWNoOiBmdW5jdGlvbihvYmosIGNhbGxiYWNrLCByZXQpIHtcblx0XHRyZXQgPSByZXQgfHwge307XG5cblx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmopIHtcblx0XHRcdHJldFtwcm9wZXJ0eV0gPSBjYWxsYmFjay5jYWxsKG9iaiwgcHJvcGVydHksIG9ialtwcm9wZXJ0eV0pO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cblx0cmVhZHk6IGZ1bmN0aW9uKGNvbnRleHQpIHtcblx0XHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdGlmIChjb250ZXh0LnJlYWR5U3RhdGUgIT09IFwibG9hZGluZ1wiKSB7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0Ly8gSGVscGVyIGZvciBkZWZpbmluZyBPT1AtbGlrZSDigJxjbGFzc2Vz4oCdXG5cdENsYXNzOiBmdW5jdGlvbihvKSB7XG5cdFx0dmFyIHNwZWNpYWwgPSBbXCJjb25zdHJ1Y3RvclwiLCBcImV4dGVuZHNcIiwgXCJhYnN0cmFjdFwiLCBcInN0YXRpY1wiXS5jb25jYXQoT2JqZWN0LmtleXMoJC5jbGFzc1Byb3BzKSk7XG5cdFx0dmFyIGluaXQgPSBvLmhhc093blByb3BlcnR5KFwiY29uc3RydWN0b3JcIik/IG8uY29uc3RydWN0b3IgOiAkLm5vb3A7XG5cblx0XHR2YXIgQ2xhc3MgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aGlzLmNvbnN0cnVjdG9yLl9fYWJzdHJhY3QgJiYgdGhpcy5jb25zdHJ1Y3RvciA9PT0gQ2xhc3MpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQWJzdHJhY3QgY2xhc3NlcyBjYW5ub3QgYmUgZGlyZWN0bHkgaW5zdGFudGlhdGVkLlwiKTtcblx0XHRcdH1cblxuXHRcdFx0Q2xhc3Muc3VwZXIgJiYgQ2xhc3Muc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuXHRcdFx0aW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cblx0XHRDbGFzcy5zdXBlciA9IG8uZXh0ZW5kcyB8fCBudWxsO1xuXG5cdFx0Q2xhc3MucHJvdG90eXBlID0gJC5leHRlbmQoT2JqZWN0LmNyZWF0ZShDbGFzcy5zdXBlcj8gQ2xhc3Muc3VwZXIucHJvdG90eXBlIDogT2JqZWN0KSwge1xuXHRcdFx0Y29uc3RydWN0b3I6IENsYXNzXG5cdFx0fSk7XG5cblx0XHR2YXIgc3BlY2lhbEZpbHRlciA9IGZ1bmN0aW9uKHByb3BlcnR5KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkgJiYgc3BlY2lhbC5pbmRleE9mKHByb3BlcnR5KSA9PT0gLTE7XG5cdFx0fTtcblxuXHRcdC8vIFN0YXRpYyBtZXRob2RzXG5cdFx0aWYgKG8uc3RhdGljKSB7XG5cdFx0XHQkLmV4dGVuZChDbGFzcywgby5zdGF0aWMsIHNwZWNpYWxGaWx0ZXIpO1xuXG5cdFx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiAkLmNsYXNzUHJvcHMpIHtcblx0XHRcdFx0aWYgKHByb3BlcnR5IGluIG8uc3RhdGljKSB7XG5cdFx0XHRcdFx0JC5jbGFzc1Byb3BzW3Byb3BlcnR5XShDbGFzcywgby5zdGF0aWNbcHJvcGVydHldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEluc3RhbmNlIG1ldGhvZHNcblx0XHQkLmV4dGVuZChDbGFzcy5wcm90b3R5cGUsIG8sIHNwZWNpYWxGaWx0ZXIpO1xuXG5cdFx0Zm9yICh2YXIgcHJvcGVydHkgaW4gJC5jbGFzc1Byb3BzKSB7XG5cdFx0XHRpZiAocHJvcGVydHkgaW4gbykge1xuXHRcdFx0XHQkLmNsYXNzUHJvcHNbcHJvcGVydHldKENsYXNzLnByb3RvdHlwZSwgb1twcm9wZXJ0eV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZvciBlYXNpZXIgY2FsbGluZyBvZiBzdXBlciBtZXRob2RzXG5cdFx0Ly8gVGhpcyBkb2Vzbid0IHNhdmUgdXMgZnJvbSBoYXZpbmcgdG8gdXNlIC5jYWxsKHRoaXMpIHRob3VnaFxuXHRcdENsYXNzLnByb3RvdHlwZS5zdXBlciA9IENsYXNzLnN1cGVyPyBDbGFzcy5zdXBlci5wcm90b3R5cGUgOiBudWxsO1xuXG5cdFx0Q2xhc3MuX19hYnN0cmFjdCA9ICEhby5hYnN0cmFjdDtcblxuXHRcdHJldHVybiBDbGFzcztcblx0fSxcblxuXHQvLyBQcm9wZXJ0aWVzIHdpdGggc3BlY2lhbCBoYW5kbGluZyBpbiBjbGFzc2VzXG5cdGNsYXNzUHJvcHM6IHtcblx0XHQvLyBMYXppbHkgZXZhbHVhdGVkIHByb3BlcnRpZXNcblx0XHRsYXp5OiBvdmVybG9hZChmdW5jdGlvbihvYmosIHByb3BlcnR5LCBnZXR0ZXIpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3BlcnR5LCB7XG5cdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyIHZhbHVlID0gZ2V0dGVyLmNhbGwodGhpcyk7XG5cblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJvcGVydHksIHtcblx0XHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdFx0Ly8gQmxpbmQgd3JpdGU6IHNraXAgcnVubmluZyB0aGUgZ2V0dGVyXG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHByb3BlcnR5LCB7XG5cdFx0XHRcdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdFx0d3JpdGFibGU6IHRydWVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9KSxcblxuXHRcdC8vIFByb3BlcnRpZXMgdGhhdCBiZWhhdmUgbGlrZSBub3JtYWwgcHJvcGVydGllcyBidXQgYWxzbyBleGVjdXRlIGNvZGUgdXBvbiBnZXR0aW5nL3NldHRpbmdcblx0XHRsaXZlOiBvdmVybG9hZChmdW5jdGlvbihvYmosIHByb3BlcnR5LCBkZXNjcmlwdG9yKSB7XG5cdFx0XHRpZiAoJC50eXBlKGRlc2NyaXB0b3IpID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0ZGVzY3JpcHRvciA9IHtzZXQ6IGRlc2NyaXB0b3J9O1xuXHRcdFx0fVxuXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wZXJ0eSwge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHZhciB2YWx1ZSA9IHRoaXNbXCJfXCIgKyBwcm9wZXJ0eV07XG5cdFx0XHRcdFx0dmFyIHJldCA9IGRlc2NyaXB0b3IuZ2V0ICYmIGRlc2NyaXB0b3IuZ2V0LmNhbGwodGhpcywgdmFsdWUpO1xuXHRcdFx0XHRcdHJldHVybiByZXQgIT09IHVuZGVmaW5lZD8gcmV0IDogdmFsdWU7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldDogZnVuY3Rpb24odikge1xuXHRcdFx0XHRcdHZhciB2YWx1ZSA9IHRoaXNbXCJfXCIgKyBwcm9wZXJ0eV07XG5cdFx0XHRcdFx0dmFyIHJldCA9IGRlc2NyaXB0b3Iuc2V0ICYmIGRlc2NyaXB0b3Iuc2V0LmNhbGwodGhpcywgdiwgdmFsdWUpO1xuXHRcdFx0XHRcdHRoaXNbXCJfXCIgKyBwcm9wZXJ0eV0gPSByZXQgIT09IHVuZGVmaW5lZD8gcmV0IDogdjtcblx0XHRcdFx0fSxcblx0XHRcdFx0Y29uZmlndXJhYmxlOiBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSxcblx0XHRcdFx0ZW51bWVyYWJsZTogZGVzY3JpcHRvci5lbnVtZXJhYmxlXG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9KVxuXG5cdH0sXG5cblx0Ly8gSW5jbHVkZXMgYSBzY3JpcHQsIHJldHVybnMgYSBwcm9taXNlXG5cdGluY2x1ZGU6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciB1cmwgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuXHRcdHZhciBsb2FkZWQgPSBhcmd1bWVudHMubGVuZ3RoID09PSAyPyBhcmd1bWVudHNbMF0gOiBmYWxzZTtcblxuXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXG5cdFx0cmV0dXJuIGxvYWRlZD8gUHJvbWlzZS5yZXNvbHZlKCkgOiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdCQuc2V0KHNjcmlwdCwge1xuXHRcdFx0XHRhc3luYzogdHJ1ZSxcblx0XHRcdFx0b25sb2FkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdFx0JC5yZW1vdmUoc2NyaXB0KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0b25lcnJvcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmVqZWN0KCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNyYzogdXJsLFxuXHRcdFx0XHRpbnNpZGU6IGRvY3VtZW50LmhlYWRcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdH0sXG5cblx0Lypcblx0ICogRmV0Y2ggQVBJIGluc3BpcmVkIFhIUiB3cmFwcGVyLiBSZXR1cm5zIHByb21pc2UuXG5cdCAqL1xuXHRmZXRjaDogZnVuY3Rpb24odXJsLCBvKSB7XG5cdFx0aWYgKCF1cmwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJVUkwgcGFyYW1ldGVyIGlzIG1hbmRhdG9yeSBhbmQgY2Fubm90IGJlIFwiICsgdXJsKTtcblx0XHR9XG5cblx0XHQvLyBTZXQgZGVmYXVsdHMgJiBmaXh1cCBhcmd1bWVudHNcblx0XHR2YXIgZW52ID0gZXh0ZW5kKHtcblx0XHRcdHVybDogbmV3IFVSTCh1cmwsIGxvY2F0aW9uKSxcblx0XHRcdGRhdGE6IFwiXCIsXG5cdFx0XHRtZXRob2Q6IFwiR0VUXCIsXG5cdFx0XHRoZWFkZXJzOiB7fSxcblx0XHRcdHhocjogbmV3IFhNTEh0dHBSZXF1ZXN0KClcblx0XHR9LCBvKTtcblxuXHRcdGVudi5tZXRob2QgPSBlbnYubWV0aG9kLnRvVXBwZXJDYXNlKCk7XG5cblx0XHQkLmhvb2tzLnJ1bihcImZldGNoLWFyZ3NcIiwgZW52KTtcblxuXHRcdC8vIFN0YXJ0IHNlbmRpbmcgdGhlIHJlcXVlc3RcblxuXHRcdGlmIChlbnYubWV0aG9kID09PSBcIkdFVFwiICYmIGVudi5kYXRhKSB7XG5cdFx0XHRlbnYudXJsLnNlYXJjaCArPSBlbnYuZGF0YTtcblx0XHR9XG5cblx0XHRkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZShcImRhdGEtbG9hZGluZ1wiLCBlbnYudXJsKTtcblxuXHRcdGVudi54aHIub3BlbihlbnYubWV0aG9kLCBlbnYudXJsLmhyZWYsIGVudi5hc3luYyAhPT0gZmFsc2UsIGVudi51c2VyLCBlbnYucGFzc3dvcmQpO1xuXG5cdFx0Zm9yICh2YXIgcHJvcGVydHkgaW4gbykge1xuXHRcdFx0aWYgKHByb3BlcnR5IGluIGVudi54aHIpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRlbnYueGhyW3Byb3BlcnR5XSA9IG9bcHJvcGVydHldO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0c2VsZi5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IoZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZW52Lm1ldGhvZCAhPT0gXCJHRVRcIiAmJiAhZW52LmhlYWRlcnNbXCJDb250ZW50LXR5cGVcIl0gJiYgIWVudi5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdKSB7XG5cdFx0XHRlbnYueGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaGVhZGVyIGluIGVudi5oZWFkZXJzKSB7XG5cdFx0XHRlbnYueGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBlbnYuaGVhZGVyc1toZWFkZXJdKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRlbnYueGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtbG9hZGluZ1wiKTtcblxuXHRcdFx0XHRpZiAoZW52Lnhoci5zdGF0dXMgPT09IDAgfHwgZW52Lnhoci5zdGF0dXMgPj0gMjAwICYmIGVudi54aHIuc3RhdHVzIDwgMzAwIHx8IGVudi54aHIuc3RhdHVzID09PSAzMDQpIHtcblx0XHRcdFx0XHQvLyBTdWNjZXNzIVxuXHRcdFx0XHRcdHJlc29sdmUoZW52Lnhocik7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCQuZXh0ZW5kKEVycm9yKGVudi54aHIuc3RhdHVzVGV4dCksIHtcblx0XHRcdFx0XHRcdHhocjogZW52Lnhocixcblx0XHRcdFx0XHRcdGdldCBzdGF0dXMoKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnhoci5zdGF0dXM7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRlbnYueGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWxvYWRpbmdcIik7XG5cdFx0XHRcdHJlamVjdCgkLmV4dGVuZChFcnJvcihcIk5ldHdvcmsgRXJyb3JcIiksIHt4aHI6IGVudi54aHJ9KSk7XG5cdFx0XHR9O1xuXG5cdFx0XHRlbnYueGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0ICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1sb2FkaW5nXCIpO1xuXHRcdFx0ICAgIHJlamVjdCgkLmV4dGVuZChFcnJvcihcIk5ldHdvcmsgVGltZW91dFwiKSwge3hocjogZW52Lnhocn0pKTtcblx0XHRcdH07XG5cblx0XHRcdGVudi54aHIuc2VuZChlbnYubWV0aG9kID09PSBcIkdFVFwiPyBudWxsIDogZW52LmRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdHZhbHVlOiBmdW5jdGlvbihvYmopIHtcblx0XHR2YXIgaGFzUm9vdCA9ICQudHlwZShvYmopICE9PSBcInN0cmluZ1wiO1xuXG5cdFx0cmV0dXJuICQuJChhcmd1bWVudHMpLnNsaWNlKCtoYXNSb290KS5yZWR1Y2UoZnVuY3Rpb24ob2JqLCBwcm9wZXJ0eSkge1xuXHQgICAgICAgIHJldHVybiBvYmogJiYgb2JqW3Byb3BlcnR5XTtcblx0ICAgIH0sIGhhc1Jvb3Q/IG9iaiA6IHNlbGYpO1xuXHR9XG59KTtcblxuJC5Ib29rcyA9IG5ldyAkLkNsYXNzKHtcblx0YWRkOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGZpcnN0KSB7XG5cdFx0KEFycmF5LmlzQXJyYXkobmFtZSk/IG5hbWUgOiBbbmFtZV0pLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuXHRcdFx0dGhpc1tuYW1lXSA9IHRoaXNbbmFtZV0gfHwgW107XG5cdFx0XHR0aGlzW25hbWVdW2ZpcnN0PyBcInVuc2hpZnRcIiA6IFwicHVzaFwiXShjYWxsYmFjayk7XG5cdFx0fSwgdGhpcyk7XG5cdH0sXG5cblx0cnVuOiBmdW5jdGlvbiAobmFtZSwgZW52KSB7XG5cdFx0dGhpc1tuYW1lXSA9IHRoaXNbbmFtZV0gfHwgW107XG5cdFx0dGhpc1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRjYWxsYmFjay5jYWxsKGVudiAmJiBlbnYuY29udGV4dD8gZW52LmNvbnRleHQgOiBlbnYsIGVudik7XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG4kLmhvb2tzID0gbmV3ICQuSG9va3MoKTtcblxudmFyIF8gPSAkLnByb3BlcnR5O1xuXG4kLkVsZW1lbnQgPSBmdW5jdGlvbiAoc3ViamVjdCkge1xuXHR0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuXG5cdC8vIEF1dGhvci1kZWZpbmVkIGVsZW1lbnQtcmVsYXRlZCBkYXRhXG5cdHRoaXMuZGF0YSA9IHt9O1xuXG5cdC8vIEludGVybmFsIEJsaXNzIGVsZW1lbnQtcmVsYXRlZCBkYXRhXG5cdHRoaXMuYmxpc3MgPSB7fTtcbn07XG5cbiQuRWxlbWVudC5wcm90b3R5cGUgPSB7XG5cdHNldDogb3ZlcmxvYWQoZnVuY3Rpb24ocHJvcGVydHksIHZhbHVlKSB7XG5cblx0XHRpZiAocHJvcGVydHkgaW4gJC5zZXRQcm9wcykge1xuXHRcdFx0JC5zZXRQcm9wc1twcm9wZXJ0eV0uY2FsbCh0aGlzLCB2YWx1ZSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHByb3BlcnR5IGluIHRoaXMpIHtcblx0XHRcdHRoaXNbcHJvcGVydHldID0gdmFsdWU7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUocHJvcGVydHksIHZhbHVlKTtcblx0XHR9XG5cblx0fSwgMCksXG5cblx0Ly8gUnVuIGEgQ1NTIHRyYW5zaXRpb24sIHJldHVybiBwcm9taXNlXG5cdHRyYW5zaXRpb246IGZ1bmN0aW9uKHByb3BzLCBkdXJhdGlvbikge1xuXHRcdGR1cmF0aW9uID0gK2R1cmF0aW9uIHx8IDQwMDtcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdGlmIChcInRyYW5zaXRpb25cIiBpbiB0aGlzLnN0eWxlKSB7XG5cdFx0XHRcdC8vIEdldCBleGlzdGluZyBzdHlsZVxuXHRcdFx0XHR2YXIgcHJldmlvdXMgPSAkLmV4dGVuZCh7fSwgdGhpcy5zdHlsZSwgL150cmFuc2l0aW9uKER1cmF0aW9ufFByb3BlcnR5KSQvKTtcblxuXHRcdFx0XHQkLnN0eWxlKHRoaXMsIHtcblx0XHRcdFx0XHR0cmFuc2l0aW9uRHVyYXRpb246IChkdXJhdGlvbiB8fCA0MDApICsgXCJtc1wiLFxuXHRcdFx0XHRcdHRyYW5zaXRpb25Qcm9wZXJ0eTogT2JqZWN0LmtleXMocHJvcHMpLmpvaW4oXCIsIFwiKVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkLm9uY2UodGhpcywgXCJ0cmFuc2l0aW9uZW5kXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dChpKTtcblx0XHRcdFx0XHQkLnN0eWxlKHRoaXMsIHByZXZpb3VzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRoaXMpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBGYWlsc2FmZSwgaW4gY2FzZSB0cmFuc2l0aW9uZW5kIGRvZXNu4oCZdCBmaXJlXG5cdFx0XHRcdHZhciBpID0gc2V0VGltZW91dChyZXNvbHZlLCBkdXJhdGlvbis1MCwgdGhpcyk7XG5cblx0XHRcdFx0JC5zdHlsZSh0aGlzLCBwcm9wcyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0JC5zdHlsZSh0aGlzLCBwcm9wcyk7XG5cdFx0XHRcdHJlc29sdmUodGhpcyk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0fSxcblxuXHQvLyBGaXJlIGEgc3ludGhlc2l6ZWQgZXZlbnQgb24gdGhlIGVsZW1lbnRcblx0ZmlyZTogZnVuY3Rpb24gKHR5cGUsIHByb3BlcnRpZXMpIHtcblx0XHR2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJIVE1MRXZlbnRzXCIpO1xuXG5cdFx0ZXZ0LmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlICk7XG5cblx0XHQvLyBSZXR1cm4gdGhlIHJlc3VsdCBvZiBkaXNwYXRjaGluZyB0aGUgZXZlbnQsIHNvIHdlXG5cdFx0Ly8gY2FuIGtub3cgaWYgYGUucHJldmVudERlZmF1bHRgIHdhcyBjYWxsZWQgaW5zaWRlIGl0XG5cdFx0cmV0dXJuIHRoaXMuZGlzcGF0Y2hFdmVudCgkLmV4dGVuZChldnQsIHByb3BlcnRpZXMpKTtcblx0fSxcblxuXHR1bmJpbmQ6IG92ZXJsb2FkKGZ1bmN0aW9uKGV2ZW50cywgY2FsbGJhY2spIHtcblx0XHQoZXZlbnRzIHx8IFwiXCIpLnNwbGl0KC9cXHMrLykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuXHRcdFx0aWYgKChfIGluIHRoaXMpICYmICh0eXBlLmluZGV4T2YoXCIuXCIpID4gLTEgfHwgIWNhbGxiYWNrKSkge1xuXHRcdFx0XHQvLyBNYXNzIHVuYmluZGluZywgbmVlZCB0byBnbyB0aHJvdWdoIGxpc3RlbmVyc1xuXHRcdFx0XHR0eXBlID0gKHR5cGUgfHwgXCJcIikuc3BsaXQoXCIuXCIpO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gdHlwZVsxXTtcblx0XHRcdFx0dHlwZSA9IHR5cGVbMF07XG5cdFx0XHRcdC8vIG1hbiwgY2Fu4oCZdCB3YWl0IHRvIGJlIGFibGUgdG8gZG8gW3R5cGUsIGNsYXNzTmFtZV0gPSB0eXBlLnNwbGl0KFwiLlwiKTtcblxuXHRcdFx0XHR2YXIgbGlzdGVuZXJzID0gdGhpc1tfXS5ibGlzcy5saXN0ZW5lcnMgPSB0aGlzW19dLmJsaXNzLmxpc3RlbmVycyB8fCB7fTtcblxuXHRcdFx0XHRmb3IgKHZhciBsdHlwZSBpbiBsaXN0ZW5lcnMpIHtcblx0XHRcdFx0XHRpZiAoIXR5cGUgfHwgbHR5cGUgPT09IHR5cGUpIHtcblx0XHRcdFx0XHRcdC8vIE5vIGZvckVhY2gsIGJlY2F1c2Ugd2XigJlyZSBtdXRhdGluZyB0aGUgYXJyYXlcblx0XHRcdFx0XHRcdGZvciAodmFyIGk9MCwgbDsgbD1saXN0ZW5lcnNbbHR5cGVdW2ldOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKCghY2xhc3NOYW1lIHx8IGNsYXNzTmFtZSA9PT0gbC5jbGFzc05hbWUpICYmXG5cdFx0XHRcdFx0XHRcdCAgICAoIWNhbGxiYWNrIHx8IGNhbGxiYWNrID09PSBsLmNhbGxiYWNrICkpIHsgLy8gVE9ETyB3aGF0IGFib3V0IGNhcHR1cmU/XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGx0eXBlLCBsLmNhbGxiYWNrLCBsLmNhcHR1cmUpO1xuXHRcdFx0XHRcdFx0XHRcdGktLTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Ly8gTm9ybWFsIGV2ZW50IHVuYmluZGluZywgZGVmZXIgdG8gbmF0aXZlIEpTXG5cdFx0XHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG5cdFx0XHR9XG5cdFx0fSwgdGhpcyk7XG5cdH0sIDApXG59O1xuXG4vKlxuICogUHJvcGVydGllcyB3aXRoIGN1c3RvbSBoYW5kbGluZyBpbiAkLnNldCgpXG4gKiBBbHNvIGF2YWlsYWJsZSBhcyBmdW5jdGlvbnMgZGlyZWN0bHkgb24gZWxlbWVudC5fIGFuZCBvbiAkXG4gKi9cbiQuc2V0UHJvcHMgPSB7XG5cdC8vIFNldCBhIGJ1bmNoIG9mIGlubGluZSBDU1Mgc3R5bGVzXG5cdHN0eWxlOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0JC5leHRlbmQodGhpcy5zdHlsZSwgdmFsKTtcblx0fSxcblxuXHQvLyBTZXQgYSBidW5jaCBvZiBhdHRyaWJ1dGVzXG5cdGF0dHJpYnV0ZXM6IGZ1bmN0aW9uIChvKSB7XG5cdFx0Zm9yICh2YXIgYXR0cmlidXRlIGluIG8pIHtcblx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgb1thdHRyaWJ1dGVdKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gU2V0IGEgYnVuY2ggb2YgcHJvcGVydGllcyBvbiB0aGUgZWxlbWVudFxuXHRwcm9wZXJ0aWVzOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0JC5leHRlbmQodGhpcywgdmFsKTtcblx0fSxcblxuXHQvLyBCaW5kIG9uZSBvciBtb3JlIGV2ZW50cyB0byB0aGUgZWxlbWVudFxuXHRldmVudHM6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRpZiAodmFsICYmIHZhbC5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0XHQvLyBDb3B5IGV2ZW50cyBmcm9tIG90aGVyIGVsZW1lbnQgKHJlcXVpcmVzIEJsaXNzIEZ1bGwpXG5cdFx0XHR2YXIgbWUgPSB0aGlzO1xuXG5cdFx0XHQvLyBDb3B5IGxpc3RlbmVyc1xuXHRcdFx0aWYgKHZhbFtfXSAmJiB2YWxbX10uYmxpc3MpIHtcblx0XHRcdFx0dmFyIGxpc3RlbmVycyA9IHZhbFtfXS5ibGlzcy5saXN0ZW5lcnM7XG5cblx0XHRcdFx0Zm9yICh2YXIgdHlwZSBpbiBsaXN0ZW5lcnMpIHtcblx0XHRcdFx0XHRsaXN0ZW5lcnNbdHlwZV0uZm9yRWFjaChmdW5jdGlvbihsKSB7XG5cdFx0XHRcdFx0XHRtZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGwuY2FsbGJhY2ssIGwuY2FwdHVyZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29weSBpbmxpbmUgZXZlbnRzXG5cdFx0XHRmb3IgKHZhciBvbmV2ZW50IGluIHZhbCkge1xuXHRcdFx0XHRpZiAob25ldmVudC5pbmRleE9mKFwib25cIikgPT09IDApIHtcblx0XHRcdFx0XHR0aGlzW29uZXZlbnRdID0gdmFsW29uZXZlbnRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmICQudHlwZSh2YWwpID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHR2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMV0sIGNhcHR1cmUgPSBhcmd1bWVudHNbMl07XG5cblx0XHRcdHZhbC5zcGxpdCgvXFxzKy8pLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuXHRcdFx0fSwgdGhpcyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Zm9yICh2YXIgZXZlbnRzIGluIHZhbCkge1xuXHRcdFx0XHQkLmV2ZW50cyh0aGlzLCBldmVudHMsIHZhbFtldmVudHNdKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0b25jZTogb3ZlcmxvYWQoZnVuY3Rpb24oZXZlbnRzLCBjYWxsYmFjaykge1xuXHRcdGV2ZW50cyA9IGV2ZW50cy5zcGxpdCgvXFxzKy8pO1xuXHRcdHZhciBtZSA9IHRoaXM7XG5cdFx0dmFyIG9uY2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdG1lLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIG9uY2UpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBjYWxsYmFjay5hcHBseShtZSwgYXJndW1lbnRzKTtcblx0XHR9O1xuXG5cdFx0ZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRtZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBvbmNlKTtcblx0XHR9KTtcblx0fSwgMCksXG5cblx0Ly8gRXZlbnQgZGVsZWdhdGlvblxuXHRkZWxlZ2F0ZTogb3ZlcmxvYWQoZnVuY3Rpb24gKHR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmdW5jdGlvbihldnQpIHtcblx0XHRcdGlmIChldnQudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcywgZXZ0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSwgMCwgMiksXG5cblx0Ly8gU2V0IHRoZSBjb250ZW50cyBhcyBhIHN0cmluZywgYW4gZWxlbWVudCwgYW4gb2JqZWN0IHRvIGNyZWF0ZSBhbiBlbGVtZW50IG9yIGFuIGFycmF5IG9mIHRoZXNlXG5cdGNvbnRlbnRzOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0aWYgKHZhbCB8fCB2YWwgPT09IDApIHtcblx0XHRcdChBcnJheS5pc0FycmF5KHZhbCk/IHZhbCA6IFt2YWxdKS5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuXHRcdFx0XHR2YXIgdHlwZSA9ICQudHlwZShjaGlsZCk7XG5cblx0XHRcdFx0aWYgKC9eKHN0cmluZ3xudW1iZXIpJC8udGVzdCh0eXBlKSkge1xuXHRcdFx0XHRcdGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQgKyBcIlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdFx0Y2hpbGQgPSAkLmNyZWF0ZShjaGlsZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY2hpbGQgaW5zdGFuY2VvZiBOb2RlKSB7XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRDaGlsZChjaGlsZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRoaXMpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBBcHBlbmQgdGhlIGVsZW1lbnQgaW5zaWRlIGFub3RoZXIgZWxlbWVudFxuXHRpbnNpZGU6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0ZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzKTtcblx0fSxcblxuXHQvLyBJbnNlcnQgdGhlIGVsZW1lbnQgYmVmb3JlIGFub3RoZXIgZWxlbWVudFxuXHRiZWZvcmU6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0ZWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLCBlbGVtZW50KTtcblx0fSxcblxuXHQvLyBJbnNlcnQgdGhlIGVsZW1lbnQgYWZ0ZXIgYW5vdGhlciBlbGVtZW50XG5cdGFmdGVyOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdGVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcywgZWxlbWVudC5uZXh0U2libGluZyk7XG5cdH0sXG5cblx0Ly8gSW5zZXJ0IHRoZSBlbGVtZW50IGJlZm9yZSBhbm90aGVyIGVsZW1lbnQncyBjb250ZW50c1xuXHRzdGFydDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRlbGVtZW50Lmluc2VydEJlZm9yZSh0aGlzLCBlbGVtZW50LmZpcnN0Q2hpbGQpO1xuXHR9LFxuXG5cdC8vIFdyYXAgdGhlIGVsZW1lbnQgYXJvdW5kIGFub3RoZXIgZWxlbWVudFxuXHRhcm91bmQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0aWYgKGVsZW1lbnQucGFyZW50Tm9kZSkge1xuXHRcdFx0JC5iZWZvcmUodGhpcywgZWxlbWVudCk7XG5cdFx0fVxuXG5cdFx0KC9edGVtcGxhdGUkL2kudGVzdCh0aGlzLm5vZGVOYW1lKT8gdGhpcy5jb250ZW50IHx8IHRoaXMgOiB0aGlzKS5hcHBlbmRDaGlsZChlbGVtZW50KTtcblx0fVxufTtcblxuJC5BcnJheSA9IGZ1bmN0aW9uIChzdWJqZWN0KSB7XG5cdHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG59O1xuXG4kLkFycmF5LnByb3RvdHlwZSA9IHtcblx0YWxsOiBmdW5jdGlvbihtZXRob2QpIHtcblx0XHR2YXIgYXJncyA9ICQkKGFyZ3VtZW50cykuc2xpY2UoMSk7XG5cblx0XHRyZXR1cm4gdGhpc1ttZXRob2RdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9XG59O1xuXG4vLyBFeHRlbmRzIEJsaXNzIHdpdGggbW9yZSBtZXRob2RzXG4kLmFkZCA9IG92ZXJsb2FkKGZ1bmN0aW9uKG1ldGhvZCwgY2FsbGJhY2ssIG9uLCBub092ZXJ3cml0ZSkge1xuXHRvbiA9ICQuZXh0ZW5kKHskOiB0cnVlLCBlbGVtZW50OiB0cnVlLCBhcnJheTogdHJ1ZX0sIG9uKTtcblxuXHRpZiAoJC50eXBlKGNhbGxiYWNrKSA9PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRpZiAob24uZWxlbWVudCAmJiAoIShtZXRob2QgaW4gJC5FbGVtZW50LnByb3RvdHlwZSkgfHwgIW5vT3ZlcndyaXRlKSkge1xuXHRcdFx0JC5FbGVtZW50LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5zdWJqZWN0ICYmICQuZGVmaW5lZChjYWxsYmFjay5hcHBseSh0aGlzLnN1YmplY3QsIGFyZ3VtZW50cyksIHRoaXMuc3ViamVjdCk7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmIChvbi5hcnJheSAmJiAoIShtZXRob2QgaW4gJC5BcnJheS5wcm90b3R5cGUpIHx8ICFub092ZXJ3cml0ZSkpIHtcblx0XHRcdCQuQXJyYXkucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0XHRcdHJldHVybiB0aGlzLnN1YmplY3QubWFwKGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudCAmJiAkLmRlZmluZWQoY2FsbGJhY2suYXBwbHkoZWxlbWVudCwgYXJncyksIGVsZW1lbnQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKG9uLiQpIHtcblx0XHRcdCQuc291cmNlc1ttZXRob2RdID0gJFttZXRob2RdID0gY2FsbGJhY2s7XG5cblx0XHRcdGlmIChvbi5hcnJheSB8fCBvbi5lbGVtZW50KSB7XG5cdFx0XHRcdCRbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgYXJncyA9IFtdLnNsaWNlLmFwcGx5KGFyZ3VtZW50cyk7XG5cdFx0XHRcdFx0dmFyIHN1YmplY3QgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHRcdFx0dmFyIFR5cGUgPSBvbi5hcnJheSAmJiBBcnJheS5pc0FycmF5KHN1YmplY3QpPyBcIkFycmF5XCIgOiBcIkVsZW1lbnRcIjtcblxuXHRcdFx0XHRcdHJldHVybiAkW1R5cGVdLnByb3RvdHlwZVttZXRob2RdLmFwcGx5KHtzdWJqZWN0OiBzdWJqZWN0fSwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59LCAwKTtcblxuJC5hZGQoJC5BcnJheS5wcm90b3R5cGUsIHtlbGVtZW50OiBmYWxzZX0pO1xuJC5hZGQoJC5FbGVtZW50LnByb3RvdHlwZSk7XG4kLmFkZCgkLnNldFByb3BzKTtcbiQuYWRkKCQuY2xhc3NQcm9wcywge2VsZW1lbnQ6IGZhbHNlLCBhcnJheTogZmFsc2V9KTtcblxuLy8gQWRkIG5hdGl2ZSBtZXRob2RzIG9uICQgYW5kIF9cbnZhciBkdW1teSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpO1xuJC5hZGQoJC5leHRlbmQoe30sIEhUTUxFbGVtZW50LnByb3RvdHlwZSwgZnVuY3Rpb24obWV0aG9kKSB7XG5cdHJldHVybiAkLnR5cGUoZHVtbXlbbWV0aG9kXSkgPT09IFwiZnVuY3Rpb25cIjtcbn0pLCBudWxsLCB0cnVlKTtcblxuXG59KSgpO1xuXG4oZnVuY3Rpb24oJCkge1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICghQmxpc3MgfHwgQmxpc3Muc2h5KSB7XG5cdHJldHVybjtcbn1cblxudmFyIF8gPSBCbGlzcy5wcm9wZXJ0eTtcblxuLy8gTWV0aG9kcyByZXF1aXJpbmcgQmxpc3MgRnVsbFxuJC5hZGQoe1xuXHQvLyBDbG9uZSBlbGVtZW50cywgd2l0aCBldmVudHMgYW5kIGRhdGFcblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgY2xvbmUgPSB0aGlzLmNsb25lTm9kZSh0cnVlKTtcblx0XHR2YXIgZGVzY2VuZGFudHMgPSAkLiQoXCIqXCIsIGNsb25lKS5jb25jYXQoY2xvbmUpO1xuXG5cdFx0JC4kKFwiKlwiLCB0aGlzKS5jb25jYXQodGhpcykuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpLCBhcnIpIHtcblx0XHRcdCQuZXZlbnRzKGRlc2NlbmRhbnRzW2ldLCBlbGVtZW50KTtcblx0XHRcdGRlc2NlbmRhbnRzW2ldLl8uZGF0YSA9ICQuZXh0ZW5kKHt9LCBlbGVtZW50Ll8uZGF0YSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gY2xvbmU7XG5cdH1cbn0sIHthcnJheTogZmFsc2V9KTtcblxuLy8gRGVmaW5lIHRoZSBfIHByb3BlcnR5IG9uIGFycmF5cyBhbmQgZWxlbWVudHNcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KE5vZGUucHJvdG90eXBlLCBfLCB7XG5cdC8vIFdyaXR0ZW4gZm9yIElFIGNvbXBhdGFiaWxpdHkgKHNlZSAjNDkpXG5cdGdldDogZnVuY3Rpb24gZ2V0dGVyICgpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoTm9kZS5wcm90b3R5cGUsIF8sIHtcblx0XHRcdGdldDogdW5kZWZpbmVkXG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIF8sIHtcblx0XHRcdHZhbHVlOiBuZXcgJC5FbGVtZW50KHRoaXMpXG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KE5vZGUucHJvdG90eXBlLCBfLCB7XG5cdFx0XHRnZXQ6IGdldHRlclxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzW19dO1xuXHR9LFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCBfLCB7XG5cdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBfLCB7XG5cdFx0XHR2YWx1ZTogbmV3ICQuQXJyYXkodGhpcylcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzW19dO1xuXHR9LFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG4vLyBIaWphY2sgYWRkRXZlbnRMaXN0ZW5lciBhbmQgcmVtb3ZlRXZlbnRMaXN0ZW5lciB0byBzdG9yZSBjYWxsYmFja3NcblxuaWYgKHNlbGYuRXZlbnRUYXJnZXQgJiYgXCJhZGRFdmVudExpc3RlbmVyXCIgaW4gRXZlbnRUYXJnZXQucHJvdG90eXBlKSB7XG5cdHZhciBhZGRFdmVudExpc3RlbmVyID0gRXZlbnRUYXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIsXG5cdCAgICByZW1vdmVFdmVudExpc3RlbmVyID0gRXZlbnRUYXJnZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIsXG5cdCAgICBlcXVhbCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBjYXB0dXJlLCBsKSB7XG5cdFx0XHRyZXR1cm4gbC5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgbC5jYXB0dXJlID09IGNhcHR1cmU7XG5cdCAgICB9LFxuXHQgICAgbm90RXF1YWwgPSBmdW5jdGlvbigpIHsgXG5cdFx0XHRyZXR1cm4gIWVxdWFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IFxuXHRcdH07XG5cblx0RXZlbnRUYXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSkge1xuXHRcdGlmICh0aGlzICYmIHRoaXNbX10gJiYgdGhpc1tfXS5ibGlzcyAmJiBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGxpc3RlbmVycyA9IHRoaXNbX10uYmxpc3MubGlzdGVuZXJzID0gdGhpc1tfXS5ibGlzcy5saXN0ZW5lcnMgfHwge307XG5cblx0XHRcdGlmICh0eXBlLmluZGV4T2YoXCIuXCIpID4gLTEpIHtcblx0XHRcdFx0dHlwZSA9IHR5cGUuc3BsaXQoXCIuXCIpO1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gdHlwZVsxXTtcblx0XHRcdFx0dHlwZSA9IHR5cGVbMF07XG5cdFx0XHR9XG5cblx0XHRcdGxpc3RlbmVyc1t0eXBlXSA9IGxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuXHRcdFx0aWYgKGxpc3RlbmVyc1t0eXBlXS5maWx0ZXIoZXF1YWwuYmluZChudWxsLCBjYWxsYmFjaywgY2FwdHVyZSkpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRsaXN0ZW5lcnNbdHlwZV0ucHVzaCh7Y2FsbGJhY2s6IGNhbGxiYWNrLCBjYXB0dXJlOiBjYXB0dXJlLCBjbGFzc05hbWU6IGNsYXNzTmFtZX0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBhZGRFdmVudExpc3RlbmVyLmNhbGwodGhpcywgdHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuXHR9O1xuXG5cdEV2ZW50VGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpIHtcblx0XHRpZiAodGhpcyAmJiB0aGlzW19dICYmIHRoaXNbX10uYmxpc3MgICYmIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgbGlzdGVuZXJzID0gdGhpc1tfXS5ibGlzcy5saXN0ZW5lcnMgPSB0aGlzW19dLmJsaXNzLmxpc3RlbmVycyB8fCB7fTtcblxuXHRcdFx0aWYgKGxpc3RlbmVyc1t0eXBlXSkge1xuXHRcdFx0XHRsaXN0ZW5lcnNbdHlwZV0gPSBsaXN0ZW5lcnNbdHlwZV0uZmlsdGVyKG5vdEVxdWFsLmJpbmQobnVsbCwgY2FsbGJhY2ssIGNhcHR1cmUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVtb3ZlRXZlbnRMaXN0ZW5lci5jYWxsKHRoaXMsIHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKTtcblx0fTtcbn1cblxuLy8gU2V0ICQgYW5kICQkIGNvbnZlbmllbmNlIG1ldGhvZHMsIGlmIG5vdCB0YWtlblxuc2VsZi4kID0gc2VsZi4kIHx8ICQ7XG5zZWxmLiQkID0gc2VsZi4kJCB8fCAkLiQ7XG5cbn0pKEJsaXNzKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JsaXNzZnVsanMvYmxpc3MuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0ICogZnJvbSAnLi9kb20tcmVhZHknO1xuZXhwb3J0ICogZnJvbSAnLi9oYXMtY2xhc3MnO1xuZXhwb3J0ICogZnJvbSAnLi90b2dnbGUtY2xhc3MnO1xuZXhwb3J0ICogZnJvbSAnLi9ldmVudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9jbG9zZXN0LXBhcmVudCc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2pzL3NoYXJlZC9taXNjL2luZGV4LmpzIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIl0sInNvdXJjZVJvb3QiOiIifQ==