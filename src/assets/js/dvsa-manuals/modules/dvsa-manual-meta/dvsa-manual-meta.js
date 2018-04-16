import { toggleClass, delegateEvent } from './../../../shared';

export class DvsaManualMeta {
  constructor() {
    this.classnames = {
      openHistory: 'dvsa-manual-meta__history--open',
      linkShowHide: 'dvsa-manual-meta__link--show-hide',
      linkTop: 'dvsa-manual-meta__link--top-link',
    };

    this.elements = {
      links: Array.from(document.querySelectorAll('.dvsa-manual-meta__link')),
      showHideLinks: Array.from(document.querySelectorAll(`.${this.classnames.linkShowHide}`)),
      openLinks: Array.from(document.querySelectorAll(`.${this.classnames.linkTop}`)),
    };

    this.attributes = {
      target: 'data-target',
      openText: 'data-open-text',
      aria: {
        controls: 'aria-controls',
        expanded: 'aria-expanded',
        hidden: 'aria-hidden',
      },
    };

    this.state = {
      historySections: [],
    };

    if (!this.elements.links || !this.elements.showHideLinks || !this.elements.openLinks) return;

    this.init();
  }

  /**
   * Initializer
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.3
   */
  init = () => {
    this.setupStateFromDOM();
    delegateEvent(document, 'click', `.${this.classnames.linkShowHide}`, this.onShowHideLinkClick);
    delegateEvent(document, 'click', `.${this.classnames.linkTop}`, this.onTopLinkClick);
  };

  /**
   * Setup state based on DOM
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.3
   */
  setupStateFromDOM = () => {
    this.elements.showHideLinks.forEach(showHideLinkElement => {
      const targetId = showHideLinkElement.getAttribute(this.attributes.target);
      if(!targetId) return;
      const openText = showHideLinkElement.getAttribute(this.attributes.openText);
      showHideLinkElement.setAttribute(this.attributes.aria.controls, targetId);
      this.state.historySections.push({
        targetId,
        showHideLinkElement,
        historyElement: document.querySelector(`#${targetId}`),
        open: false,
        openText,
        hiddenText: showHideLinkElement.textContent,
      });
    });
  };

  /**
   * Click handler for show/hide links
   *
   * @param {Event} event DOM event object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.3
   */
  onShowHideLinkClick = event => {
    event.preventDefault();
    const targetId = event.target.getAttribute(this.attributes.target);
    if(!targetId) return;
    this.updateOpenStateOfHistorySection(targetId, historySection => {
      this.updateDOMBasedOnState();
    });
  };

  /**
   * Click handler for top link
   *
   * @param {Event} event DOM event object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.3
   */
  onTopLinkClick = event => {
    event.preventDefault();
    const targetId = event.target.getAttribute(this.attributes.target);
    if(!targetId) return;
    this.updateOpenStateOfHistorySection(targetId, historySection => {
      this.updateDOMBasedOnState();
      historySection.historyElement.scrollIntoView(true);
    });
  };

  /**
   * Changes the state of history section
   * to opposite of what it is currently
   *
   * @param {String} targetId Identifier of state item
   * @param {Function} callback Callback function after state was updated
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.3
   */
  updateOpenStateOfHistorySection = (targetId, callback) => {
    if(!targetId) return;
    this.state.historySections.forEach((historySection, index) => {
      if (historySection.targetId === targetId) {
        this.state.historySections[index].open = !this.state.historySections[index].open;
        if (typeof callback === 'function') {
          callback(historySection);
        }
      }
    });
  };

  /**
   * Updates the DOM based on the state
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.3
   */
  updateDOMBasedOnState = () => {
    this.state.historySections.forEach(historySection => {
      if(!historySection.showHideLinkElement || !historySection.historyElement) return;
      // Change show/hide text
      historySection.showHideLinkElement.textContent = historySection.open ? historySection.openText : historySection.hiddenText;
      // Show/hide history
      toggleClass(historySection.historyElement, this.classnames.openHistory, historySection.open);
      // Update aria
      historySection.showHideLinkElement.setAttribute(this.attributes.aria.expanded, historySection.open);
      if (historySection.open) {
        historySection.historyElement.removeAttribute(this.attributes.aria.hidden);
      } else {
        historySection.historyElement.setAttribute(this.attributes.aria.hidden, 'true');
      }
    });
  };
}
