export const FILTER_CONFIG = {
<<<<<<< HEAD
  selectors: {
    component: '.js-filter-wrapper',
    messageList: '.js-message-list',
    checkboxes: '.js-message-filter',
    filteredView: '.js-message-panel',
    listTitle: '.js-message-list-title',
    emptyNotice: 'message-panel__notice', // used inside a method, so omit the dot
  },
  data: {
    emptyNotice: 'Select a message type to view',
    messages: '[data-type]',
=======
  classes: {
    component: 'js-filter-wrapper',
    messageList: 'js-filter-message-panel',
    filters: 'js-message-filters',
  },
  dataAttributes: {
    type: 'data-message', // 'special', 'advice', 'system'
>>>>>>> Filtering WIP
  },
};
