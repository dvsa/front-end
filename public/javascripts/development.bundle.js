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
/******/ 	return __webpack_require__(__webpack_require__.s = 251);
/******/ })
/************************************************************************/
/******/ ({

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(252);

__webpack_require__(253);

__webpack_require__(254);

__webpack_require__(255);

__webpack_require__(51);

var _misc = __webpack_require__(5);

var _modules = __webpack_require__(256);

(0, _misc.domReady)(function () {
  new _modules.initModules();
});

/***/ }),

/***/ 252:
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

/***/ 253:
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

/***/ 254:
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

/***/ 255:
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

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initModules = undefined;

var _libraryPageNavigation = __webpack_require__(257);

var initModules = exports.initModules = function initModules() {
  new _libraryPageNavigation.LibraryPageNavigation();
};

/***/ }),

/***/ 257:
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

    // Check if elements exist
    if (!this.navigation || !this.libraryContainerElement) return;

    // Get elements
    this.mobileNavigationContainer = document.querySelector('.' + this.mobileNavigationClassName);
    this.navigationInner = this.navigation.querySelector('.' + this.navigationInnerClassName);
    this.content = document.getElementById(this.contentId);

    // Check if elements exist
    if (!this.mobileNavigationContainer) {
      return console.warn('Mobile navigation container not found');
    }

    if (!this.navigationInner) {
      return console.warn('Navigation inner not found');
    }

    if (!this.content) {
      return console.warn('Library content not found');
    }

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

/***/ 29:
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

/***/ 30:
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

/***/ 31:
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

/***/ 32:
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

/***/ 33:
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

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domReady = __webpack_require__(29);

Object.keys(_domReady).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _domReady[key];
    }
  });
});

var _hasClass = __webpack_require__(30);

Object.keys(_hasClass).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hasClass[key];
    }
  });
});

var _toggleClass = __webpack_require__(31);

Object.keys(_toggleClass).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _toggleClass[key];
    }
  });
});

var _events = __webpack_require__(32);

Object.keys(_events).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _events[key];
    }
  });
});

var _closestParent = __webpack_require__(33);

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

/***/ 51:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjY3MzZiYjE2ZTY1ZWYzZDljOTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9kZXZlbG9wbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJpc21qcy9wcmlzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJpc21qcy9wbHVnaW5zL3Rvb2xiYXIvcHJpc20tdG9vbGJhci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJpc21qcy9wbHVnaW5zL25vcm1hbGl6ZS13aGl0ZXNwYWNlL3ByaXNtLW5vcm1hbGl6ZS13aGl0ZXNwYWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcmlzbWpzL3BsdWdpbnMvbGluZS1udW1iZXJzL3ByaXNtLWxpbmUtbnVtYmVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2pzL2RldmVsb3BtZW50L21vZHVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9kZXZlbG9wbWVudC9tb2R1bGVzL2xpYnJhcnktcGFnZS1uYXZpZ2F0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvZG9tLXJlYWR5LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvaGFzLWNsYXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvdG9nZ2xlLWNsYXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvY2xvc2VzdC1wYXJlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9zaGFyZWQvbWlzYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmxpc3NmdWxqcy9ibGlzcy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIl0sIm5hbWVzIjpbImluaXRNb2R1bGVzIiwiTGlicmFyeVBhZ2VOYXZpZ2F0aW9uIiwicmVpemVIYW5kbGVyIiwiaW5pdFNpZGViYXIiLCJtb2JpbGVOYXZpZ2F0aW9uQ2xpY2tIYW5kbGVyIiwibmF2aWdhdGlvbklubmVyIiwibmF2aWdhdGlvbklubmVyT3BlbkNsYXNzTmFtZSIsInNpZGViYXIiLCJtYXhXaWR0aCIsIm5hdmlnYXRpb25JZCIsIm5hdmlnYXRpb25Jbm5lckNsYXNzTmFtZSIsImNvbnRlbnRJZCIsIm1vYmlsZU5hdmlnYXRpb25DbGFzc05hbWUiLCJtb2JpbGVOYXZpZ2F0aW9uQ29udGFpbmVyQ2xhc3NOYW1lIiwibGlicmFyeUNvbnRhaW5lcklkIiwibGlicmFyeUNvbnRhaW5lckVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibmF2aWdhdGlvbiIsIm1vYmlsZU5hdmlnYXRpb25Db250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsImNvbnNvbGUiLCJ3YXJuIiwic2V0dXAiLCIkIiwiZXZlbnRzIiwid2luZG93IiwicmVzaXplIiwiZGVsZWdhdGUiLCJpbm5lcldpZHRoIiwiZG9tUmVhZHkiLCJmbiIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJlbEhhc0NsYXNzIiwiZWwiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIlJlZ0V4cCIsInRlc3QiLCJ0b2dnbGVDbGFzcyIsImZvcmNlIiwidG9nZ2xlIiwiY2xhc3NlcyIsInNwbGl0IiwiZXhpc3RpbmdJbmRleCIsImkiLCJsZW5ndGgiLCJzcGxpY2UiLCJwdXNoIiwiam9pbiIsImFkZEV2ZW50TGlzdGVuZXJUb0VsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lckZyb21FbCIsInJlbW92ZUFsbEV2ZW50c0Zyb21FbCIsImV2ZW50TmFtZSIsImhhbmRsZXIiLCJjYWxsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRldGFjaEV2ZW50IiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwiY2xvc2VzdFBhcmVudE9mRWwiLCJtYXRjaGVzIiwib3duZXJEb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpdGVtIiwicGFyZW50RWxlbWVudCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzdEQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQSxvQkFBUyxZQUFXO0FBQ2xCO0FBQ0QsQ0FGRCxFOzs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKLHNDQUFzQyxzQkFBc0I7QUFDNUQ7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSx3Q0FBd0Msb0JBQW9CO0FBQzVEO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLCtCQUErQix3QkFBd0IsRUFBRTtBQUN6RDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx3QkFBd0IseUJBQXlCO0FBQ2pEO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixxQkFBcUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1Q0FBdUMsbUJBQW1COztBQUUxRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUMsbUVBQW1FO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCQUEwQiwyQkFBMkI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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O0FBQUE7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7Ozs7OztBQ0pBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsWUFBWTs7QUFFWixvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9CQUFvQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7O0FBRUgsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7O0FBRUgsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkNBQTZDLGFBQWE7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBLGtEQUFrRCxhQUFhO0FBQy9EOztBQUVBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVCQUF1QjtBQUM3QztBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0Isb0NBQW9DOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2Q0FBNkMsaUJBQWlCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCwwQkFBMEIsZUFBZTtBQUN6QztBQUNBO0FBQ0EscUJBQXFCLDZCQUE2Qjs7QUFFbEQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLENBQUM7OztBQUdELENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsQ0FBQyxHQUFHLGFBQWE7O0FBRWpCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sNEI7QUFDQSx3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsMEJBQTBCLDJEQUEyRDtBQUNyRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7QUM1ekJEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6ImRldmVsb3BtZW50LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI1MSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjY3MzZiYjE2ZTY1ZWYzZDljOTYiLCJpbXBvcnQgJ3ByaXNtanMnO1xuaW1wb3J0ICdwcmlzbWpzL3BsdWdpbnMvdG9vbGJhci9wcmlzbS10b29sYmFyLmpzJztcbmltcG9ydCAncHJpc21qcy9wbHVnaW5zL25vcm1hbGl6ZS13aGl0ZXNwYWNlL3ByaXNtLW5vcm1hbGl6ZS13aGl0ZXNwYWNlJztcbmltcG9ydCAncHJpc21qcy9wbHVnaW5zL2xpbmUtbnVtYmVycy9wcmlzbS1saW5lLW51bWJlcnMnO1xuaW1wb3J0ICdibGlzc2Z1bGpzJztcblxuaW1wb3J0IHsgZG9tUmVhZHkgfSBmcm9tICcuLy4uL3NoYXJlZC9taXNjJztcbmltcG9ydCB7IGluaXRNb2R1bGVzIH0gZnJvbSAnLi9tb2R1bGVzJztcblxuZG9tUmVhZHkoZnVuY3Rpb24oKSB7XG4gIG5ldyBpbml0TW9kdWxlcygpO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2pzL2RldmVsb3BtZW50L2luZGV4LmpzIiwiXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLWNvcmUuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxudmFyIF9zZWxmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXHQ/IHdpbmRvdyAgIC8vIGlmIGluIGJyb3dzZXJcblx0OiAoXG5cdFx0KHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKVxuXHRcdD8gc2VsZiAvLyBpZiBpbiB3b3JrZXJcblx0XHQ6IHt9ICAgLy8gaWYgaW4gbm9kZSBqc1xuXHQpO1xuXG4vKipcbiAqIFByaXNtOiBMaWdodHdlaWdodCwgcm9idXN0LCBlbGVnYW50IHN5bnRheCBoaWdobGlnaHRpbmdcbiAqIE1JVCBsaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwL1xuICogQGF1dGhvciBMZWEgVmVyb3UgaHR0cDovL2xlYS52ZXJvdS5tZVxuICovXG5cbnZhciBQcmlzbSA9IChmdW5jdGlvbigpe1xuXG4vLyBQcml2YXRlIGhlbHBlciB2YXJzXG52YXIgbGFuZyA9IC9cXGJsYW5nKD86dWFnZSk/LShcXHcrKVxcYi9pO1xudmFyIHVuaXF1ZUlkID0gMDtcblxudmFyIF8gPSBfc2VsZi5QcmlzbSA9IHtcblx0bWFudWFsOiBfc2VsZi5QcmlzbSAmJiBfc2VsZi5QcmlzbS5tYW51YWwsXG5cdGRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcjogX3NlbGYuUHJpc20gJiYgX3NlbGYuUHJpc20uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyLFxuXHR1dGlsOiB7XG5cdFx0ZW5jb2RlOiBmdW5jdGlvbiAodG9rZW5zKSB7XG5cdFx0XHRpZiAodG9rZW5zIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBUb2tlbih0b2tlbnMudHlwZSwgXy51dGlsLmVuY29kZSh0b2tlbnMuY29udGVudCksIHRva2Vucy5hbGlhcyk7XG5cdFx0XHR9IGVsc2UgaWYgKF8udXRpbC50eXBlKHRva2VucykgPT09ICdBcnJheScpIHtcblx0XHRcdFx0cmV0dXJuIHRva2Vucy5tYXAoXy51dGlsLmVuY29kZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdG9rZW5zLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0dHlwZTogZnVuY3Rpb24gKG8pIHtcblx0XHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykubWF0Y2goL1xcW29iamVjdCAoXFx3KylcXF0vKVsxXTtcblx0XHR9LFxuXG5cdFx0b2JqSWQ6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdGlmICghb2JqWydfX2lkJ10pIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19faWQnLCB7IHZhbHVlOiArK3VuaXF1ZUlkIH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9ialsnX19pZCddO1xuXHRcdH0sXG5cblx0XHQvLyBEZWVwIGNsb25lIGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiAoZS5nLiB0byBleHRlbmQgaXQpXG5cdFx0Y2xvbmU6IGZ1bmN0aW9uIChvKSB7XG5cdFx0XHR2YXIgdHlwZSA9IF8udXRpbC50eXBlKG8pO1xuXG5cdFx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdFx0Y2FzZSAnT2JqZWN0Jzpcblx0XHRcdFx0XHR2YXIgY2xvbmUgPSB7fTtcblxuXHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBvKSB7XG5cdFx0XHRcdFx0XHRpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lW2tleV0gPSBfLnV0aWwuY2xvbmUob1trZXldKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gY2xvbmU7XG5cblx0XHRcdFx0Y2FzZSAnQXJyYXknOlxuXHRcdFx0XHRcdHJldHVybiBvLm1hcChmdW5jdGlvbih2KSB7IHJldHVybiBfLnV0aWwuY2xvbmUodik7IH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbztcblx0XHR9XG5cdH0sXG5cblx0bGFuZ3VhZ2VzOiB7XG5cdFx0ZXh0ZW5kOiBmdW5jdGlvbiAoaWQsIHJlZGVmKSB7XG5cdFx0XHR2YXIgbGFuZyA9IF8udXRpbC5jbG9uZShfLmxhbmd1YWdlc1tpZF0pO1xuXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gcmVkZWYpIHtcblx0XHRcdFx0bGFuZ1trZXldID0gcmVkZWZba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGxhbmc7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluc2VydCBhIHRva2VuIGJlZm9yZSBhbm90aGVyIHRva2VuIGluIGEgbGFuZ3VhZ2UgbGl0ZXJhbFxuXHRcdCAqIEFzIHRoaXMgbmVlZHMgdG8gcmVjcmVhdGUgdGhlIG9iamVjdCAod2UgY2Fubm90IGFjdHVhbGx5IGluc2VydCBiZWZvcmUga2V5cyBpbiBvYmplY3QgbGl0ZXJhbHMpLFxuXHRcdCAqIHdlIGNhbm5vdCBqdXN0IHByb3ZpZGUgYW4gb2JqZWN0LCB3ZSBuZWVkIGFub2JqZWN0IGFuZCBhIGtleS5cblx0XHQgKiBAcGFyYW0gaW5zaWRlIFRoZSBrZXkgKG9yIGxhbmd1YWdlIGlkKSBvZiB0aGUgcGFyZW50XG5cdFx0ICogQHBhcmFtIGJlZm9yZSBUaGUga2V5IHRvIGluc2VydCBiZWZvcmUuIElmIG5vdCBwcm92aWRlZCwgdGhlIGZ1bmN0aW9uIGFwcGVuZHMgaW5zdGVhZC5cblx0XHQgKiBAcGFyYW0gaW5zZXJ0IE9iamVjdCB3aXRoIHRoZSBrZXkvdmFsdWUgcGFpcnMgdG8gaW5zZXJ0XG5cdFx0ICogQHBhcmFtIHJvb3QgVGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIGBpbnNpZGVgLiBJZiBlcXVhbCB0byBQcmlzbS5sYW5ndWFnZXMsIGl0IGNhbiBiZSBvbWl0dGVkLlxuXHRcdCAqL1xuXHRcdGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGluc2lkZSwgYmVmb3JlLCBpbnNlcnQsIHJvb3QpIHtcblx0XHRcdHJvb3QgPSByb290IHx8IF8ubGFuZ3VhZ2VzO1xuXHRcdFx0dmFyIGdyYW1tYXIgPSByb290W2luc2lkZV07XG5cblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIpIHtcblx0XHRcdFx0aW5zZXJ0ID0gYXJndW1lbnRzWzFdO1xuXG5cdFx0XHRcdGZvciAodmFyIG5ld1Rva2VuIGluIGluc2VydCkge1xuXHRcdFx0XHRcdGlmIChpbnNlcnQuaGFzT3duUHJvcGVydHkobmV3VG9rZW4pKSB7XG5cdFx0XHRcdFx0XHRncmFtbWFyW25ld1Rva2VuXSA9IGluc2VydFtuZXdUb2tlbl07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGdyYW1tYXI7XG5cdFx0XHR9XG5cblx0XHRcdHZhciByZXQgPSB7fTtcblxuXHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuXG5cdFx0XHRcdGlmIChncmFtbWFyLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuXG5cdFx0XHRcdFx0aWYgKHRva2VuID09IGJlZm9yZSkge1xuXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBuZXdUb2tlbiBpbiBpbnNlcnQpIHtcblxuXHRcdFx0XHRcdFx0XHRpZiAoaW5zZXJ0Lmhhc093blByb3BlcnR5KG5ld1Rva2VuKSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldFtuZXdUb2tlbl0gPSBpbnNlcnRbbmV3VG9rZW5dO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0W3Rva2VuXSA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFVwZGF0ZSByZWZlcmVuY2VzIGluIG90aGVyIGxhbmd1YWdlIGRlZmluaXRpb25zXG5cdFx0XHRfLmxhbmd1YWdlcy5ERlMoXy5sYW5ndWFnZXMsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0aWYgKHZhbHVlID09PSByb290W2luc2lkZV0gJiYga2V5ICE9IGluc2lkZSkge1xuXHRcdFx0XHRcdHRoaXNba2V5XSA9IHJldDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiByb290W2luc2lkZV0gPSByZXQ7XG5cdFx0fSxcblxuXHRcdC8vIFRyYXZlcnNlIGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiB3aXRoIERlcHRoIEZpcnN0IFNlYXJjaFxuXHRcdERGUzogZnVuY3Rpb24obywgY2FsbGJhY2ssIHR5cGUsIHZpc2l0ZWQpIHtcblx0XHRcdHZpc2l0ZWQgPSB2aXNpdGVkIHx8IHt9O1xuXHRcdFx0Zm9yICh2YXIgaSBpbiBvKSB7XG5cdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChvLCBpLCBvW2ldLCB0eXBlIHx8IGkpO1xuXG5cdFx0XHRcdFx0aWYgKF8udXRpbC50eXBlKG9baV0pID09PSAnT2JqZWN0JyAmJiAhdmlzaXRlZFtfLnV0aWwub2JqSWQob1tpXSldKSB7XG5cdFx0XHRcdFx0XHR2aXNpdGVkW18udXRpbC5vYmpJZChvW2ldKV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0Xy5sYW5ndWFnZXMuREZTKG9baV0sIGNhbGxiYWNrLCBudWxsLCB2aXNpdGVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAoXy51dGlsLnR5cGUob1tpXSkgPT09ICdBcnJheScgJiYgIXZpc2l0ZWRbXy51dGlsLm9iaklkKG9baV0pXSkge1xuXHRcdFx0XHRcdFx0dmlzaXRlZFtfLnV0aWwub2JqSWQob1tpXSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhvW2ldLCBjYWxsYmFjaywgaSwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRwbHVnaW5zOiB7fSxcblxuXHRoaWdobGlnaHRBbGw6IGZ1bmN0aW9uKGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdHZhciBlbnYgPSB7XG5cdFx0XHRjYWxsYmFjazogY2FsbGJhY2ssXG5cdFx0XHRzZWxlY3RvcjogJ2NvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdLCBbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIGNvZGUsIGNvZGVbY2xhc3MqPVwibGFuZy1cIl0sIFtjbGFzcyo9XCJsYW5nLVwiXSBjb2RlJ1xuXHRcdH07XG5cblx0XHRfLmhvb2tzLnJ1bihcImJlZm9yZS1oaWdobGlnaHRhbGxcIiwgZW52KTtcblxuXHRcdHZhciBlbGVtZW50cyA9IGVudi5lbGVtZW50cyB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVudi5zZWxlY3Rvcik7XG5cblx0XHRmb3IgKHZhciBpPTAsIGVsZW1lbnQ7IGVsZW1lbnQgPSBlbGVtZW50c1tpKytdOykge1xuXHRcdFx0Xy5oaWdobGlnaHRFbGVtZW50KGVsZW1lbnQsIGFzeW5jID09PSB0cnVlLCBlbnYuY2FsbGJhY2spO1xuXHRcdH1cblx0fSxcblxuXHRoaWdobGlnaHRFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50LCBhc3luYywgY2FsbGJhY2spIHtcblx0XHQvLyBGaW5kIGxhbmd1YWdlXG5cdFx0dmFyIGxhbmd1YWdlLCBncmFtbWFyLCBwYXJlbnQgPSBlbGVtZW50O1xuXG5cdFx0d2hpbGUgKHBhcmVudCAmJiAhbGFuZy50ZXN0KHBhcmVudC5jbGFzc05hbWUpKSB7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRpZiAocGFyZW50KSB7XG5cdFx0XHRsYW5ndWFnZSA9IChwYXJlbnQuY2xhc3NOYW1lLm1hdGNoKGxhbmcpIHx8IFssJyddKVsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0Z3JhbW1hciA9IF8ubGFuZ3VhZ2VzW2xhbmd1YWdlXTtcblx0XHR9XG5cblx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIGVsZW1lbnQsIGlmIG5vdCBwcmVzZW50XG5cdFx0ZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcblxuXHRcdGlmIChlbGVtZW50LnBhcmVudE5vZGUpIHtcblx0XHRcdC8vIFNldCBsYW5ndWFnZSBvbiB0aGUgcGFyZW50LCBmb3Igc3R5bGluZ1xuXHRcdFx0cGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXG5cdFx0XHRpZiAoL3ByZS9pLnRlc3QocGFyZW50Lm5vZGVOYW1lKSkge1xuXHRcdFx0XHRwYXJlbnQuY2xhc3NOYW1lID0gcGFyZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgY29kZSA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XG5cblx0XHR2YXIgZW52ID0ge1xuXHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZSxcblx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRjb2RlOiBjb2RlXG5cdFx0fTtcblxuXHRcdF8uaG9va3MucnVuKCdiZWZvcmUtc2FuaXR5LWNoZWNrJywgZW52KTtcblxuXHRcdGlmICghZW52LmNvZGUgfHwgIWVudi5ncmFtbWFyKSB7XG5cdFx0XHRpZiAoZW52LmNvZGUpIHtcblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1oaWdobGlnaHQnLCBlbnYpO1xuXHRcdFx0XHRlbnYuZWxlbWVudC50ZXh0Q29udGVudCA9IGVudi5jb2RlO1xuXHRcdFx0XHRfLmhvb2tzLnJ1bignYWZ0ZXItaGlnaGxpZ2h0JywgZW52KTtcblx0XHRcdH1cblx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1oaWdobGlnaHQnLCBlbnYpO1xuXG5cdFx0aWYgKGFzeW5jICYmIF9zZWxmLldvcmtlcikge1xuXHRcdFx0dmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoXy5maWxlbmFtZSk7XG5cblx0XHRcdHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0ZW52LmhpZ2hsaWdodGVkQ29kZSA9IGV2dC5kYXRhO1xuXG5cdFx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaW5zZXJ0JywgZW52KTtcblxuXHRcdFx0XHRlbnYuZWxlbWVudC5pbm5lckhUTUwgPSBlbnYuaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdFx0XHRfLmhvb2tzLnJ1bignYWZ0ZXItaGlnaGxpZ2h0JywgZW52KTtcblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2NvbXBsZXRlJywgZW52KTtcblx0XHRcdH07XG5cblx0XHRcdHdvcmtlci5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGxhbmd1YWdlOiBlbnYubGFuZ3VhZ2UsXG5cdFx0XHRcdGNvZGU6IGVudi5jb2RlLFxuXHRcdFx0XHRpbW1lZGlhdGVDbG9zZTogdHJ1ZVxuXHRcdFx0fSkpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGVudi5oaWdobGlnaHRlZENvZGUgPSBfLmhpZ2hsaWdodChlbnYuY29kZSwgZW52LmdyYW1tYXIsIGVudi5sYW5ndWFnZSk7XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaW5zZXJ0JywgZW52KTtcblxuXHRcdFx0ZW52LmVsZW1lbnQuaW5uZXJIVE1MID0gZW52LmhpZ2hsaWdodGVkQ29kZTtcblxuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChlbGVtZW50KTtcblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLWhpZ2hsaWdodCcsIGVudik7XG5cdFx0XHRfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuXHRcdH1cblx0fSxcblxuXHRoaWdobGlnaHQ6IGZ1bmN0aW9uICh0ZXh0LCBncmFtbWFyLCBsYW5ndWFnZSkge1xuXHRcdHZhciB0b2tlbnMgPSBfLnRva2VuaXplKHRleHQsIGdyYW1tYXIpO1xuXHRcdHJldHVybiBUb2tlbi5zdHJpbmdpZnkoXy51dGlsLmVuY29kZSh0b2tlbnMpLCBsYW5ndWFnZSk7XG5cdH0sXG5cblx0bWF0Y2hHcmFtbWFyOiBmdW5jdGlvbiAodGV4dCwgc3RyYXJyLCBncmFtbWFyLCBpbmRleCwgc3RhcnRQb3MsIG9uZXNob3QsIHRhcmdldCkge1xuXHRcdHZhciBUb2tlbiA9IF8uVG9rZW47XG5cblx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRpZighZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikgfHwgIWdyYW1tYXJbdG9rZW5dKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodG9rZW4gPT0gdGFyZ2V0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHBhdHRlcm5zID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRwYXR0ZXJucyA9IChfLnV0aWwudHlwZShwYXR0ZXJucykgPT09IFwiQXJyYXlcIikgPyBwYXR0ZXJucyA6IFtwYXR0ZXJuc107XG5cblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgcGF0dGVybnMubGVuZ3RoOyArK2opIHtcblx0XHRcdFx0dmFyIHBhdHRlcm4gPSBwYXR0ZXJuc1tqXSxcblx0XHRcdFx0XHRpbnNpZGUgPSBwYXR0ZXJuLmluc2lkZSxcblx0XHRcdFx0XHRsb29rYmVoaW5kID0gISFwYXR0ZXJuLmxvb2tiZWhpbmQsXG5cdFx0XHRcdFx0Z3JlZWR5ID0gISFwYXR0ZXJuLmdyZWVkeSxcblx0XHRcdFx0XHRsb29rYmVoaW5kTGVuZ3RoID0gMCxcblx0XHRcdFx0XHRhbGlhcyA9IHBhdHRlcm4uYWxpYXM7XG5cblx0XHRcdFx0aWYgKGdyZWVkeSAmJiAhcGF0dGVybi5wYXR0ZXJuLmdsb2JhbCkge1xuXHRcdFx0XHRcdC8vIFdpdGhvdXQgdGhlIGdsb2JhbCBmbGFnLCBsYXN0SW5kZXggd29uJ3Qgd29ya1xuXHRcdFx0XHRcdHZhciBmbGFncyA9IHBhdHRlcm4ucGF0dGVybi50b1N0cmluZygpLm1hdGNoKC9baW11eV0qJC8pWzBdO1xuXHRcdFx0XHRcdHBhdHRlcm4ucGF0dGVybiA9IFJlZ0V4cChwYXR0ZXJuLnBhdHRlcm4uc291cmNlLCBmbGFncyArIFwiZ1wiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBhdHRlcm4gPSBwYXR0ZXJuLnBhdHRlcm4gfHwgcGF0dGVybjtcblxuXHRcdFx0XHQvLyBEb27igJl0IGNhY2hlIGxlbmd0aCBhcyBpdCBjaGFuZ2VzIGR1cmluZyB0aGUgbG9vcFxuXHRcdFx0XHRmb3IgKHZhciBpID0gaW5kZXgsIHBvcyA9IHN0YXJ0UG9zOyBpIDwgc3RyYXJyLmxlbmd0aDsgcG9zICs9IHN0cmFycltpXS5sZW5ndGgsICsraSkge1xuXG5cdFx0XHRcdFx0dmFyIHN0ciA9IHN0cmFycltpXTtcblxuXHRcdFx0XHRcdGlmIChzdHJhcnIubGVuZ3RoID4gdGV4dC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdC8vIFNvbWV0aGluZyB3ZW50IHRlcnJpYmx5IHdyb25nLCBBQk9SVCwgQUJPUlQhXG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHN0ciBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRwYXR0ZXJuLmxhc3RJbmRleCA9IDA7XG5cblx0XHRcdFx0XHR2YXIgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWMoc3RyKSxcblx0XHRcdFx0XHQgICAgZGVsTnVtID0gMTtcblxuXHRcdFx0XHRcdC8vIEdyZWVkeSBwYXR0ZXJucyBjYW4gb3ZlcnJpZGUvcmVtb3ZlIHVwIHRvIHR3byBwcmV2aW91c2x5IG1hdGNoZWQgdG9rZW5zXG5cdFx0XHRcdFx0aWYgKCFtYXRjaCAmJiBncmVlZHkgJiYgaSAhPSBzdHJhcnIubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRcdFx0cGF0dGVybi5sYXN0SW5kZXggPSBwb3M7XG5cdFx0XHRcdFx0XHRtYXRjaCA9IHBhdHRlcm4uZXhlYyh0ZXh0KTtcblx0XHRcdFx0XHRcdGlmICghbWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBmcm9tID0gbWF0Y2guaW5kZXggKyAobG9va2JlaGluZCA/IG1hdGNoWzFdLmxlbmd0aCA6IDApLFxuXHRcdFx0XHRcdFx0ICAgIHRvID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgsXG5cdFx0XHRcdFx0XHQgICAgayA9IGksXG5cdFx0XHRcdFx0XHQgICAgcCA9IHBvcztcblxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgbGVuID0gc3RyYXJyLmxlbmd0aDsgayA8IGxlbiAmJiAocCA8IHRvIHx8ICghc3RyYXJyW2tdLnR5cGUgJiYgIXN0cmFycltrIC0gMV0uZ3JlZWR5KSk7ICsraykge1xuXHRcdFx0XHRcdFx0XHRwICs9IHN0cmFycltrXS5sZW5ndGg7XG5cdFx0XHRcdFx0XHRcdC8vIE1vdmUgdGhlIGluZGV4IGkgdG8gdGhlIGVsZW1lbnQgaW4gc3RyYXJyIHRoYXQgaXMgY2xvc2VzdCB0byBmcm9tXG5cdFx0XHRcdFx0XHRcdGlmIChmcm9tID49IHApIHtcblx0XHRcdFx0XHRcdFx0XHQrK2k7XG5cdFx0XHRcdFx0XHRcdFx0cG9zID0gcDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0ICogSWYgc3RyYXJyW2ldIGlzIGEgVG9rZW4sIHRoZW4gdGhlIG1hdGNoIHN0YXJ0cyBpbnNpZGUgYW5vdGhlciBUb2tlbiwgd2hpY2ggaXMgaW52YWxpZFxuXHRcdFx0XHRcdFx0ICogSWYgc3RyYXJyW2sgLSAxXSBpcyBncmVlZHkgd2UgYXJlIGluIGNvbmZsaWN0IHdpdGggYW5vdGhlciBncmVlZHkgcGF0dGVyblxuXHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRpZiAoc3RyYXJyW2ldIGluc3RhbmNlb2YgVG9rZW4gfHwgc3RyYXJyW2sgLSAxXS5ncmVlZHkpIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE51bWJlciBvZiB0b2tlbnMgdG8gZGVsZXRlIGFuZCByZXBsYWNlIHdpdGggdGhlIG5ldyBtYXRjaFxuXHRcdFx0XHRcdFx0ZGVsTnVtID0gayAtIGk7XG5cdFx0XHRcdFx0XHRzdHIgPSB0ZXh0LnNsaWNlKHBvcywgcCk7XG5cdFx0XHRcdFx0XHRtYXRjaC5pbmRleCAtPSBwb3M7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0XHRcdFx0aWYgKG9uZXNob3QpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKGxvb2tiZWhpbmQpIHtcblx0XHRcdFx0XHRcdGxvb2tiZWhpbmRMZW5ndGggPSBtYXRjaFsxXS5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleCArIGxvb2tiZWhpbmRMZW5ndGgsXG5cdFx0XHRcdFx0ICAgIG1hdGNoID0gbWF0Y2hbMF0uc2xpY2UobG9va2JlaGluZExlbmd0aCksXG5cdFx0XHRcdFx0ICAgIHRvID0gZnJvbSArIG1hdGNoLmxlbmd0aCxcblx0XHRcdFx0XHQgICAgYmVmb3JlID0gc3RyLnNsaWNlKDAsIGZyb20pLFxuXHRcdFx0XHRcdCAgICBhZnRlciA9IHN0ci5zbGljZSh0byk7XG5cblx0XHRcdFx0XHR2YXIgYXJncyA9IFtpLCBkZWxOdW1dO1xuXG5cdFx0XHRcdFx0aWYgKGJlZm9yZSkge1xuXHRcdFx0XHRcdFx0KytpO1xuXHRcdFx0XHRcdFx0cG9zICs9IGJlZm9yZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHRhcmdzLnB1c2goYmVmb3JlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgd3JhcHBlZCA9IG5ldyBUb2tlbih0b2tlbiwgaW5zaWRlPyBfLnRva2VuaXplKG1hdGNoLCBpbnNpZGUpIDogbWF0Y2gsIGFsaWFzLCBtYXRjaCwgZ3JlZWR5KTtcblxuXHRcdFx0XHRcdGFyZ3MucHVzaCh3cmFwcGVkKTtcblxuXHRcdFx0XHRcdGlmIChhZnRlcikge1xuXHRcdFx0XHRcdFx0YXJncy5wdXNoKGFmdGVyKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KHN0cmFyciwgYXJncyk7XG5cblx0XHRcdFx0XHRpZiAoZGVsTnVtICE9IDEpXG5cdFx0XHRcdFx0XHRfLm1hdGNoR3JhbW1hcih0ZXh0LCBzdHJhcnIsIGdyYW1tYXIsIGksIHBvcywgdHJ1ZSwgdG9rZW4pO1xuXG5cdFx0XHRcdFx0aWYgKG9uZXNob3QpXG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHR0b2tlbml6ZTogZnVuY3Rpb24odGV4dCwgZ3JhbW1hciwgbGFuZ3VhZ2UpIHtcblx0XHR2YXIgc3RyYXJyID0gW3RleHRdO1xuXG5cdFx0dmFyIHJlc3QgPSBncmFtbWFyLnJlc3Q7XG5cblx0XHRpZiAocmVzdCkge1xuXHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gcmVzdCkge1xuXHRcdFx0XHRncmFtbWFyW3Rva2VuXSA9IHJlc3RbdG9rZW5dO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWxldGUgZ3JhbW1hci5yZXN0O1xuXHRcdH1cblxuXHRcdF8ubWF0Y2hHcmFtbWFyKHRleHQsIHN0cmFyciwgZ3JhbW1hciwgMCwgMCwgZmFsc2UpO1xuXG5cdFx0cmV0dXJuIHN0cmFycjtcblx0fSxcblxuXHRob29rczoge1xuXHRcdGFsbDoge30sXG5cblx0XHRhZGQ6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGhvb2tzID0gXy5ob29rcy5hbGw7XG5cblx0XHRcdGhvb2tzW25hbWVdID0gaG9va3NbbmFtZV0gfHwgW107XG5cblx0XHRcdGhvb2tzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cblx0XHRydW46IGZ1bmN0aW9uIChuYW1lLCBlbnYpIHtcblx0XHRcdHZhciBjYWxsYmFja3MgPSBfLmhvb2tzLmFsbFtuYW1lXTtcblxuXHRcdFx0aWYgKCFjYWxsYmFja3MgfHwgIWNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKHZhciBpPTAsIGNhbGxiYWNrOyBjYWxsYmFjayA9IGNhbGxiYWNrc1tpKytdOykge1xuXHRcdFx0XHRjYWxsYmFjayhlbnYpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxudmFyIFRva2VuID0gXy5Ub2tlbiA9IGZ1bmN0aW9uKHR5cGUsIGNvbnRlbnQsIGFsaWFzLCBtYXRjaGVkU3RyLCBncmVlZHkpIHtcblx0dGhpcy50eXBlID0gdHlwZTtcblx0dGhpcy5jb250ZW50ID0gY29udGVudDtcblx0dGhpcy5hbGlhcyA9IGFsaWFzO1xuXHQvLyBDb3B5IG9mIHRoZSBmdWxsIHN0cmluZyB0aGlzIHRva2VuIHdhcyBjcmVhdGVkIGZyb21cblx0dGhpcy5sZW5ndGggPSAobWF0Y2hlZFN0ciB8fCBcIlwiKS5sZW5ndGh8MDtcblx0dGhpcy5ncmVlZHkgPSAhIWdyZWVkeTtcbn07XG5cblRva2VuLnN0cmluZ2lmeSA9IGZ1bmN0aW9uKG8sIGxhbmd1YWdlLCBwYXJlbnQpIHtcblx0aWYgKHR5cGVvZiBvID09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIG87XG5cdH1cblxuXHRpZiAoXy51dGlsLnR5cGUobykgPT09ICdBcnJheScpIHtcblx0XHRyZXR1cm4gby5tYXAoZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIFRva2VuLnN0cmluZ2lmeShlbGVtZW50LCBsYW5ndWFnZSwgbyk7XG5cdFx0fSkuam9pbignJyk7XG5cdH1cblxuXHR2YXIgZW52ID0ge1xuXHRcdHR5cGU6IG8udHlwZSxcblx0XHRjb250ZW50OiBUb2tlbi5zdHJpbmdpZnkoby5jb250ZW50LCBsYW5ndWFnZSwgcGFyZW50KSxcblx0XHR0YWc6ICdzcGFuJyxcblx0XHRjbGFzc2VzOiBbJ3Rva2VuJywgby50eXBlXSxcblx0XHRhdHRyaWJ1dGVzOiB7fSxcblx0XHRsYW5ndWFnZTogbGFuZ3VhZ2UsXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0fTtcblxuXHRpZiAoby5hbGlhcykge1xuXHRcdHZhciBhbGlhc2VzID0gXy51dGlsLnR5cGUoby5hbGlhcykgPT09ICdBcnJheScgPyBvLmFsaWFzIDogW28uYWxpYXNdO1xuXHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGVudi5jbGFzc2VzLCBhbGlhc2VzKTtcblx0fVxuXG5cdF8uaG9va3MucnVuKCd3cmFwJywgZW52KTtcblxuXHR2YXIgYXR0cmlidXRlcyA9IE9iamVjdC5rZXlzKGVudi5hdHRyaWJ1dGVzKS5tYXAoZnVuY3Rpb24obmFtZSkge1xuXHRcdHJldHVybiBuYW1lICsgJz1cIicgKyAoZW52LmF0dHJpYnV0ZXNbbmFtZV0gfHwgJycpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKSArICdcIic7XG5cdH0pLmpvaW4oJyAnKTtcblxuXHRyZXR1cm4gJzwnICsgZW52LnRhZyArICcgY2xhc3M9XCInICsgZW52LmNsYXNzZXMuam9pbignICcpICsgJ1wiJyArIChhdHRyaWJ1dGVzID8gJyAnICsgYXR0cmlidXRlcyA6ICcnKSArICc+JyArIGVudi5jb250ZW50ICsgJzwvJyArIGVudi50YWcgKyAnPic7XG5cbn07XG5cbmlmICghX3NlbGYuZG9jdW1lbnQpIHtcblx0aWYgKCFfc2VsZi5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0Ly8gaW4gTm9kZS5qc1xuXHRcdHJldHVybiBfc2VsZi5QcmlzbTtcblx0fVxuXG5cdGlmICghXy5kaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXIpIHtcblx0XHQvLyBJbiB3b3JrZXJcblx0XHRfc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2dC5kYXRhKSxcblx0XHRcdFx0bGFuZyA9IG1lc3NhZ2UubGFuZ3VhZ2UsXG5cdFx0XHRcdGNvZGUgPSBtZXNzYWdlLmNvZGUsXG5cdFx0XHRcdGltbWVkaWF0ZUNsb3NlID0gbWVzc2FnZS5pbW1lZGlhdGVDbG9zZTtcblxuXHRcdFx0X3NlbGYucG9zdE1lc3NhZ2UoXy5oaWdobGlnaHQoY29kZSwgXy5sYW5ndWFnZXNbbGFuZ10sIGxhbmcpKTtcblx0XHRcdGlmIChpbW1lZGlhdGVDbG9zZSkge1xuXHRcdFx0XHRfc2VsZi5jbG9zZSgpO1xuXHRcdFx0fVxuXHRcdH0sIGZhbHNlKTtcblx0fVxuXG5cdHJldHVybiBfc2VsZi5QcmlzbTtcbn1cblxuLy9HZXQgY3VycmVudCBzY3JpcHQgYW5kIGhpZ2hsaWdodFxudmFyIHNjcmlwdCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgfHwgW10uc2xpY2UuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKSkucG9wKCk7XG5cbmlmIChzY3JpcHQpIHtcblx0Xy5maWxlbmFtZSA9IHNjcmlwdC5zcmM7XG5cblx0aWYgKCFfLm1hbnVhbCAmJiAhc2NyaXB0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1tYW51YWwnKSkge1xuXHRcdGlmKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwibG9hZGluZ1wiKSB7XG5cdFx0XHRpZiAod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuXHRcdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKF8uaGlnaGxpZ2h0QWxsKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KF8uaGlnaGxpZ2h0QWxsLCAxNik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIF8uaGlnaGxpZ2h0QWxsKTtcblx0XHR9XG5cdH1cbn1cblxucmV0dXJuIF9zZWxmLlByaXNtO1xuXG59KSgpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBQcmlzbTtcbn1cblxuLy8gaGFjayBmb3IgY29tcG9uZW50cyB0byB3b3JrIGNvcnJlY3RseSBpbiBub2RlLmpzXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0Z2xvYmFsLlByaXNtID0gUHJpc207XG59XG5cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1tYXJrdXAuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCA9IHtcblx0J2NvbW1lbnQnOiAvPCEtLVtcXHNcXFNdKj8tLT4vLFxuXHQncHJvbG9nJzogLzxcXD9bXFxzXFxTXSs/XFw/Pi8sXG5cdCdkb2N0eXBlJzogLzwhRE9DVFlQRVtcXHNcXFNdKz8+L2ksXG5cdCdjZGF0YSc6IC88IVxcW0NEQVRBXFxbW1xcc1xcU10qP11dPi9pLFxuXHQndGFnJzoge1xuXHRcdHBhdHRlcm46IC88XFwvPyg/IVxcZClbXlxccz5cXC89JDxdKyg/OlxccytbXlxccz5cXC89XSsoPzo9KD86KFwifCcpKD86XFxcXFtcXHNcXFNdfCg/IVxcMSlbXlxcXFxdKSpcXDF8W15cXHMnXCI+PV0rKSk/KSpcXHMqXFwvPz4vaSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCd0YWcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9ePFxcLz9bXlxccz5cXC9dKy9pLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXjxcXC8/Lyxcblx0XHRcdFx0XHQnbmFtZXNwYWNlJzogL15bXlxccz5cXC86XSs6L1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J2F0dHItdmFsdWUnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC89KD86KFwifCcpKD86XFxcXFtcXHNcXFNdfCg/IVxcMSlbXlxcXFxdKSpcXDF8W15cXHMnXCI+PV0rKS9pLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiBbXG5cdFx0XHRcdFx0XHQvXj0vLFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSlbXCInXS8sXG5cdFx0XHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQncHVuY3R1YXRpb24nOiAvXFwvPz4vLFxuXHRcdFx0J2F0dHItbmFtZSc6IHtcblx0XHRcdFx0cGF0dGVybjogL1teXFxzPlxcL10rLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW15cXHM+XFwvOl0rOi9cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9LFxuXHQnZW50aXR5JzogLyYjP1tcXGRhLXpdezEsOH07L2lcbn07XG5cblByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ3RhZyddLmluc2lkZVsnYXR0ci12YWx1ZSddLmluc2lkZVsnZW50aXR5J10gPVxuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwWydlbnRpdHknXTtcblxuLy8gUGx1Z2luIHRvIG1ha2UgZW50aXR5IHRpdGxlIHNob3cgdGhlIHJlYWwgZW50aXR5LCBpZGVhIGJ5IFJvbWFuIEtvbWFyb3ZcblByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uKGVudikge1xuXG5cdGlmIChlbnYudHlwZSA9PT0gJ2VudGl0eScpIHtcblx0XHRlbnYuYXR0cmlidXRlc1sndGl0bGUnXSA9IGVudi5jb250ZW50LnJlcGxhY2UoLyZhbXA7LywgJyYnKTtcblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy54bWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLmh0bWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLm1hdGhtbCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5QcmlzbS5sYW5ndWFnZXMuc3ZnID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLWNzcy5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5QcmlzbS5sYW5ndWFnZXMuY3NzID0ge1xuXHQnY29tbWVudCc6IC9cXC9cXCpbXFxzXFxTXSo/XFwqXFwvLyxcblx0J2F0cnVsZSc6IHtcblx0XHRwYXR0ZXJuOiAvQFtcXHctXSs/Lio/KD86O3woPz1cXHMqXFx7KSkvaSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdydWxlJzogL0BbXFx3LV0rL1xuXHRcdFx0Ly8gU2VlIHJlc3QgYmVsb3dcblx0XHR9XG5cdH0sXG5cdCd1cmwnOiAvdXJsXFwoKD86KFtcIiddKSg/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDF8Lio/KVxcKS9pLFxuXHQnc2VsZWN0b3InOiAvW157fVxcc11bXnt9O10qPyg/PVxccypcXHspLyxcblx0J3N0cmluZyc6IHtcblx0XHRwYXR0ZXJuOiAvKFwifCcpKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8KD8hXFwxKVteXFxcXFxcclxcbl0pKlxcMS8sXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCdwcm9wZXJ0eSc6IC9bXFx3LV0rKD89XFxzKjopL2ksXG5cdCdpbXBvcnRhbnQnOiAvXFxCIWltcG9ydGFudFxcYi9pLFxuXHQnZnVuY3Rpb24nOiAvWy1hLXowLTldKyg/PVxcKCkvaSxcblx0J3B1bmN0dWF0aW9uJzogL1soKXt9OzpdL1xufTtcblxuUHJpc20ubGFuZ3VhZ2VzLmNzc1snYXRydWxlJ10uaW5zaWRlLnJlc3QgPSBQcmlzbS51dGlsLmNsb25lKFByaXNtLmxhbmd1YWdlcy5jc3MpO1xuXG5pZiAoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCkge1xuXHRQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAndGFnJywge1xuXHRcdCdzdHlsZSc6IHtcblx0XHRcdHBhdHRlcm46IC8oPHN0eWxlW1xcc1xcU10qPz4pW1xcc1xcU10qPyg/PTxcXC9zdHlsZT4pL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuY3NzLFxuXHRcdFx0YWxpYXM6ICdsYW5ndWFnZS1jc3MnXG5cdFx0fVxuXHR9KTtcblx0XG5cdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2luc2lkZScsICdhdHRyLXZhbHVlJywge1xuXHRcdCdzdHlsZS1hdHRyJzoge1xuXHRcdFx0cGF0dGVybjogL1xccypzdHlsZT0oXCJ8JykoPzpcXFxcW1xcc1xcU118KD8hXFwxKVteXFxcXF0pKlxcMS9pLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdhdHRyLW5hbWUnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogL15cXHMqc3R5bGUvaSxcblx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmluc2lkZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXlxccyo9XFxzKlsnXCJdfFsnXCJdXFxzKiQvLFxuXHRcdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvLisvaSxcblx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5jc3Ncblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGFsaWFzOiAnbGFuZ3VhZ2UtY3NzJ1xuXHRcdH1cblx0fSwgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcpO1xufVxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLWNsaWtlLmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblByaXNtLmxhbmd1YWdlcy5jbGlrZSA9IHtcblx0J2NvbW1lbnQnOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteXFxcXF0pXFwvXFwqW1xcc1xcU10qPyg/OlxcKlxcL3wkKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcOl0pXFwvXFwvLiovLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH1cblx0XSxcblx0J3N0cmluZyc6IHtcblx0XHRwYXR0ZXJuOiAvKFtcIiddKSg/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDEvLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQnY2xhc3MtbmFtZSc6IHtcblx0XHRwYXR0ZXJuOiAvKCg/OlxcYig/OmNsYXNzfGludGVyZmFjZXxleHRlbmRzfGltcGxlbWVudHN8dHJhaXR8aW5zdGFuY2VvZnxuZXcpXFxzKyl8KD86Y2F0Y2hcXHMrXFwoKSlbXFx3LlxcXFxdKy9pLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHRwdW5jdHVhdGlvbjogL1suXFxcXF0vXG5cdFx0fVxuXHR9LFxuXHQna2V5d29yZCc6IC9cXGIoPzppZnxlbHNlfHdoaWxlfGRvfGZvcnxyZXR1cm58aW58aW5zdGFuY2VvZnxmdW5jdGlvbnxuZXd8dHJ5fHRocm93fGNhdGNofGZpbmFsbHl8bnVsbHxicmVha3xjb250aW51ZSlcXGIvLFxuXHQnYm9vbGVhbic6IC9cXGIoPzp0cnVlfGZhbHNlKVxcYi8sXG5cdCdmdW5jdGlvbic6IC9bYS16MC05X10rKD89XFwoKS9pLFxuXHQnbnVtYmVyJzogL1xcYi0/KD86MHhbXFxkYS1mXSt8XFxkKlxcLj9cXGQrKD86ZVsrLV0/XFxkKyk/KVxcYi9pLFxuXHQnb3BlcmF0b3InOiAvLS0/fFxcK1xcKz98IT0/PT98PD0/fD49P3w9PT89P3wmJj98XFx8XFx8P3xcXD98XFwqfFxcL3x+fFxcXnwlLyxcblx0J3B1bmN0dWF0aW9uJzogL1t7fVtcXF07KCksLjpdL1xufTtcblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLWphdmFzY3JpcHQuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcblx0J2tleXdvcmQnOiAvXFxiKD86YXN8YXN5bmN8YXdhaXR8YnJlYWt8Y2FzZXxjYXRjaHxjbGFzc3xjb25zdHxjb250aW51ZXxkZWJ1Z2dlcnxkZWZhdWx0fGRlbGV0ZXxkb3xlbHNlfGVudW18ZXhwb3J0fGV4dGVuZHN8ZmluYWxseXxmb3J8ZnJvbXxmdW5jdGlvbnxnZXR8aWZ8aW1wbGVtZW50c3xpbXBvcnR8aW58aW5zdGFuY2VvZnxpbnRlcmZhY2V8bGV0fG5ld3xudWxsfG9mfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHJldHVybnxzZXR8c3RhdGljfHN1cGVyfHN3aXRjaHx0aGlzfHRocm93fHRyeXx0eXBlb2Z8dmFyfHZvaWR8d2hpbGV8d2l0aHx5aWVsZClcXGIvLFxuXHQnbnVtYmVyJzogL1xcYi0/KD86MFt4WF1bXFxkQS1GYS1mXSt8MFtiQl1bMDFdK3wwW29PXVswLTddK3xcXGQqXFwuP1xcZCsoPzpbRWVdWystXT9cXGQrKT98TmFOfEluZmluaXR5KVxcYi8sXG5cdC8vIEFsbG93IGZvciBhbGwgbm9uLUFTQ0lJIGNoYXJhY3RlcnMgKFNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMDA4NDQ0KVxuXHQnZnVuY3Rpb24nOiAvW18kYS16QS1aXFx4QTAtXFx1RkZGRl1bXyRhLXpBLVowLTlcXHhBMC1cXHVGRkZGXSooPz1cXHMqXFwoKS9pLFxuXHQnb3BlcmF0b3InOiAvLVstPV0/fFxcK1srPV0/fCE9Pz0/fDw8Pz0/fD4+Pz4/PT98PSg/Oj09P3w+KT98JlsmPV0/fFxcfFt8PV0/fFxcKlxcKj89P3xcXC89P3x+fFxcXj0/fCU9P3xcXD98XFwuezN9L1xufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAna2V5d29yZCcsIHtcblx0J3JlZ2V4Jzoge1xuXHRcdHBhdHRlcm46IC8oXnxbXi9dKVxcLyg/IVxcLykoXFxbW15cXF1cXHJcXG5dK118XFxcXC58W14vXFxcXFxcW1xcclxcbl0pK1xcL1tnaW15dV17MCw1fSg/PVxccyooJHxbXFxyXFxuLC47fSldKSkvLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdC8vIFRoaXMgbXVzdCBiZSBkZWNsYXJlZCBiZWZvcmUga2V5d29yZCBiZWNhdXNlIHdlIHVzZSBcImZ1bmN0aW9uXCIgaW5zaWRlIHRoZSBsb29rLWZvcndhcmRcblx0J2Z1bmN0aW9uLXZhcmlhYmxlJzoge1xuXHRcdHBhdHRlcm46IC9bXyRhLXpBLVpcXHhBMC1cXHVGRkZGXVtfJGEtekEtWjAtOVxceEEwLVxcdUZGRkZdKig/PVxccyo9XFxzKig/OmZ1bmN0aW9uXFxifCg/OlxcKFteKCldKlxcKXxbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXVtfJGEtekEtWjAtOVxceEEwLVxcdUZGRkZdKilcXHMqPT4pKS9pLFxuXHRcdGFsaWFzOiAnZnVuY3Rpb24nXG5cdH1cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdqYXZhc2NyaXB0JywgJ3N0cmluZycsIHtcblx0J3RlbXBsYXRlLXN0cmluZyc6IHtcblx0XHRwYXR0ZXJuOiAvYCg/OlxcXFxbXFxzXFxTXXxbXlxcXFxgXSkqYC8sXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J2ludGVycG9sYXRpb24nOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9cXCRcXHtbXn1dK1xcfS8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdpbnRlcnBvbGF0aW9uLXB1bmN0dWF0aW9uJzoge1xuXHRcdFx0XHRcdFx0cGF0dGVybjogL15cXCRcXHt8XFx9JC8sXG5cdFx0XHRcdFx0XHRhbGlhczogJ3B1bmN0dWF0aW9uJ1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cmVzdDogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdzdHJpbmcnOiAvW1xcc1xcU10rL1xuXHRcdH1cblx0fVxufSk7XG5cbmlmIChQcmlzbS5sYW5ndWFnZXMubWFya3VwKSB7XG5cdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICd0YWcnLCB7XG5cdFx0J3NjcmlwdCc6IHtcblx0XHRcdHBhdHRlcm46IC8oPHNjcmlwdFtcXHNcXFNdKj8+KVtcXHNcXFNdKj8oPz08XFwvc2NyaXB0PikvaSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0LFxuXHRcdFx0YWxpYXM6ICdsYW5ndWFnZS1qYXZhc2NyaXB0J1xuXHRcdH1cblx0fSk7XG59XG5cblByaXNtLmxhbmd1YWdlcy5qcyA9IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0O1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tZmlsZS1oaWdobGlnaHQuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyB8fCAhc2VsZi5QcmlzbSB8fCAhc2VsZi5kb2N1bWVudCB8fCAhZG9jdW1lbnQucXVlcnlTZWxlY3Rvcikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHNlbGYuUHJpc20uZmlsZUhpZ2hsaWdodCA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0dmFyIEV4dGVuc2lvbnMgPSB7XG5cdFx0XHQnanMnOiAnamF2YXNjcmlwdCcsXG5cdFx0XHQncHknOiAncHl0aG9uJyxcblx0XHRcdCdyYic6ICdydWJ5Jyxcblx0XHRcdCdwczEnOiAncG93ZXJzaGVsbCcsXG5cdFx0XHQncHNtMSc6ICdwb3dlcnNoZWxsJyxcblx0XHRcdCdzaCc6ICdiYXNoJyxcblx0XHRcdCdiYXQnOiAnYmF0Y2gnLFxuXHRcdFx0J2gnOiAnYycsXG5cdFx0XHQndGV4JzogJ2xhdGV4J1xuXHRcdH07XG5cblx0XHRBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdwcmVbZGF0YS1zcmNdJykpLmZvckVhY2goZnVuY3Rpb24gKHByZSkge1xuXHRcdFx0dmFyIHNyYyA9IHByZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cblx0XHRcdHZhciBsYW5ndWFnZSwgcGFyZW50ID0gcHJlO1xuXHRcdFx0dmFyIGxhbmcgPSAvXFxibGFuZyg/OnVhZ2UpPy0oPyFcXCopKFxcdyspXFxiL2k7XG5cdFx0XHR3aGlsZSAocGFyZW50ICYmICFsYW5nLnRlc3QocGFyZW50LmNsYXNzTmFtZSkpIHtcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwYXJlbnQpIHtcblx0XHRcdFx0bGFuZ3VhZ2UgPSAocHJlLmNsYXNzTmFtZS5tYXRjaChsYW5nKSB8fCBbLCAnJ10pWzFdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWxhbmd1YWdlKSB7XG5cdFx0XHRcdHZhciBleHRlbnNpb24gPSAoc3JjLm1hdGNoKC9cXC4oXFx3KykkLykgfHwgWywgJyddKVsxXTtcblx0XHRcdFx0bGFuZ3VhZ2UgPSBFeHRlbnNpb25zW2V4dGVuc2lvbl0gfHwgZXh0ZW5zaW9uO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY29kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvZGUnKTtcblx0XHRcdGNvZGUuY2xhc3NOYW1lID0gJ2xhbmd1YWdlLScgKyBsYW5ndWFnZTtcblxuXHRcdFx0cHJlLnRleHRDb250ZW50ID0gJyc7XG5cblx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSAnTG9hZGluZ+KApic7XG5cblx0XHRcdHByZS5hcHBlbmRDaGlsZChjb2RlKTtcblxuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5cdFx0XHR4aHIub3BlbignR0VUJywgc3JjLCB0cnVlKTtcblxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcblxuXHRcdFx0XHRcdGlmICh4aHIuc3RhdHVzIDwgNDAwICYmIHhoci5yZXNwb25zZVRleHQpIHtcblx0XHRcdFx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSB4aHIucmVzcG9uc2VUZXh0O1xuXG5cdFx0XHRcdFx0XHRQcmlzbS5oaWdobGlnaHRFbGVtZW50KGNvZGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmICh4aHIuc3RhdHVzID49IDQwMCkge1xuXHRcdFx0XHRcdFx0Y29kZS50ZXh0Q29udGVudCA9ICfinJYgRXJyb3IgJyArIHhoci5zdGF0dXMgKyAnIHdoaWxlIGZldGNoaW5nIGZpbGU6ICcgKyB4aHIuc3RhdHVzVGV4dDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRjb2RlLnRleHRDb250ZW50ID0gJ+KcliBFcnJvcjogRmlsZSBkb2VzIG5vdCBleGlzdCBvciBpcyBlbXB0eSc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHR4aHIuc2VuZChudWxsKTtcblx0XHR9KTtcblxuXHR9O1xuXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZWxmLlByaXNtLmZpbGVIaWdobGlnaHQpO1xuXG59KSgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJpc21qcy9wcmlzbS5qc1xuLy8gbW9kdWxlIGlkID0gMjUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIihmdW5jdGlvbigpe1xuXHRpZiAodHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnIHx8ICFzZWxmLlByaXNtIHx8ICFzZWxmLmRvY3VtZW50KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuXHR2YXIgbWFwID0ge307XG5cdHZhciBub29wID0gZnVuY3Rpb24oKSB7fTtcblxuXHRQcmlzbS5wbHVnaW5zLnRvb2xiYXIgPSB7fTtcblxuXHQvKipcblx0ICogUmVnaXN0ZXIgYSBidXR0b24gY2FsbGJhY2sgd2l0aCB0aGUgdG9vbGJhci5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGtleVxuXHQgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gb3B0c1xuXHQgKi9cblx0dmFyIHJlZ2lzdGVyQnV0dG9uID0gUHJpc20ucGx1Z2lucy50b29sYmFyLnJlZ2lzdGVyQnV0dG9uID0gZnVuY3Rpb24gKGtleSwgb3B0cykge1xuXHRcdHZhciBjYWxsYmFjaztcblxuXHRcdGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y2FsbGJhY2sgPSBvcHRzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjYWxsYmFjayA9IGZ1bmN0aW9uIChlbnYpIHtcblx0XHRcdFx0dmFyIGVsZW1lbnQ7XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBvcHRzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0XHRcdFx0ZWxlbWVudC50eXBlID0gJ2J1dHRvbic7XG5cdFx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdG9wdHMub25DbGljay5jYWxsKHRoaXMsIGVudik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIG9wdHMudXJsID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0XHRcdFx0ZWxlbWVudC5ocmVmID0gb3B0cy51cmw7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnQudGV4dENvbnRlbnQgPSBvcHRzLnRleHQ7XG5cblx0XHRcdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGNhbGxiYWNrcy5wdXNoKG1hcFtrZXldID0gY2FsbGJhY2spO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBQb3N0LWhpZ2hsaWdodCBQcmlzbSBob29rIGNhbGxiYWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0gZW52XG5cdCAqL1xuXHR2YXIgaG9vayA9IFByaXNtLnBsdWdpbnMudG9vbGJhci5ob29rID0gZnVuY3Rpb24gKGVudikge1xuXHRcdC8vIENoZWNrIGlmIGlubGluZSBvciBhY3R1YWwgY29kZSBibG9jayAoY3JlZGl0IHRvIGxpbmUtbnVtYmVycyBwbHVnaW4pXG5cdFx0dmFyIHByZSA9IGVudi5lbGVtZW50LnBhcmVudE5vZGU7XG5cdFx0aWYgKCFwcmUgfHwgIS9wcmUvaS50ZXN0KHByZS5ub2RlTmFtZSkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBBdXRvbG9hZGVyIHJlaGlnaGxpZ2h0cywgc28gb25seSBkbyB0aGlzIG9uY2UuXG5cdFx0aWYgKHByZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvZGUtdG9vbGJhcicpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0cHJlLmNsYXNzTGlzdC5hZGQoJ2NvZGUtdG9vbGJhcicpO1xuXG5cdFx0Ly8gU2V0dXAgdGhlIHRvb2xiYXJcblx0XHR2YXIgdG9vbGJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHRvb2xiYXIuY2xhc3NMaXN0LmFkZCgndG9vbGJhcicpO1xuXG5cdFx0aWYgKGRvY3VtZW50LmJvZHkuaGFzQXR0cmlidXRlKCdkYXRhLXRvb2xiYXItb3JkZXInKSkge1xuXHRcdFx0Y2FsbGJhY2tzID0gZG9jdW1lbnQuYm9keS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbGJhci1vcmRlcicpLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0XHRyZXR1cm4gbWFwW2tleV0gfHwgbm9vcDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IGNhbGxiYWNrKGVudik7XG5cblx0XHRcdGlmICghZWxlbWVudCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoJ3Rvb2xiYXItaXRlbScpO1xuXG5cdFx0XHRpdGVtLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXHRcdFx0dG9vbGJhci5hcHBlbmRDaGlsZChpdGVtKTtcblx0XHR9KTtcblxuXHRcdC8vIEFkZCBvdXIgdG9vbGJhciB0byB0aGUgPHByZT4gdGFnXG5cdFx0cHJlLmFwcGVuZENoaWxkKHRvb2xiYXIpO1xuXHR9O1xuXG5cdHJlZ2lzdGVyQnV0dG9uKCdsYWJlbCcsIGZ1bmN0aW9uKGVudikge1xuXHRcdHZhciBwcmUgPSBlbnYuZWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdGlmICghcHJlIHx8ICEvcHJlL2kudGVzdChwcmUubm9kZU5hbWUpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCFwcmUuaGFzQXR0cmlidXRlKCdkYXRhLWxhYmVsJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgZWxlbWVudCwgdGVtcGxhdGU7XG5cdFx0dmFyIHRleHQgPSBwcmUuZ2V0QXR0cmlidXRlKCdkYXRhLWxhYmVsJyk7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIEFueSBub3JtYWwgdGV4dCB3aWxsIGJsb3cgdXAgdGhpcyBzZWxlY3Rvci5cblx0XHRcdHRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGVtcGxhdGUjJyArIHRleHQpO1xuXHRcdH0gY2F0Y2ggKGUpIHt9XG5cblx0XHRpZiAodGVtcGxhdGUpIHtcblx0XHRcdGVsZW1lbnQgPSB0ZW1wbGF0ZS5jb250ZW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAocHJlLmhhc0F0dHJpYnV0ZSgnZGF0YS11cmwnKSkge1xuXHRcdFx0XHRlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdFx0XHRlbGVtZW50LmhyZWYgPSBwcmUuZ2V0QXR0cmlidXRlKCdkYXRhLXVybCcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBSZWdpc3RlciB0aGUgdG9vbGJhciB3aXRoIFByaXNtLlxuXHQgKi9cblx0UHJpc20uaG9va3MuYWRkKCdjb21wbGV0ZScsIGhvb2spO1xufSkoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ByaXNtanMvcGx1Z2lucy90b29sYmFyL3ByaXNtLXRvb2xiYXIuanNcbi8vIG1vZHVsZSBpZCA9IDI1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIoZnVuY3Rpb24oKSB7XG5cbnZhciBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIChvYmoxLCBvYmoyKSB7XG5cdGZvciAodmFyIG5hbWUgaW4gb2JqMikge1xuXHRcdGlmIChvYmoyLmhhc093blByb3BlcnR5KG5hbWUpKVxuXHRcdFx0b2JqMVtuYW1lXSA9IG9iajJbbmFtZV07XG5cdH1cblx0cmV0dXJuIG9iajE7XG59XG5cbmZ1bmN0aW9uIE5vcm1hbGl6ZVdoaXRlc3BhY2UoZGVmYXVsdHMpIHtcblx0dGhpcy5kZWZhdWx0cyA9IGFzc2lnbih7fSwgZGVmYXVsdHMpO1xufVxuXG5mdW5jdGlvbiB0b0NhbWVsQ2FzZSh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUucmVwbGFjZSgvLShcXHcpL2csIGZ1bmN0aW9uKG1hdGNoLCBmaXJzdENoYXIpIHtcblx0XHRyZXR1cm4gZmlyc3RDaGFyLnRvVXBwZXJDYXNlKCk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiB0YWJMZW4oc3RyKSB7XG5cdHZhciByZXMgPSAwO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuXHRcdGlmIChzdHIuY2hhckNvZGVBdChpKSA9PSAnXFx0Jy5jaGFyQ29kZUF0KDApKVxuXHRcdFx0cmVzICs9IDM7XG5cdH1cblx0cmV0dXJuIHN0ci5sZW5ndGggKyByZXM7XG59XG5cbk5vcm1hbGl6ZVdoaXRlc3BhY2UucHJvdG90eXBlID0ge1xuXHRzZXREZWZhdWx0czogZnVuY3Rpb24gKGRlZmF1bHRzKSB7XG5cdFx0dGhpcy5kZWZhdWx0cyA9IGFzc2lnbih0aGlzLmRlZmF1bHRzLCBkZWZhdWx0cyk7XG5cdH0sXG5cdG5vcm1hbGl6ZTogZnVuY3Rpb24gKGlucHV0LCBzZXR0aW5ncykge1xuXHRcdHNldHRpbmdzID0gYXNzaWduKHRoaXMuZGVmYXVsdHMsIHNldHRpbmdzKTtcblxuXHRcdGZvciAodmFyIG5hbWUgaW4gc2V0dGluZ3MpIHtcblx0XHRcdHZhciBtZXRob2ROYW1lID0gdG9DYW1lbENhc2UobmFtZSk7XG5cdFx0XHRpZiAobmFtZSAhPT0gXCJub3JtYWxpemVcIiAmJiBtZXRob2ROYW1lICE9PSAnc2V0RGVmYXVsdHMnICYmXG5cdFx0XHRcdFx0c2V0dGluZ3NbbmFtZV0gJiYgdGhpc1ttZXRob2ROYW1lXSkge1xuXHRcdFx0XHRpbnB1dCA9IHRoaXNbbWV0aG9kTmFtZV0uY2FsbCh0aGlzLCBpbnB1dCwgc2V0dGluZ3NbbmFtZV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBpbnB1dDtcblx0fSxcblxuXHQvKlxuXHQgKiBOb3JtYWxpemF0aW9uIG1ldGhvZHNcblx0ICovXG5cdGxlZnRUcmltOiBmdW5jdGlvbiAoaW5wdXQpIHtcblx0XHRyZXR1cm4gaW5wdXQucmVwbGFjZSgvXlxccysvLCAnJyk7XG5cdH0sXG5cdHJpZ2h0VHJpbTogZnVuY3Rpb24gKGlucHV0KSB7XG5cdFx0cmV0dXJuIGlucHV0LnJlcGxhY2UoL1xccyskLywgJycpO1xuXHR9LFxuXHR0YWJzVG9TcGFjZXM6IGZ1bmN0aW9uIChpbnB1dCwgc3BhY2VzKSB7XG5cdFx0c3BhY2VzID0gc3BhY2VzfDAgfHwgNDtcblx0XHRyZXR1cm4gaW5wdXQucmVwbGFjZSgvXFx0L2csIG5ldyBBcnJheSgrK3NwYWNlcykuam9pbignICcpKTtcblx0fSxcblx0c3BhY2VzVG9UYWJzOiBmdW5jdGlvbiAoaW5wdXQsIHNwYWNlcykge1xuXHRcdHNwYWNlcyA9IHNwYWNlc3wwIHx8IDQ7XG5cdFx0cmV0dXJuIGlucHV0LnJlcGxhY2UobmV3IFJlZ0V4cCgnIHsnICsgc3BhY2VzICsgJ30nLCAnZycpLCAnXFx0Jyk7XG5cdH0sXG5cdHJlbW92ZVRyYWlsaW5nOiBmdW5jdGlvbiAoaW5wdXQpIHtcblx0XHRyZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxzKj8kL2dtLCAnJyk7XG5cdH0sXG5cdC8vIFN1cHBvcnQgZm9yIGRlcHJlY2F0ZWQgcGx1Z2luIHJlbW92ZS1pbml0aWFsLWxpbmUtZmVlZFxuXHRyZW1vdmVJbml0aWFsTGluZUZlZWQ6IGZ1bmN0aW9uIChpbnB1dCkge1xuXHRcdHJldHVybiBpbnB1dC5yZXBsYWNlKC9eKD86XFxyP1xcbnxcXHIpLywgJycpO1xuXHR9LFxuXHRyZW1vdmVJbmRlbnQ6IGZ1bmN0aW9uIChpbnB1dCkge1xuXHRcdHZhciBpbmRlbnRzID0gaW5wdXQubWF0Y2goL15bXlxcU1xcblxccl0qKD89XFxTKS9nbSk7XG5cblx0XHRpZiAoIWluZGVudHMgfHwgIWluZGVudHNbMF0ubGVuZ3RoKVxuXHRcdFx0cmV0dXJuIGlucHV0O1xuXG5cdFx0aW5kZW50cy5zb3J0KGZ1bmN0aW9uKGEsIGIpe3JldHVybiBhLmxlbmd0aCAtIGIubGVuZ3RoOyB9KTtcblxuXHRcdGlmICghaW5kZW50c1swXS5sZW5ndGgpXG5cdFx0XHRyZXR1cm4gaW5wdXQ7XG5cblx0XHRyZXR1cm4gaW5wdXQucmVwbGFjZShuZXcgUmVnRXhwKCdeJyArIGluZGVudHNbMF0sICdnbScpLCAnJyk7XG5cdH0sXG5cdGluZGVudDogZnVuY3Rpb24gKGlucHV0LCB0YWJzKSB7XG5cdFx0cmV0dXJuIGlucHV0LnJlcGxhY2UoL15bXlxcU1xcblxccl0qKD89XFxTKS9nbSwgbmV3IEFycmF5KCsrdGFicykuam9pbignXFx0JykgKyAnJCYnKTtcblx0fSxcblx0YnJlYWtMaW5lczogZnVuY3Rpb24gKGlucHV0LCBjaGFyYWN0ZXJzKSB7XG5cdFx0Y2hhcmFjdGVycyA9IChjaGFyYWN0ZXJzID09PSB0cnVlKSA/IDgwIDogY2hhcmFjdGVyc3wwIHx8IDgwO1xuXG5cdFx0dmFyIGxpbmVzID0gaW5wdXQuc3BsaXQoJ1xcbicpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyArK2kpIHtcblx0XHRcdGlmICh0YWJMZW4obGluZXNbaV0pIDw9IGNoYXJhY3RlcnMpXG5cdFx0XHRcdGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgbGluZSA9IGxpbmVzW2ldLnNwbGl0KC8oXFxzKykvZyksXG5cdFx0XHQgICAgbGVuID0gMDtcblxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBsaW5lLmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdHZhciB0bCA9IHRhYkxlbihsaW5lW2pdKTtcblx0XHRcdFx0bGVuICs9IHRsO1xuXHRcdFx0XHRpZiAobGVuID4gY2hhcmFjdGVycykge1xuXHRcdFx0XHRcdGxpbmVbal0gPSAnXFxuJyArIGxpbmVbal07XG5cdFx0XHRcdFx0bGVuID0gdGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGxpbmVzW2ldID0gbGluZS5qb2luKCcnKTtcblx0XHR9XG5cdFx0cmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpO1xuXHR9XG59O1xuXG4vLyBTdXBwb3J0IG5vZGUgbW9kdWxlc1xuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gTm9ybWFsaXplV2hpdGVzcGFjZTtcbn1cblxuLy8gRXhpdCBpZiBwcmlzbSBpcyBub3QgbG9hZGVkXG5pZiAodHlwZW9mIFByaXNtID09PSAndW5kZWZpbmVkJykge1xuXHRyZXR1cm47XG59XG5cblByaXNtLnBsdWdpbnMuTm9ybWFsaXplV2hpdGVzcGFjZSA9IG5ldyBOb3JtYWxpemVXaGl0ZXNwYWNlKHtcblx0J3JlbW92ZS10cmFpbGluZyc6IHRydWUsXG5cdCdyZW1vdmUtaW5kZW50JzogdHJ1ZSxcblx0J2xlZnQtdHJpbSc6IHRydWUsXG5cdCdyaWdodC10cmltJzogdHJ1ZSxcblx0LyonYnJlYWstbGluZXMnOiA4MCxcblx0J2luZGVudCc6IDIsXG5cdCdyZW1vdmUtaW5pdGlhbC1saW5lLWZlZWQnOiBmYWxzZSxcblx0J3RhYnMtdG8tc3BhY2VzJzogNCxcblx0J3NwYWNlcy10by10YWJzJzogNCovXG59KTtcblxuUHJpc20uaG9va3MuYWRkKCdiZWZvcmUtc2FuaXR5LWNoZWNrJywgZnVuY3Rpb24gKGVudikge1xuXHR2YXIgTm9ybWFsaXplciA9IFByaXNtLnBsdWdpbnMuTm9ybWFsaXplV2hpdGVzcGFjZTtcblxuXHQvLyBDaGVjayBzZXR0aW5nc1xuXHRpZiAoZW52LnNldHRpbmdzICYmIGVudi5zZXR0aW5nc1snd2hpdGVzcGFjZS1ub3JtYWxpemF0aW9uJ10gPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gU2ltcGxlIG1vZGUgaWYgdGhlcmUgaXMgbm8gZW52LmVsZW1lbnRcblx0aWYgKCghZW52LmVsZW1lbnQgfHwgIWVudi5lbGVtZW50LnBhcmVudE5vZGUpICYmIGVudi5jb2RlKSB7XG5cdFx0ZW52LmNvZGUgPSBOb3JtYWxpemVyLm5vcm1hbGl6ZShlbnYuY29kZSwgZW52LnNldHRpbmdzKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBOb3JtYWwgbW9kZVxuXHR2YXIgcHJlID0gZW52LmVsZW1lbnQucGFyZW50Tm9kZTtcblx0dmFyIGNsc1JlZyA9IC9cXGJuby13aGl0ZXNwYWNlLW5vcm1hbGl6YXRpb25cXGIvO1xuXHRpZiAoIWVudi5jb2RlIHx8ICFwcmUgfHwgcHJlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdwcmUnIHx8XG5cdFx0XHRjbHNSZWcudGVzdChwcmUuY2xhc3NOYW1lKSB8fCBjbHNSZWcudGVzdChlbnYuZWxlbWVudC5jbGFzc05hbWUpKVxuXHRcdHJldHVybjtcblxuXHR2YXIgY2hpbGRyZW4gPSBwcmUuY2hpbGROb2Rlcyxcblx0ICAgIGJlZm9yZSA9ICcnLFxuXHQgICAgYWZ0ZXIgPSAnJyxcblx0ICAgIGNvZGVGb3VuZCA9IGZhbHNlO1xuXG5cdC8vIE1vdmUgc3Vycm91bmRpbmcgd2hpdGVzcGFjZSBmcm9tIHRoZSA8cHJlPiB0YWcgaW50byB0aGUgPGNvZGU+IHRhZ1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG5cdFx0dmFyIG5vZGUgPSBjaGlsZHJlbltpXTtcblxuXHRcdGlmIChub2RlID09IGVudi5lbGVtZW50KSB7XG5cdFx0XHRjb2RlRm91bmQgPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAobm9kZS5ub2RlTmFtZSA9PT0gXCIjdGV4dFwiKSB7XG5cdFx0XHRpZiAoY29kZUZvdW5kKSB7XG5cdFx0XHRcdGFmdGVyICs9IG5vZGUubm9kZVZhbHVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YmVmb3JlICs9IG5vZGUubm9kZVZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRwcmUucmVtb3ZlQ2hpbGQobm9kZSk7XG5cdFx0XHQtLWk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFlbnYuZWxlbWVudC5jaGlsZHJlbi5sZW5ndGggfHwgIVByaXNtLnBsdWdpbnMuS2VlcE1hcmt1cCkge1xuXHRcdGVudi5jb2RlID0gYmVmb3JlICsgZW52LmNvZGUgKyBhZnRlcjtcblx0XHRlbnYuY29kZSA9IE5vcm1hbGl6ZXIubm9ybWFsaXplKGVudi5jb2RlLCBlbnYuc2V0dGluZ3MpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIFByZXNlcnZlIG1hcmt1cCBmb3Iga2VlcC1tYXJrdXAgcGx1Z2luXG5cdFx0dmFyIGh0bWwgPSBiZWZvcmUgKyBlbnYuZWxlbWVudC5pbm5lckhUTUwgKyBhZnRlcjtcblx0XHRlbnYuZWxlbWVudC5pbm5lckhUTUwgPSBOb3JtYWxpemVyLm5vcm1hbGl6ZShodG1sLCBlbnYuc2V0dGluZ3MpO1xuXHRcdGVudi5jb2RlID0gZW52LmVsZW1lbnQudGV4dENvbnRlbnQ7XG5cdH1cbn0pO1xuXG59KCkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ByaXNtanMvcGx1Z2lucy9ub3JtYWxpemUtd2hpdGVzcGFjZS9wcmlzbS1ub3JtYWxpemUtd2hpdGVzcGFjZS5qc1xuLy8gbW9kdWxlIGlkID0gMjU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIihmdW5jdGlvbiAoKSB7XG5cblx0aWYgKHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyB8fCAhc2VsZi5QcmlzbSB8fCAhc2VsZi5kb2N1bWVudCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbGFzcyBuYW1lIGZvciA8cHJlPiB3aGljaCBpcyBhY3RpdmF0aW5nIHRoZSBwbHVnaW5cblx0ICogQHR5cGUge1N0cmluZ31cblx0ICovXG5cdHZhciBQTFVHSU5fQ0xBU1MgPSAnbGluZS1udW1iZXJzJztcblxuXHQvKipcblx0ICogUmVzaXplcyBsaW5lIG51bWJlcnMgc3BhbnMgYWNjb3JkaW5nIHRvIGhlaWdodCBvZiBsaW5lIG9mIGNvZGVcblx0ICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCA8cHJlPiBlbGVtZW50XG5cdCAqL1xuXHR2YXIgX3Jlc2l6ZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdHZhciBjb2RlU3R5bGVzID0gZ2V0U3R5bGVzKGVsZW1lbnQpO1xuXHRcdHZhciB3aGl0ZVNwYWNlID0gY29kZVN0eWxlc1snd2hpdGUtc3BhY2UnXTtcblxuXHRcdGlmICh3aGl0ZVNwYWNlID09PSAncHJlLXdyYXAnIHx8IHdoaXRlU3BhY2UgPT09ICdwcmUtbGluZScpIHtcblx0XHRcdHZhciBjb2RlRWxlbWVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignY29kZScpO1xuXHRcdFx0dmFyIGxpbmVOdW1iZXJzV3JhcHBlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmUtbnVtYmVycy1yb3dzJyk7XG5cdFx0XHR2YXIgbGluZU51bWJlclNpemVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubGluZS1udW1iZXJzLXNpemVyJyk7XG5cdFx0XHR2YXIgY29kZUxpbmVzID0gZWxlbWVudC50ZXh0Q29udGVudC5zcGxpdCgnXFxuJyk7XG5cblx0XHRcdGlmICghbGluZU51bWJlclNpemVyKSB7XG5cdFx0XHRcdGxpbmVOdW1iZXJTaXplciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRcdFx0bGluZU51bWJlclNpemVyLmNsYXNzTmFtZSA9ICdsaW5lLW51bWJlcnMtc2l6ZXInO1xuXG5cdFx0XHRcdGNvZGVFbGVtZW50LmFwcGVuZENoaWxkKGxpbmVOdW1iZXJTaXplcik7XG5cdFx0XHR9XG5cblx0XHRcdGxpbmVOdW1iZXJTaXplci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuXHRcdFx0Y29kZUxpbmVzLmZvckVhY2goZnVuY3Rpb24gKGxpbmUsIGxpbmVOdW1iZXIpIHtcblx0XHRcdFx0bGluZU51bWJlclNpemVyLnRleHRDb250ZW50ID0gbGluZSB8fCAnXFxuJztcblx0XHRcdFx0dmFyIGxpbmVTaXplID0gbGluZU51bWJlclNpemVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdFx0bGluZU51bWJlcnNXcmFwcGVyLmNoaWxkcmVuW2xpbmVOdW1iZXJdLnN0eWxlLmhlaWdodCA9IGxpbmVTaXplICsgJ3B4Jztcblx0XHRcdH0pO1xuXG5cdFx0XHRsaW5lTnVtYmVyU2l6ZXIudGV4dENvbnRlbnQgPSAnJztcblx0XHRcdGxpbmVOdW1iZXJTaXplci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogUmV0dXJucyBzdHlsZSBkZWNsYXJhdGlvbnMgZm9yIHRoZSBlbGVtZW50XG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHQgKi9cblx0dmFyIGdldFN0eWxlcyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0aWYgKCFlbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIDogKGVsZW1lbnQuY3VycmVudFN0eWxlIHx8IG51bGwpO1xuXHR9O1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdwcmUuJyArIFBMVUdJTl9DTEFTUyksIF9yZXNpemVFbGVtZW50KTtcblx0fSk7XG5cblx0UHJpc20uaG9va3MuYWRkKCdjb21wbGV0ZScsIGZ1bmN0aW9uIChlbnYpIHtcblx0XHRpZiAoIWVudi5jb2RlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gd29ya3Mgb25seSBmb3IgPGNvZGU+IHdyYXBwZWQgaW5zaWRlIDxwcmU+IChub3QgaW5saW5lKVxuXHRcdHZhciBwcmUgPSBlbnYuZWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdHZhciBjbHNSZWcgPSAvXFxzKlxcYmxpbmUtbnVtYmVyc1xcYlxccyovO1xuXHRcdGlmIChcblx0XHRcdCFwcmUgfHwgIS9wcmUvaS50ZXN0KHByZS5ub2RlTmFtZSkgfHxcblx0XHRcdC8vIEFib3J0IG9ubHkgaWYgbm9yIHRoZSA8cHJlPiBub3IgdGhlIDxjb2RlPiBoYXZlIHRoZSBjbGFzc1xuXHRcdFx0KCFjbHNSZWcudGVzdChwcmUuY2xhc3NOYW1lKSAmJiAhY2xzUmVnLnRlc3QoZW52LmVsZW1lbnQuY2xhc3NOYW1lKSlcblx0XHQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoZW52LmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5saW5lLW51bWJlcnMtcm93c1wiKSkge1xuXHRcdFx0Ly8gQWJvcnQgaWYgbGluZSBudW1iZXJzIGFscmVhZHkgZXhpc3RzXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGNsc1JlZy50ZXN0KGVudi5lbGVtZW50LmNsYXNzTmFtZSkpIHtcblx0XHRcdC8vIFJlbW92ZSB0aGUgY2xhc3MgXCJsaW5lLW51bWJlcnNcIiBmcm9tIHRoZSA8Y29kZT5cblx0XHRcdGVudi5lbGVtZW50LmNsYXNzTmFtZSA9IGVudi5lbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKGNsc1JlZywgJyAnKTtcblx0XHR9XG5cdFx0aWYgKCFjbHNSZWcudGVzdChwcmUuY2xhc3NOYW1lKSkge1xuXHRcdFx0Ly8gQWRkIHRoZSBjbGFzcyBcImxpbmUtbnVtYmVyc1wiIHRvIHRoZSA8cHJlPlxuXHRcdFx0cHJlLmNsYXNzTmFtZSArPSAnIGxpbmUtbnVtYmVycyc7XG5cdFx0fVxuXG5cdFx0dmFyIG1hdGNoID0gZW52LmNvZGUubWF0Y2goL1xcbig/ISQpL2cpO1xuXHRcdHZhciBsaW5lc051bSA9IG1hdGNoID8gbWF0Y2gubGVuZ3RoICsgMSA6IDE7XG5cdFx0dmFyIGxpbmVOdW1iZXJzV3JhcHBlcjtcblxuXHRcdHZhciBsaW5lcyA9IG5ldyBBcnJheShsaW5lc051bSArIDEpO1xuXHRcdGxpbmVzID0gbGluZXMuam9pbignPHNwYW4+PC9zcGFuPicpO1xuXG5cdFx0bGluZU51bWJlcnNXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdGxpbmVOdW1iZXJzV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblx0XHRsaW5lTnVtYmVyc1dyYXBwZXIuY2xhc3NOYW1lID0gJ2xpbmUtbnVtYmVycy1yb3dzJztcblx0XHRsaW5lTnVtYmVyc1dyYXBwZXIuaW5uZXJIVE1MID0gbGluZXM7XG5cblx0XHRpZiAocHJlLmhhc0F0dHJpYnV0ZSgnZGF0YS1zdGFydCcpKSB7XG5cdFx0XHRwcmUuc3R5bGUuY291bnRlclJlc2V0ID0gJ2xpbmVudW1iZXIgJyArIChwYXJzZUludChwcmUuZ2V0QXR0cmlidXRlKCdkYXRhLXN0YXJ0JyksIDEwKSAtIDEpO1xuXHRcdH1cblxuXHRcdGVudi5lbGVtZW50LmFwcGVuZENoaWxkKGxpbmVOdW1iZXJzV3JhcHBlcik7XG5cblx0XHRfcmVzaXplRWxlbWVudChwcmUpO1xuXHR9KTtcblxufSgpKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcmlzbWpzL3BsdWdpbnMvbGluZS1udW1iZXJzL3ByaXNtLWxpbmUtbnVtYmVycy5qc1xuLy8gbW9kdWxlIGlkID0gMjU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCB7IExpYnJhcnlQYWdlTmF2aWdhdGlvbiB9IGZyb20gJy4vbGlicmFyeS1wYWdlLW5hdmlnYXRpb24nO1xuXG5leHBvcnQgY29uc3QgaW5pdE1vZHVsZXMgPSAoKSA9PiB7XG4gIG5ldyBMaWJyYXJ5UGFnZU5hdmlnYXRpb24oKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2pzL2RldmVsb3BtZW50L21vZHVsZXMvaW5kZXguanMiLCJpbXBvcnQgeyBhZGRFdmVudExpc3RlbmVyVG9FbCwgcmVtb3ZlQWxsRXZlbnRzRnJvbUVsLCB0b2dnbGVDbGFzcyB9IGZyb20gJy4vLi4vLi4vLi4vc2hhcmVkL21pc2MnO1xuXG5leHBvcnQgY2xhc3MgTGlicmFyeVBhZ2VOYXZpZ2F0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gQ3JlYXRlIHZhbHVlcyBmb3IgbGF0ZXIgdXNlXG4gICAgdGhpcy5zaWRlYmFyID0gZmFsc2U7XG4gICAgdGhpcy5tYXhXaWR0aCA9IDgwMDtcblxuICAgIC8vIENyZWF0ZSB2YXJpYWJsZXMgZm9yIGxhdGVyIHVzZVxuICAgIHRoaXMubmF2aWdhdGlvbklkID0gJ3N0eWxlZ3VpZGUtbmF2aWdhdGlvbic7XG4gICAgdGhpcy5uYXZpZ2F0aW9uSW5uZXJDbGFzc05hbWUgPSAnc3R5bGVndWlkZS1uYXZpZ2F0aW9uX19pbm5lcic7XG4gICAgdGhpcy5uYXZpZ2F0aW9uSW5uZXJPcGVuQ2xhc3NOYW1lID0gJ3N0eWxlZ3VpZGUtbmF2aWdhdGlvbl9faW5uZXItLW9wZW4nO1xuICAgIHRoaXMuY29udGVudElkID0gJ3N0eWxlZ3VpZGUtY29udGVudCc7XG4gICAgdGhpcy5tb2JpbGVOYXZpZ2F0aW9uQ2xhc3NOYW1lID0gJ3N0eWxlZ3VpZGUtbmF2aWdhdGlvbl9fbW9iaWxlLW5hdic7XG4gICAgdGhpcy5tb2JpbGVOYXZpZ2F0aW9uQ29udGFpbmVyQ2xhc3NOYW1lID0gJ3N0eWxlZ3VpZGUtbmF2aWdhdGlvbl9fbW9iaWxlJztcbiAgICB0aGlzLmxpYnJhcnlDb250YWluZXJJZCA9ICdsaWJyYXJ5LWNvbnRhaW5lcic7XG5cbiAgICAvLyBHZXQgZWxlbWVudHNcbiAgICB0aGlzLmxpYnJhcnlDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5saWJyYXJ5Q29udGFpbmVySWQpO1xuICAgIHRoaXMubmF2aWdhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubmF2aWdhdGlvbklkKTtcblxuICAgIC8vIENoZWNrIGlmIGVsZW1lbnRzIGV4aXN0XG4gICAgaWYgKCF0aGlzLm5hdmlnYXRpb24gfHwgIXRoaXMubGlicmFyeUNvbnRhaW5lckVsZW1lbnQpIHJldHVybjtcblxuICAgIC8vIEdldCBlbGVtZW50c1xuICAgIHRoaXMubW9iaWxlTmF2aWdhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgdGhpcy5tb2JpbGVOYXZpZ2F0aW9uQ2xhc3NOYW1lKTtcbiAgICB0aGlzLm5hdmlnYXRpb25Jbm5lciA9IHRoaXMubmF2aWdhdGlvbi5xdWVyeVNlbGVjdG9yKCcuJyArIHRoaXMubmF2aWdhdGlvbklubmVyQ2xhc3NOYW1lKTtcbiAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmNvbnRlbnRJZCk7XG5cbiAgICAvLyBDaGVjayBpZiBlbGVtZW50cyBleGlzdFxuICAgIGlmICghdGhpcy5tb2JpbGVOYXZpZ2F0aW9uQ29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gY29uc29sZS53YXJuKCdNb2JpbGUgbmF2aWdhdGlvbiBjb250YWluZXIgbm90IGZvdW5kJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm5hdmlnYXRpb25Jbm5lcikge1xuICAgICAgcmV0dXJuIGNvbnNvbGUud2FybignTmF2aWdhdGlvbiBpbm5lciBub3QgZm91bmQnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY29udGVudCkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUud2FybignTGlicmFyeSBjb250ZW50IG5vdCBmb3VuZCcpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0dXAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cCBmdW5jdGlvbnNcbiAgICogLSBDcmVhdGUgc3RpY2t5IHNpZGViYXJcbiAgICogLSBBZGQgcmVzaXplIGV2ZW50IGxpc3RlbmVyXG4gICAqIC0gU2V0dXAgZXZlbnRzIGZvciBtb2JpbGUgbWVudVxuICAgKi9cbiAgc2V0dXAoKSB7XG4gICAgLy8gQWRkIHJlc2l6ZSBldmVudCBsaXN0ZW5lclxuICAgICQuZXZlbnRzKHdpbmRvdywge1xuICAgICAgcmVzaXplOiB0aGlzLnJlaXplSGFuZGxlcixcbiAgICB9KTtcbiAgICAvLyBNb2JpbGUgbmF2aWdhdGlvblxuICAgICQuZGVsZWdhdGUoZG9jdW1lbnQsICdjbGljaycsICcuJyArIHRoaXMubW9iaWxlTmF2aWdhdGlvbkNvbnRhaW5lckNsYXNzTmFtZSwgdGhpcy5tb2JpbGVOYXZpZ2F0aW9uQ2xpY2tIYW5kbGVyKTtcbiAgICAvLyBDcmVhdGUgc3RpY2t5IHNpZGViYXJcbiAgICB0aGlzLmluaXRTaWRlYmFyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplIGhhbmRsZXJcbiAgICogLSBSZXNldCBhbmQgcmVpbml0YWxpemUgdGhlIGN1cnJlbnQgc3RpY2t5IHNpZGViYXJcbiAgICovXG4gIHJlaXplSGFuZGxlciA9ICgpID0+IHtcbiAgICB0aGlzLmluaXRTaWRlYmFyKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgc3RpY2t5IHNpZGViYXJcbiAgICogLSBTZXQgbWluaW11bSBoZWlnaHQgb2YgdGhlIGNvbnRlbnQgdG8gYmUgdGhlIGhlaWdodCBvZiB0aGUgc2lkZWJhclxuICAgKiAtIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2Ygc3RpY2t5IHNpZGViYXJcbiAgICogQHRvZG86IENyZWF0ZSBzdGlja3kgc2lkZWJhclxuICAgKi9cbiAgaW5pdFNpZGViYXIoKSB7XG4gICAgLy8gQ2hlY2sgdGhlIHdpbmRvdyB3aWR0aCBzbyBpdCBzaG91bGRuJ3QgcnVuIHRoZSBzdGlja3kgc2lkZWJhclxuICAgIC8vIHdoZW4gbGVzcyB0aGFuIGEgY2VydGFpbiB3aWR0aFxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSB0aGlzLm1heFdpZHRoKSByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogTW9iaWxlIG5hdmlnYXRpb24gdG9nZ2xlXG4gICAqIC0gVG9nZ2xlcyB0aGUgb3BlbiBjbGFzc1xuICAgKi9cbiAgbW9iaWxlTmF2aWdhdGlvbkNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICB0b2dnbGVDbGFzcyh0aGlzLm5hdmlnYXRpb25Jbm5lciwgdGhpcy5uYXZpZ2F0aW9uSW5uZXJPcGVuQ2xhc3NOYW1lKTtcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvZGV2ZWxvcG1lbnQvbW9kdWxlcy9saWJyYXJ5LXBhZ2UtbmF2aWdhdGlvbi9pbmRleC5qcyIsIi8qKlxuICogZG9tUmVhZHlcbiAqXG4gKiBSdW5zIGEgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB0aGUgRE9NIGlzIHJlYWR5LlxuICpcbiAqIFN1cHBvcnRlZDogSUU4K1xuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIENhbGxiYWNrIGZvciB3aGVuIHRoZSBET00gaXMgZnVsbHkgbG9hZGVkLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkb21SZWFkeShmbikge1xuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSAnbG9hZGluZycpIHtcbiAgICBmbigpO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZm4pO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50KCdvbnJlYWR5c3RhdGVjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9ICdsb2FkaW5nJykgZm4oKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qcy9zaGFyZWQvbWlzYy9kb20tcmVhZHkuanMiLCIvKipcbiAqIGVsSGFzQ2xhc3NcbiAqXG4gKiBDaGVja3MgaWYgdGhlIGVsZW1lbnQgaGFzIHRoZSBjbGFzcy5cbiAqXG4gKiBTdXBwb3J0ZWQ6IElFOCtcbiAqXG4gKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsIEVsZW1lbnQgdG8gY2hlY2sgdGhlIGNsYXNzIG9mLlxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzIE5hbWUgb2YgdGhlIGNsYXNzIHRvIGNoZWNrIGZvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVsSGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9XG4gIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBjbGFzc05hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KGVsLmNsYXNzTmFtZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2pzL3NoYXJlZC9taXNjL2hhcy1jbGFzcy5qcyIsIi8qKlxuICogdG9nZ2xlQ2xhc3NcbiAqXG4gKiBUb2dnbGVzIHRoZSBjbGFzcyBmb3IgYSBET00gZWxlbWVudC5cbiAqXG4gKiBTdXBwb3J0ZWQ6IElFOCtcbiAqXG4gKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsIEVsZW1lbnQgdG8gdG9nZ2xlIHRoZSBjbGFzcyBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIE5hbWUgb2YgdGhlIGNsYXNzIHRvIHRvZ2dsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsLCBjbGFzc05hbWUsIGZvcmNlKSB7XG4gIC8vIENoZWNrIGlmIG5ldyBjbGFzc0xpc3QgQVBJIGlzIGF2YWxpYWdsZVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUsIGZvcmNlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgYWxsIG9mIHRoZSBjbGFzcyBuYW1lcyBhcyBhbiBhcnJheVxuICBsZXQgY2xhc3NlcyA9IGVsLmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICBsZXQgZXhpc3RpbmdJbmRleCA9IC0xO1xuXG4gIC8vIEZpbmQgdGhlIGluZGV4IG9mIHRoZSBjbGFzc05hbWUgaW4gdGhlIGFycmF5XG4gIGZvciAodmFyIGkgPSBjbGFzc2VzLmxlbmd0aDsgaS0tOyApIHtcbiAgICBpZiAoY2xhc3Nlc1tpXSA9PT0gY2xhc3NOYW1lKSBleGlzdGluZ0luZGV4ID0gaTtcbiAgfVxuXG4gIC8vIFJlbW92ZSBjbGFzc1xuICBpZiAoZXhpc3RpbmdJbmRleCA+PSAwICYmIGZvcmNlICE9PSB0cnVlKSB7XG4gICAgY2xhc3Nlcy5zcGxpY2UoZXhpc3RpbmdJbmRleCwgMSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGZvcmNlICE9PSBmYWxzZSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmUtYWRkIGFsbCBvZiB0aGUgY2xhc3Nlc1xuICBlbC5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvdG9nZ2xlLWNsYXNzLmpzIiwiLyoqXG4gKiBhZGRFdmVudExpc3RlbmVyVG9FbFxuICpcbiAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYW4gZWxlbWVudC5cbiAqXG4gKiBTdXBwb3J0ZWQ6IElFOCtcbiAqXG4gKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsIEVsZW1lbnQgdG8gYWRkIHRoZSBldmVudCB0by5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGVyIENhbGxiYWNrIGZ1bmN0aW9uIHRvIGhhbmRsZSBldmVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJUb0VsKGVsLCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgaWYgKGVsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsLmF0dGFjaEV2ZW50KCdvbicgKyBldmVudE5hbWUsIGZ1bmN0aW9uKCkge1xuICAgIGhhbmRsZXIuY2FsbChlbCk7XG4gIH0pO1xufVxuXG4vKipcbiAqIHJlbW92ZUV2ZW50TGlzdGVuZXJGcm9tRWxcbiAqXG4gKiBSZW1vdmVzIGFuIGV2ZW50IGhhbmRsZXIgZnJvbSBhbiBlbGVtZW50LlxuICpcbiAqIFN1cHBvcnRlZDogSUU4K1xuICpcbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWwgRE9NIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGVyIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIGV2ZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lckZyb21FbChlbCwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gIGlmIChlbC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgIHJldHVybjtcbiAgfVxuICBlbC5kZXRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBoYW5kbGVyKTtcbn1cblxuLyoqXG4gKiByZW1vdmVBbGxFdmVudHNGcm9tRWxcbiAqXG4gKiBSZW1vdmVzIGFsbCBldmVudCBoYW5kbGVycyBmcm9tIGFuIGVsZW1lbnQuXG4gKlxuICogU3VwcG9ydGVkOiBJRTgrXG4gKlxuICogQHBhcmFtIHtET01FbGVtZW50fSBlbCBET00gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWxsRXZlbnRzRnJvbUVsKGVsKSB7XG4gIHZhciBjbG9uZSA9IGVsLmNsb25lTm9kZSh0cnVlKTtcbiAgZWwucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY2xvbmUsIGVsKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvanMvc2hhcmVkL21pc2MvZXZlbnRzLmpzIiwiLyoqXG4gKiBjbG9zZXN0UGFyZW50T2ZFbFxuICpcbiAqIExvb3BzIHVwIHRoZSBET00gdHJlZSB1bnRpbCBpdCBmaW5kcyBhIHBhcmVudCB3aXRoIHRoZSBjbGFzcyBuYW1lLlxuICpcbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWwgRWxlbWVudCB0byBzdGFydCBhbmQgdHJhdmVyc2UgdXAgZnJvbS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgQ2xhc3MgbmFtZSB0byBsb29rIGZvciBpbiBwYXJlbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0UGFyZW50T2ZFbChlbCwgY2xhc3NOYW1lKSB7XG4gIGxldCBtYXRjaGVzID0gKGRvY3VtZW50IHx8IGVsLm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3NOYW1lKTtcbiAgbGV0IGk7XG4gIGRvIHtcbiAgICBpID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgd2hpbGUgKC0taSA+PSAwICYmIG1hdGNoZXMuaXRlbShpKSAhPT0gZWwpIHt9XG4gIH0gd2hpbGUgKGkgPCAwICYmIChlbCA9IGVsLnBhcmVudEVsZW1lbnQpKTtcbiAgcmV0dXJuIGVsO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qcy9zaGFyZWQvbWlzYy9jbG9zZXN0LXBhcmVudC5qcyIsImV4cG9ydCAqIGZyb20gJy4vZG9tLXJlYWR5JztcbmV4cG9ydCAqIGZyb20gJy4vaGFzLWNsYXNzJztcbmV4cG9ydCAqIGZyb20gJy4vdG9nZ2xlLWNsYXNzJztcbmV4cG9ydCAqIGZyb20gJy4vZXZlbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vY2xvc2VzdC1wYXJlbnQnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qcy9zaGFyZWQvbWlzYy9pbmRleC5qcyIsIihmdW5jdGlvbigpIHtcblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBvdmVybG9hZChjYWxsYmFjaywgc3RhcnQsIGVuZCkge1xuXHRzdGFydCA9IHN0YXJ0ID09PSB1bmRlZmluZWQgPyAxIDogc3RhcnQ7XG5cdGVuZCA9IGVuZCB8fCBzdGFydCArIDE7XG5cblx0aWYgKGVuZCAtIHN0YXJ0IDw9IDEpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSBzdGFydCB8fCAkLnR5cGUoYXJndW1lbnRzW3N0YXJ0XSkgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBvYmogPSBhcmd1bWVudHNbc3RhcnRdLCByZXQ7XG5cblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG5cdFx0XHRcdGFyZ3Muc3BsaWNlKHN0YXJ0LCAxLCBrZXksIG9ialtrZXldKTtcblx0XHRcdFx0cmV0ID0gY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBvdmVybG9hZChvdmVybG9hZChjYWxsYmFjaywgc3RhcnQgKyAxLCBlbmQpLCBzdGFydCwgZW5kIC0gMSk7XG59XG5cbi8vIENvcHkgcHJvcGVydGllcyBmcm9tIG9uZSBvYmplY3QgdG8gYW5vdGhlci4gT3ZlcndyaXRlcyBhbGxvd2VkLlxuLy8gU3VidGxlIGRpZmZlcmVuY2Ugb2YgYXJyYXkgdnMgc3RyaW5nIHdoaXRlbGlzdDogSWYgcHJvcGVydHkgZG9lc24ndCBleGlzdCBpbiBmcm9tLCBhcnJheSB3aWxsIG5vdCBkZWZpbmUgaXQuXG5mdW5jdGlvbiBleHRlbmQodG8sIGZyb20sIHdoaXRlbGlzdCkge1xuXHR2YXIgd2hpdGVsaXN0VHlwZSA9IHR5cGUod2hpdGVsaXN0KTtcblxuXHRpZiAod2hpdGVsaXN0VHlwZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdC8vIFRvIGNvcHkgZ2V0dHRlcnMvc2V0dGVycywgcHJlc2VydmUgZmxhZ3MgZXRjXG5cdFx0dmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGZyb20sIHdoaXRlbGlzdCk7XG5cblx0XHRpZiAoZGVzY3JpcHRvciAmJiAoIWRlc2NyaXB0b3Iud3JpdGFibGUgfHwgIWRlc2NyaXB0b3IuY29uZmlndXJhYmxlIHx8ICFkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZGVzY3JpcHRvci5nZXQgfHwgZGVzY3JpcHRvci5zZXQpKSB7XG5cdFx0XHRkZWxldGUgdG9bd2hpdGVsaXN0XTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0bywgd2hpdGVsaXN0LCBkZXNjcmlwdG9yKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0b1t3aGl0ZWxpc3RdID0gZnJvbVt3aGl0ZWxpc3RdO1xuXHRcdH1cblx0fVxuXHRlbHNlIGlmICh3aGl0ZWxpc3RUeXBlID09PSBcImFycmF5XCIpIHtcblx0XHR3aGl0ZWxpc3QuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuXHRcdFx0aWYgKHByb3BlcnR5IGluIGZyb20pIHtcblx0XHRcdFx0ZXh0ZW5kKHRvLCBmcm9tLCBwcm9wZXJ0eSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Zm9yICh2YXIgcHJvcGVydHkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKHdoaXRlbGlzdCkge1xuXHRcdFx0XHRpZiAod2hpdGVsaXN0VHlwZSA9PT0gXCJyZWdleHBcIiAmJiAhd2hpdGVsaXN0LnRlc3QocHJvcGVydHkpIHx8XG5cdFx0XHRcdFx0d2hpdGVsaXN0VHlwZSA9PT0gXCJmdW5jdGlvblwiICYmICF3aGl0ZWxpc3QuY2FsbChmcm9tLCBwcm9wZXJ0eSkpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRleHRlbmQodG8sIGZyb20sIHByb3BlcnR5KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgW1tDbGFzc11dIG9mIGFuIG9iamVjdCBpbiBsb3dlcmNhc2UgKGVnLiBhcnJheSwgZGF0ZSwgcmVnZXhwLCBzdHJpbmcgZXRjKVxuICovXG5mdW5jdGlvbiB0eXBlKG9iaikge1xuXHRpZiAob2JqID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIFwibnVsbFwiO1xuXHR9XG5cblx0aWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIFwidW5kZWZpbmVkXCI7XG5cdH1cblxuXHR2YXIgcmV0ID0gKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopLm1hdGNoKC9eXFxbb2JqZWN0XFxzKyguKj8pXFxdJC8pWzFdIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cblx0aWYgKHJldCA9PSBcIm51bWJlclwiICYmIGlzTmFOKG9iaikpIHtcblx0XHRyZXR1cm4gXCJuYW5cIjtcblx0fVxuXG5cdHJldHVybiByZXQ7XG59XG5cbnZhciAkID0gc2VsZi5CbGlzcyA9IGV4dGVuZChmdW5jdGlvbihleHByLCBjb250ZXh0KSB7XG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIgJiYgIWNvbnRleHQgfHwgIWV4cHIpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiAkLnR5cGUoZXhwcikgPT09IFwic3RyaW5nXCI/IChjb250ZXh0IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKGV4cHIpIDogZXhwciB8fCBudWxsO1xufSwgc2VsZi5CbGlzcyk7XG5cbmV4dGVuZCgkLCB7XG5cdGV4dGVuZDogZXh0ZW5kLFxuXHRvdmVybG9hZDogb3ZlcmxvYWQsXG5cdHR5cGU6IHR5cGUsXG5cblx0cHJvcGVydHk6ICQucHJvcGVydHkgfHwgXCJfXCIsXG5cblx0c291cmNlczoge30sXG5cblx0bm9vcDogZnVuY3Rpb24oKSB7fSxcblxuXHQkOiBmdW5jdGlvbihleHByLCBjb250ZXh0KSB7XG5cdFx0aWYgKGV4cHIgaW5zdGFuY2VvZiBOb2RlIHx8IGV4cHIgaW5zdGFuY2VvZiBXaW5kb3cpIHtcblx0XHRcdHJldHVybiBbZXhwcl07XG5cdFx0fVxuXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMiAmJiAhY29udGV4dCkge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH1cblxuXHRcdHJldHVybiBBcnJheS5mcm9tKHR5cGVvZiBleHByID09IFwic3RyaW5nXCI/IChjb250ZXh0IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKGV4cHIpIDogZXhwciB8fCBbXSk7XG5cdH0sXG5cblx0Lypcblx0ICogUmV0dXJuIGZpcnN0IG5vbi11bmRlZmluZWQgdmFsdWUuIE1haW5seSB1c2VkIGludGVybmFsbHkuXG5cdCAqL1xuXHRkZWZpbmVkOiBmdW5jdGlvbiAoKSB7XG5cdFx0Zm9yICh2YXIgaT0wOyBpPGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGFyZ3VtZW50c1tpXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHJldHVybiBhcmd1bWVudHNbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGNyZWF0ZTogZnVuY3Rpb24gKHRhZywgbykge1xuXHRcdGlmICh0YWcgaW5zdGFuY2VvZiBOb2RlKSB7XG5cdFx0XHRyZXR1cm4gJC5zZXQodGFnLCBvKTtcblx0XHR9XG5cblx0XHQvLyA0IHNpZ25hdHVyZXM6ICh0YWcsIG8pLCAodGFnKSwgKG8pLCAoKVxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRpZiAoJC50eXBlKHRhZykgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0byA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG8gPSB0YWc7XG5cdFx0XHRcdHRhZyA9IG8udGFnO1xuXHRcdFx0XHRvID0gJC5leHRlbmQoe30sIG8sIGZ1bmN0aW9uKHByb3BlcnR5KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHByb3BlcnR5ICE9PSBcInRhZ1wiO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gJC5zZXQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcgfHwgXCJkaXZcIiksIG8pO1xuXHR9LFxuXG5cdGVhY2g6IGZ1bmN0aW9uKG9iaiwgY2FsbGJhY2ssIHJldCkge1xuXHRcdHJldCA9IHJldCB8fCB7fTtcblxuXHRcdGZvciAodmFyIHByb3BlcnR5IGluIG9iaikge1xuXHRcdFx0cmV0W3Byb3BlcnR5XSA9IGNhbGxiYWNrLmNhbGwob2JqLCBwcm9wZXJ0eSwgb2JqW3Byb3BlcnR5XSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHRyZWFkeTogZnVuY3Rpb24oY29udGV4dCkge1xuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0aWYgKGNvbnRleHQucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCIpIHtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNvbnRleHQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHQvLyBIZWxwZXIgZm9yIGRlZmluaW5nIE9PUC1saWtlIOKAnGNsYXNzZXPigJ1cblx0Q2xhc3M6IGZ1bmN0aW9uKG8pIHtcblx0XHR2YXIgc3BlY2lhbCA9IFtcImNvbnN0cnVjdG9yXCIsIFwiZXh0ZW5kc1wiLCBcImFic3RyYWN0XCIsIFwic3RhdGljXCJdLmNvbmNhdChPYmplY3Qua2V5cygkLmNsYXNzUHJvcHMpKTtcblx0XHR2YXIgaW5pdCA9IG8uaGFzT3duUHJvcGVydHkoXCJjb25zdHJ1Y3RvclwiKT8gby5jb25zdHJ1Y3RvciA6ICQubm9vcDtcblxuXHRcdHZhciBDbGFzcyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHRoaXMuY29uc3RydWN0b3IuX19hYnN0cmFjdCAmJiB0aGlzLmNvbnN0cnVjdG9yID09PSBDbGFzcykge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJBYnN0cmFjdCBjbGFzc2VzIGNhbm5vdCBiZSBkaXJlY3RseSBpbnN0YW50aWF0ZWQuXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHRDbGFzcy5zdXBlciAmJiBDbGFzcy5zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0XHRpbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fTtcblxuXHRcdENsYXNzLnN1cGVyID0gby5leHRlbmRzIHx8IG51bGw7XG5cblx0XHRDbGFzcy5wcm90b3R5cGUgPSAkLmV4dGVuZChPYmplY3QuY3JlYXRlKENsYXNzLnN1cGVyPyBDbGFzcy5zdXBlci5wcm90b3R5cGUgOiBPYmplY3QpLCB7XG5cdFx0XHRjb25zdHJ1Y3RvcjogQ2xhc3Ncblx0XHR9KTtcblxuXHRcdHZhciBzcGVjaWFsRmlsdGVyID0gZnVuY3Rpb24ocHJvcGVydHkpIHtcblx0XHRcdHJldHVybiB0aGlzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSAmJiBzcGVjaWFsLmluZGV4T2YocHJvcGVydHkpID09PSAtMTtcblx0XHR9O1xuXG5cdFx0Ly8gU3RhdGljIG1ldGhvZHNcblx0XHRpZiAoby5zdGF0aWMpIHtcblx0XHRcdCQuZXh0ZW5kKENsYXNzLCBvLnN0YXRpYywgc3BlY2lhbEZpbHRlcik7XG5cblx0XHRcdGZvciAodmFyIHByb3BlcnR5IGluICQuY2xhc3NQcm9wcykge1xuXHRcdFx0XHRpZiAocHJvcGVydHkgaW4gby5zdGF0aWMpIHtcblx0XHRcdFx0XHQkLmNsYXNzUHJvcHNbcHJvcGVydHldKENsYXNzLCBvLnN0YXRpY1twcm9wZXJ0eV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSW5zdGFuY2UgbWV0aG9kc1xuXHRcdCQuZXh0ZW5kKENsYXNzLnByb3RvdHlwZSwgbywgc3BlY2lhbEZpbHRlcik7XG5cblx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiAkLmNsYXNzUHJvcHMpIHtcblx0XHRcdGlmIChwcm9wZXJ0eSBpbiBvKSB7XG5cdFx0XHRcdCQuY2xhc3NQcm9wc1twcm9wZXJ0eV0oQ2xhc3MucHJvdG90eXBlLCBvW3Byb3BlcnR5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRm9yIGVhc2llciBjYWxsaW5nIG9mIHN1cGVyIG1ldGhvZHNcblx0XHQvLyBUaGlzIGRvZXNuJ3Qgc2F2ZSB1cyBmcm9tIGhhdmluZyB0byB1c2UgLmNhbGwodGhpcykgdGhvdWdoXG5cdFx0Q2xhc3MucHJvdG90eXBlLnN1cGVyID0gQ2xhc3Muc3VwZXI/IENsYXNzLnN1cGVyLnByb3RvdHlwZSA6IG51bGw7XG5cblx0XHRDbGFzcy5fX2Fic3RyYWN0ID0gISFvLmFic3RyYWN0O1xuXG5cdFx0cmV0dXJuIENsYXNzO1xuXHR9LFxuXG5cdC8vIFByb3BlcnRpZXMgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGluIGNsYXNzZXNcblx0Y2xhc3NQcm9wczoge1xuXHRcdC8vIExhemlseSBldmFsdWF0ZWQgcHJvcGVydGllc1xuXHRcdGxhenk6IG92ZXJsb2FkKGZ1bmN0aW9uKG9iaiwgcHJvcGVydHksIGdldHRlcikge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcGVydHksIHtcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR2YXIgdmFsdWUgPSBnZXR0ZXIuY2FsbCh0aGlzKTtcblxuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBwcm9wZXJ0eSwge1xuXHRcdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdHdyaXRhYmxlOiB0cnVlXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0XHQvLyBCbGluZCB3cml0ZTogc2tpcCBydW5uaW5nIHRoZSBnZXR0ZXJcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJvcGVydHksIHtcblx0XHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWVcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH0pLFxuXG5cdFx0Ly8gUHJvcGVydGllcyB0aGF0IGJlaGF2ZSBsaWtlIG5vcm1hbCBwcm9wZXJ0aWVzIGJ1dCBhbHNvIGV4ZWN1dGUgY29kZSB1cG9uIGdldHRpbmcvc2V0dGluZ1xuXHRcdGxpdmU6IG92ZXJsb2FkKGZ1bmN0aW9uKG9iaiwgcHJvcGVydHksIGRlc2NyaXB0b3IpIHtcblx0XHRcdGlmICgkLnR5cGUoZGVzY3JpcHRvcikgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRkZXNjcmlwdG9yID0ge3NldDogZGVzY3JpcHRvcn07XG5cdFx0XHR9XG5cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3BlcnR5LCB7XG5cdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyIHZhbHVlID0gdGhpc1tcIl9cIiArIHByb3BlcnR5XTtcblx0XHRcdFx0XHR2YXIgcmV0ID0gZGVzY3JpcHRvci5nZXQgJiYgZGVzY3JpcHRvci5nZXQuY2FsbCh0aGlzLCB2YWx1ZSk7XG5cdFx0XHRcdFx0cmV0dXJuIHJldCAhPT0gdW5kZWZpbmVkPyByZXQgOiB2YWx1ZTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0OiBmdW5jdGlvbih2KSB7XG5cdFx0XHRcdFx0dmFyIHZhbHVlID0gdGhpc1tcIl9cIiArIHByb3BlcnR5XTtcblx0XHRcdFx0XHR2YXIgcmV0ID0gZGVzY3JpcHRvci5zZXQgJiYgZGVzY3JpcHRvci5zZXQuY2FsbCh0aGlzLCB2LCB2YWx1ZSk7XG5cdFx0XHRcdFx0dGhpc1tcIl9cIiArIHByb3BlcnR5XSA9IHJldCAhPT0gdW5kZWZpbmVkPyByZXQgOiB2O1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRjb25maWd1cmFibGU6IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlLFxuXHRcdFx0XHRlbnVtZXJhYmxlOiBkZXNjcmlwdG9yLmVudW1lcmFibGVcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH0pXG5cblx0fSxcblxuXHQvLyBJbmNsdWRlcyBhIHNjcmlwdCwgcmV0dXJucyBhIHByb21pc2Vcblx0aW5jbHVkZTogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHVybCA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV07XG5cdFx0dmFyIGxvYWRlZCA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDI/IGFyZ3VtZW50c1swXSA6IGZhbHNlO1xuXG5cdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG5cblx0XHRyZXR1cm4gbG9hZGVkPyBQcm9taXNlLnJlc29sdmUoKSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0JC5zZXQoc2NyaXB0LCB7XG5cdFx0XHRcdGFzeW5jOiB0cnVlLFxuXHRcdFx0XHRvbmxvYWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0XHQkLnJlbW92ZShzY3JpcHQpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbmVycm9yOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZWplY3QoKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c3JjOiB1cmwsXG5cdFx0XHRcdGluc2lkZTogZG9jdW1lbnQuaGVhZFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0fSxcblxuXHQvKlxuXHQgKiBGZXRjaCBBUEkgaW5zcGlyZWQgWEhSIHdyYXBwZXIuIFJldHVybnMgcHJvbWlzZS5cblx0ICovXG5cdGZldGNoOiBmdW5jdGlvbih1cmwsIG8pIHtcblx0XHRpZiAoIXVybCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIlVSTCBwYXJhbWV0ZXIgaXMgbWFuZGF0b3J5IGFuZCBjYW5ub3QgYmUgXCIgKyB1cmwpO1xuXHRcdH1cblxuXHRcdC8vIFNldCBkZWZhdWx0cyAmIGZpeHVwIGFyZ3VtZW50c1xuXHRcdHZhciBlbnYgPSBleHRlbmQoe1xuXHRcdFx0dXJsOiBuZXcgVVJMKHVybCwgbG9jYXRpb24pLFxuXHRcdFx0ZGF0YTogXCJcIixcblx0XHRcdG1ldGhvZDogXCJHRVRcIixcblx0XHRcdGhlYWRlcnM6IHt9LFxuXHRcdFx0eGhyOiBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXHRcdH0sIG8pO1xuXG5cdFx0ZW52Lm1ldGhvZCA9IGVudi5tZXRob2QudG9VcHBlckNhc2UoKTtcblxuXHRcdCQuaG9va3MucnVuKFwiZmV0Y2gtYXJnc1wiLCBlbnYpO1xuXG5cdFx0Ly8gU3RhcnQgc2VuZGluZyB0aGUgcmVxdWVzdFxuXG5cdFx0aWYgKGVudi5tZXRob2QgPT09IFwiR0VUXCIgJiYgZW52LmRhdGEpIHtcblx0XHRcdGVudi51cmwuc2VhcmNoICs9IGVudi5kYXRhO1xuXHRcdH1cblxuXHRcdGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKFwiZGF0YS1sb2FkaW5nXCIsIGVudi51cmwpO1xuXG5cdFx0ZW52Lnhoci5vcGVuKGVudi5tZXRob2QsIGVudi51cmwuaHJlZiwgZW52LmFzeW5jICE9PSBmYWxzZSwgZW52LnVzZXIsIGVudi5wYXNzd29yZCk7XG5cblx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiBvKSB7XG5cdFx0XHRpZiAocHJvcGVydHkgaW4gZW52Lnhocikge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGVudi54aHJbcHJvcGVydHldID0gb1twcm9wZXJ0eV07XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRzZWxmLmNvbnNvbGUgJiYgY29uc29sZS5lcnJvcihlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChlbnYubWV0aG9kICE9PSBcIkdFVFwiICYmICFlbnYuaGVhZGVyc1tcIkNvbnRlbnQtdHlwZVwiXSAmJiAhZW52LmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0pIHtcblx0XHRcdGVudi54aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBoZWFkZXIgaW4gZW52LmhlYWRlcnMpIHtcblx0XHRcdGVudi54aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGVudi5oZWFkZXJzW2hlYWRlcl0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdGVudi54aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1sb2FkaW5nXCIpO1xuXG5cdFx0XHRcdGlmIChlbnYueGhyLnN0YXR1cyA9PT0gMCB8fCBlbnYueGhyLnN0YXR1cyA+PSAyMDAgJiYgZW52Lnhoci5zdGF0dXMgPCAzMDAgfHwgZW52Lnhoci5zdGF0dXMgPT09IDMwNCkge1xuXHRcdFx0XHRcdC8vIFN1Y2Nlc3MhXG5cdFx0XHRcdFx0cmVzb2x2ZShlbnYueGhyKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoJC5leHRlbmQoRXJyb3IoZW52Lnhoci5zdGF0dXNUZXh0KSwge1xuXHRcdFx0XHRcdFx0eGhyOiBlbnYueGhyLFxuXHRcdFx0XHRcdFx0Z2V0IHN0YXR1cygpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMueGhyLnN0YXR1cztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGVudi54aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtbG9hZGluZ1wiKTtcblx0XHRcdFx0cmVqZWN0KCQuZXh0ZW5kKEVycm9yKFwiTmV0d29yayBFcnJvclwiKSwge3hocjogZW52Lnhocn0pKTtcblx0XHRcdH07XG5cblx0XHRcdGVudi54aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWxvYWRpbmdcIik7XG5cdFx0XHQgICAgcmVqZWN0KCQuZXh0ZW5kKEVycm9yKFwiTmV0d29yayBUaW1lb3V0XCIpLCB7eGhyOiBlbnYueGhyfSkpO1xuXHRcdFx0fTtcblxuXHRcdFx0ZW52Lnhoci5zZW5kKGVudi5tZXRob2QgPT09IFwiR0VUXCI/IG51bGwgOiBlbnYuZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0dmFsdWU6IGZ1bmN0aW9uKG9iaikge1xuXHRcdHZhciBoYXNSb290ID0gJC50eXBlKG9iaikgIT09IFwic3RyaW5nXCI7XG5cblx0XHRyZXR1cm4gJC4kKGFyZ3VtZW50cykuc2xpY2UoK2hhc1Jvb3QpLnJlZHVjZShmdW5jdGlvbihvYmosIHByb3BlcnR5KSB7XG5cdCAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmpbcHJvcGVydHldO1xuXHQgICAgfSwgaGFzUm9vdD8gb2JqIDogc2VsZik7XG5cdH1cbn0pO1xuXG4kLkhvb2tzID0gbmV3ICQuQ2xhc3Moe1xuXHRhZGQ6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgZmlyc3QpIHtcblx0XHQoQXJyYXkuaXNBcnJheShuYW1lKT8gbmFtZSA6IFtuYW1lXSkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG5cdFx0XHR0aGlzW25hbWVdID0gdGhpc1tuYW1lXSB8fCBbXTtcblx0XHRcdHRoaXNbbmFtZV1bZmlyc3Q/IFwidW5zaGlmdFwiIDogXCJwdXNoXCJdKGNhbGxiYWNrKTtcblx0XHR9LCB0aGlzKTtcblx0fSxcblxuXHRydW46IGZ1bmN0aW9uIChuYW1lLCBlbnYpIHtcblx0XHR0aGlzW25hbWVdID0gdGhpc1tuYW1lXSB8fCBbXTtcblx0XHR0aGlzW25hbWVdLmZvckVhY2goZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdGNhbGxiYWNrLmNhbGwoZW52ICYmIGVudi5jb250ZXh0PyBlbnYuY29udGV4dCA6IGVudiwgZW52KTtcblx0XHR9KTtcblx0fVxufSk7XG5cbiQuaG9va3MgPSBuZXcgJC5Ib29rcygpO1xuXG52YXIgXyA9ICQucHJvcGVydHk7XG5cbiQuRWxlbWVudCA9IGZ1bmN0aW9uIChzdWJqZWN0KSB7XG5cdHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG5cblx0Ly8gQXV0aG9yLWRlZmluZWQgZWxlbWVudC1yZWxhdGVkIGRhdGFcblx0dGhpcy5kYXRhID0ge307XG5cblx0Ly8gSW50ZXJuYWwgQmxpc3MgZWxlbWVudC1yZWxhdGVkIGRhdGFcblx0dGhpcy5ibGlzcyA9IHt9O1xufTtcblxuJC5FbGVtZW50LnByb3RvdHlwZSA9IHtcblx0c2V0OiBvdmVybG9hZChmdW5jdGlvbihwcm9wZXJ0eSwgdmFsdWUpIHtcblxuXHRcdGlmIChwcm9wZXJ0eSBpbiAkLnNldFByb3BzKSB7XG5cdFx0XHQkLnNldFByb3BzW3Byb3BlcnR5XS5jYWxsKHRoaXMsIHZhbHVlKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAocHJvcGVydHkgaW4gdGhpcykge1xuXHRcdFx0dGhpc1twcm9wZXJ0eV0gPSB2YWx1ZTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLnNldEF0dHJpYnV0ZShwcm9wZXJ0eSwgdmFsdWUpO1xuXHRcdH1cblxuXHR9LCAwKSxcblxuXHQvLyBSdW4gYSBDU1MgdHJhbnNpdGlvbiwgcmV0dXJuIHByb21pc2Vcblx0dHJhbnNpdGlvbjogZnVuY3Rpb24ocHJvcHMsIGR1cmF0aW9uKSB7XG5cdFx0ZHVyYXRpb24gPSArZHVyYXRpb24gfHwgNDAwO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0aWYgKFwidHJhbnNpdGlvblwiIGluIHRoaXMuc3R5bGUpIHtcblx0XHRcdFx0Ly8gR2V0IGV4aXN0aW5nIHN0eWxlXG5cdFx0XHRcdHZhciBwcmV2aW91cyA9ICQuZXh0ZW5kKHt9LCB0aGlzLnN0eWxlLCAvXnRyYW5zaXRpb24oRHVyYXRpb258UHJvcGVydHkpJC8pO1xuXG5cdFx0XHRcdCQuc3R5bGUodGhpcywge1xuXHRcdFx0XHRcdHRyYW5zaXRpb25EdXJhdGlvbjogKGR1cmF0aW9uIHx8IDQwMCkgKyBcIm1zXCIsXG5cdFx0XHRcdFx0dHJhbnNpdGlvblByb3BlcnR5OiBPYmplY3Qua2V5cyhwcm9wcykuam9pbihcIiwgXCIpXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQub25jZSh0aGlzLCBcInRyYW5zaXRpb25lbmRcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KGkpO1xuXHRcdFx0XHRcdCQuc3R5bGUodGhpcywgcHJldmlvdXMpO1xuXHRcdFx0XHRcdHJlc29sdmUodGhpcyk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIEZhaWxzYWZlLCBpbiBjYXNlIHRyYW5zaXRpb25lbmQgZG9lc27igJl0IGZpcmVcblx0XHRcdFx0dmFyIGkgPSBzZXRUaW1lb3V0KHJlc29sdmUsIGR1cmF0aW9uKzUwLCB0aGlzKTtcblxuXHRcdFx0XHQkLnN0eWxlKHRoaXMsIHByb3BzKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkLnN0eWxlKHRoaXMsIHByb3BzKTtcblx0XHRcdFx0cmVzb2x2ZSh0aGlzKTtcblx0XHRcdH1cblx0XHR9LmJpbmQodGhpcykpO1xuXHR9LFxuXG5cdC8vIEZpcmUgYSBzeW50aGVzaXplZCBldmVudCBvbiB0aGUgZWxlbWVudFxuXHRmaXJlOiBmdW5jdGlvbiAodHlwZSwgcHJvcGVydGllcykge1xuXHRcdHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7XG5cblx0XHRldnQuaW5pdEV2ZW50KHR5cGUsIHRydWUsIHRydWUgKTtcblxuXHRcdC8vIFJldHVybiB0aGUgcmVzdWx0IG9mIGRpc3BhdGNoaW5nIHRoZSBldmVudCwgc28gd2Vcblx0XHQvLyBjYW4ga25vdyBpZiBgZS5wcmV2ZW50RGVmYXVsdGAgd2FzIGNhbGxlZCBpbnNpZGUgaXRcblx0XHRyZXR1cm4gdGhpcy5kaXNwYXRjaEV2ZW50KCQuZXh0ZW5kKGV2dCwgcHJvcGVydGllcykpO1xuXHR9LFxuXG5cdHVuYmluZDogb3ZlcmxvYWQoZnVuY3Rpb24oZXZlbnRzLCBjYWxsYmFjaykge1xuXHRcdChldmVudHMgfHwgXCJcIikuc3BsaXQoL1xccysvKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG5cdFx0XHRpZiAoKF8gaW4gdGhpcykgJiYgKHR5cGUuaW5kZXhPZihcIi5cIikgPiAtMSB8fCAhY2FsbGJhY2spKSB7XG5cdFx0XHRcdC8vIE1hc3MgdW5iaW5kaW5nLCBuZWVkIHRvIGdvIHRocm91Z2ggbGlzdGVuZXJzXG5cdFx0XHRcdHR5cGUgPSAodHlwZSB8fCBcIlwiKS5zcGxpdChcIi5cIik7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSB0eXBlWzFdO1xuXHRcdFx0XHR0eXBlID0gdHlwZVswXTtcblx0XHRcdFx0Ly8gbWFuLCBjYW7igJl0IHdhaXQgdG8gYmUgYWJsZSB0byBkbyBbdHlwZSwgY2xhc3NOYW1lXSA9IHR5cGUuc3BsaXQoXCIuXCIpO1xuXG5cdFx0XHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzW19dLmJsaXNzLmxpc3RlbmVycyA9IHRoaXNbX10uYmxpc3MubGlzdGVuZXJzIHx8IHt9O1xuXG5cdFx0XHRcdGZvciAodmFyIGx0eXBlIGluIGxpc3RlbmVycykge1xuXHRcdFx0XHRcdGlmICghdHlwZSB8fCBsdHlwZSA9PT0gdHlwZSkge1xuXHRcdFx0XHRcdFx0Ly8gTm8gZm9yRWFjaCwgYmVjYXVzZSB3ZeKAmXJlIG11dGF0aW5nIHRoZSBhcnJheVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaT0wLCBsOyBsPWxpc3RlbmVyc1tsdHlwZV1baV07IGkrKykge1xuXHRcdFx0XHRcdFx0XHRpZiAoKCFjbGFzc05hbWUgfHwgY2xhc3NOYW1lID09PSBsLmNsYXNzTmFtZSkgJiZcblx0XHRcdFx0XHRcdFx0ICAgICghY2FsbGJhY2sgfHwgY2FsbGJhY2sgPT09IGwuY2FsbGJhY2sgKSkgeyAvLyBUT0RPIHdoYXQgYWJvdXQgY2FwdHVyZT9cblx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIobHR5cGUsIGwuY2FsbGJhY2ssIGwuY2FwdHVyZSk7XG5cdFx0XHRcdFx0XHRcdFx0aS0tO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQvLyBOb3JtYWwgZXZlbnQgdW5iaW5kaW5nLCBkZWZlciB0byBuYXRpdmUgSlNcblx0XHRcdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcblx0XHRcdH1cblx0XHR9LCB0aGlzKTtcblx0fSwgMClcbn07XG5cbi8qXG4gKiBQcm9wZXJ0aWVzIHdpdGggY3VzdG9tIGhhbmRsaW5nIGluICQuc2V0KClcbiAqIEFsc28gYXZhaWxhYmxlIGFzIGZ1bmN0aW9ucyBkaXJlY3RseSBvbiBlbGVtZW50Ll8gYW5kIG9uICRcbiAqL1xuJC5zZXRQcm9wcyA9IHtcblx0Ly8gU2V0IGEgYnVuY2ggb2YgaW5saW5lIENTUyBzdHlsZXNcblx0c3R5bGU6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHQkLmV4dGVuZCh0aGlzLnN0eWxlLCB2YWwpO1xuXHR9LFxuXG5cdC8vIFNldCBhIGJ1bmNoIG9mIGF0dHJpYnV0ZXNcblx0YXR0cmlidXRlczogZnVuY3Rpb24gKG8pIHtcblx0XHRmb3IgKHZhciBhdHRyaWJ1dGUgaW4gbykge1xuXHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCBvW2F0dHJpYnV0ZV0pO1xuXHRcdH1cblx0fSxcblxuXHQvLyBTZXQgYSBidW5jaCBvZiBwcm9wZXJ0aWVzIG9uIHRoZSBlbGVtZW50XG5cdHByb3BlcnRpZXM6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHQkLmV4dGVuZCh0aGlzLCB2YWwpO1xuXHR9LFxuXG5cdC8vIEJpbmQgb25lIG9yIG1vcmUgZXZlbnRzIHRvIHRoZSBlbGVtZW50XG5cdGV2ZW50czogZnVuY3Rpb24gKHZhbCkge1xuXHRcdGlmICh2YWwgJiYgdmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcblx0XHRcdC8vIENvcHkgZXZlbnRzIGZyb20gb3RoZXIgZWxlbWVudCAocmVxdWlyZXMgQmxpc3MgRnVsbClcblx0XHRcdHZhciBtZSA9IHRoaXM7XG5cblx0XHRcdC8vIENvcHkgbGlzdGVuZXJzXG5cdFx0XHRpZiAodmFsW19dICYmIHZhbFtfXS5ibGlzcykge1xuXHRcdFx0XHR2YXIgbGlzdGVuZXJzID0gdmFsW19dLmJsaXNzLmxpc3RlbmVycztcblxuXHRcdFx0XHRmb3IgKHZhciB0eXBlIGluIGxpc3RlbmVycykge1xuXHRcdFx0XHRcdGxpc3RlbmVyc1t0eXBlXS5mb3JFYWNoKGZ1bmN0aW9uKGwpIHtcblx0XHRcdFx0XHRcdG1lLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbC5jYWxsYmFjaywgbC5jYXB0dXJlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb3B5IGlubGluZSBldmVudHNcblx0XHRcdGZvciAodmFyIG9uZXZlbnQgaW4gdmFsKSB7XG5cdFx0XHRcdGlmIChvbmV2ZW50LmluZGV4T2YoXCJvblwiKSA9PT0gMCkge1xuXHRcdFx0XHRcdHRoaXNbb25ldmVudF0gPSB2YWxbb25ldmVudF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgJC50eXBlKHZhbCkgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1sxXSwgY2FwdHVyZSA9IGFyZ3VtZW50c1syXTtcblxuXHRcdFx0dmFsLnNwbGl0KC9cXHMrLykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaywgY2FwdHVyZSk7XG5cdFx0XHR9LCB0aGlzKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRmb3IgKHZhciBldmVudHMgaW4gdmFsKSB7XG5cdFx0XHRcdCQuZXZlbnRzKHRoaXMsIGV2ZW50cywgdmFsW2V2ZW50c10pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRvbmNlOiBvdmVybG9hZChmdW5jdGlvbihldmVudHMsIGNhbGxiYWNrKSB7XG5cdFx0ZXZlbnRzID0gZXZlbnRzLnNwbGl0KC9cXHMrLyk7XG5cdFx0dmFyIG1lID0gdGhpcztcblx0XHR2YXIgb25jZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0ZXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0bWUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgb25jZSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrLmFwcGx5KG1lLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cblx0XHRldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdG1lLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIG9uY2UpO1xuXHRcdH0pO1xuXHR9LCAwKSxcblxuXHQvLyBFdmVudCBkZWxlZ2F0aW9uXG5cdGRlbGVnYXRlOiBvdmVybG9hZChmdW5jdGlvbiAodHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0aWYgKGV2dC50YXJnZXQuY2xvc2VzdChzZWxlY3RvcikpIHtcblx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCBldnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LCAwLCAyKSxcblxuXHQvLyBTZXQgdGhlIGNvbnRlbnRzIGFzIGEgc3RyaW5nLCBhbiBlbGVtZW50LCBhbiBvYmplY3QgdG8gY3JlYXRlIGFuIGVsZW1lbnQgb3IgYW4gYXJyYXkgb2YgdGhlc2Vcblx0Y29udGVudHM6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRpZiAodmFsIHx8IHZhbCA9PT0gMCkge1xuXHRcdFx0KEFycmF5LmlzQXJyYXkodmFsKT8gdmFsIDogW3ZhbF0pLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG5cdFx0XHRcdHZhciB0eXBlID0gJC50eXBlKGNoaWxkKTtcblxuXHRcdFx0XHRpZiAoL14oc3RyaW5nfG51bWJlcikkLy50ZXN0KHR5cGUpKSB7XG5cdFx0XHRcdFx0Y2hpbGQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCArIFwiXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0XHRjaGlsZCA9ICQuY3JlYXRlKGNoaWxkKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIE5vZGUpIHtcblx0XHRcdFx0XHR0aGlzLmFwcGVuZENoaWxkKGNoaWxkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdGhpcyk7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIEFwcGVuZCB0aGUgZWxlbWVudCBpbnNpZGUgYW5vdGhlciBlbGVtZW50XG5cdGluc2lkZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMpO1xuXHR9LFxuXG5cdC8vIEluc2VydCB0aGUgZWxlbWVudCBiZWZvcmUgYW5vdGhlciBlbGVtZW50XG5cdGJlZm9yZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRlbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMsIGVsZW1lbnQpO1xuXHR9LFxuXG5cdC8vIEluc2VydCB0aGUgZWxlbWVudCBhZnRlciBhbm90aGVyIGVsZW1lbnRcblx0YWZ0ZXI6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0ZWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLCBlbGVtZW50Lm5leHRTaWJsaW5nKTtcblx0fSxcblxuXHQvLyBJbnNlcnQgdGhlIGVsZW1lbnQgYmVmb3JlIGFub3RoZXIgZWxlbWVudCdzIGNvbnRlbnRzXG5cdHN0YXJ0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdGVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMsIGVsZW1lbnQuZmlyc3RDaGlsZCk7XG5cdH0sXG5cblx0Ly8gV3JhcCB0aGUgZWxlbWVudCBhcm91bmQgYW5vdGhlciBlbGVtZW50XG5cdGFyb3VuZDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRpZiAoZWxlbWVudC5wYXJlbnROb2RlKSB7XG5cdFx0XHQkLmJlZm9yZSh0aGlzLCBlbGVtZW50KTtcblx0XHR9XG5cblx0XHQoL150ZW1wbGF0ZSQvaS50ZXN0KHRoaXMubm9kZU5hbWUpPyB0aGlzLmNvbnRlbnQgfHwgdGhpcyA6IHRoaXMpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXHR9XG59O1xuXG4kLkFycmF5ID0gZnVuY3Rpb24gKHN1YmplY3QpIHtcblx0dGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbn07XG5cbiQuQXJyYXkucHJvdG90eXBlID0ge1xuXHRhbGw6IGZ1bmN0aW9uKG1ldGhvZCkge1xuXHRcdHZhciBhcmdzID0gJCQoYXJndW1lbnRzKS5zbGljZSgxKTtcblxuXHRcdHJldHVybiB0aGlzW21ldGhvZF0uYXBwbHkodGhpcywgYXJncyk7XG5cdH1cbn07XG5cbi8vIEV4dGVuZHMgQmxpc3Mgd2l0aCBtb3JlIG1ldGhvZHNcbiQuYWRkID0gb3ZlcmxvYWQoZnVuY3Rpb24obWV0aG9kLCBjYWxsYmFjaywgb24sIG5vT3ZlcndyaXRlKSB7XG5cdG9uID0gJC5leHRlbmQoeyQ6IHRydWUsIGVsZW1lbnQ6IHRydWUsIGFycmF5OiB0cnVlfSwgb24pO1xuXG5cdGlmICgkLnR5cGUoY2FsbGJhY2spID09IFwiZnVuY3Rpb25cIikge1xuXHRcdGlmIChvbi5lbGVtZW50ICYmICghKG1ldGhvZCBpbiAkLkVsZW1lbnQucHJvdG90eXBlKSB8fCAhbm9PdmVyd3JpdGUpKSB7XG5cdFx0XHQkLkVsZW1lbnQucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnN1YmplY3QgJiYgJC5kZWZpbmVkKGNhbGxiYWNrLmFwcGx5KHRoaXMuc3ViamVjdCwgYXJndW1lbnRzKSwgdGhpcy5zdWJqZWN0KTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKG9uLmFycmF5ICYmICghKG1ldGhvZCBpbiAkLkFycmF5LnByb3RvdHlwZSkgfHwgIW5vT3ZlcndyaXRlKSkge1xuXHRcdFx0JC5BcnJheS5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cztcblx0XHRcdFx0cmV0dXJuIHRoaXMuc3ViamVjdC5tYXAoZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50ICYmICQuZGVmaW5lZChjYWxsYmFjay5hcHBseShlbGVtZW50LCBhcmdzKSwgZWxlbWVudCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAob24uJCkge1xuXHRcdFx0JC5zb3VyY2VzW21ldGhvZF0gPSAkW21ldGhvZF0gPSBjYWxsYmFjaztcblxuXHRcdFx0aWYgKG9uLmFycmF5IHx8IG9uLmVsZW1lbnQpIHtcblx0XHRcdFx0JFttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBhcmdzID0gW10uc2xpY2UuYXBwbHkoYXJndW1lbnRzKTtcblx0XHRcdFx0XHR2YXIgc3ViamVjdCA9IGFyZ3Muc2hpZnQoKTtcblx0XHRcdFx0XHR2YXIgVHlwZSA9IG9uLmFycmF5ICYmIEFycmF5LmlzQXJyYXkoc3ViamVjdCk/IFwiQXJyYXlcIiA6IFwiRWxlbWVudFwiO1xuXG5cdFx0XHRcdFx0cmV0dXJuICRbVHlwZV0ucHJvdG90eXBlW21ldGhvZF0uYXBwbHkoe3N1YmplY3Q6IHN1YmplY3R9LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0sIDApO1xuXG4kLmFkZCgkLkFycmF5LnByb3RvdHlwZSwge2VsZW1lbnQ6IGZhbHNlfSk7XG4kLmFkZCgkLkVsZW1lbnQucHJvdG90eXBlKTtcbiQuYWRkKCQuc2V0UHJvcHMpO1xuJC5hZGQoJC5jbGFzc1Byb3BzLCB7ZWxlbWVudDogZmFsc2UsIGFycmF5OiBmYWxzZX0pO1xuXG4vLyBBZGQgbmF0aXZlIG1ldGhvZHMgb24gJCBhbmQgX1xudmFyIGR1bW15ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIik7XG4kLmFkZCgkLmV4dGVuZCh7fSwgSFRNTEVsZW1lbnQucHJvdG90eXBlLCBmdW5jdGlvbihtZXRob2QpIHtcblx0cmV0dXJuICQudHlwZShkdW1teVttZXRob2RdKSA9PT0gXCJmdW5jdGlvblwiO1xufSksIG51bGwsIHRydWUpO1xuXG5cbn0pKCk7XG5cbihmdW5jdGlvbigkKSB7XG5cInVzZSBzdHJpY3RcIjtcblxuaWYgKCFCbGlzcyB8fCBCbGlzcy5zaHkpIHtcblx0cmV0dXJuO1xufVxuXG52YXIgXyA9IEJsaXNzLnByb3BlcnR5O1xuXG4vLyBNZXRob2RzIHJlcXVpcmluZyBCbGlzcyBGdWxsXG4kLmFkZCh7XG5cdC8vIENsb25lIGVsZW1lbnRzLCB3aXRoIGV2ZW50cyBhbmQgZGF0YVxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBjbG9uZSA9IHRoaXMuY2xvbmVOb2RlKHRydWUpO1xuXHRcdHZhciBkZXNjZW5kYW50cyA9ICQuJChcIipcIiwgY2xvbmUpLmNvbmNhdChjbG9uZSk7XG5cblx0XHQkLiQoXCIqXCIsIHRoaXMpLmNvbmNhdCh0aGlzKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGksIGFycikge1xuXHRcdFx0JC5ldmVudHMoZGVzY2VuZGFudHNbaV0sIGVsZW1lbnQpO1xuXHRcdFx0ZGVzY2VuZGFudHNbaV0uXy5kYXRhID0gJC5leHRlbmQoe30sIGVsZW1lbnQuXy5kYXRhKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBjbG9uZTtcblx0fVxufSwge2FycmF5OiBmYWxzZX0pO1xuXG4vLyBEZWZpbmUgdGhlIF8gcHJvcGVydHkgb24gYXJyYXlzIGFuZCBlbGVtZW50c1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoTm9kZS5wcm90b3R5cGUsIF8sIHtcblx0Ly8gV3JpdHRlbiBmb3IgSUUgY29tcGF0YWJpbGl0eSAoc2VlICM0OSlcblx0Z2V0OiBmdW5jdGlvbiBnZXR0ZXIgKCkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOb2RlLnByb3RvdHlwZSwgXywge1xuXHRcdFx0Z2V0OiB1bmRlZmluZWRcblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXywge1xuXHRcdFx0dmFsdWU6IG5ldyAkLkVsZW1lbnQodGhpcylcblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoTm9kZS5wcm90b3R5cGUsIF8sIHtcblx0XHRcdGdldDogZ2V0dGVyXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXNbX107XG5cdH0sXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsIF8sIHtcblx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIF8sIHtcblx0XHRcdHZhbHVlOiBuZXcgJC5BcnJheSh0aGlzKVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXNbX107XG5cdH0sXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbi8vIEhpamFjayBhZGRFdmVudExpc3RlbmVyIGFuZCByZW1vdmVFdmVudExpc3RlbmVyIHRvIHN0b3JlIGNhbGxiYWNrc1xuXG5pZiAoc2VsZi5FdmVudFRhcmdldCAmJiBcImFkZEV2ZW50TGlzdGVuZXJcIiBpbiBFdmVudFRhcmdldC5wcm90b3R5cGUpIHtcblx0dmFyIGFkZEV2ZW50TGlzdGVuZXIgPSBFdmVudFRhcmdldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcixcblx0ICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIgPSBFdmVudFRhcmdldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcixcblx0ICAgIGVxdWFsID0gZnVuY3Rpb24oY2FsbGJhY2ssIGNhcHR1cmUsIGwpIHtcblx0XHRcdHJldHVybiBsLmNhbGxiYWNrID09PSBjYWxsYmFjayAmJiBsLmNhcHR1cmUgPT0gY2FwdHVyZTtcblx0ICAgIH0sXG5cdCAgICBub3RFcXVhbCA9IGZ1bmN0aW9uKCkgeyBcblx0XHRcdHJldHVybiAhZXF1YWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgXG5cdFx0fTtcblxuXHRFdmVudFRhcmdldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKSB7XG5cdFx0aWYgKHRoaXMgJiYgdGhpc1tfXSAmJiB0aGlzW19dLmJsaXNzICYmIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgbGlzdGVuZXJzID0gdGhpc1tfXS5ibGlzcy5saXN0ZW5lcnMgPSB0aGlzW19dLmJsaXNzLmxpc3RlbmVycyB8fCB7fTtcblxuXHRcdFx0aWYgKHR5cGUuaW5kZXhPZihcIi5cIikgPiAtMSkge1xuXHRcdFx0XHR0eXBlID0gdHlwZS5zcGxpdChcIi5cIik7XG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSB0eXBlWzFdO1xuXHRcdFx0XHR0eXBlID0gdHlwZVswXTtcblx0XHRcdH1cblxuXHRcdFx0bGlzdGVuZXJzW3R5cGVdID0gbGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuXG5cdFx0XHRpZiAobGlzdGVuZXJzW3R5cGVdLmZpbHRlcihlcXVhbC5iaW5kKG51bGwsIGNhbGxiYWNrLCBjYXB0dXJlKSkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdGxpc3RlbmVyc1t0eXBlXS5wdXNoKHtjYWxsYmFjazogY2FsbGJhY2ssIGNhcHR1cmU6IGNhcHR1cmUsIGNsYXNzTmFtZTogY2xhc3NOYW1lfSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFkZEV2ZW50TGlzdGVuZXIuY2FsbCh0aGlzLCB0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSk7XG5cdH07XG5cblx0RXZlbnRUYXJnZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSkge1xuXHRcdGlmICh0aGlzICYmIHRoaXNbX10gJiYgdGhpc1tfXS5ibGlzcyAgJiYgY2FsbGJhY2spIHtcblx0XHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzW19dLmJsaXNzLmxpc3RlbmVycyA9IHRoaXNbX10uYmxpc3MubGlzdGVuZXJzIHx8IHt9O1xuXG5cdFx0XHRpZiAobGlzdGVuZXJzW3R5cGVdKSB7XG5cdFx0XHRcdGxpc3RlbmVyc1t0eXBlXSA9IGxpc3RlbmVyc1t0eXBlXS5maWx0ZXIobm90RXF1YWwuYmluZChudWxsLCBjYWxsYmFjaywgY2FwdHVyZSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZW1vdmVFdmVudExpc3RlbmVyLmNhbGwodGhpcywgdHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuXHR9O1xufVxuXG4vLyBTZXQgJCBhbmQgJCQgY29udmVuaWVuY2UgbWV0aG9kcywgaWYgbm90IHRha2VuXG5zZWxmLiQgPSBzZWxmLiQgfHwgJDtcbnNlbGYuJCQgPSBzZWxmLiQkIHx8ICQuJDtcblxufSkoQmxpc3MpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmxpc3NmdWxqcy9ibGlzcy5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XG59IGNhdGNoKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcblx0XHRnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiXSwic291cmNlUm9vdCI6IiJ9