export const FILTER_CONFIG = {
  selectors: {
    component: '.js-filter-wrapper',
    messageList: '.js-filtered-messages',
    checkboxes: '.js-message-filter', 
    filteredView: '.js-message-panel',
    emptyNotice: 'message-panel__notice' // used inside a method, so omit the dot
  },
  data: {
    emptyNotice: 'No messages to show',
    messages: '[data-type]'
  }
};
