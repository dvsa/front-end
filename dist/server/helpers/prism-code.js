'use strict';

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.wrapCodeWithPrismForFullPagePreview = exports.wrapCodeWithPreviwAndPrism = exports.highlightCode = undefined;
var _prismjs = require('prismjs');
var _prismjs2 = _interopRequireDefault(_prismjs);
var _prismNormalizeWhitespace = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
var _prismNormalizeWhitespace2 = _interopRequireDefault(_prismNormalizeWhitespace);
var _require = require('html-minifier-terser'),
  minify = _require.minify;
var _pretty = require('pretty');
var _pretty2 = _interopRequireDefault(_pretty);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

/**
 * Prettifies and highlights code using prismjs
 *
 * @param {String} code Markup code to highlight
 * @returns {Promise<String>} Highlighted code in HTML markup
 *
 * @since 1.1.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
var highlightCode = exports.highlightCode = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(code) {
    var nw, cleanHTML, normalizedCode, prettyCode, highlightedCode;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          nw = new _prismNormalizeWhitespace2["default"]({
            'remove-trailing': true,
            'remove-indent': false,
            'left-trim': true,
            'right-trim': true
          }); // Minifies the html code asynchronously
          _context.n = 1;
          return minify(code, {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: true
          });
        case 1:
          cleanHTML = _context.v;
          // Normalize the html code to Prism standards
          normalizedCode = nw.normalize(cleanHTML); // Make the HTML code pretty
          prettyCode = (0, _pretty2["default"])(normalizedCode); // Highlight the code using prismjs
          highlightedCode = _prismjs2["default"].highlight(prettyCode, _prismjs2["default"].languages.markup); // Create the code highlighting output
          return _context.a(2, "<pre><code class=\"line-numbers language-html\">".concat(highlightedCode, "</code></pre>"));
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Wraps the code in a preview div used for styleguide pages
 *
 * @param {String} code Code to wrap in preview markup
 * @returns {Promise<String>} Code wrapped in preview markup
 *
 * @since 1.1.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
var wrapCodeWithPreviwAndPrism = exports.wrapCodeWithPreviwAndPrism = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(code) {
    var prismCode, preview;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return highlightCode(code);
        case 1:
          prismCode = _context2.v;
          // Create the developer preview output
          preview = "\n  <div class=\"dev-preview__example\">\n    <div class=\"dev-preview__fullscreen-button\">Fullscreen preview</div>\n    <div class=\"dev-preview__code\">\n      ".concat(code, "\n    </div>\n  </div>\n  "); // Return the new HTML
          // Combination of the preview and prism code highlighting
          return _context2.a(2, "\n    <!-- dev-preview -->\n    <div class=\"dev-preview\">\n      ".concat(preview, "\n      <div class=\"dev-preview__prism-code\">\n        ").concat(prismCode, "\n      </div>\n    </div>\n    <!-- /dev-preview -->\n  "));
      }
    }, _callee2);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Wraps the code in a div used for full page previews
 *
 * @param {String} code Code to wrap in full page markup preview
 * @returns {Promise<String>} Code wrapped in full page markup preview
 *
 * @since 1.1.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
var wrapCodeWithPrismForFullPagePreview = exports.wrapCodeWithPrismForFullPagePreview = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(code) {
    var prismCode;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return highlightCode(code);
        case 1:
          prismCode = _context3.v;
          return _context3.a(2, "\n   \n    <!-- content -->\n    ".concat(code, "\n    <!-- content -->\n    <!--\n    <div class=\"dev-preview__floating-button\">\n      <span class=\"dev-preview__floating-button-text\">\n        View HTML Markup\n        <br/>\n        <em>(only for developers)</em>\n      </span>\n    </div>\n\n    <div class=\"dev-preview dev-preview--full-page dev-preview--hidden\">\n      <div class=\"dev-preview__content\">\n        <button class=\"dev-preview__close-button\">&times;</button>\n        <p>The HTML markup below only includes the content of the page and excludes all layout markup.</p>\n      </div>\n\n      <div class=\"dev-preview__code\">\n        ").concat(prismCode, "\n      </div>\n    </div> -->\n  "));
      }
    }, _callee3);
  }));
  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();