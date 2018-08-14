import { MessagesFilter } from './filter-messages';
import { FILTER_CONFIG } from './config';

export const initMessageFilter = () => {
  let filterMessagesComponent = document.querySelectorAll('.js-filter-wrapper');
  let messageFilters = document.querySelectorAll('.js-message-filters');
  let messageList = document.querySelectorAll('.js-filtered-messages');

  if (!messageList || !messageFilters || !filterMessagesComponent) return;

  filterMessagesComponent.forEach(filterMessagesComponent => {
    new MessagesFilter(filterMessagesComponent);
  });
};

/*

import the const module itself

export an init const which checks for existence of the 
right dom els and create new instance of the class

*/
