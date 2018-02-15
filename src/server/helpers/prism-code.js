import Prism from 'prismjs';
import Normalizer from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import { minify } from 'html-minifier';
import pretty from 'pretty';

/**
 * Prettifies and highlights code using prismjs
 *
 * @param {String} code Markup code to highlight
 * @returns {String} Highlighted code in HTML markup
 *
 * @since 1.1.0
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const highlightCode = code => {
  let nw = new Normalizer({
    'remove-trailing': true,
    'remove-indent': false,
    'left-trim': true,
    'right-trim': true,
  });

  // Minifies the html code
  // This is done to normalize it before making it pretty
  let cleanHTML = minify(code, {
    html5: true,
    collapseWhitespace: true,
    preserveLineBreaks: true,
  });

  // Normalize the html code to Prism standards
  let normalizedCode = nw.normalize(cleanHTML);

  // Make the HTML code pretty
  let prettyCode = pretty(normalizedCode);

  // Highlight the code using prismjs
  let highlightedCode = Prism.highlight(prettyCode, Prism.languages.markup);

  // Create the code highlighting output
  return `<pre><code class="line-numbers language-html">${highlightedCode}</code></pre>`;
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
export const wrapCodeWithPreviwAndPrism = code => {
  // Highlight the code using prismjs
  let prismCode = highlightCode(code);

  // Create the developer preview output
  let preview = `<div class="dev-preview__example">${code}</div>`;

  // Return the new HTML
  // Combination of the preview and prism code highlighting
  return `
    <!-- dev-preview -->
    <div class="dev-preview">
      ${preview}
      ${prismCode}
    </div>
    <!-- /dev-preview -->
  `;
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
export const wrapCodeWithPrismForFullPagePreview = code => {
  // Highlight the code using prismjs
  let prismCode = highlightCode(code);

  // Return the new HTML
  // Combination of the preview and prism code highlighting
  return `
    <!-- content -->
    ${code}
    <!-- content -->

    <div class="dev-preview__floating-button">
      <span class="dev-preview__floating-button-text">
        View HTML Markup
        <br/>
        <em>(only for developers)</em>
      </span>
    </div>

    <div class="dev-preview dev-preview--full-page dev-preview--hidden">
      <div class="dev-preview__content">
        <button class="dev-preview__close-button">&times;</button>
        <p>The HTML markup below only includes the content of the page and excludes all layout markup.</p>
      </div>

      <div class="dev-preview__code">
        ${prismCode}
      </div>
    </div>
  `;
};
