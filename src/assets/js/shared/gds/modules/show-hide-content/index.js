import { closestParentOfEl, toggleClass, delegateEvent } from './../../../../shared';

export class ShowHideContent {
  constructor() {
    // Variables for later use
    this.contentHiddenClass = 'js-hidden';
    this.ariaControlsAttributeName = 'aria-controls';
    this.ariaExpandedAtributeName = 'aria-expanded';
    this.ariaHiddenAttributeName = 'aria-hidden';
    this.targetAttributeName = 'data-target';
    this.dataTargetSelector = '.multiple-choice';
    this.radioSelector = this.dataTargetSelector + ' > input[type="radio"]';
    this.checkboxSelector = this.dataTargetSelector + ' > input[type="checkbox"]';

    // Get elements from the DOM
    this.radioElements = Array.from(document.querySelectorAll(this.radioSelector));
    this.checkboxElements = Array.from(document.querySelectorAll(this.checkboxSelector));

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
    delegateEvent(document, 'click', this.radioSelector, this.clickEventHandler);
    delegateEvent(document, 'click', this.checkboxSelector, this.clickEventHandler);
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
          let radioInputsForGroup = document.querySelectorAll('input[type="radio"][name="' + radioGroupName + '"');
          radioInputsForGroup = Array.from(radioInputsForGroup);
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
    if (targetInfo && targetInfo.element) {
      targetInfo.element.setAttribute(this.ariaHiddenAttributeName, element.checked ? 'false' : 'true');
    }
  };

  /**
   * Returns the target id and element
   *
   * @param {DOMElement} element The radio/checkbox
   * @returns {Object} An object with id and element
   */
  getTargetFromElement(element) {
    if (!element) return false;

    let parentContainer = closestParentOfEl(element, this.dataTargetSelector);
    if (!parentContainer) return false;

    let targetContainerId = parentContainer.getAttribute('data-target');

    if (!targetContainerId) return false;
    let targetContainer = false;

    if (targetContainerId) {
      const targetIdWithoutHashTag = targetContainerId.replace(/#/g, '');
      targetContainer = document.querySelector(`#${targetIdWithoutHashTag}`);
    }

    return {
      id: targetContainerId,
      element: targetContainer,
    };
  }
}
