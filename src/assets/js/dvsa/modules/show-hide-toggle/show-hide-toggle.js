import { isElementHidden, delegateEvent, toggleClass } from './../../../shared';

export class ShowHideToggle {
  constructor() {
    this.classnames = {
      jsHidden: 'js-hidden',
      hideSmall: 'hide-small',
      toggleSwitch: 'toggle-switch',
      toggleSwitchOpen: 'toggle-switch--open',
    };

    this.attributes = {
      targetState: 'data-target-state',
      openText: 'data-open-text',
      target: 'data-target',
      toggleType: 'data-toggle-type',
      closedText: 'data-closed-text',
    };

    this.targetStates = {
      closed: 'closed',
      open: 'open',
    };

    this.selectors = {
      showHideToggle: '[data-action="showHideToggle"]',
    };

    this.elements = {
      showHideToggles: Array.from(document.querySelectorAll(this.selectors.showHideToggle)),
    };

    this.toggleTypes = {
      responsive: 'responsive',
    };

    this.init();
  }

  /**
   * Initializer which will call all functions to setup
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init = () => {
    this.setupInitialStateFromDOM();
    this.addEvents();
  };

  /**
   * Setup the state based on current DOM
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  setupInitialStateFromDOM = () => {
    if (!this.elements.showHideToggles) return;
    this.elements.showHideToggles.forEach(element => {
      const elementDetails = this.getElementDetails(element);
      if (!elementDetails) return;
      element.setAttribute(this.attributes.closedText, element.textContent);
      element.setAttribute(this.attributes.targetState, this.targetStates.closed);
      if (elementDetails.toggleType !== this.toggleTypes.responsive) {
        toggleClass(elementDetails.targetElement, this.classnames.jsHidden, true);
      } else {
        toggleClass(elementDetails.targetElement, this.classnames.hideSmall, true);
      }
    });
  };

  /**
   * Add required events
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  addEvents = () => {
    delegateEvent(document, 'click', this.selectors.showHideToggle, this.showHideToggleClickHandler);
  };

  /**
   * Handles the show hide toggle click event
   *
   * @param {Event} event Event object
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  showHideToggleClickHandler = event => {
    if (!event.target);
    event.preventDefault();
    this.updateElementState(event.target);
  };

  /**
   * Toggles the element based on current DOM state
   *
   * @param {HTMLElement} element Element to toggle state of
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateElementState = element => {
    if (!element) return;
    const elementDetails = this.getElementDetails(element);
    if (!elementDetails) return;
    const hidden = elementDetails.targetState === this.targetStates.closed;

    if (elementDetails.toggleType === this.toggleTypes.responsive) {
      toggleClass(elementDetails.targetElement, this.classnames.hideSmall, !hidden);
    } else {
      toggleClass(elementDetails.targetElement, this.classnames.jsHidden, !hidden);
    }

    element.setAttribute(this.attributes.targetState, hidden ? this.targetStates.open : this.targetStates.closed);

    this.updateAllShowHideToggles();

    const targetParent = document.querySelector(`#${elementDetails.targetId}Parent`);

    if (targetParent) {
      targetParent.scrollIntoView(true);
    }
  };

  /**
   * Update all of the DOM show hide toggle based on their DOM states
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateAllShowHideToggles = () => {
    if (this.elements.showHideToggles) {
      this.elements.showHideToggles.forEach(element => {
        const elementDetails = this.getElementDetails(element);
        if (!elementDetails) return;
        const hidden = elementDetails.targetState === this.targetStates.closed;
        element.textContent = hidden ? elementDetails.closedText : elementDetails.openText;
        toggleClass(element, this.classnames.toggleSwitch, !hidden);
        toggleClass(element, this.classnames.toggleSwitchOpen, hidden);
      });
    }
  };

  /**
   * Grabs the required details from the DOM for the element
   *
   * @param {HTMLElement} element Element to get details from
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  getElementDetails = element => {
    if (!element) return;
    const openText = element.getAttribute(this.attributes.openText);
    const closedText = element.getAttribute(this.attributes.closedText);
    const targetId = element.getAttribute(this.attributes.target);
    const toggleType = element.getAttribute(this.attributes.toggleType);
    const targetElement = document.querySelector(`#${targetId}`);
    const targetState = element.getAttribute(this.attributes.targetState);
    if (!targetId || !targetElement) return;
    return {
      openText,
      closedText,
      targetId,
      toggleType,
      targetElement,
      targetState,
    };
  };
}
