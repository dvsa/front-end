/**
 * insertAfter
 *
 * Inserts an element after another in the DOM
 *
 * Supported: IE8+
 *
 * @param {DOMElement} New element to insert
 * @param {DOMElement} Reference element to insert after
 *
 * @since 1.0.0
 * @author Martin DM <martind@kainos.com>
 */
export const insertAfter = (newEl, refEl) => {
  refEl.parentNode.insertBefore(newEl, refEl.nextSibling);
};
