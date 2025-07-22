'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.wrapCodeWithPrismForFullPagePreview = exports.wrapCodeWithPreviwAndPrism = exports.highlightCode = undefined;
var _prismjs = require('prismjs');
var _prismjs2 = _interopRequireDefault(_prismjs);
var _prismNormalizeWhitespace = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
var _prismNormalizeWhitespace2 = _interopRequireDefault(_prismNormalizeWhitespace);
var _htmlMinifier = require('html-minifier');
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
 * @returns {String} Highlighted code in HTML markup
 *
 * @since 1.1.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
var highlightCode = exports.highlightCode = function (code) {
  var nw = new _prismNormalizeWhitespace2["default"]({
    'remove-trailing': true,
    'remove-indent': false,
    'left-trim': true,
    'right-trim': true
  });

  // Minifies the html code
  // This is done to normalize it before making it pretty
  var cleanHTML = (0, _htmlMinifier.minify)(code, {
    html5: true,
    collapseWhitespace: true,
    preserveLineBreaks: true
  });

  // Normalize the html code to Prism standards
  var normalizedCode = nw.normalize(cleanHTML);

  // Make the HTML code pretty
  var prettyCode = (0, _pretty2["default"])(normalizedCode);

  // Highlight the code using prismjs
  var highlightedCode = _prismjs2["default"].highlight(prettyCode, _prismjs2["default"].languages.markup);

  // Create the code highlighting output
  return "<pre><code class=\"line-numbers language-html\">".concat(highlightedCode, "</code></pre>");
};

/**
 * Wraps the code in a preview div used for styleguide pages
 *
 * @param {String} code Code to wrap in preview markup
 * @returns {String} Code wrapped in preview markup
 *
 * @since 1.1.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
var wrapCodeWithPreviwAndPrism = exports.wrapCodeWithPreviwAndPrism = function (code) {
  // Highlight the code using prismjs
  var prismCode = highlightCode(code);

  // Create the developer preview output
  var preview = "\n  <div class=\"dev-preview__example\">\n    <div class=\"dev-preview__fullscreen-button\">Fullscreen preview</div>\n    <div class=\"dev-preview__code\">\n      ".concat(code, "\n    </div>\n  </div>\n  ");

  // Return the new HTML
  // Combination of the preview and prism code highlighting
  return "\n    <!-- dev-preview -->\n    <div class=\"dev-preview\">\n      ".concat(preview, "\n      <div class=\"dev-preview__prism-code\">\n        ").concat(prismCode, "\n      </div>\n    </div>\n    <!-- /dev-preview -->\n  ");
};

/**
 * Wraps the code in a div used for full page peviews
 *
 * @param {String} code Code to wrap in full page markup preview
 * @returns {String} Code wrapped in full page markup preview
 *
 * @since 1.1.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
var wrapCodeWithPrismForFullPagePreview = exports.wrapCodeWithPrismForFullPagePreview = function (code) {
  // Highlight the code using prismjs
  var prismCode = highlightCode(code);

  // Return the new HTML
  // Combination of the preview and prism code highlighting
  return "\n   \n    <!-- content -->\n    ".concat(code, "\n    <!-- content -->\n    <!--\n    <div class=\"dev-preview__floating-button\">\n      <span class=\"dev-preview__floating-button-text\">\n        View HTML Markup\n        <br/>\n        <em>(only for developers)</em>\n      </span>\n    </div>\n\n    <div class=\"dev-preview dev-preview--full-page dev-preview--hidden\">\n      <div class=\"dev-preview__content\">\n        <button class=\"dev-preview__close-button\">&times;</button>\n        <p>The HTML markup below only includes the content of the page and excludes all layout markup.</p>\n      </div>\n\n      <div class=\"dev-preview__code\">\n        ").concat(prismCode, "\n      </div>\n    </div> -->\n  ");
};