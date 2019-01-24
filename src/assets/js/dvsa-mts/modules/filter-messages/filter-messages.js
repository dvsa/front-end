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
    const filterNoticeTarget = document.querySelector(FILTER_CONFIG.selectors.messageList);

    // Construct new DOM node for filters notice view
    const filterNoticeEl = document.createElement('p');
    filterNoticeEl.classList.add(`${FILTER_CONFIG.selectors.filterNotice}`);
    filterNoticeEl.style.display = 'none';

    // Insert no checked filters message after the messages list
    filterNoticeTarget.parentNode.insertBefore(filterNoticeEl, filterNoticeTarget);

    this.elements = {
      component,
      checkboxes,
      messageList,
      messageItems,
      filteredView,
      filterNoticeTarget,
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
    let hiddenMessageCount = 0;
    messagesItems.forEach(item => {
      const messageType = item.attributes['data-type'].value;
      if (!filterOpts.includes(messageType)) {
        item.classList.add('hidden');
        hiddenMessageCount++;
      } else {
        item.classList.remove('hidden');
      }
    });

    // Set the filter notice text and show/hide
    let filterNotice = document.querySelector('.message-panel__notice');
    filterNotice.style.display = 'none';
    if (this.state.currFilters.length === 0) {
      filterNotice.innerHTML = FILTER_CONFIG.data.noFilterNotice;
      filterNotice.style.display = 'block';
    } else {
      if (messagesItems.length === 0 || messagesItems.length === hiddenMessageCount) {
        filterNotice.innerHTML = FILTER_CONFIG.data.noMessagesNotice;
        filterNotice.style.display = 'block';
      }
    }
  };

  updateMessageLinks = filterString => {
    this.elements.messageItems.forEach(message => {
      Array.from(message.querySelectorAll('a')).forEach(anchor => {
        let href = anchor.href;
        href = href.split('?')[0];
        if (filterString) {
          href = `${href}?filter=${filterString}`;
        }
        anchor.href = href;
      });
    });
  };
}
