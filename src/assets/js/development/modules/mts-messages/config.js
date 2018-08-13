export const FILTER_CONFIG = {
<<<<<<< HEAD
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
<<<<<<< HEAD
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
=======
  selectors: {
    component: '.js-filter-wrapper',
    messageList: '.js-message-list',
    checkboxes: '.js-message-filter',
    filteredView: '.js-message-panel',
<<<<<<< HEAD
    emptyNotice: 'message-panel__notice' // used inside a method, so omit the dot
>>>>>>> Filter functionality
=======
    emptyNotice: 'message-panel__notice', // used inside a method, so omit the dot
>>>>>>> Filter messages
  },
  data: {
    emptyNotice: 'No messages to show',
=======
>>>>>>> Merged from master
    messages: '[data-type]',
  },
};
