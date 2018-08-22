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
      },
    };

    this.init();
  }

  /**
   * Initialise listeners for change
   */
  init = () => {
    // Add change listener to all targeted checkboxes
    this.state.elements.checkboxes.forEach(checkbox => addEventListenerToEl(checkbox, 'change', this.toggleChecks));
  };

  /**
   * Checkbox change handler
   *
   * @param {Event} event - DOM Event object
   */
  toggleChecks = event => {
    const checkAllClass = CHECK_ALL_CONFIG.classes.checkAll;
    const allChecked = this.state.allChecked;

    // If the first checkbox is clicked
    if (event.target.classList.contains(checkAllClass)) {
      if (!allChecked) {
        this.state.allChecked = true;
        this.state.elements.checkboxes.map(checkbox => (checkbox.checked = true));
      } else if (this.state.allChecked) {
        this.state.allChecked = false;
        this.state.elements.checkboxes.map(checkbox => (checkbox.checked = false));
      }
    } else {
      // One of the other checkboxes is clicked - uncheck the first
      this.state.allChecked = false;
      this.state.elements.allTarget.checked = false;
    }
  };
}
