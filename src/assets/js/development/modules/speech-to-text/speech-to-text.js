import { addEventListenerToEl, closestParentOfEl } from './../../../shared/misc';

export class SpeechToText {
  constructor(recordButton) {
    // Check if record button is passed
    if (!recordButton) {
      return console.warn('Speech to text: Class has been setup incorrectly');
    }

    // Gets a reference to the components wrapper element
    let wrapper = closestParentOfEl(recordButton, '.search-bar__control-group');

    // Object to store assiosated DOM Elements
    this.elements = {
      recordButton,
      wrapper: wrapper,
      input: wrapper.querySelector('.search-bar__search-input'),
      submitBtn: wrapper.querySelector('.search-bar__search-submit'),
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

  setup = () => {
    // Assigns the record button's click handler
    addEventListenerToEl(this.elements.recordButton, 'click', this.handleListenButtonClickEvent);
    // Assigns various event handlers to the speechRecognition object
    this.state.speechRecognition.onstart = this.handleSpeechStart;
    this.state.speechRecognition.onend = this.handleSpeechEnd;
    this.state.speechRecognition.onresult = this.handleOnSpeechResult;
  };

  handleListenButtonClickEvent = event => {
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

  handleSpeechStart = event => {
    // Update state
    this.isRecording();
  };

  handleSpeechEnd = event => {
    // Update state
    this.isStoppedRecording();
  };

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

  isRecording = () => {
    this.state.isRecording = true;
    this.elements.submitBtn.disabled = true;
    this.elements.input.disabled = true;
    this.elements.recordButton.innerHTML = 'Stop recording';
  };

  isStoppedRecording = () => {
    this.state.isRecording = false;
    this.elements.submitBtn.disabled = false;
    this.elements.input.disabled = false;
    this.elements.recordButton.innerHTML = 'Start voice search';
  };
}
