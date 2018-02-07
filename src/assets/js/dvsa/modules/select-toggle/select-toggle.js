import { delegateEvent, toggleClass } from './../../../shared';

export class SelectToggle {
  constructor() {
    this.classnames = {
      jsHidden: 'js-hidden',
    };

    this.attributes = {
      target: 'data-target',
      targetValue: 'data-target-value',
      retainValue: 'retain-value',
      aria: {
        controls: 'aria-controls',
        hidden: 'aria-hidden',
        expanded: 'aria-expanded',
      },
    };

    this.selectors = {
      selectElements: `select[${this.attributes.target}]`,
      inputs: `textarea:not([value=""]), input[type="text"], input[type="email"], input[type="password"], input[type="tel"]`,
    };

    this.elements = {
      selectElements: Array.from(document.querySelectorAll(this.selectors.selectElements)),
    };

    this.init();
  }

  /**
   * Initializer which will call all functions to setup
   *
   * - Setup the select fields based on DOM state
   * - Attach required events
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init = () => {
    this.setupInitialStateFromDOM();
    delegateEvent(document, 'change', this.selectors.selectElements, this.selectChangeHandler);
  };

  /**
   * Setup the initial state of select fields from DOM
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  setupInitialStateFromDOM = () => {
    if (!this.elements.selectElements) return;
    this.elements.selectElements.forEach(element => {
      this.updateSelectFieldStateFromDOM(element);
    });
  };

  /**
   * Handles the change event for the select field
   *
   * @param {Event} event Event object
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  selectChangeHandler = event => {
    const element = event.target;
    if (!element) return;
    this.updateSelectFieldStateFromDOM(element);
  };

  /**
   * Updates the state of the select field
   *
   * - Shows/Hides target element
   * - Updates aria attributes
   *
   * @param {HTMLElement} element Select field element
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateSelectFieldStateFromDOM = element => {
    if (!element) return;
    const elementDetails = this.getElementDetails(element);
    if (!elementDetails) return;
    if (elementDetails.targetValues.indexOf(element.value) !== -1) {
      elementDetails.targetElement.display = 'block';
      toggleClass(elementDetails.targetElement, this.classnames.jsHidden, false);
    } else {
      elementDetails.targetElement.display = 'none';
      toggleClass(elementDetails.targetElement, this.classnames.jsHidden, true);
    }
    this.updateAriaAttributes(element);
    this.clearAllInputData(element);
  };

  /**
   * Get the select field details
   *
   * @param {HTMLElement} element Select field element
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  getElementDetails = element => {
    if (!element) return false;
    const targetId = element.getAttribute(this.attributes.target);
    const targetElement = document.querySelector(`#${targetId}`);
    const targetValues = element.getAttribute(this.attributes.targetValue);
    if (!targetId || !targetElement) return false;
    return {
      targetId,
      targetElement,
      targetValues: targetValues.split(','),
    };
  };

  /**
   * Get the select field aria attributes
   *
   * @param {HTMLElement} element Select field element
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateAriaAttributes = element => {
    if (!element) return;
    const elementDetails = this.getElementDetails(element);
    if (!elementDetails) return;
    element.setAttribute(this.attributes.aria.controls, elementDetails.targetId);
    if (elementDetails.targetValues.indexOf(element.value) !== -1) {
      element.setAttribute(this.attributes.aria.expanded, true);
    } else {
      element.setAttribute(this.attributes.aria.expanded, false);
    }
  };

  /**
   * Get the select field aria attributes
   *
   * @param {HTMLElement} element Select field element
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  clearAllInputData = element => {
    const inputElements = Array.from(element.querySelectorAll(this.selectors.inputs));
    if (!inputElements) return;
    inputElements.forEach(inputElement => {
      const retainValue = inputElement.getAttribute(this.attributes.retainValue);
      if (!retainValue) {
        inputElement.value = '';
      }
    });
  };
}
