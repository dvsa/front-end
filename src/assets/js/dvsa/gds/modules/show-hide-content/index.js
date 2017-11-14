import { closestParentOfEl, toggleClass } from './../../../../shared';

export class ShowHideContent {
  constructor() {
    // Variables for later use
    this.contentHiddenClass = 'js-hidden';
    this.ariaControlsAttributeName = 'aria-controls';
    this.ariaExpandedAtributeName = 'aria-expanded';
    this.ariaHiddenAttributeName = 'aria-hidden';
    this.targetAttributeName = 'data-target';
    this.dataTargetSelector = '[' + this.targetAttributeName + ']';
    this.radioSelector = this.dataTargetSelector + ' > input[type="radio"]';
    this.checkboxSelector = this.dataTargetSelector + ' > input[type="checkbox"]';

    // Get elements from the DOM
    this.radioElements = $$(this.radioSelector);
    this.checkboxElements = $$(this.checkboxSelector);

    this.setup();
  }

  /**
   * Setup the show hide component
   */
  setup() {
    this.resetAllAriaAttributes();
    this.addEvents();
  }

  /**
   * Delegate click events
   */
  addEvents() {
    $.delegate(document, 'click', this.radioSelector, this.clickEventHandler);
    $.delegate(document, 'click', this.checkboxSelector, this.clickEventHandler);
  }

  /**
   * Handle the click event
   */
  clickEventHandler = event => {
    let type = event.target.getAttribute('type');
    switch (type) {
      case 'radio': {
        let radioGroupName = event.target.getAttribute('name');
        // Refresh all radios for this group
        if (radioGroupName) {
          let radioInputsForGroup = $$('input[type="radio"][name="' + radioGroupName + '"');
          radioInputsForGroup.forEach(radio => {
            this.toggleContentBasedOnCheckState(radio);
          });
        }
        return;
      }
      case 'checkbox': {
        // Refresh current checkbox
        this.toggleContentBasedOnCheckState(event.target);
        return;
      }
      default: {
        return;
      }
    }
  };

  /**
   * Loops through each radio/checkbox element in the dom
   * and refreshes the state of it to reflect the elements checked state
   */
  resetAllAriaAttributes() {
    this.radioElements.forEach(this.toggleContentBasedOnCheckState);
    this.checkboxElements.forEach(this.toggleContentBasedOnCheckState);
  }

  /**
   * Shows/Hides the content of the current radio/checkbox
   * based on if the radio/checkbox is check or unchecked.
   * 
   * @param {DOMElement} element The radio/checkbox
   */
  toggleContentBasedOnCheckState = element => {
    if (!element) return;
    let targetInfo = this.getTargetFromElement(element);
    toggleClass(targetInfo.element, this.contentHiddenClass, !element.checked);

    // Refresh aria tags
    element.setAttribute(this.ariaControlsAttributeName, targetInfo.id);
    element.setAttribute(this.ariaExpandedAtributeName, element.checked ? 'true' : 'false');
    targetInfo.element.setAttribute(this.ariaHiddenAttributeName, element.checked ? 'false' : 'true');
  };

  /**
   * Returns the target id and element
   * 
   * @param {DOMElement} element The radio/checkbox
   * @returns {Object} An object with id and element
   */
  getTargetFromElement(element) {
    if (!element) return;
    let parentContainer = closestParentOfEl(element, this.dataTargetSelector);
    let targetContainerId = parentContainer.getAttribute('data-target');
    let targetContainer = document.getElementById(targetContainerId);
    return {
      id: targetContainerId,
      element: targetContainer,
    };
  }
}
