/**
 * Toggles disabled attribute on element
 *
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
export const toggleDisabledAttribute = (element, force) => {
  if (!element) return;
  toggleAttribute(element, 'disabled', 'disabled', force);
};

/**
 * Toggles disabled attribute on element
 *
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
export const toggleAttribute = (element, attribute, attributeValue, force) => {
  if (!element) return;
  if (typeof force === 'boolean') {
    if (force) {
      element.setAttribute(attribute, attributeValue);
    } else {
      element.removeAttribute(attribute);
    }
  } else {
    if (element.hasAttribute(attribute)) {
      element.removeAttribute(attribute);
    } else {
      element.setAttribute(attribute, attributeValue);
    }
  }
};
