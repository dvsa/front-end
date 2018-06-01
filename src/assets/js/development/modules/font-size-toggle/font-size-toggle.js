import { addEventListenerToEl, closestParentOfEl } from './../../../shared/misc';
import { FONT_SIZE_TOGGLE_CONFIG } from './config';

export class FontSizeToggle {
  constructor(wrapper) {
    // If DOM Element ref is not passed - exit with warning
    if (!wrapper) console.warn('Failed to initialise font size toggle element');

    // Constructor variable setup
    let increaseButton, decreaseButton, resetButton, targets;

    // References to buttons
    increaseButton = wrapper.querySelector(`.${FONT_SIZE_TOGGLE_CONFIG.classes.increaseBtn}`);
    decreaseButton = wrapper.querySelector(`.${FONT_SIZE_TOGGLE_CONFIG.classes.decreaseBtn}`);
    resetButton = wrapper.querySelector(`.${FONT_SIZE_TOGGLE_CONFIG.classes.resetBtn}`);

    // State object to keep track of font size toggle DOM elements
    this.elements = {
      buttons: {
        increaseButton,
        decreaseButton,
        resetButton,
      },
      pageElements: '',
      targets: FONT_SIZE_TOGGLE_CONFIG.DOMTargets,
    };

    // If button elements do not exist return
    if (!this.elements.buttons.increaseButton || !this.elements.buttons.decreaseButton || !this.elements.buttons.resetButton) return;

    // Class setup
    this.setup();
  }

  /**
   * Initializer
   */
  setup = () => {
    // Gets all DOM text based elements
    this.elements.pageElements = this.getTargetDOMElements();
    if (!this.elements.pageElements) return;

    // Adds event listiners to DOM elements
    addEventListenerToEl(this.elements.buttons.decreaseButton, 'click', this.increaseDecreaseClickHandler);
    addEventListenerToEl(this.elements.buttons.increaseButton, 'click', this.increaseDecreaseClickHandler);
    addEventListenerToEl(this.elements.buttons.resetButton, 'click', this.resetButtonClickHandler);
  };

  /**
   * Click event handler for smaller button click
   *
   * @param {Event} event - DOM Event object
   */
  increaseDecreaseClickHandler = event => {
    // Prevent default click event
    event.preventDefault();

    // Gets custom data-toggle-type attribute value
    let toggleType = event.target.getAttribute(`${FONT_SIZE_TOGGLE_CONFIG.dataAttributes.type}`);
    if (!toggleType) console.warn(`Could not find data attribute ${FONT_SIZE_TOGGLE_CONFIG.dataAttributes.type}`);

    // Runs a font size increment / decrement based on toggle type
    toggleType == 'increment' ? this.updateDOMElements(true) : this.updateDOMElements(false);
  };

  /**
   * Handles the reset button click handler
   *
   * @param {Event} event - DOM Event object
   */
  resetButtonClickHandler = event => {
    // Prevent default click event
    event.preventDefault();

    // Removes the style element from DOM elements
    this.elements.pageElements.forEach(elm => this.removeAttribute(elm, 'style'));
  };

  /**
   * Update font size of DOM elements
   *
   * @param {Boolean} isIncrement - Boolean defining wether operation is an increment
   */
  updateDOMElements = isIncrement => {
    // Loop through DOM Elements
    this.elements.pageElements.forEach(element => {
      // Gets fontsize / line height properties of elements
      let elmProps = {
        fontSize: parseInt(this.getComputedProperty(element, 'font-size'), 10),
        lineHeight: parseInt(this.getComputedProperty(element, 'line-height')),
      };

      // Runs an increment / decrement based on isIncrement Bool value
      isIncrement ? (element.style.fontSize = `${elmProps.fontSize + 1}px`) : (element.style.fontSize = `${elmProps.fontSize - 1}px`);
    });
  };

  /**
   * Removes a defined attribute from an element
   *
   * @param {Element} element - DOM Element
   * @param {String} attribute - String containing attribute to be removed
   */
  removeAttribute = (element, attribute) => element.removeAttribute(attribute);

  /**
   * Gets specfied computed property of a DOM element
   *
   * @param {Element} element - DOM Element
   * @param {String} attribute - String containing attribute to be removed
   */
  getComputedProperty = (element, attribute) => window.getComputedStyle(element).getPropertyValue(attribute);

  /**
   * Get Target DOM elements
   */
  getTargetDOMElements = () => document.body.querySelectorAll(this.elements.targets);
}
