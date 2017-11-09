import store from 'store';
import md5 from 'md5';
import SmoothScroll from 'smooth-scroll';

import { findIndex } from 'lodash';

import {
  elHasClass,
  toggleClass,
  addEventListenerToEl,
  closestParentOfEl
} from './../../shared/misc';

class Accordion {
  constructor(accordionElement) {

    if( !accordionElement ) return;
    this.accordionElement = accordionElement;

    this.smoothScroll = new SmoothScroll();

    // Create unique hash for current element based on DOM HTML
    this.uniqueIdentifier = 'js-accordion-' + md5(this.accordionElement.innerHTML);

    // Text for expand button
    this.sectionCloseAllText = 'Close All';
    this.sectionOpenAllText = 'Open All';

    // Element attribute names
    this.sectionContentIdAttributeName = 'data-content-id';
    this.sectionStateIndexIdAttributeName = 'data-section-state-index-id';
    this.sectionHeaderCategoryAttributeName = 'data-section-category';

    // Classes for later use
    this.sectionOpenClass = 'js-accordion__section--open';
    this.sectionHeaderClass = 'js-accordion__header';
    this.sectionContentClass = 'js-accordion__content';
    this.sectionClass = 'js-accordion__section';
    this.sectionExpandButtonClass = 'js-accordion__expand-button';
    this.accordionJSEnabledClass = 'js-accordion--js-enabled';
    this.accordionTitleClass = 'js-accordion__title-button';

    // Get all of the accordion sections
    this.sections = this.accordionElement.querySelectorAll('.' + this.sectionClass);
    this.headings = this.accordionElement.querySelectorAll('.' + this.sectionHeaderClass);
    this.expandButton = this.accordionElement.querySelector('.'+ this.sectionExpandButtonClass);

    // Add JS Enabled class
    toggleClass(this.accordionElement, this.accordionJSEnabledClass, true);
    
    // State for accordions
    this.state = {
      expandAll: false,
      expanding: false,
      sections: [],
    };

    this.smoothScrollOptions = {
      offset: 30,
      speed: 300,
      easing: 'easeOutCubic'
    };
    
    this.setup();
    this.refreshState();

  }

  /**
   * Handles event when the header is clicked.
   * 
   * @param {Event} event Event object when it is firect.
   */
  headerClickHandler(event) {
    if( !event.target || !this.state.sections.length ) return;
    let sectionHeader = closestParentOfEl(event.target, '.' + this.sectionClass);
    let sectionHeaderCategory = sectionHeader.getAttribute(this.sectionHeaderCategoryAttributeName);
    let stateSectionIndexId = Number(sectionHeader.getAttribute(this.sectionStateIndexIdAttributeName));
    let sectionFromState = this.state.sections[stateSectionIndexId];
    if( !sectionFromState ) return;
    let newSectionOpenState = sectionFromState.sectionOpen;
    this.state.sections[stateSectionIndexId].sectionOpen = !newSectionOpenState;
    this.refreshState();
    this.smoothScroll.animateScroll(sectionHeader, true, this.smoothScrollOptions);
    // GA Tracking code
    if( window.dataLayer ) {
      window.dataLayer.push({
        'event': 'link-click',
        'link': 'subsection-<' + sectionHeaderCategory + '>',
        'link-text': sectionHeader.querySelector('.' + this.accordionTitleClass).innerText,
        'link-action': newSectionOpenState ? 'open' : 'close',
        'link-type': 'accordion'
      });
    }
  }

  /**
   * Open/Close all accordion sections
   */
  expandButtonClickHandler() {
    this.state.expanding = true;
    this.state.expandAll = !this.state.expandAll;
    this.refreshState();
    this.state.expanding = false;
    this.smoothScroll.animateScroll(this.expandButton, true, this.smoothScrollOptions);
    // GA Tracking Code
    if( window.dataLayer ) {
      window.dataLayer.push({
        'event': 'link-click',
        'link': 'subsection-all',
        'link-text': this.getExpandButtonText(),
        'link-action': this.state.expandAll ? 'open' : 'close',
        'link-type': 'accordion'
      });
    }
  }

  /**
   * Setup the state
   */
  setup() {
    // Check if atleast one section element exists
    if( !this.sections.length ) return;

    // Loop through each section element
    for(let i = 0; i < this.sections.length; i++) {
      let sectionElement = this.sections[i];
      let sectionHeaderElement = sectionElement.querySelector('.' + this.sectionHeaderClass);
      let sectionContentElement = sectionHeaderElement.querySelector('.' + this.sectionContentClass);
      // Add the section elements to the state
      this.state.sections.push({
        sectionUniqueIdentifier: md5(sectionElement.innerHTML),
        sectionElement,
        sectionHeaderElement,
        sectionContentElement,
        sectionOpen: this.isSectionOpen(sectionElement)
      });
      // Update the DOM elements state index ID
      let stateSectionIndexId = this.state.sections.length - 1;
      sectionElement.setAttribute(this.sectionStateIndexIdAttributeName, stateSectionIndexId);
      // Add header event click
      addEventListenerToEl(sectionHeaderElement, 'click', this.headerClickHandler.bind(this));
    }

    // Add event for expand button
    addEventListenerToEl(this.expandButton, 'click', this.expandButtonClickHandler.bind(this));
  
    // Restore the saved state
    this.restoreSavedStateData();
  }

  /**
   * Check if section is open
   * 
   * @param {DOMElement} el Element to check if open
   */
  isSectionOpen(el) {
    // Check if element has the open class
    return elHasClass(el, this.sectionOpenClass) ? true : false;
  }

  /**
   * Restores the state of the accordions
   */
  restoreSavedStateData() {
    // Restore state if saved
    let savedState = store.get(this.uniqueIdentifier);
    // Check there is a saved state with sections
    if( savedState && savedState.sections ) {
      for(let i = 0; i < savedState.sections.length; i++) {
        let section = savedState.sections[i];
        // Check to make sure that the saved section
        // has a unique identifier
        if( !section || !section.uniqueIdentifier ) continue;
        // Check to make sure that the saved section exists in the state
        let sectionIndex = findIndex(this.state.sections, {
          sectionUniqueIdentifier: section.uniqueIdentifier
        });
        // Don't proceed if section doesn't exist in the state
        if( sectionIndex == undefined ) continue;
        // Check if expand all was saved
        // If it was then put the current state of the section as the expand all state
        this.state.sections[sectionIndex].sectionOpen = savedState.expandAll ? true : section.open;
      }
    }
  }

  /**
   * Saves the current state of the accordions
   */
  saveCurrentStateData() {
    // Create temporary object for later use
    let data = {};
    // Add the current expand all state to the object
    data.expandAll = this.state.expandAll;
    // Create an empty sections array to hold
    // the current state sections
    data.sections = [];
    // Loop through each section in the state
    for(let i = 0; i < this.state.sections.length; i++) {
      // Create temporary variable to hold the
      // current section from the iteration
      let section = this.state.sections[i];
      // Add the open/close state of the current section to
      // the temporary saved state object
      data.sections.push({
        uniqueIdentifier: section.sectionUniqueIdentifier,
        open: section.sectionOpen
      });
    }
    // Save the current state of the section with it's unqiue hash
    store.set(this.uniqueIdentifier, data);
  }

  /**
   * Refresh the DOM based on the state
   */
  refreshState() {
    // If the state object doesn't exist,
    // then don't proceed to refresh
    if( !this.state ) return;

    // Check if there is any sections avaliable
    if( this.state.sections ) {
      // Create temporary variable to hold
      // the open sections count
      let openCount = 0;
      // Refresh the DOM for each section
      for(let i = 0; i < this.state.sections.length; i++) {
        // If the expand button has been clicked,
        // then change the open state of the section to the expand all state
        if( this.state.expanding ) {
          this.state.sections[i].sectionOpen = this.state.expandAll;
        }

        // Get the section from the state based on the iteration
        let section = this.state.sections[i];

        // Toggle the correct class based on the state
        let sectionOpenState = section.sectionOpen;

        // Add/Remove the open class based on whether the section is open or closed
        toggleClass(section.sectionElement, this.sectionOpenClass, section.sectionOpen);

        // If the section is open
        // update the open count
        if( section.sectionOpen ) {
          openCount++;
        }

        // Change expand status if one section or more
        // section(s) is open, but only if expand button
        // was not clicked
        if( openCount >= 1 && !this.state.expanding ) {
          this.state.expandAll = false;
        }

        // Check if all sections are open and change the expand all state,
        // but only if expand button was not clicked
        if ( openCount >= this.state.sections.length && !this.state.expanding ) {
          this.state.expandAll = true;
        }
      }
    }
  
    // Update expand button text
    this.expandButton.innerText = this.getExpandButtonText();
  
    // Save current state for future
    this.saveCurrentStateData();
  }

  /**
   * Gets the current expand button text based on the state
   */
  getExpandButtonText() {
    return this.state.expandAll ? this.sectionCloseAllText : this.sectionOpenAllText;
  }

}

export function AccordionInitializer() {
  let accordions = document.querySelectorAll('.js-accordion');
  if( accordions.length ) {
    for(let i = 0; i < accordions.length; i++) {
      new Accordion(accordions[i]);
    }
  }
};