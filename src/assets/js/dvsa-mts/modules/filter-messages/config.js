export const FILTER_CONFIG = {
  selectors: {
    component: '.js-filter-wrapper',
    messageList: '.js-message-list',
    checkboxes: '.js-message-filter',
    filteredView: '.js-message-panel',
    listTitle: '.js-message-list-title',
    emptyNotice: 'message-panel__notice', // used inside a classList method, so omit the dot
  },
  data: {
    emptyNotice: 'Select a message type to view',
    messages: '[data-type]',
  },
};
