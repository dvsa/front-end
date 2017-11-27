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
  dataLayer: {
    submitEvent: 'recall-cta-submit',
    submitElementName: 'Recall',
    submitRecallUi: 'cta-submitted',
    submitRecallOutcome: 'Requested',
    submitTimestamp: 'timestamp',
  },
};

export class RecallsAccordion {
  constructor() {
    // Get recalls accordion element
    this.recallsAccordionSectionElement = document.querySelector(RECALLS_ACCORDION_CONSTANTS.selectors.section);

    // Do not continue if recalls accordion does not exist
    if (!this.recallsAccordionSectionElement) return;

    // Get elements
    this.recallsAccordionHeaderElement = document.querySelector(RECALLS_ACCORDION_CONSTANTS.selectors.header);
    this.parentAccordionElement = closestParentOfEl(this.recallsAccordionSectionElement, '.' + ACCORDION_CONSTANTS.classNames.accordion);
    this.recallsAccordionContentElement = this.recallsAccordionSectionElement.querySelector('.' + ACCORDION_CONSTANTS.classNames.content);

    // Recalls specific elements
    this.recallsContentElement = document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.content);
    this.recallsContentNoJSAlternativeElement = document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.noJSAlternative);
    this.recallsContentLoadingElement = document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.loading);
    this.recallsContentOutputElement = document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.output);

    // Check if elements exist
    if (!this.recallsAccordionHeaderElement) {
      return console.warn('Recalls accordion header element not found');
    }

    if (!this.parentAccordionElement) {
      return console.warn('Recalls main accordion element not found');
    }

    if (!this.recallsAccordionContentElement) {
      return console.warn('Recalls accordion content element not found');
    }

    if (!this.recallsContentElement) {
      return console.warn('Recalls accordion content inner wrapper element not found');
    }

    if (!this.recallsContentNoJSAlternativeElement) {
      return console.warn('Recalls accordion no js alternative element not found');
    }

    if (!this.recallsContentLoadingElement) {
      return console.warn('Recalls accordion loading element not found');
    }

    if (!this.recallsContentOutputElement) {
      return console.warn('Recalls accordion ajax output placeholder element not found');
    }

    // Setup initial state
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
    // Listen for expand all open event
    // Call ajax if all accordions are expanded
    // $.once(document, ACCORDION_CONSTANTS.eventNames.expandAllOpen, '', this.recallsHeadingClickHandler);
    $.events(document, {
      [ACCORDION_CONSTANTS.eventNames.expandAllOpen]: this.recallsHeadingClickHandler,
    });
  }

  /**
   * Event handler when recalls accordion heading is clicked
   */
  recallsHeadingClickHandler = event => {
    if (!this.state.ajaxEndpoint) return;
    // Enable loading
    if (!this.state.loading && !this.state.ajaxContentAddedToDOM) {
      // Make AJAX call
      this.dataLayerPushBeforeAjax();
      // this.callAjaxWithHTMLResponse();
      this.callAjaxWithJSONResponse();
    }
  };

  /**
   * Calls ajax and expects a JSON response
   *
   * Response should be in the following format:
   *
   * {
   *   "result": "HTML we render",
   *   "dataLayer": [
   *     {
   *       "event": "api-response"
   *       ...
   *     },
   *     {
   *       "event": "cta-status-ready"
   *       ...
   *     }
   *   ]
   * }
   *
   * result - HTML will replace accordion content in DOM
   * dataLayer - Will push each item in the array
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  callAjaxWithJSONResponse = () => {
    // Start loading
    this.startLoading();
    axios
      .post(this.state.ajaxEndpoint, {
        ...this.state.ajaxRequestBody,
      })
      .then(response => {
        let responseData = response.data;

        // Check if response has HTML result
        if (responseData === null || responseData.result === null) {
          // Stop loading
          this.stopLoading();
          // Return console message
          return console.warn('No HTML result key found in response');
        }

        // Change recalls accordion DOM content with response
        this.recallsContentOutputElement.innerHTML = responseData.result;
        // Display the accordion output
        toggleClass(this.recallsContentElement, RECALLS_ACCORDION_CONSTANTS.classNames.contentShowOutput, true);
        // Change state to reflect DOM change
        this.state.ajaxContentAddedToDOM = true;

        // Check if smartSurveyLink key exists in response
        if (responseData !== null && responseData.smartSurveyLink) {
          // Get phase banner link
          let phaseBannerLink = document.querySelector('.phase-banner a');
          // Check if the link exists
          if (phaseBannerLink) {
            // Replace current survey link with new one from the response
            phaseBannerLink.href = responseData.smartSurveyLink;
          } else {
            console.warn('Found smart survey link in response, but could no detect phase banner link in the DOM');
          }
        }

        // Check if dataLayer key exists in repsonse
        if (responseData !== null && responseData.dataLayer) {
          // Check if is array
          if (Array.isArray(responseData.dataLayer)) {
            responseData.dataLayer.forEach(dataLayerObject => {
              this.dataLayerPush(dataLayerObject);
            });
          } else if (responseData.dataLayer !== null && typeof responseData.dataLayer === 'object') {
            this.dataLayerPush(responseData.dataLayer);
          }
        }

        // Stop loading
        this.stopLoading();
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * Calls ajax and expects a text/html response
   * then it will replace the recalls accordion content with the response
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  callAjaxWithHTMLResponse = () => {
    // Start loading
    this.startLoading();
    axios
      .post(this.state.ajaxEndpoint, {
        ...this.state.ajaxRequestBody,
      })
      .then(response => {
        // check if response has data
        if (!response || !response.data) {
          this.stopLoading();
          return console.warn('Response has no data');
        }

        // Add html form ajax to output
        this.recallsContentOutputElement.innerHTML = response.data;

        // Change state to reflect DOM change
        this.state.ajaxContentAddedToDOM = true;

        // Display the accordion output
        toggleClass(this.recallsContentElement, RECALLS_ACCORDION_CONSTANTS.classNames.contentShowOutput, true);

        // Stop Loading
        this.stopLoading();
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * Makes a datalayer push before the ajax function is called
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  dataLayerPushBeforeAjax = () => {
    if (!window.dataLayer) return;
    // Create datalayer object
    let dataLayerSubmitObject = {
      event: RECALLS_ACCORDION_CONSTANTS.dataLayer.submitEvent,
      'element-name': RECALLS_ACCORDION_CONSTANTS.dataLayer.submitElementName,
      'recall-ui': RECALLS_ACCORDION_CONSTANTS.dataLayer.submitRecallUi,
      'recall-outcome': RECALLS_ACCORDION_CONSTANTS.dataLayer.submitRecallOutcome,
      timestamp: new Date().getTime(),
    };
    // Push datalayer object
    window.dataLayer.push(dataLayerSubmitObject);
  };

  /**
   * Enabled the loading message in the recalls accordion
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  startLoading = () => {
    // Change the state
    this.state.loading = true;
    // Toggle loading class to show spinner and message
    toggleClass(this.recallsContentElement, RECALLS_ACCORDION_CONSTANTS.classNames.contentLoading, true);
  };

  /**
   * Disabled the loading message in the recalls accordion
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  stopLoading = () => {
    // Remove loading class
    toggleClass(this.recallsContentElement, RECALLS_ACCORDION_CONSTANTS.classNames.contentLoading, false);
    // Change state since loading is now finished
    this.state.loading = false;
  };

  /**
   * Makes a dataLayer push
   *
   * @param {Object} object dataLayer object with key/value pairs
   * @author Tameem Safi <t.safi@kainos.com>
   */
  dataLayerPush = object => {
    // Check if dataLayer exists and the object is valid
    if (!window.dataLayer || object === null || typeof object !== 'object') {
      console.warn('Could not push dataLayer as it was not found');
    } else {
      // Update feedback survey URL
      // Get current query string parameters
      // TODO move to some page-scope constants?
      let feedbackSurveyLink = document.querySelector('a.appendClientID');
      console.log(feedbackSurveyLink);

      let url = feedbackSurveyLink.href;
      console.log(url);

      var params = new Object();
      // Get query string params from URL
      url.split('?')[1].split('&').map(function(value) {
        let split = value.split("=");
        params[split[0]] = split[1];
      });
      console.log(object);

      let keysToReplace = [
        'recall_ui',
        'lambda_return_code',
        'recall_outcome',
        'recall_outcome_detail',
        'recall_last_update_date',
      ];
      console.log(params);

      // Update params with new values
      keysToReplace.forEach(function(destinationKey) {
          // keys separate words by '-' in Data Layer but '_' in Feedback Survey URL
          let sourceKey = destinationKey.replace(/_/g, '-');
          console.log(object[sourceKey]);
          params[destinationKey] = object[sourceKey];
      });
      console.log(params);

      // Parse params to new query string
      const urlParams = new URLSearchParams();
      Object.keys(params).forEach(key => urlParams.append(key, params[key]));
      console.log(urlParams.toString());

      // Update URL
      feedbackSurveyLink.href = url.replace(/\?.*/g, '?' + urlParams.toString());

      // Make a data layer push
      window.dataLayer.push(object);
    }
  };
}
