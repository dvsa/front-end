import axios from 'axios';

import { ACCORDION_CONSTANTS } from './accordion';
import { closestParentOfEl, toggleClass } from './../../../shared/misc';

export const RECALLS_ACCORDION_CONSTANTS = {
  selectors: {
    section: '[data-recalls-accordion]',
    header: '[data-recalls-accordion-header]',
  },
  attributeNames: {
    ajaxEndpoint: 'data-recalls-ajax-endpoint',
    ajaxData: 'data-recalls-ajax-data',
  },
  classNames: {
    content: 'recalls-accordion',
    contentNoJs: 'recalls-accordion--no-js',
    contentLoading: 'recalls-accordion--loading',
    contentShowOutput: 'recalls-accordion--show-output',
    noJSAlternative: 'recalls-accordion__no-js-alternative',
    loading: 'recalls-accordion__loading',
    output: 'recalls-accordion__output',
  },
};

export class RecallsAccordion {
  constructor() {
    // Get recalls accordion element
    this.recallsAccordionSectionElement = document.querySelector(RECALLS_ACCORDION_CONSTANTS.selectors.section);

    // Do not continue if recalls accordion does not exist
    if (!this.recallsAccordionSectionElement) return;

    this.recallsAccordionHeaderElement = document.querySelector(RECALLS_ACCORDION_CONSTANTS.selectors.header);
    this.parentAccordionElement = closestParentOfEl(this.recallsAccordionSectionElement, '.' + ACCORDION_CONSTANTS.classNames.accordion);
    this.recallsAccordionContentElement = this.recallsAccordionSectionElement.querySelector('.' + ACCORDION_CONSTANTS.classNames.content);

    // Recalls specific elements
    this.recallsContentElement = document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.content);
    this.recallsContentNoJSAlternativeElement = document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.noJSAlternative);
    this.recallsContentLoadingElement = document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.loading);
    this.recallsContentOutputElement = document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.output);

    this.state = {
      ajaxRequestBody: false,
      ajaxEndpoint: false,
      ajaxContentAddedToDOM: false,
      loading: false,
    };

    // Setup the recalls accordion
    this.setup();
  }

  /**
   * Setup recalls accordion
   * - Add recall accordion events
   * 
   * @author Tameem Safi <t.safi@kainos.com>
   */
  setup() {
    // Remove no js class to hide alternative method
    toggleClass(this.recallsContentElement, RECALLS_ACCORDION_CONSTANTS.classNames.contentNoJs, false);
    // Add the ajax endpoint to the state
    this.state.ajaxEndpoint = this.recallsAccordionSectionElement.getAttribute(RECALLS_ACCORDION_CONSTANTS.attributeNames.ajaxEndpoint);
    // Get ajax data to send with request
    this.state.ajaxRequestBody = JSON.parse(
      this.recallsAccordionSectionElement.getAttribute(RECALLS_ACCORDION_CONSTANTS.attributeNames.ajaxData)
    );
    // Delegate event for when the accordion header is clicked
    $.delegate(this.parentAccordionElement, 'click', RECALLS_ACCORDION_CONSTANTS.selectors.header, this.recallsHeadingClickHandler);
  }

  /**
   * Event handler when recalls accordion heading is clicked
   */
  recallsHeadingClickHandler = event => {
    if (!this.state.ajaxEndpoint) return;
    // Enable loading
    if (!this.state.loading && !this.state.ajaxContentAddedToDOM) {
      // Change the state
      this.state.loading = true;
      // Toggle loading class to show spinner and message
      toggleClass(this.recallsContentElement, RECALLS_ACCORDION_CONSTANTS.classNames.contentLoading, true);
      // Make AJAX call
      axios
        .post(this.state.ajaxEndpoint, {
          ...this.state.ajaxRequestBody,
        })
        .then(response => {
          this.state.loading = false;
          this.state.ajaxContentAddedToDOM = true;
          // Remove loading class
          toggleClass(this.recallsContentElement, RECALLS_ACCORDION_CONSTANTS.classNames.contentLoading, false);
          // Add html form ajax to output
          this.recallsContentOutputElement.innerHTML = response.data;
          // Display the accordion output
          toggleClass(this.recallsContentElement, RECALLS_ACCORDION_CONSTANTS.classNames.contentShowOutput, true);
        })
        .catch(error => {
          console.log(error);
        });

      setTimeout(() => {}, 2000);
    }
  };
}
