import md5 from 'md5';
import { closestParentOfEl, delegateEvent, toggleClass } from './../../../shared';

export class DevPreviewFullscreen {
  constructor() {
    this.classnames = {
      devPreview: {
        overflowBodyHidden: 'dev-preview__body-overflow-hidden',
      },
      devPreviewExample: {
        fullscreen: 'dev-preview__example--fullscreen',
      },
    };

    this.selectors = {
      devPreview: '.dev-preview',
      devPreviewExample: '.dev-preview__example',
      devPreviewFullscreenButton: '.dev-preview__fullscreen-button',
      devPreviewPismCode: '.dev-preview__prism-code',
      body: 'body',
    };

    this.attributes = {
      exampleId: 'data-example-id',
      stateItemId: 'data-state-item-id',
    };

    this.i18n = {
      fullScreenPreview: 'Fullscreen preview',
      hideFullscreenPreview: 'Hide fullscreen',
    };

    this.elements = {
      body: document.querySelector(this.selectors.body),
      previewElements: Array.from(document.querySelectorAll(this.selectors.devPreview)),
    };

    this.state = {
      previousYOffset: 0,
      previewElements: [],
    };

    if (!this.elements.previewElements || !Array.isArray(this.elements.previewElements)) return;

    this.init();
  }

  /**
   * Initializer
   * - Add click event
   *
   * @author Tameem Safi <t.safi@kainos.com
   * @since 1.1.18
   */
  init = () => {
    this.setupState();
    delegateEvent(document, 'click', this.selectors.devPreviewFullscreenButton, this.onFullscreenPreviewClick);
  };

  /**
   * Setup the initial state
   *
   * @author Tameem Safi <t.safi@kainos.com
   * @since 1.1.18
   */
  setupState = () => {
    this.elements.previewElements.forEach(devPreviewElement => {
      const fullscreenButton = devPreviewElement.querySelector(this.selectors.devPreviewFullscreenButton);
      const devPreviewExample = devPreviewElement.querySelector(this.selectors.devPreviewExample);
      const devPreviewPismCode = devPreviewElement.querySelector(this.selectors.devPreviewPismCode);

      this.state.previewElements.push({
        devPreviewElement,
        fullscreenButton,
        devPreviewExample,
        devPreviewPismCode,
        isFullscreen: false,
      });

      const index = this.state.previewElements.length - 1;

      if (devPreviewElement) {
        devPreviewElement.setAttribute(this.attributes.stateItemId, index);
      }

      if (fullscreenButton) {
        fullscreenButton.setAttribute(this.attributes.stateItemId, index);
      }
    });
  };

  /**
   * Handle fullscreen preview for examples
   *
   * @param {Event} event DOM event object
   *
   * @author Tameem Safi <t.safi@kainos.com
   * @since 1.1.18
   */
  onFullscreenPreviewClick = event => {
    if (!event || !event.target) return;

    // Get state item
    const stateItemId = event.target.getAttribute(this.attributes.stateItemId);
    const stateItem = this.state.previewElements[stateItemId];

    // Check if state item exists
    if (!stateItem) return;

    // Check if state is currently fullscreen
    if (!stateItem.isFullscreen) {
      this.state.previousYOffset = window.pageYOffset;

      // Expand to fullscreen
      this.elements.body.appendChild(stateItem.devPreviewExample);
      toggleClass(stateItem.devPreviewExample, this.classnames.devPreviewExample.fullscreen, true);

      // Hide body overflow
      toggleClass(this.elements.body, this.classnames.devPreview.overflowBodyHidden, true);
    } else {
      // Move preview back to original spot
      stateItem.devPreviewElement.insertBefore(stateItem.devPreviewExample, stateItem.devPreviewPismCode);
      toggleClass(stateItem.devPreviewExample, this.classnames.devPreviewExample.fullscreen, false);

      // Show body overflow
      toggleClass(this.elements.body, this.classnames.devPreview.overflowBodyHidden, false);

      window.scrollTo(0, this.state.previousYOffset);
      this.state.previousYOffset = 0;
    }

    stateItem.isFullscreen = !stateItem.isFullscreen;
    stateItem.fullscreenButton.innerText = stateItem.isFullscreen ? this.i18n.hideFullscreenPreview : this.i18n.fullScreenPreview;
  };
}
