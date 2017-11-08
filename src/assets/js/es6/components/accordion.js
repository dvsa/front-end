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

    // Text for expand button
    this.sectionCloseAllText = 'Close All';
    this.sectionOpenAllText = 'Open All';

    // Element attribute names
    this.sectionContentIdAttributeName = 'data-content-id';
    this.sectionStateIndexIdAttributeName = 'data-section-state-index-id';

    // Classes for later use
    this.sectionOpenClass = 'js-accordion__section--open';
    this.sectionHeaderClass = 'js-accordion__header';
    this.sectionContentClass = 'js-accordion__content';
    this.sectionClass = 'js-accordion__section';
    this.sectionExpandButtonClass = 'js-accordion__expand-button';

    // Get all of the accordion sections
    this.sections = this.accordionElement.querySelectorAll('.' + this.sectionClass);
    this.headings = this.accordionElement.querySelectorAll('.' + this.sectionHeaderClass);
    this.expandButton = this.accordionElement.querySelector('.'+ this.sectionExpandButtonClass);

    // State for accordions
    this.state = {
      expandAll: false,
      expanding: false,
      sections: []
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
    let stateSectionIndexId = Number(sectionHeader.getAttribute(this.sectionStateIndexIdAttributeName));
    let sectionFromState = this.state.sections[stateSectionIndexId];
    if( !sectionFromState ) return;
    this.state.sections[stateSectionIndexId].sectionOpen = !sectionFromState.sectionOpen;
    this.refreshState();
  }

  /**
   * Open/Close all accordion sections
   */
  expandButtonClickHandler() {
    this.state.expanding = true;
    this.state.expandAll = !this.state.expandAll;
    for(let i = 0; i < this.state.sections.length; i++) {
      this.state.sections[i].sectionOpen = this.state.expandAll;
    }
    this.refreshState();
    this.state.expanding = false;
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
  }

  /**
   * Check if section is open
   * 
   * @param {DOMElement} el Element to check if open
   */
  isSectionOpen(el) {
    return elHasClass(el, this.sectionOpenClass) ? true : false;
  }

  /**
   * Refresh the DOM based on the state
   */
  refreshState() {
    if( !this.state ) return;

    // Check if there is any sections avaliable
    if( this.state.sections ) {
      let openCount = 0;
      // Refresh the DOM for each section
      for(let i = 0; i < this.state.sections.length; i++) {
        let section = this.state.sections[i];
        // Toggle the correct class based on the state
        let sectionOpenState = section.sectionOpen;
        toggleClass(section.sectionElement, this.sectionOpenClass, section.sectionOpen);
        if( section.sectionOpen ) {
          openCount++;
        }
        // Change expand status if one section is closed
        if( openCount >= 1 && !this.state.expanding ) {
          this.state.expandAll = false;
        }
        // Check if all sections are open
        if ( openCount >= this.state.sections.length && !this.state.expanding ) {
          this.state.expandAll = true;
        }
      }
    }

    // Update expand button text
    this.expandButton.innerText = this.state.expandAll ? this.sectionCloseAllText : this.sectionOpenAllText;

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