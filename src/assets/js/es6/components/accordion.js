import { elHasClass, toggleClass } from './../misc';

export class Accordion {
  constructor() {

    // Check if there is any accordions on the page    
    if( !document.querySelectorAll('.js-accordion').length ) return;

    // Get all of the accordion sections
    this.sections = document.querySelectorAll('.js-accordion__section');
    this.headings = document.querySelectorAll('.js-accordion__header');
    this.expandButton = document.querySelector('.js-accordion__expand-button');
    this.contentSections = document.querySelectorAll('.js-accordion__content');

    this.sectionCloseText = 'Close All';
    this.sectionOpenAllText = 'Open All';

    this.sectionOpenClass = 'js-accordion__section--open';
    this.sectionHeaderClass = '.js-accordion__header';

    this.state = {
      expandButtonText: this.sectionOpenAllText,
      sections: []
    };
    
    this.setup();

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
      let sectionHeaderElement = sectionElement.querySelector(this.sectionHeaderClass);
      let sectionContentId = sectionHeaderElement.getAttribute('data-content-id').replace('#', '');
      let sectionContentElement = document.getElementById(sectionContentId);
      // Add the section elements to the state
      this.state.sections.push({
        sectionElement,
        sectionHeaderElement,
        sectionContentId,
        sectionContentElement,
        sectionOpen: elHasClass(sectionElement, this.sectionOpenClass)
      });
    }
  }

  /**
   * Refresh the DOM based on the state
   */
  refreshState() {
    if( !this.state ) return;

    // Check if there is any sections avaliable
    if( this.state.sections ) {
      // Refresh the DOM for each section
      for(let i = 0; i < this.state.sections.length; i++) {
        let section = this.state.sections[i];
        if( section.sectionOpen ) {

        }
      }
    }
  }

}