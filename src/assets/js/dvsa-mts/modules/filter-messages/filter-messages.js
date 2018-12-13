import { FILTER_CONFIG } from './config';
import { addEventListenerToEl } from '../../../shared/misc/events';
import { getQueryVariable } from '../../../shared/misc/get-query';

export class MessagesFilter {
  // constructor runs on instantiated
  constructor(filterMessagesComponent) {
    // Exit if required els are not present
    if (!filterMessagesComponent) return;

    // DOM elements
    const component = filterMessagesComponent;
    const messageList = document.querySelector('.js-message-list');

    const checkboxes = [...component.querySelectorAll(FILTER_CONFIG.selectors.checkboxes)];
    const messageItems = [...messageList.querySelectorAll(FILTER_CONFIG.data.messages)];
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
      messageList,
      messageItems,
      filteredView,
      emptyMessageTarget,
    };

    // Get values for state
    const currFilters = [];
    const allFilters = this.elements.checkboxes.map(checkbox => checkbox.attributes['data-type'].value);

    // Populate state
    this.state = {
      allFilters,
      currFilters: allFilters,
    };

    this.init();
  }

  init = () => {
    // Attach listeners to checkboxes
    const checkboxes = Array.from(this.elements.checkboxes);
    checkboxes.forEach(checkbox => {
      addEventListenerToEl(checkbox, 'change', this.handleCheck);
    });

    // Check if window.location is filtering
    const filterSpecialNotices = getQueryVariable('filter') == 'sn';
    if (filterSpecialNotices) {
      this.filterSpecialNotices();
    }

    this.handleCheck();
  };

  filterSpecialNotices = () => {
    const newFilters = [];

    // String to find on the checkboxes' data-type attribute
    const specialNoticeValue = 'Special notice';
    this.elements.checkboxes.forEach(checkbox => {
      // Uncheck all boxes that arent SNs
      checkbox.checked = false;
      if (checkbox.attributes['data-type'].value == specialNoticeValue) {
        checkbox.checked = true;
      }
      newFilters.push(specialNoticeValue);
    });

    // Update state with new SN filter
    this.state.currFilters = newFilters;
    // State updated > filter messages by state
    this.filterMessages(this.state.currFilters);
  };

  handleCheck = e => {
    // Empty state
    const newFilters = [];
    const newFilterStrings = [];

    let parametersNeeded = true;

    // Map through checkboxes - Get their data value
    this.elements.checkboxes.forEach(checkbox => {
      // If it's checked, store filter value in state
      if (checkbox.checked) {
        const filterType = checkbox.attributes['data-type'].value;
        newFilters.push(filterType);

        const filterString = checkbox.attributes['data-filter'].value;
        newFilterStrings.push(filterString);
      }
    });

    if (newFilters.length === this.elements.checkboxes.length) {
      parametersNeeded = false;
    }
    // Update state with new filters
    this.state.currFilters = newFilters;
    // State updated > filter messages by state
    this.filterMessages(this.state.currFilters);

    if (parametersNeeded) {
      this.updateMessageLinks(newFilterStrings.join('+'));
    } else {
      this.updateMessageLinks();
    }
  };

  filterMessages = filterOpts => {
    // Show or hide each message based on its data type. Matches against filters active in state.
    let messagesItems = Array.from(this.elements.messageItems);
    messagesItems.forEach(item => {
      const messageType = item.attributes['data-type'].value;
      if (!filterOpts.includes(messageType)) {
        item.classList.add('hidden');
      } else {
        item.classList.remove('hidden');
      }
    });

    // Show or hide 'Empty inbox' notice and section title
    const displayEmptyMessage = this.state.currFilters.length ? 'none' : 'block';
    const displayInboxTitle = this.state.currFilters.length ? 'block' : 'none';
    const listTitle = document.querySelector(FILTER_CONFIG.selectors.listTitle);
    listTitle.style.display = displayInboxTitle;
    document.querySelector('.message-panel__notice').style.display = displayEmptyMessage;
  };

  updateMessageLinks = filterString => {
    this.elements.messageItems.forEach(message => {
      message.querySelectorAll('a').forEach(anchor => {
        let href = anchor.attributes['href'].value;
        href = href.split('?')[0];
        if (filterString) {
          href = `${href}?filter=${filterString}`;
        }
        anchor.attributes['href'].value = href;
      });
    });
  };
}
