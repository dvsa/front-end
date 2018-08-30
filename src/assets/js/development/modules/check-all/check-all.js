import { addEventListenerToEl } from '../../../shared/misc';
import { CHECK_ALL_CONFIG } from './index';

export class CheckAll {
  constructor(wrapper) {
    // If DOM Element does not exist, exit
    if (!wrapper) return;

    let checkboxNodes = wrapper.querySelectorAll('input');
    let checkboxes = [...checkboxNodes];

    // First checkbox toggles all
    let allTarget = wrapper.querySelector(`.${CHECK_ALL_CONFIG.classes.checkAll}`);

    this.state = {
      allChecked: false,
      elements: {
        allTarget,
        checkboxes,
        count: 0,
      },
    };

    this.init();
  }

  /**
   * Initialise listeners for change
   */
  init = () => {
    this.state.elements.count = this.countNumOfCheckboxItems();

    // Add change listener to all targeted checkboxes
    this.state.elements.checkboxes.forEach(checkbox => addEventListenerToEl(checkbox, 'change', this.toggleChecks));
  };

  /**
   * Checkbox change handler
   *
   * @param {Event} event - DOM Event object
   */
  toggleChecks = event => {
    // References to 'Select all' class name
    const selectAllClass = CHECK_ALL_CONFIG.classes.checkAll;

    // Boolean of wether event occured on 'Select all' check item
    let isSelectAll = event.target.classList.contains(selectAllClass);

    // Gets a count of all checked items
    let checkedCount = this.countCheckedItems();
    
    // If a 'Select all' operation has occured
    if (isSelectAll || checkedCount == this.state.elements.count) {
      // Toggle state of all check items
      return this.selectAllToggleState();
    }

    // Set all checked state to false
    this.state.allChecked = false;
    this.state.elements.allTarget.checked = false;
  };

  /**
   * Toggles state of all checkbox items
   *
   */
  selectAllToggleState = () => {
    this.state.allChecked = !this.state.allChecked;
    this.state.elements.allTarget.checked = this.state.allChecked;
    this.state.elements.checkboxes.map(checkbox => (checkbox.checked = this.state.allChecked));
  };

  /**
   * Counts the number of checkbox items in array
   *
   * @returns {Int} - Number of counted checkbox items
   */
  countNumOfCheckboxItems = () => {
    return this.state.elements.checkboxes.filter(this.excludeCheckAll).length;
  };

  /**
   * Method for counting how many are checked
   *
   * @returns {Int} - Number of counted checkbox items
   */
  countCheckedItems = () => {
    return this.state.elements.checkboxes
    .filter(this.excludeCheckAll)
    .filter(checkbox => {
      return checkbox.checked;
    })
    .length
  };

  /**
   * Filter method for removing 'Check all' check item
   *
   * @returns {Int} - Number of counted checkbox items
   */
  excludeCheckAll = checkbox => {
    if (!checkbox.classList.contains(CHECK_ALL_CONFIG.classes.checkAll)) {
      return checkbox;
    }
  };
}
