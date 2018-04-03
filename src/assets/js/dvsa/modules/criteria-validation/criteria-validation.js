import { delegateEvent, toggleClass } from './../../../shared';

export class CriteriaValidation {
  constructor() {
    this.classnames = {
      neurtal: 'criteria__criterion',
      fail: 'criteria__criterion--has-failed',
      pass: 'criteria__criterion--has-passed',
    };

    this.attributes = {
      name: 'data-criteria',
      param: 'data-criteria-param',
    };

    this.selectors = {
      criteriaElement: `[${this.attributes.name}]`,
      passwordElement: '#password',
    };

    this.criteria = [];

    this.elements = {
      criteriaElements: Array.from(document.querySelectorAll(this.selectors.criteriaElement)),
      passwordElement: document.querySelector(this.selectors.passwordElement),
    };

    this.init();
  }

  /**
   * Initializer which will call all functions to setup
   *
   * - Grabs criteria from DOM elements
   * - Attaches required events
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init = () => {
    this.grabCriteriaFromDOM();
    this.addEvents();
  };

  /**
   * Gets all the criteria from the DOM objects
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  grabCriteriaFromDOM = () => {
    // Check if there is any criteria elements
    if (!this.elements.criteriaElements) return;
    // Loop through each DOM element to get the criteria
    this.elements.criteriaElements.forEach(element => {
      // Get the name from data attribute
      const name = element.getAttribute(this.attributes.name);
      // Get the param from data attribute
      const param = element.getAttribute(this.attributes.param);
      // Check if name and param exist
      if (name) {
        // Add the criterion to the array
        this.criteria.push({
          name,
          param,
          element,
        });
      }
    });
  };

  /**
   * Attaches the required DOM events
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  addEvents = () => {
    delegateEvent(document, 'keyup', this.selectors.passwordElement, this.checkCriteriaHandler);
    delegateEvent(document, 'paste', this.selectors.passwordElement, this.checkCriteriaHandler);
    // Touch devices
    delegateEvent(document, 'keypress', this.selectors.passwordElement, this.checkCriteriaHandler);
  };

  /**
   * Check the criteria based on DOM values
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  checkCriteriaHandler = () => {
    if (!this.elements.passwordElement) return;
    const value = this.elements.passwordElement.value;
    this.criteria.forEach(criteriaItem => {
      const { name, param, element } = criteriaItem;
      if (!name || !element) return;
      const valid = this[name](value, param);
      if (valid) {
        toggleClass(element, this.classnames.pass, true);
        toggleClass(element, this.classnames.fail, false);
      } else {
        toggleClass(element, this.classnames.pass, false);
        toggleClass(element, this.classnames.fail, true);
      }
    });
  };

  /**
   * Checks if the value is mixed case
   *
   * @param {String} value String value to check
   * @returns {Boolean} Whether the check has passed or failed
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  hasMixedCase = value => {
    if (/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(value)) {
      return true;
    }
    return false;
  };

  /**
   * Checks if the value has a minimum length
   *
   * @param {String} value String value to check
   * @param {Number} requiredMinLength Integer value of the number of minimum characters required
   * @returns {Boolean} Whether the check has passed or failed
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  minLength = (value, requiredMinLength) => {
    // Create a regular express to check minimum character count
    const regEx = new RegExp(`^.{${requiredMinLength},}$`);

    // Check if value has minimum required characters
    if (regEx.test(value)) {
      return true;
    }

    return false;
  };

  /**
   * Check if the two values match
   *
   * @param {String} value String value to check
   * @param {String} valueToMatch String value that original must match
   * @returns {Boolean} Whether the check has passed or failed
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  notMatch = (value, valueToMatch) => {
    if (value === valueToMatch) {
      return true;
    }
    return false;
  };

  /**
   * Check if the value has a numeric character
   *
   * @param {String} value String value to check
   * @returns {Boolean} Whether the check has passed or failed
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  hasNumeric = value => {
    if (/[0-9]/.test(value)) {
      return true;
    }
    return false;
  };

  /**
   * Check if the value has an uppercase character
   *
   * @param {String} value String value to check
   * @returns {Boolean} Whether the check has passed or failed
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  hasUpperCase = value => {
    if (/[A-Z]/.test(value)) {
      return true;
    }
    return false;
  };

  /**
   * Check if the value has a lowercase character
   *
   * @param {String} value String value to check
   * @returns {Boolean} Whether the check has passed or failed
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  hasLowerCase = value => {
    if (/[a-z]/.test(value)) {
      return true;
    }
    return false;
  };
}
