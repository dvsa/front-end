import { delegateEvent, toggleClass } from './../../../shared';

export class DevPreview {
  constructor() {
    this.classnames = {
      devPreviewHidden: 'dev-preview--hidden',
      devPreviewBodyOverflowHidden: 'dev-preview__body-overflow-hidden'
    };

    this.selectors = {
      devPreviewFullPage: '.dev-preview--full-page',
      devPreviewFloatingButton: '.dev-preview__floating-button',
      devPreviewCloseButton: '.dev-preview__close-button',
      content: '#content',
      body: 'body'
    };

    this.elements = {
      body: document.querySelector(this.selectors.body),
      devPreviewFullPage: document.querySelector(this.selectors.devPreviewFullPage),
      devPreviewFloatingButton: document.querySelector(this.selectors.devPreviewFloatingButton),
      content: document.querySelector(this.selectors.content)
    };

    this.state = {
      fullPagePreviewHidden: true
    };

    if(!this.elements.body || !this.elements.devPreviewFullPage || !this.elements.content) return;

    this.init();
  }

  /**
   * Initializer
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init = () => {
    this.addBodyPaddingToAccountForFloatingButton();
    this.movePreviewElementToChildOfBody();
    this.addEvents();
  }

  /**
   * Adds padding to the body to account for the height of the floating button
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  addBodyPaddingToAccountForFloatingButton = () => {
    if(!this.elements.devPreviewFloatingButton) return;
    let floatingButtonHeight = this.elements.devPreviewFloatingButton.offsetHeight;
    let paddingBottom = window.getComputedStyle(this.elements.body, null).getPropertyValue('padding-bottom') || 0;
    // Replace px
    paddingBottom = paddingBottom.replace('px', '');
    // Add height of floating button
    paddingBottom += floatingButtonHeight;
    this.elements.body.style.paddingBottom = `${paddingBottom}px`;
  };

  /**
   * Moves the dev preview element to the child of the body
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  movePreviewElementToChildOfBody = () => {
    this.elements.body.appendChild(this.elements.devPreviewFullPage);
    if(this.elements.devPreviewFloatingButton) {
      this.elements.body.appendChild(this.elements.devPreviewFloatingButton);
    }
  }

  /**
   * Attaches DOM events
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  addEvents = () => {
    this.elements.devPreviewFloatingButton.addEventListener('click', this.toggleFullPagePreview);
    delegateEvent(document, 'click', this.selectors.devPreviewCloseButton, this.toggleFullPagePreview);
  }

  /**
   * Toggles the full page dev preview
   * 
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  toggleFullPagePreview = () => {
    this.state.fullPagePreviewHidden = !this.state.fullPagePreviewHidden;
    toggleClass(this.elements.devPreviewFullPage, this.classnames.devPreviewHidden, this.state.fullPagePreviewHidden);
    toggleClass(this.elements.devPreviewFloatingButton, this.classnames.devPreviewHidden, !this.state.fullPagePreviewHidden);
    toggleClass(this.elements.body, this.classnames.devPreviewBodyOverflowHidden, !this.state.fullPagePreviewHidden);
    console.log('test', this.state.fullPagePreviewHidden);
  }
}