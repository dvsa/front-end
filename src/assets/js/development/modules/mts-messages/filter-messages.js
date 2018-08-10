import { FILTER_CONFIG } from './config';
import { addEventListenerToEl } from '../../../shared/misc/events';
import { insertAfter } from './../../../shared/misc';

export class MessagesFilter {
  // constructor runs on instantiated
  constructor(filterMessagesComponent) {
    // Exit if all required els are not present
    if (!filterMessagesComponent) return;

    // DOM elements
    const component = filterMessagesComponent;
    const messageWrap = component.querySelector(FILTER_CONFIG.selectors.messageList);
    const checkboxes = component.querySelectorAll(FILTER_CONFIG.selectors.checkboxes);
    const messageItems = [...messageWrap.querySelectorAll(FILTER_CONFIG.data.messages)];
    const filteredView = component.querySelector(FILTER_CONFIG.selectors.filteredView);
    const emptyMessageTarget = document.querySelector(FILTER_CONFIG.selectors.messageList);

    // Construct new DOM node for empty view
    const emptyMessageEl = document.createElement('p');
    emptyMessageEl.classList.add(`${FILTER_CONFIG.selectors.emptyNotice}`);
    emptyMessageEl.innerHTML = FILTER_CONFIG.data.emptyNotice;
    emptyMessageEl.style.display = 'none';

    // Insert 'empty' message after the messages list
    emptyMessageTarget.parentNode.insertBefore(emptyMessageEl, emptyMessageTarget);

    this.elements = {
      component,
      checkboxes,
      messageWrap,
      messageItems,
      filteredView,
      emptyMessageTarget,
    };

    // Get values for state
    const currFilters = [];
    const allFilters = [...this.elements.checkboxes].map(checkbox => checkbox.attributes['data-type'].value);

    // Populate state
    this.state = {
      allFilters,
      currFilters: allFilters,
    };

    this.init();
  }

  init = () => {
    // Attach listeners to checkboxes
    this.elements.checkboxes.forEach(checkbox => {
      addEventListenerToEl(checkbox, 'change', this.handleCheck);
    });
  };

  handleCheck = e => {
    // Empty state
    const newFilters = [];

    // Map through checkboxes - Get their data value
    this.elements.checkboxes.forEach(checkbox => {
      // If it's checked, store filter value in state
      if (checkbox.checked) {
        const filterType = checkbox.attributes['data-type'].value;
        newFilters.push(filterType);
      }
    });

    // Update state with new filters
    this.state.currFilters = newFilters;
    // State updated > filter messages by state
    this.filterMessages(this.state.currFilters);
  };

  filterMessages = filterOpts => {
    this.elements.messageItems.forEach(item => {
      const messageType = item.attributes['data-type'].value;
      if (!filterOpts.includes(messageType)) {
        item.classList.add('hidden');
      } else {
        item.classList.remove('hidden');
      }
    });

    // Show or hide 'Empty inbox' notice
    const displayValue = this.state.currFilters.length ? 'none' : 'block';
    document.querySelector('.message-panel__notice').style.display = displayValue;
  };
}
