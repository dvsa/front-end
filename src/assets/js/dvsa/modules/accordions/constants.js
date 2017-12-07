export const ACCORDION_CONSTANTS = {
  closeAllText: 'Close All',
  openAllText: 'Open All',
  attributeNames: {
    sectionContentId: 'data-section-content-id',
    stateIndexId: 'data-section-state-index-id',
    sectionCategory: 'data-section-category',
    preventDefault: 'data-section-prevent-default',
    disableStateRestore: 'data-section-disable-restore-state',
  },
  classNames: {
    accordion: 'js-accordion',
    section: 'js-accordion__section',
    sectionOpen: 'js-accordion__section--open',
    header: 'js-accordion__header',
    headerHover: 'js-accordion__header--hover',
    title: 'js-accordion__title-button',
    content: 'js-accordion__content',
    expandButton: 'js-accordion__expand-button',
    jsEnabled: 'js-accordion--js-enabled',
  },
  ariaAttributes: {
    controls: 'aria-controls',
    expanded: 'aria-expanded',
    hidden: 'aria-hidden',
  },
  dataLayer: {
    open: 'open',
    close: 'close',
    closedStatus: 'closed',
    linkClickEvent: 'link-click',
    linkType: 'accordion',
    sectionMemoryEvent: 'subsection-memory',
    sectionAll: 'subsection-all',
  },
  eventNames: {
    expandAllOpen: 'js-accordion:expand-all-open',
  },
};

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
    errorMessage: 'recalls-accordion__error-message',
    errorMessageVisible: 'recalls-accordion__error-message--visible',
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
    responseTimestamp: 'response-timestamp',
    error: {
      event: 'api-response',
      elementName: 'Recall',
      recallUI: 'api-error',
      detail: 'Sorry, something went wrong with the search. Please try again later.',
      lambdaReturnCode: '',
      outcome: 'Error',
      outcomeDetail: 'Connection error',
      smmtCall: 0,
    },
  },
};
