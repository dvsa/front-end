import { MessagesFilter } from './filter-messages';
import { FILTER_CONFIG } from './config';

export const initMessageFilter = () => {
  // Check elements exist
  let filterMessagesComponent = document.querySelectorAll('.js-filter-wrapper'),
    i;
  if (filterMessagesComponent.length < 1) return;

  // If elements exist, initiate the component
  for (i = 0; i < filterMessagesComponent.length; ++i) {
    new MessagesFilter(filterMessagesComponent[i]);
  }
};
