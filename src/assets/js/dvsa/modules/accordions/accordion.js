import store from 'store';
import md5 from 'md5';
import SmoothScroll from 'smooth-scroll';
import findIndex from 'lodash/findIndex';

import { ACCORDION_CONSTANTS } from './constants';
import { elHasClass, toggleClass, addEventListenerToEl, closestParentOfEl } from './../../../shared/misc';

export class Accordion {
  constructor(accordionElement) {
    this.accordionElement = accordionElement;

    // Check if the accordion exists
    if (!this.accordionElement) {
      return console.warn('Accordion element not found');
    }

    // Setup smooth scrolling library
    this.smoothScroll = new SmoothScroll();

    // Create unique hash for current element based on DOM HTML
    this.uniqueIdentifier = 'js-accordion-' + md5(this.accordionElement.innerHTML);

    // Get all of the accordion sections
    this.sections = Array.from(this.accordionElement.querySelectorAll('.' + ACCORDION_CONSTANTS.classNames.section));
    this.headings = Array.from(this.accordionElement.querySelectorAll('.' + ACCORDION_CONSTANTS.classNames.header));
    this.expandButton = this.accordionElement.querySelector('.' + ACCORDION_CONSTANTS.classNames.expandButton);

    // Check if sections and headings exist
    if (!this.sections || !this.headings || !this.expandButton) {
      return console.warn('No sections found', 'No headings found', 'No expand button found');
    }

    // Add JS Enabled class
    toggleClass(this.accordionElement, ACCORDION_CONSTANTS.classNames.jsEnabled, true);

    // State for accordions
    this.state = {
      expandAll: false,
      expanding: false,
      sections: [],
    };

    // Setup smooth scrolling options
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
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  setup() {
    // Check if atleast one section element exists
    if (!this.sections.length) return;

    // Loop through each section element
    this.sections.forEach(sectionElement => {
      if (!sectionElement) {
        return console.log('Section element not found');
      }

      let sectionHeaderElement = sectionElement.querySelector('.' + ACCORDION_CONSTANTS.classNames.header);
      if (!sectionHeaderElement) {
        return console.log('Section header element not found');
      }

      let sectionContentElement = sectionElement.querySelector('.' + ACCORDION_CONSTANTS.classNames.content);
      if (!sectionContentElement) {
        return console.log('Section content element not found');
      }

      let sectionUniqueIdentifier = md5(sectionElement.innerHTML);
      let sectionContentId = sectionHeaderElement.getAttribute(ACCORDION_CONSTANTS.attributeNames.sectionContentId);
      // Add the section elements to the state
      this.state.sections.push({
        sectionUniqueIdentifier,
        sectionElement,
        sectionHeaderElement,
        sectionContentElement,
        sectionContentId,
        sectionOpen: this.isSectionOpen(sectionElement),
      });
      // Update the DOM elements state index ID
      let stateSectionIndexId = this.state.sections.length - 1;
      sectionElement.setAttribute(ACCORDION_CONSTANTS.attributeNames.stateIndexId, stateSectionIndexId);
      // Set unique identifier for content
      if (!sectionContentElement.getAttribute('id')) {
        sectionContentElement.setAttribute('id', sectionContentId ? sectionContentId : sectionUniqueIdentifier);
      }
    });

    // Delegate section header click event
    $.delegate(this.accordionElement, 'click', '.' + ACCORDION_CONSTANTS.classNames.header, this.headerClickHandler);
    // Delegate section expand button click event
    $.delegate(this.accordionElement, 'click', '.' + ACCORDION_CONSTANTS.classNames.expandButton, this.expandButtonClickHandler);

    // Restore the saved state
    this.restoreSavedStateData();
  }

  /**
   * Handles event when the header is clicked.
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @param {Event} event Event object when it is firect.
   */
  headerClickHandler = event => {
    if (!event.target || !this.state.sections.length) return;
    let section = closestParentOfEl(event.target, '.' + ACCORDION_CONSTANTS.classNames.section);
    if (section.getAttribute(ACCORDION_CONSTANTS.attributeNames.preventDefault)) return;
    let sectionHeaderCategory = section.getAttribute(ACCORDION_CONSTANTS.attributeNames.sectionCategory);
    let stateSectionIndexId = Number(section.getAttribute(ACCORDION_CONSTANTS.attributeNames.stateIndexId));
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
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  expandButtonClickHandler = event => {
    this.state.expanding = true;
    this.state.expandAll = !this.state.expandAll;
    if (this.state.expandAll) {
      $.fire(document, ACCORDION_CONSTANTS.eventNames.expandAllOpen);
    }
    this.refreshState();
    this.state.expanding = false;
    this.smoothScroll.animateScroll(event.target, true, this.smoothScrollOptions);
    this.pushDataLayerForAllAccordions();
  };

  /**
   * Restores the state of the accordions
   *
   * @author Tameem Safi <t.safi@kainos.com>
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
      // Check if section with index exists
      let stateSection = this.state.sections[sectionIndex];
      if (!stateSection) return;
      // Check if section has restore state disabled
      let disableRestore = false;
      if (stateSection.sectionElement) {
        if (stateSection.sectionElement.getAttribute(ACCORDION_CONSTANTS.attributeNames.disableStateRestore)) {
          disableRestore = true;
        }
      }
      // Check if expand all was saved
      // If it was then put the current state of the section as the expand all state
      this.state.sections[sectionIndex].sectionOpen = disableRestore ? false : savedState.expandAll ? true : section.open;
      // Add current section to restored list
      restoredSections.push(this.state.sections[sectionIndex]);
    });
    this.pushDataLayerForSavedState(restoredSections);
  }

  /**
   * Saves the current state of the accordions
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  saveCurrentStateData() {
    // Create temporary object for later use
    let data = {};
    // Add the current expand all state to the object
    data.expandAll = this.state.expandAll;
    // Create an empty sections array to hold
    // the current state sections
    data.sections = [];
    // Check if sections exist in state
    if (!this.state || !this.state.sections) return;
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
   *
   * @author Tameem Safi <t.safi@kainos.com>
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
      let totalCount = 0;

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
        toggleClass(section.sectionElement, ACCORDION_CONSTANTS.classNames.sectionOpen, section.sectionOpen);

        // Set Aria attributes
        if (
          section.sectionHeaderElement &&
          section.sectionContentElement &&
          (section.sectionContentId || section.sectionUniqueIdentifier)
        ) {
          section.sectionHeaderElement.setAttribute(
            ACCORDION_CONSTANTS.ariaAttributes.controls,
            section.sectionContentId ? section.sectionContentId : section.sectionUniqueIdentifier
          );
          section.sectionHeaderElement.setAttribute(ACCORDION_CONSTANTS.ariaAttributes.expanded, section.sectionOpen ? 'true' : 'false');
          section.sectionContentElement.setAttribute(ACCORDION_CONSTANTS.ariaAttributes.hidden, section.sectionOpen ? 'false' : 'true');
        }

        // If the section is open
        // update the open count
        if (section.sectionOpen) {
          openCount++;
        }

        // Add count to total sections
        // This would exclude any that are disabled
        totalCount++;

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
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  pushDataLayerForAllAccordions = () => {
    if (!window.dataLayer) return;
    let expandState = this.state.expandAll ? ACCORDION_CONSTANTS.dataLayer.open : ACCORDION_CONSTANTS.dataLayer.close;
    let dataLayerObject = {
      event: ACCORDION_CONSTANTS.dataLayer.linkClickEvent,
      link: ACCORDION_CONSTANTS.dataLayer.sectionAll,
      'link-text': this.state.expandAll ? ACCORDION_CONSTANTS.openAllText : ACCORDION_CONSTANTS.closeAllText,
      'link-action': expandState,
      'link-type': ACCORDION_CONSTANTS.dataLayer.linkType,
    };
    // Add category state for each accordion
    // to the data layer push object
    this.state.sections.forEach(section => {
      let sectionDataLayerInfo = this.getSectionDataLayerInfo(section);
      // Rename state 'close' to 'closed' for subsection-<category>-status
      let subsectionCategoryStatusState =
        expandState === ACCORDION_CONSTANTS.dataLayer.close ? ACCORDION_CONSTANTS.dataLayer.closedStatus : expandState;
      // Add to datalayer object
      dataLayerObject['subsection-' + sectionDataLayerInfo.category + '-status'] = subsectionCategoryStatusState;
    });
    // Push the data layer object
    window.dataLayer.push(dataLayerObject);
  };

  /**
   * Pushes a datalayer object for a specific accordion section
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @param {Number} sectionIndex The index id of the section in the state
   */
  pushDataLayerForAccordion = sectionIndex => {
    if (!window.dataLayer || sectionIndex == undefined) return;
    let section = this.state.sections[sectionIndex];
    if (!section || !section.sectionElement) return;
    let sectionDataLayerInfo = this.getSectionDataLayerInfo(section);

    // Create the datalayer push object
    let dataLayerClickObject = {
      event: ACCORDION_CONSTANTS.dataLayer.linkClickEvent,
      link: 'subsection-' + sectionDataLayerInfo.category,
      'link-text': sectionDataLayerInfo.heading,
      'link-action': sectionDataLayerInfo.openState,
      'link-type': ACCORDION_CONSTANTS.dataLayer.linkType,
    };
    // Rename state 'close' to 'closed' for subsection-<category>-status
    let subsectionCategoryStatusState =
      sectionDataLayerInfo.openState === ACCORDION_CONSTANTS.dataLayer.close
        ? ACCORDION_CONSTANTS.dataLayer.closedStatus
        : sectionDataLayerInfo.openState;
    // Add the category to the push object
    dataLayerClickObject['subsection-' + sectionDataLayerInfo.category + '-status'] = subsectionCategoryStatusState;
    // Push the object into the datalayer array
    window.dataLayer.push(dataLayerClickObject);
  };

  /**
   * Pushes a datalayer object for all accordions restored from the saved state
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @param {Array} section Array of sections restored from the saved state
   */
  pushDataLayerForSavedState = sections => {
    if (!window.dataLayer || !sections) return;
    sections.forEach(section => {
      let sectionDataLayerInfo = this.getSectionDataLayerInfo(section);
      if (sectionDataLayerInfo.openState == ACCORDION_CONSTANTS.dataLayer.close) return;
      let dataLayerObject = {
        event: ACCORDION_CONSTANTS.dataLayer.sectionMemoryEvent,
        link: 'subsection-' + sectionDataLayerInfo.category,
        'link-text': sectionDataLayerInfo.heading,
        'link-action': sectionDataLayerInfo.openState,
        'link-type': ACCORDION_CONSTANTS.dataLayer.linkType,
      };
      dataLayerObject['subsection-' + sectionDataLayerInfo.category + '-status'] = sectionDataLayerInfo.openState;
      window.dataLayer.push(dataLayerObject);
    });
  };

  /**
   * Check if section is open
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @param {DOMElement} element Element to check if open
   */
  isSectionOpen(element) {
    // Check if element has the open class
    return elHasClass(element, ACCORDION_CONSTANTS.classNames.sectionOpen) ? true : false;
  }

  /**
   * Gets the current expand button text based on the state
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  getExpandButtonText() {
    return this.state.expandAll ? ACCORDION_CONSTANTS.closeAllText : ACCORDION_CONSTANTS.openAllText;
  }

  /**
   * Get the section info for the datalayer push
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  getSectionDataLayerInfo = section => {
    if (!section || !section.sectionElement) return;
    return {
      category: section.sectionElement.getAttribute(ACCORDION_CONSTANTS.attributeNames.sectionCategory),
      indexId: Number(section.sectionElement.getAttribute(ACCORDION_CONSTANTS.attributeNames.stateIndexId)),
      heading: section.sectionElement.querySelector('.' + ACCORDION_CONSTANTS.classNames.title).innerText,
      openState: section.sectionOpen ? ACCORDION_CONSTANTS.dataLayer.open : ACCORDION_CONSTANTS.dataLayer.close,
    };
  };
}
