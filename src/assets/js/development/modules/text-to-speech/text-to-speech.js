import { addEventListenerToEl } from '../../../shared/misc/events';
import { TEXT_TO_SPEECH_CONFIG } from './config';

// TextToSpeech :: element = Element -> TextToSpeech object
export class TextToSpeech {
  constructor(element) {
    // Retain scoped record to Element param
    this.textToSpeechWrapper = element;

    // Returns with warning if constructor is not populated correctly
    if (!this.textToSpeechWrapper) {
      return console.warn('Text-to-speech: Text to speech wrapper has not been defined.');
    }

    // Assign and retain scoped access to various widget based components
    this.playButton = this.textToSpeechWrapper.querySelector('.js-text-to-speech__button--play');
    this.pauseButton = this.textToSpeechWrapper.querySelector('.js-text-to-speech__button--pause');
    this.stopButton = this.textToSpeechWrapper.querySelector('.js-text-to-speech__button--stop');

    // If play button is not defined return with warning
    if (!this.playButton) {
      return console.warn('Text-to-speech: Play button was not been defined.');
    }

    // If pausebutton button is not defined return with warning
    if (!this.pauseButton) {
      return console.warn('Text-to-speech: Pause button was not been defined.');
    }

    // If stop button is not defined return with warning
    if (!this.stopButton) {
      return console.warn('Text-to-speech: Stop button was not been defined.');
    }

    this.synth = window.speechSynthesis;

    // Run widget setup
    this.setup();
  }

  // inital component class setup
  // setup :: -> void
  setup() {
    // Event handler setup
    addEventListenerToEl(this.playButton, 'click', playButtonClickHandler);
    addEventListenerToEl(this.pauseButton, 'click', playButtonClickHandler);
    addEventListenerToEl(this.stopButton, 'click', playButtonClickHandler);
  }

  // Handles the play button click event
  // playbuttonClickHandler :: e = event -> void
  playButtonClickHandler(e) {
    e.preventDefault();
    // Define utterance with text to read
    let utterance = this.assignStringAsUtterance(this.initSpeechSynthesisUtterance(), document.querySelector('.test-content'));
    // Read utterance
    this.speak(utterance);
  }

  // Handles the pause button click event
  // pausebuttonClickHandler :: e = event -> void
  pauseButtonClickHandler(e) {
    e.preventDefault();
  }

  // Handles the stop button click event
  // stopbuttonClickHandler :: e = event -> void
  stopButtonClickHandler(e) {
    e.preventDefault();
  }

  // Init a new SpeechSynthesisUtterance object
  // initSpeechSynthesisUtterance :: config = object -> msg = SpeechSynthesisUtterance
  initSpeechSynthesisUtterance(config = TEXT_TO_SPEECH_CONFIG) {
    let utterance = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[TEXT_TO_SPEECH_CONFIG.voice];
    utterance.volume = TEXT_TO_SPEECH_CONFIG.volume;
    utterance.rate = TEXT_TO_SPEECH_CONFIG.rate;
    utterance.pitch = TEXT_TO_SPEECH_CONFIG.pitch;
    utterance.lang = TEXT_TO_SPEECH_CONFIG.lang;
    return utterance;
  }

  // Assigns SpeechSynthesisUtterance instance with an utterance to read
  // readFromElm :: utterance = SpeechSynthesisUtterance, elm = Element -> SpeechSynthesisUtterance
  assignStringAsUtterance(utterance, elm) {
    return utterance.text(getText(elm));
  }

  // Reads & returns text from an HTML element
  // getText :: elm = Element -> string
  getText(elm) {
    if (!elm) {
      return console.log('Text to string: method getText requires an element param');
    }
    let string = elm.innerHTML;
    if (!string) {
      return console.log(`Text to string: failed to read text from ${element}`);
    }
    return string;
  }

  // Speeks
  speak(utterance) {
    this.synth.speak(utterance);
  }
}
