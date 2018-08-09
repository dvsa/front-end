import { FILTER_CONFIG } from './config';
import { addEventListenerToEl } from '../../../shared/misc/events';

export class MessagesFilter {
  // constructor runs on instantiated
  constructor(filterMessagesComponent) {
    // Exit if all required els are not present
    if (!filterMessagesComponent) return;

    // DOM elements
    const component = filterMessagesComponent;
    const messageWrap = component.querySelector('.js-filtered-messages');
    const checkboxes = component.querySelectorAll('.js-message-filter');
    const messageItems = [...messageWrap.querySelectorAll('[data-type]')];

    this.elements = {
      component,
      checkboxes,
      messageWrap,
      messageItems,
    };
    
    // Get values for state
    const currFilters = [];
    const allFilters = [...this.elements.checkboxes].map( (checkbox) => checkbox.attributes['data-type'].value );
    const checkBoxes = [...this.elements.checkboxes];

    // Populate state
    this.state = {
       allFilters,
       currFilters: allFilters
    };

    this.init();

  }
  
  init = () => {
    console.log(this.state.allFilters)
    console.log('inited state: ', this.state); 
    // Attach listeners to checkboxes
    this.elements.checkboxes.forEach( (checkbox) => { 
      addEventListenerToEl(checkbox, 'change', this.handleCheck);
    });
  };

  handleCheck = e => {   

        // Empty state 
        const newFilters = [];

        // Map through checkboxes in DOM. Get their data value
        this.elements.checkboxes.forEach( (checkbox) => { 
          // If it's checked, store filter value in state
          if( checkbox.checked ) {
              const filterType = checkbox.attributes['data-type'].value; 
              newFilters.push(filterType);
            }
        });
        
        // Update state with new filters
        this.state.currFilters = newFilters;
        console.log(this.state.currFilters);

        // State updated > filter messages by state
        this.filterMessages( this.state.currFilters ) 
      
  };

  filterMessages = type => {
    console.log(type); 

  };
}
