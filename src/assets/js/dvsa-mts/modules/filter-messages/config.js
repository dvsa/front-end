export const FILTER_CONFIG = {
  selectors: {
    component: '.js-filter-wrapper',
    messageList: '.js-message-list',
    checkboxes: '.js-message-filter',
    filteredView: '.js-message-panel',
    filterNotice: 'message-panel__notice', // used inside a classList method, so omit the dot
  },
  data: {
    noFilterNotice: 'Select a message type to view',
    noMessagesNotice: 'No messages',
    messages: '[data-type]',
  },
};
