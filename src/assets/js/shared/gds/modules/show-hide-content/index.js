import { closestParentOfEl, toggleClass, delegateEvent } from './../../../../shared';

export class ShowHideContent {
  constructor() {
    // Variables for later use
    this.contentHiddenClass = 'js-hidden';
    this.ariaControlsAttributeName = 'aria-controls';
    this.ariaExpandedAtributeName = 'aria-expanded';
    this.ariaHiddenAttributeName = 'aria-hidden';
    this.dataTargetSelector = '.multiple-choice';
    this.radioSelector = this.dataTargetSelector + ' > input[type="radio"]';
    this.checkboxSelector = this.dataTargetSelector + ' > input[type="checkbox"]';

    // Get elements from the DOM
    this.radioElements = Array.from(document.querySelectorAll(this.radioSelector));
    this.checkboxElements = Array.from(document.querySelectorAll(this.checkboxSelector));

    // Check to make sure this component has not loaded
    if (window.__dvsaShowHideContentLoaded__) return;

    // Call setup
    this.setup();
  }

  /**
   * Setup the show hide component
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  setup() {
    window.__dvsaShowHideContentLoaded__ = true;
    this.refreshAllRadiosAndCheckboxes();
    this.addEvents();
  }

  /**
   * Delegate click events
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  addEvents() {
    delegateEvent(document, 'click', this.radioSelector, this.clickEventHandler);
    delegateEvent(document, 'click', this.checkboxSelector, this.clickEventHandler);
  }

  /**
   * Handle the click event
   *
   * @param {Event} event DOM event object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  clickEventHandler = event => {
    this.refreshAllRadiosAndCheckboxes();
  };

  /**
   * Toggle the radio content based on group name
   *
   * @param {String} groupName Name of radio group
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  toggleRadioContentForGroup = groupName => {
    if (!groupName) {
      return;
    }

    const selector = `input[type="radio"][name="${groupName}"]`;
    const radios = Array.from(document.querySelectorAll(selector));

    let selectedRadioElement = null;

    radios.forEach(radioElement => {
      if (radioElement.checked) {
        selectedRadioElement = radioElement;
      }
      this.toggleContent(radioElement, false);
    });

    if (selectedRadioElement) {
      this.toggleContent(selectedRadioElement, true);
    }
  };

  /**
   * Loops through each radio/checkbox element in the dom
   * and refreshes the state of it to reflect the elements checked state
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  refreshAllRadiosAndCheckboxes() {
    // Temp variable to store all unique group names
    const radioGroupNames = [];

    // Get all unique radio group names
    this.radioElements.forEach(element => {
      const name = element.getAttribute('name');

      if (name && radioGroupNames.indexOf(name) === -1) {
        radioGroupNames.push(name);
      }
    });

    // Toggle content for all radio groups
    radioGroupNames.forEach(name => {
      this.toggleRadioContentForGroup(name);
    });

    // Toggle content for all checkboxes
    this.checkboxElements.forEach(this.toggleContent);
  }

  /**
   * Shows/Hides the content of the current radio/checkbox
   * based on if the radio/checkbox is check or unchecked.
   *
   * @param {DOMElement} element The radio/checkbox
   * @param {Boolean} force force show/hide the content
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  toggleContent = (element, force = null) => {
    if (!element) return;

    let targetInfo = this.getTargetFromElement(element);
    let hasAside = false;
    let asideEl;
    // Reference elements with ids matching the <input>'s data-aside attribute (on the radio input)
    if (element.dataset.aside) {
      hasAside = true;
      const asideId = `aside-${element.dataset.aside}`;
      let asideEl = document.getElementById(asideId);
    }

    if (!targetInfo || !targetInfo.element || !targetInfo.id) return;

    const contentVisible = typeof force === 'boolean' ? force : element.checked;

    // Refresh aria tags on parent elements
    element.setAttribute(this.ariaControlsAttributeName, targetInfo.id);
    element.setAttribute(this.ariaExpandedAtributeName, contentVisible ? 'true' : 'false');

    // Refresh target visibily classes
    toggleClass(targetInfo.element, this.contentHiddenClass, !contentVisible);

    // Refresh target aria attrs
    targetInfo.element.setAttribute(this.ariaHiddenAttributeName, contentVisible ? 'false' : 'true');

    if (asideEl) {
      // Toggle 'aside' element
      console.log(asideEl);
      element.setAttribute(this.ariaControlsAttributeName, asideEl);
      toggleClass(asideEl, this.contentHiddenClass, !contentVisible);
      asideEl.setAttribute(this.ariaHiddenAttributeName, contentVisible ? 'false' : 'true');
    }
  };

  /**
   * Returns the target id and element
   *
   * @param {DOMElement} element The radio/checkbox
   * @returns {Object} An object with id and element
   *
   * @author Tameem Safi <t.safi@kainos.com>
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
