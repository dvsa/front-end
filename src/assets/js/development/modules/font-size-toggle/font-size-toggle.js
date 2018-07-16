import { addEventListenerToEl, closestParentOfEl } from './../../../shared/misc';
import { FONT_SIZE_TOGGLE_CONFIG } from './config';

export class FontSizeToggle {
  constructor(wrapper) {
    // If DOM Element ref is not passed - exit with warning
    if (!wrapper) return;

    // Constructor variable setup
    let increaseButton, decreaseButton, resetButton, targets;

    // References to buttons
    increaseButton = wrapper.querySelector(`.${FONT_SIZE_TOGGLE_CONFIG.classes.increaseBtn}`);
    decreaseButton = wrapper.querySelector(`.${FONT_SIZE_TOGGLE_CONFIG.classes.decreaseBtn}`);
    resetButton = wrapper.querySelector(`.${FONT_SIZE_TOGGLE_CONFIG.classes.resetBtn}`);

    // State object to keep track of font size toggle DOM elements
    this.state = {
      currentSize: 0,
      maxSize: FONT_SIZE_TOGGLE_CONFIG.maxSize,
      minSize: FONT_SIZE_TOGGLE_CONFIG.minSize,
      buttons: {
        increaseButton,
        decreaseButton,
        resetButton,
      },
      pageElements: '',
      targets: FONT_SIZE_TOGGLE_CONFIG.DOMTargets,
    };

    // If button elements do not exist return
    if (!this.state.buttons.increaseButton || !this.state.buttons.decreaseButton || !this.state.buttons.resetButton) return;

    // Class setup
    this.setup();
  }

  /**
   * Initializer
   */
  setup = () => {
    // Gets all DOM text based elements
    this.state.pageElements = this.getTargetDOMElements();
    if (!this.state.pageElements) return;

    // Adds event listiners to DOM elements
    addEventListenerToEl(this.state.buttons.increaseButton, 'click', this.increaseClickHandler);
    addEventListenerToEl(this.state.buttons.decreaseButton, 'click', this.decreaseClickHandler);
    addEventListenerToEl(this.state.buttons.resetButton, 'click', this.resetButtonClickHandler);
  };

  /**
   * Increase button click handler
   *
   * @param {Event} event - DOM Event object
   */
  increaseClickHandler = event => {
    // Prevent default click event
    event.preventDefault();

    if (this.testRanges(this.state.currentSize + 1)) {
      this.state.currentSize += 1;
      this.updateDOMElements();
    }
  };

  /**
   * Decrease button click handler
   *
   * @param {Event} event - DOM Event object
   */
  decreaseClickHandler = event => {
    // Prevent default click event
    event.preventDefault();

    if (this.testRanges(this.state.currentSize - 1)) {
      this.state.currentSize -= 1;
      this.updateDOMElements(false);
    }
  };

  /**
   * Handles the reset button click handler
   *
   * @param {Event} event - DOM Event object
   */
  resetButtonClickHandler = event => {
    // Prevent default click event
    event.preventDefault();

    // Resets buttons state
    this.resetState();

    // Removes the style element from DOM elements
    this.convertToArray(this.state.pageElements).forEach(elm => this.removeAttribute(elm, 'style'));
  };

  /**
   * Tests min / max sizes against an Int
   *
   * @param {Int} testInt - Int to test ranges against
   */
  testRanges = testInt => {
    // Sets return variable to true
    let isValidRange = true;

    // If number is above maxSize
    if (testInt > this.state.maxSize) {
      // Disable increase button
      this.disableButton(this.state.buttons.increaseButton);
      this.enableButton(this.state.buttons.decreaseButton);

      // set isValid to false
      isValidRange = false;

      // if number is less than min size
    } else if (testInt < this.state.minSize) {
      // Disable decrease button
      this.disableButton(this.state.buttons.decreaseButton);
      this.enableButton(this.state.buttons.increaseButton);

      // set isValid to false
      isValidRange = false;

      // Renable buttons
    } else {
      this.resetState();
    }

    // Return boolean
    return isValidRange;
  };

  /**
   * Disbales button state
   *
   * @param {Element} btn - DOM Element object
   */
  disableButton = btn => {
    btn.disabled = true;
    btn.classList.add('font-size-toggle__button--disabled');
  };

  /**
   * Enables button state
   *
   * @param {Element} btn - DOM Element object
   */
  enableButton = btn => {
    btn.disabled = false;
    btn.classList.remove('font-size-toggle__button--disabled');
  };

  /**
   * Re-enables button's state
   *
   */
  resetState = () => {
    this.enableButton(this.state.buttons.decreaseButton);
    this.enableButton(this.state.buttons.increaseButton);
  };

  /**
   * Update DOM element's font size
   *
   * @param {Boolean} isIncrement - Boolean defining wether operation is an increment
   */
  updateDOMElements = (isIncrement = true) => {
    // Loop through DOM Elements
    this.convertToArray(this.state.pageElements).forEach(element => {
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
  getTargetDOMElements = () => document.body.querySelectorAll(this.state.targets);

  /**
   * Returns object to array
   *
   * @param {Object} obj - Object element
   */
  convertToArray = obj => Array.from(obj);
}
