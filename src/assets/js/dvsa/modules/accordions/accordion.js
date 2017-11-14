import store from 'store';
import md5 from 'md5';
import SmoothScroll from 'smooth-scroll';
import findIndex from 'lodash/findIndex';

import { elHasClass, toggleClass, addEventListenerToEl, closestParentOfEl } from './../../../shared/misc';

export class Accordion {
  constructor(accordionElement) {
    if (!accordionElement) return;
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

    // Aria attribute names
    this.ariaControlsAttributeName = 'aria-controls';
    this.ariaExpandedAtributeName = 'aria-expanded';
    this.ariaHiddenAttributeName = 'aria-hidden';

    // Get all of the accordion sections
    this.sections = this.accordionElement.querySelectorAll('.' + this.sectionClass);
    this.headings = this.accordionElement.querySelectorAll('.' + this.sectionHeaderClass);
    this.expandButton = this.accordionElement.querySelector('.' + this.sectionExpandButtonClass);

    // DataLayer constants
    this.dataLayerOpenText = 'open';
    this.dataLayerCloseText = 'close';
    this.dataLayerLinkClickEventKey = 'link-click';
    this.dataLayerSectionMemoryEventKey = 'subsection-memory';
    this.dataLayerLinkTypeKey = 'accordion';
    this.dataLayerSectionAllLinkText = 'subsection-all';
    
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
      easing: 'easeOutCubic',
    };

    this.setup();
    this.refreshState();
  }

  /**
   * Setup the state
   */
  setup() {
    // Check if atleast one section element exists
    if (!this.sections.length) return;

    // Loop through each section element
    this.sections.forEach(sectionElement => {
      let sectionHeaderElement = sectionElement.querySelector('.' + this.sectionHeaderClass);
      let sectionContentElement = sectionElement.querySelector('.' + this.sectionContentClass);
      let sectionUniqueIdentifier = md5(sectionElement.innerHTML);
      // Add the section elements to the state
      this.state.sections.push({
        sectionUniqueIdentifier,
        sectionElement,
        sectionHeaderElement,
        sectionContentElement,
        sectionOpen: this.isSectionOpen(sectionElement),
      });
      // Update the DOM elements state index ID
      let stateSectionIndexId = this.state.sections.length - 1;
      sectionElement.setAttribute(this.sectionStateIndexIdAttributeName, stateSectionIndexId);
      // Set unique identifier for content
      sectionContentElement.setAttribute('id', sectionUniqueIdentifier);
    });

    // Delegate section header click event
    $.delegate(this.accordionElement, 'click', '.' + this.sectionHeaderClass, this.headerClickHandler);

    // Delegate section expand button click event
    $.delegate(this.accordionElement, 'click', '.' + this.sectionExpandButtonClass, this.expandButtonClickHandler);

    // Restore the saved state
    this.restoreSavedStateData();
  }

  /**
   * Handles event when the header is clicked.
   * 
   * @param {Event} event Event object when it is firect.
   */
  headerClickHandler = event => {
    if (!event.target || !this.state.sections.length) return;
    let section = closestParentOfEl(event.target, '.' + this.sectionClass);
    let sectionHeaderCategory = section.getAttribute(this.sectionHeaderCategoryAttributeName);
    let stateSectionIndexId = Number(section.getAttribute(this.sectionStateIndexIdAttributeName));
    let sectionFromState = this.state.sections[stateSectionIndexId];
    if (!sectionFromState) return;
    let newSectionOpenState = !sectionFromState.sectionOpen;
    this.state.sections[stateSectionIndexId].sectionOpen = newSectionOpenState;
    this.refreshState();
    this.smoothScroll.animateScroll(section, true, this.smoothScrollOptions);
    this.pushDataLayerForAccordion(stateSectionIndexId);
  };

  /**
   * Open/Close all accordion sections
   */
  expandButtonClickHandler = event => {
    this.state.expanding = true;
    this.state.expandAll = !this.state.expandAll;
    this.refreshState();
    this.state.expanding = false;
    this.smoothScroll.animateScroll(event.target, true, this.smoothScrollOptions);
    this.pushDataLayerForAllAccordions();
  };

  /**
   * Restores the state of the accordions
   */
  restoreSavedStateData() {
    // Restore state if saved
    let savedState = store.get(this.uniqueIdentifier);
    // Check there is a saved state with sections
    if (!savedState || !savedState.sections) return;
    let restoredSections = [];
    savedState.sections.forEach(section => {
      // Check to make sure that the saved section
      // has a unique identifier
      if (!section || !section.uniqueIdentifier) return;
      // Check to make sure that the saved section exists in the state
      let sectionIndex = findIndex(this.state.sections, {
        sectionUniqueIdentifier: section.uniqueIdentifier,
      });
      // Don't proceed if section doesn't exist in the state
      if (sectionIndex == undefined) return;
      // Check if expand all was saved
      // If it was then put the current state of the section as the expand all state
      this.state.sections[sectionIndex].sectionOpen = savedState.expandAll ? true : section.open;
      // Add current section to restored list
      restoredSections.push(this.state.sections[sectionIndex]);
    });
    this.pushDataLayerForSavedState(restoredSections);
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
    this.state.sections.forEach(section => {
      // Add the open/close state of the current section to
      // the temporary saved state object
      data.sections.push({
        uniqueIdentifier: section.sectionUniqueIdentifier,
        open: section.sectionOpen,
      });
    });
    // Save the current state of the section with it's unqiue hash
    store.set(this.uniqueIdentifier, data);
  }

  /**
   * Refresh the DOM based on the state
   */
  refreshState() {
    // If the state object doesn't exist,
    // then don't proceed to refresh
    if (!this.state) return;

    // Check if there is any sections avaliable
    if (this.state.sections) {
      // Create temporary variable to hold
      // the open sections count
      let openCount = 0;
      // Refresh the DOM for each section
      this.state.sections.forEach(section => {
        // If the expand button has been clicked,
        // then change the open state of the section to the expand all state
        if (this.state.expanding) {
          section.sectionOpen = this.state.expandAll;
        }

        // Toggle the correct class based on the state
        let sectionOpenState = section.sectionOpen;

        // Add/Remove the open class based on whether the section is open or closed
        toggleClass(section.sectionElement, this.sectionOpenClass, section.sectionOpen);

        // Set Aria attributes
        section.sectionHeaderElement.setAttribute(this.ariaControlsAttributeName, section.sectionUniqueIdentifier);
        section.sectionHeaderElement.setAttribute(this.ariaExpandedAtributeName, section.sectionOpen ? 'true' : 'false');
        section.sectionContentElement.setAttribute(this.ariaHiddenAttributeName, section.sectionOpen ? 'false' : 'true');

        // If the section is open
        // update the open count
        if (section.sectionOpen) {
          openCount++;
        }

        // Change expand status if one section or more
        // section(s) is open, but only if expand button
        // was not clicked
        if (openCount >= 1 && !this.state.expanding) {
          this.state.expandAll = false;
        }

        // Check if all sections are open and change the expand all state,
        // but only if expand button was not clicked
        if (openCount >= this.state.sections.length && !this.state.expanding) {
          this.state.expandAll = true;
        }
      });
    }

    // Update expand button text
    this.expandButton.innerText = this.getExpandButtonText();

    // Save current state for future
    this.saveCurrentStateData();
  }

    /**
   * Pushes a dataLayer object for all accordions
   */
  pushDataLayerForAllAccordions = () => {
    if( !window.dataLayer ) return;
    let expandState = this.state.expandAll ? this.dataLayerOpenText : this.dataLayerCloseText;
    let dataLayerObject = {
      event: this.dataLayerLinkClickEventKey,
      link: this.dataLayerSectionAllLinkText,
      'link-text': this.getExpandButtonText(),
      'link-action': expandState,
      'link-type': this.dataLayerLinkTypeKey,
    };
    // Add category state for each accordion
    // to the data layer push object
    this.state.sections.forEach(section => {
      let sectionDataLayerInfo = this.getSectionDataLayerInfo(section);
      dataLayerObject['subsection-' + sectionDataLayerInfo.category + '-status'] = expandState;
    });
    // Push the data layer object
    window.dataLayer.push(dataLayerObject);
  };

  /**
   * Pushes a datalayer object for a specific accordion section
   * 
   * @param {Number} sectionIndex The index id of the section in the state 
   */
  pushDataLayerForAccordion = (sectionIndex) => {
    if (!window.dataLayer || !sectionIndex) return;
    let section = this.state.sections[sectionIndex];
    if( !section || !section.sectionElement ) return;
    let sectionDataLayerInfo = this.getSectionDataLayerInfo(section);
    let dataLayerObject = {
      event: this.dataLayerLinkClickEventKey,
      link: 'subsection-' + sectionDataLayerInfo.category,
      'link-text': sectionDataLayerInfo.heading,
      'link-action': sectionDataLayerInfo.openState,
      'link-type': this.dataLayerLinkTypeKey,
    };
    dataLayerObject['subsection-' + sectionDataLayerInfo.category + '-status'] = sectionDataLayerInfo.openState;
    window.dataLayer.push(dataLayerObject);
  }

  /**
   * Pushes a datalayer object for all accordions restored from the saved state
   * 
   * @param {Array} section Array of sections restored from the saved state
   */
  pushDataLayerForSavedState = (sections) => {
    if( !window.dataLayer || !sections ) return;
    sections.forEach((section) => {
      let sectionDataLayerInfo = this.getSectionDataLayerInfo(section);
      if( sectionDataLayerInfo.openState == 'close' ) return;
      let dataLayerObject = {
        event: this.dataLayerSectionMemoryEventKey,
        link: 'subsection-' + sectionDataLayerInfo.category,
        'link-text': sectionDataLayerInfo.heading,
        'link-action': sectionDataLayerInfo.openState,
        'link-type': this.dataLayerLinkTypeKey,
      };
      dataLayerObject['subsection-' + sectionDataLayerInfo.category + '-status'] = 'open';
      window.dataLayer.push(dataLayerObject);
    });
  };

  /**
   * Check if section is open
   * 
   * @param {DOMElement} element Element to check if open
   */
  isSectionOpen(element) {
    // Check if element has the open class
    return elHasClass(element, this.sectionOpenClass) ? true : false;
  }

  /**
   * Gets the current expand button text based on the state
   */
  getExpandButtonText() {
    return this.state.expandAll ? this.sectionCloseAllText : this.sectionOpenAllText;
  }

  /**
   * Get the section info for the datalayer push
   */
  getSectionDataLayerInfo = section => {
    if( !section ) return;
    return {
      category: section.sectionElement.getAttribute(this.sectionHeaderCategoryAttributeName),
      indexId: Number(section.sectionElement.getAttribute(this.sectionStateIndexIdAttributeName)),
      heading: section.sectionElement.querySelector('.' + this.accordionTitleClass).innerText,
      openState: section.sectionOpen ? this.dataLayerOpenText : this.dataLayerCloseText,
    };
  };
  
}
