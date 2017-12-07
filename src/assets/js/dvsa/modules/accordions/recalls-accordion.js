import axios from 'axios';

import { ACCORDION_CONSTANTS, RECALLS_ACCORDION_CONSTANTS } from './constants';
import { closestParentOfEl, toggleClass } from './../../../shared/misc';

export class RecallsAccordion {
  constructor() {
    // Get recalls accordion element
    this.recallsAccordionSectionElement = document.querySelector(RECALLS_ACCORDION_CONSTANTS.selectors.section);

    // Do not continue if recalls accordion does not exist
    if (!this.recallsAccordionSectionElement) return;

    this.elements = {
      parent: closestParentOfEl(this.recallsAccordionSectionElement, '.' + ACCORDION_CONSTANTS.classNames.accordion),
      header: document.querySelector(RECALLS_ACCORDION_CONSTANTS.selectors.header),
      content: document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.content),
      noJSAlternative: document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.noJSAlternative),
      loading: document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.loading),
      output: document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.output),
      error: document.querySelector('.' + RECALLS_ACCORDION_CONSTANTS.classNames.errorMessage),
    };

    // Loop through each element
    for (let name in this.elements) {
      // Check all element exist
      if (!this.elements[name]) {
        return console.warn(`${name} - Element was not found, aborting.`);
      }
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
    toggleClass(this.elements.content, RECALLS_ACCORDION_CONSTANTS.classNames.contentNoJs, false);
    // Add the ajax endpoint to the state
    this.state.ajaxEndpoint = this.recallsAccordionSectionElement.getAttribute(RECALLS_ACCORDION_CONSTANTS.attributeNames.ajaxEndpoint);
    // Get ajax data to send with request
    this.state.ajaxRequestBody = JSON.parse(
      this.recallsAccordionSectionElement.getAttribute(RECALLS_ACCORDION_CONSTANTS.attributeNames.ajaxData)
    );
    // Delegate event for when the accordion header is clicked
    $.delegate(this.elements.parent, 'click', RECALLS_ACCORDION_CONSTANTS.selectors.header, this.recallsHeadingClickHandler);
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
   *   "smartSurveyLink": "just string with url",
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
   * smartSurveyLink - Will change the feedback url
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
        this.elements.output.innerHTML = responseData.result;
        // Display the accordion output
        toggleClass(this.elements.content, RECALLS_ACCORDION_CONSTANTS.classNames.contentShowOutput, true);
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
            responseData.dataLayer.forEach((dataLayerObject, index) => {
              // Add response timestamp
              // to the first datalayer push
              if (index === 0) {
                dataLayerObject[RECALLS_ACCORDION_CONSTANTS.dataLayer.responseTimestamp] = Date.now();
              }
              this.dataLayerPush(dataLayerObject);
            });
          } else if (responseData.dataLayer !== null && typeof responseData.dataLayer === 'object') {
            // Add response timestamp
            // to the first datalayer push
            responseData.dataLayer[RECALLS_ACCORDION_CONSTANTS.dataLayer.responseTimestamp] = Date.now();
            this.dataLayerPush(responseData.dataLayer);
          }
        }

        // Stop loading
        this.stopLoading();
      })
      .catch(this.handleError);
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
        this.elements.output.innerHTML = response.data;

        // Change state to reflect DOM change
        this.state.ajaxContentAddedToDOM = true;

        // Display the accordion output
        toggleClass(this.elements.content, RECALLS_ACCORDION_CONSTANTS.classNames.contentShowOutput, true);

        // Stop Loading
        this.stopLoading();
      })
      .catch(this.handleError);
  };

  handleError = error => {
    // Stop loading message
    this.stopLoading();
    // Check if error element exists
    if (this.elements.error) {
      // Display error message
      toggleClass(this.elements.error, RECALLS_ACCORDION_CONSTANTS.classNames.errorMessageVisible, true);
    }
    // Create datalayer object
    let dataLayerObject = {
      event: RECALLS_ACCORDION_CONSTANTS.dataLayer.error.event,
      'element-name': RECALLS_ACCORDION_CONSTANTS.dataLayer.error.elementName,
      'recall-ui': RECALLS_ACCORDION_CONSTANTS.dataLayer.error.recallUI,
      'recall-ui-detail': RECALLS_ACCORDION_CONSTANTS.dataLayer.error.detail,
      'lambda-return-code': RECALLS_ACCORDION_CONSTANTS.dataLayer.error.lambdaReturnCode,
      'recall-outcome': RECALLS_ACCORDION_CONSTANTS.dataLayer.error.outcome,
      'recall-outcome-detail': RECALLS_ACCORDION_CONSTANTS.dataLayer.error.outcomeDetail,
      'smmt-call': RECALLS_ACCORDION_CONSTANTS.dataLayer.error.smmtCall,
    };
    // Push datalayer
    this.dataLayerPush(dataLayerObject);
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
    toggleClass(this.elements.content, RECALLS_ACCORDION_CONSTANTS.classNames.contentLoading, true);
  };

  /**
   * Disabled the loading message in the recalls accordion
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  stopLoading = () => {
    // Remove loading class
    toggleClass(this.elements.content, RECALLS_ACCORDION_CONSTANTS.classNames.contentLoading, false);
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
      return console.warn('Could not push dataLayer as it was not found');
    }
    // Make a data layer push
    window.dataLayer.push(object);
  };
}
