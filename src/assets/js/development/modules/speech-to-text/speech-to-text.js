import { addEventListenerToEl, closestParentOfEl } from './../../../shared/misc';
import { SPEECH_TO_TEXT_CONFIG } from './config';
import { TEXT_TO_SPEECH_CONFIG } from '../text-to-speech/config';

export class SpeechToText {
  constructor(recordButton) {
    // Check if record button is passed
    if (!recordButton) console.warn('Speech to text has failed to initiate');

    // Gets a reference to the components wrapper element
    let wrapper = closestParentOfEl(recordButton, `.${SPEECH_TO_TEXT_CONFIG.classes.wrapper}`);

    // Object to store assiosated DOM Elements
    this.elements = {
      recordButton,
      wrapper: wrapper,
      input: wrapper.querySelector(`.${SPEECH_TO_TEXT_CONFIG.classes.input}`),
      submitBtn: wrapper.querySelector(`.${SPEECH_TO_TEXT_CONFIG.classes.submitBtn}`),
    };

    // Object initialised to store state
    this.state = {
      speechRecognition: new webkitSpeechRecognition(),
      isRecording: false,
    };

    // If any requried state elements are undefined return from class
    if (!this.elements.wrapper || !this.elements.input || !this.elements.submitBtn) return;

    this.setup();
  }

  /**
   * Initial setup of control
   */
  setup = () => {
    // Assigns the record button's click handler
    addEventListenerToEl(this.elements.recordButton, 'click', this.listenBtnClickHandler);

    // Assigns various event handlers to the speechRecognition object
    this.state.speechRecognition.onstart = this.isRecording;
    this.state.speechRecognition.onend = this.isStoppedRecording;
    this.state.speechRecognition.onresult = this.handleOnSpeechResult;
  };

  /**
   * Handles click event on listen button click
   * @param {Event} Event - DOM Event object
   */
  listenBtnClickHandler = event => {
    event.preventDefault();

    // If state is currently recording
    if (this.state.isRecording) {
      // Cancel current recording session
      this.state.speechRecognition.abort();
      // Toggle state
      this.isStoppedRecording();
      return;
    }

    // Start listening for audio
    this.state.speechRecognition.start();
  };

  /**
   * Handles speech result event
   * @param {Event} Event - DOM Event object
   */
  handleOnSpeechResult = event => {
    // Gets spoken result
    let resultString = event.results[0][0].transcript;

    // If a value currently exists within input
    if (this.elements.input.value.trim() != '') {
      // Append new result to current
      resultString = this.elements.input.value + ` ${resultString}`;
    }

    // Append new result
    this.elements.input.value = resultString;
  };

  /**
   * Toggles state to recording
   */
  isRecording = () => {
    this.state.isRecording = true;
    this.elements.submitBtn.disabled = true;
    this.elements.input.disabled = true;
    this.elements.recordButton.innerHTML = SPEECH_TO_TEXT_CONFIG.content.recording;
  };

  /**
   * Toggles state to NOT recording
   */
  isStoppedRecording = () => {
    this.state.isRecording = false;
    this.elements.submitBtn.disabled = false;
    this.elements.input.disabled = false;
    this.elements.recordButton.innerHTML = SPEECH_TO_TEXT_CONFIG.content.init;
  };
}
