import { delegateEvent, closestParentOfEl, toggleClass } from './../../../../shared';

export class SelectionButtons {
  constructor() {
    this.classnames = {
      blockLabel: 'block-label',
      selected: 'selected',
      focused: 'focused',
    };

    this.selectors = {
      radio: `.${this.classnames.blockLabel} input[type="radio"]`,
      checkbox: `.${this.classnames.blockLabel} input[type="checkbox"]`,
    };

    this.elements = document.querySelectorAll(`${this.selectors.radio}, ${this.selectors.checkbox}`);

    this.ariaAttributes = {
      controls: 'aria-controls',
      expanded: 'aria-expanded',
      hidden: 'aria-hidden'
    };

    this.init();
  }

  /**
   * Initializer function
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init = () => {
    this.updateAllElementsAriaAttributes();
    this.addEvents();
  };

  /**
   * Attach DOM event handlers
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  addEvents = () => {
    delegateEvent(document, 'focusin', `${this.selectors.radio}, ${this.selectors.checkbox}`, this.focusInHandler);
    delegateEvent(document, 'focusout', `${this.selectors.radio}, ${this.selectors.checkbox}`, this.focusInHandler);
    delegateEvent(document, 'click', `${this.selectors.radio}`, this.radioClickHandler);
    delegateEvent(document, 'click', `${this.selectors.checkbox}`, this.checkboxClickHandler);
  };

  /**
   * Radio click handler
   * 
   * @param {Event} event Event object
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  radioClickHandler = (event) => {
    if(!event.target) return;
    const element = event.target;
    const elementDetails = this.getElementDetails(element);
    if(!elementDetails) return;

    // Reset all other elements
    groupElements.forEach(groupElement => {
      groupElement.checked = false;
      this.updateDomElementAttributes(groupElement);
    });

    // Update current element
    return this.updateDomElementAttributes(element);
  }

  /**
   * Checkbox click handler
   * 
   * @param {Event} event Event object
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  checkboxClickHandler = (event) => {
    if(!event.target) return;
    const element = event.target;
    const elementDetails = this.getElementDetails(element);
    if(!elementDetails) return;
    // Update current element
    return this.updateDomElementAttributes(element);
  }

  /**
   * Focus in handler
   * 
   * @param {Event} event Event object
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  focusInHandler = (event) => {
    if(!event.target) return;
    const element = event.target;
    const elementDetails = this.getElementDetails(element);
    if(!elementDetails) return;
    toggleClass(this.elementDetails.target, this.classnames.focused, true);
  }

  /**
   * Focus out handler
   * 
   * @param {Event} event Event object
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  focusOutHandler = (event) => {
    if(!event.target) return;
    const element = event.target;
    const elementDetails = this.getElementDetails(element);
    if(!elementDetails) return;
    toggleClass(this.elementDetails.target, this.classnames.focused, false);
  }

  /**
   * Update all aria attributes
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateAllElementsAriaAttributes = () => {
    this.elements.forEach(element => {
      // Update aria attributes
      this.updateAriaAttributesForElement(element);
    });
  }

  /**
   * Update the current element attributes based on DOM state
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateDomElementAttributes = (element) => {
    const elementDetails = this.getElementDetails(element);
    if(!elementDetails) return;
    // Update selected class
    toggleClass(elementDetails.label, this.classnames.selected, element.checked);
    // Hide/show target
    groupElementDetails.target.display = element.checked ? 'block' : 'none';
    // Update aria attributes
    this.updateAriaAttributesForElement(element);
  }

  /**
   * Reset all of the aria attributes for all checkbox/radios
   * 
   * @param {HTMLElement} element Element to change the aria attributes of
   * @param {String} targetId ID selector for the target of the current radio
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateAriaAttributesForElement = (element) => {
    if(!element) return;
    const elementDetails = this.getElementDetails(element);
    if(elementDetails) {
      element.setAttribute(this.ariaAttributes.controls, elementDetails.targetId);
    }
    element.setAttribute(this.ariaAttributes.hidden, element.checked ? 'false' : 'true');
    element.setAttribute(this.ariaAttributes.expanded, element.checked ? 'true' : 'false');
  }

  /**
   * Get the target of the element
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  getElementDetails = (element) => {
    if(!element) return;
    const groupName = element.getAttribute('name');
    const groupElements = Array.from(document.querySelectorAll(`.${this.classnames.blockLabel} input[name="${groupName}"]`));
    const label = closestParentOfEl(element, 'label');

    if(!label) {
      return console.warn('Radio parent label not found');
    }

    const targetId = label.getAttribute('data-target');
    const target = label.querySelector(targetId);

    return {
      groupName,
      groupElements,
      label,
      target,
      targetId
    };
  }

}
