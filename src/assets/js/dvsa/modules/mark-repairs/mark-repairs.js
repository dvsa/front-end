import axios from 'axios';
import { delegateEvent, closestParentOfEl, serializeForm, toggleClass } from './../../../shared';

export class MarkRepairs {
  constructor() {
    this.classnames = {
      uHidden: 'u-hidden',
      hasStatus: 'has-status',
      hasSuccess: 'has-success'
    };

    this.attributes = {
      disabled: 'disabled',
      action: 'action',
      url: 'data-url',
      form: 'data-form'
    };

    this.selectors = {
      brakeTest: {
        actionPanel: '.js-brakeTestActionPanel',
        testStatus: '.js-brakeTestStatus',
        addBrakeTest: '.js-addBrakeTest',
        actions: '.js-brakeTestActions',
        reviewTestButton: '.js-reviewTestButton',
        summary: '.js-brakeTestSummary'
      },
      numberOfFailures: '.js-numberOfFailures',
      numberOfAdvisories: '.js-numberOfAdvisories',
      numberOfMinors: '.js-numberOfMinors',
      buttonMarkRepaired: '.js-buttonMarkRepaired',
      rfrForm: '.js-rfrForm',
      rfrItem: '.js-rfrItem',
      itemStatus: '.js-itemStatus',
    };

    this.elements = {
      brakeTest: {
        testStatus: document.querySelector(this.selectors.brakeTest.testStatus),
        addBrakeTest: document.querySelector(this.selectors.brakeTest.addBrakeTest),
        actions: document.querySelector(this.selectors.brakeTest.actions),
        reviewTestButton: document.querySelector(this.selectors.brakeTest.reviewTestButton),
        summary: document.querySelector(this.selectors.brakeTest.summary)
      },
      actionPanel: document.querySelector(this.selectors.brakeTest.actionPanel),
      numberOfFailues: document.querySelector(this.selectors.numberOfFailures),
      numberOfAdvisories: document.querySelector(this.selectors.numberOfAdvisories),
      numberOfMinors: document.querySelector(this.selectors.numberOfMinors)
    };

    this.responseActions = {
      repair: 'repair'
    };

    this.messages = {
      loading: 'Loading'
    };

    this.init();
  }

  /**
   * Initializer which will call all functions to setup
   *
   * - Attaches required events
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init = () => {
    this.addEvents();
  }

  /**
   * Attaches the required events
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  addEvents = () => {
    delegateEvent(document, 'click', this.selectors.buttonMarkRepaired, this.markRepairedButtonClickHandler);
  }

  /**
   * Handles when mark repaired button has been clicked
   * 
   * @param {Event} event Event object
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  markRepairedButtonClickHandler = (event) => {
    // Prevent normal button behaviour
    event.preventDefault();

    // Setup a temporary loading
    // variable to hold the state
    let isLoading = false;

    // Get the DOM element of the button
    const element = event.target;
    if(!element) return;

    // Make the button disabled
    element.setAttribute(this.attributes.disabled, this.attributes.disabled);

    // Find rfr form
    const rfrForm = closestParentOfEl(element, this.selectors.rfrForm);
    const rfrItem = closestParentOfEl(element, this.selectors.rfrItem);
    const itemStatus = rfrItem.querySelector(this.selectors.itemStatus);
    if(!rfrForm || !rfrItem || !itemStatus) return console.warn('Could not find RFR form, RFR item and status DOM elements');

    const url = rfrItem.getAttribute(this.attributes.action) || element.getAttribute(this.attributes.url);
    const formData = serializeForm(rfrForm) || element.getAttribute(this.attributes.form);

    // Setup loading
    toggleClass(rfrItem, this.classnames.hasStatus, true);
    rfrItem.innerText = this.messages.loading;

    const tryAgainMessage = `That didn\'t work, <a class="js-buttonMarkRepaired" href="" data-url="${url}" data-form="${formData}">try again</a>`;

    // Make ajax request
    axios.post(url, formData)
      .then((response) => {
        const { data } = response;
        if(data && data.success) {
          toggleClass(rfrItem, this.classnames.hasStatus, false);
          toggleClass(rfrItem, this.classnames.hasSuccess, data.action === this.responseActions.repair);
          this.updateCount(data.defectType, data.action);
          this.updateBrakeTest(data.brakeTestOutcome, data.brakesTested, data.brakeTestResults, data.disableSubmitButton);
        } else {
          itemStatus.innerHTML = tryAgainMessage;
        }
      })
      .catch((error) => {
        itemStatus.innerHTML = tryAgainMessage;
      })
      .finally(() => {
        element.removeAttribute(this.attributes.disabled);
      });
  }

  /**
   * Updates the count of failures, advisories and minors
   *
   * @param {String} defectType Type of defect
   * @param {String} action Action can be repair or not
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateCount = (defectType, action) => {
    switch(defectType) {
      case 'advisory': {
        this.updateCountForElement(this.elements.numberOfAdvisories);
        break;
      }

      case 'minor': {
        this.updateCountForElement(this.elements.numberOfMinors);
        break;
      }

      case 'failure': {
        this.updateCountForElement(this.elements.numberOfFailues);
        break;
      }

      default: {
        return console.warn('Invalid type');
      }
    }
  }

  /**
   * Updates the count of failures, advisories and minors
   *
   * @param {HTMLElement} element Element which to parse number from and change
   * @param {String} action Action can be repair or not
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateCountForElement = (element, action) => {
    if(!element) return;
    let currentNumber = parseInt(element.innerText);
    newNumber = (action === this.responseActions.repair) ? currentNumber - 1 : currentNumber + 1;
    element.innerText = newNumber;
  }

  /**
   * Updates the count of failures, advisories and minors
   *
   * @param {String} testStatus Brake test status
   * @param {Boolean} tested Whether or not the brakes were tested
   * @param {Boolean} results Whether or not it has results
   * @param {Boolean} disableReviewTestButton Whether or not to disable the review test button
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateBrakeTest = (testStatus, tested, results, disableReviewTestButton) => {
    if(!this.elements.actionPanel) return console.warn('Could not find brake tests action panel');
    
    // Update test status
    if(this.elements.brakeTest.testStatus) {
      this.elements.brakeTest.testStatus.innerText = testStatus;
    }

    const testedAndHasResults = (tested === true && results === true);

    // Update brake test actions
    if(this.elements.brakeTest.actions) {
      if(testedAndHasResults) {
        toggleClass(this.elements.brakeTest.actionPanel, this.classnames.uHidden, false);
      } else {
        toggleClass(this.elements.brakeTest.actionPanel, this.classnames.uHidden, true);
      }
    }

    // Update add brake test
    if(this.elements.brakeTest.addBrakeTest) {
      if(testedAndHasResults) {
        toggleClass(this.elements.brakeTest.addBrakeTest, this.classnames.uHidden, true);
      } else {
        toggleClass(this.elements.brakeTest.addBrakeTest, this.classnames.uHidden, false);
      }
    }

    // Remove summary if brakes were not tested
    if(this.elements.brakeTest.summary) {
      if(tested === false) {
        this.elements.brakeTest.summary.remove();
      }
    }

    // Update button disabled state
    if(this.elements.brakeTest.reviewTestButton) {
      if(disableReviewTestButton === true) {
        this.elements.brakeTest.reviewTestButton.setAttribute(this.attributes.disabled, this.attributes.disabled);
      } else {
        this.elements.brakeTest.reviewTestButton.removeAttribute(this.attributes.disabled);
      }
    }

  }
}