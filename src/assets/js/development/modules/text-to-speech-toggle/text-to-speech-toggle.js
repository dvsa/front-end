import { addEventListenerToEl } from './../../../shared/misc';
import { TextToSpeech } from '../text-to-speech/text-to-speech';
import { TEXT_TO_SPEECH_CONFIG } from '../text-to-speech/config';

export class TextToSpeechToggle {
  constructor(textToSpeechToggleElement) {
    // Returns with warning if textToSpeechToggleElement
    // is not provided in constructor params
    if (!textToSpeechToggleElement) console.warn('Failed to initialise text to speech toggle');

    // Gets a reference to the components form if exists
    let form = textToSpeechToggleElement.querySelector('.text-to-speech-toggle__form');
    if (!form) console.warn('Text to speech toggle form not found');

    // Defines class state object
    this.state = {
      form,
      readerReference: '',
      readerConfig: {},
    };

    // Returns class setup method
    this.setup();
  }

  /**
   * TextToSpeechToggle setup class
   *
   */
  setup = () => addEventListenerToEl(this.state.form, 'change', this.formChangeHandler);

  /**
   * Form change event handler
   *
   * @param {Event} event - DOM event object
   */
  formChangeHandler = event => {
    // Gets radio string value convereted to string
    let formChangeValue = event.target.value.toLowerCase();
    if (!formChangeValue) return console.warn('Failed to read radio value');

    // If form change value is equal to string 'yes'
    // Enable reading mode
    if (formChangeValue == 'on') return this.enableReader();

    // Disabled reading mode
    this.disableReader();
  };

  /**
   * Enables text to speech reader mode
   *
   */
  enableReader = () => (this.state.readerReference = new TextToSpeech());

  /**
   * Disables text to speech reader mode
   *
   */
  disableReader = () => {
    // If an instance of TextToSpeechHover exists
    if (this.state.readerReference) {
      // Delete the current instance
      delete this.state.readerReference;
      // Remove previously appended DOM elements
      this.cleanReaderElements();
    }
  };

  /**
   * Disables text to speech reader mode
   *
   */
  cleanReaderElements = () => {
    // Get all text-to-speech-hover elements
    let readerElements = document.querySelectorAll(`.${TEXT_TO_SPEECH_CONFIG.classes.readerItem}`);

    // Convert NodeList to array
    readerElements = Array.from(readerElements);

    // Loop through element array
    readerElements.forEach(el => {
      // Remove class text-to-speech-hover__content
      el.classList.remove(`${TEXT_TO_SPEECH_CONFIG.classes.readerItem}`);

      // Remove attribute 'data-content-id'
      el.removeAttribute(`${TEXT_TO_SPEECH_CONFIG.dataAttributes.id}`);

      // Remove play audio button
      el.querySelector(`.${TEXT_TO_SPEECH_CONFIG.classes.audioBtn}`).remove();
    });
  };
}
