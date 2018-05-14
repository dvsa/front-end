import { addEventListenerToEl, removeAllEventsFromEl } from '../../../shared/misc/events';
import { TEXT_TO_SPEECH_CONFIG } from './config';
import md5 from 'md5';

// TextToSpeech :: element = HTML Element -> TextToSpeech object
export class TextToSpeech {
  constructor(wrapperElement) {
    // Check if element is passed
    if (!wrapperElement) {
      return console.warn('Text-to-speech: Text to speech wrapper has not been defined.');
    }
    
    // Object to store all DOM elements
    this.elements = {
      wrapperElement,
      content: wrapperElement.querySelector('.js-text-to-speech__content'),
      buttons: {
        play: wrapperElement.querySelector('.js-text-to-speech__button--play'),
        pause: wrapperElement.querySelector('.js-text-to-speech__button--pause'),
        stop: wrapperElement.querySelector('.js-text-to-speech__button--stop'),
      },
    };

    // Create initial state
    this.state = {
      synth: window.speechSynthesis,
      utterance: new SpeechSynthesisUtterance(),
      isPlaying: false,
      isPaused: false,
    };

    if (!this.elements.content || !this.elements.buttons.play || !this.elements.buttons.pause || !this.elements.buttons.stop) return;

    // Run widget setup
    this.setup();
  }

  /**
   * Initializer
   */
  setup() {
    this.setupUtteranceSettings();
    // Event handler setup
    addEventListenerToEl(this.elements.buttons.play, 'click', this.playButtonClickHandler);
    addEventListenerToEl(this.elements.buttons.pause, 'click', this.pauseButtonClickHandler);
    addEventListenerToEl(this.elements.buttons.stop, 'click', this.stopButtonClickHandler);
  }

  /**
   * Setup SpeechSynthesisUtterance settings
   */
  setupUtteranceSettings = () => {
    // Check if an instance of the SpeechSynthesisUtterance is created
    if (!this.state.utterance) return;
    let voices = this.state.synth.getVoices();
    this.state.utterance.voice = voices[TEXT_TO_SPEECH_CONFIG.voice];
    this.state.utterance.volume = TEXT_TO_SPEECH_CONFIG.volume;
    this.state.utterance.rate = TEXT_TO_SPEECH_CONFIG.rate;
    this.state.utterance.pitch = TEXT_TO_SPEECH_CONFIG.pitch;
    this.state.utterance.lang = TEXT_TO_SPEECH_CONFIG.lang;
    this.state.utterance.onend = this.synthHasStoppedPlaying;
  };

  /**
   * Click hanlder for play button
   *
   * @param {Event} event - DOM Event object
   * @return {void}
   */
  playButtonClickHandler = event => {
    event.preventDefault();

    if (this.state.isPaused && !this.state.isPlaying) {
      this.state.synth.resume();
      this.toggleButtonState();
      return;
    } else if (this.state.isPlaying) {
      this.state.synth.pause();
      this.toggleButtonState();
      return;
    }

    this.readContent();
  };

  toggleButtonState = () => {
    this.state.isPaused = !this.state.isPaused;
    this.state.isPlaying = !this.state.isPlaying;

    if (this.state.isPlaying) {
      this.elements.buttons.play.innerText = 'Pause audio';
      return;
    }

    this.elements.buttons.play.innerText = 'Resume audio';
  };

  /**
   * Handles the pause button click event
   *
   * @param {Event} event - DOM Event object
   */
  pauseButtonClickHandler = event => {
    event.preventDefault();
    this.state.synth.pause();
    this.synthHasPaused();
  };

  /**
   * Handles the stop button click event
   *
   * @param {Event} event - DOM Event object
   */
  stopButtonClickHandler = event => {
    event.preventDefault();
    this.state.synth.cancel();
    this.synthHasStoppedPlaying();
  };

  /**
   * Begins reading utterance
   */
  readContent = () => {
    this.toggleButtonState();
    this.state.utterance.text = this.elements.content.innerText;
    this.state.synth.cancel();
    this.state.synth.speak(this.state.utterance);
    this.synthHasStartedPlaying();
  };

  /**
   * Setup state to reflect synth is playing
   */
  synthHasStartedPlaying = () => {
    this.state.isPlaying = true;
    this.state.isPaused = false;
  };

  /**
   * Setup state to reflect synth has stopped playing
   */
  synthHasStoppedPlaying = () => {
    this.state.isPlaying = false;
    this.state.isPaused = false;
  };

  /**
   * Setup state to reflect synth is paused
   */
  synthHasPaused = () => {
    this.state.isPlaying = false;
    this.state.isPaused = true;
  };
}
