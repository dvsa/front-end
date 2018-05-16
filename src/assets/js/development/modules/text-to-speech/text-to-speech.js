import { addEventListenerToEl, removeAllEventsFromEl } from '../../../shared/misc/events';
import { toggleClass } from '../../../shared/misc';
import { TEXT_TO_SPEECH_CONFIG } from './config';

export class TextToSpeech {
  constructor(speechToTextWrapper) {
    // Check if element is passed
    if (!speechToTextWrapper) {
      return console.warn('Text-to-speech: Text to speech wrapper has not been defined.');
    }

    // Add JS Enabled class
    toggleClass(speechToTextWrapper, TEXT_TO_SPEECH_CONFIG.classes.wrapper.JSEnabled, true);

    // Object to store text to speech component attrs
    this.elements = {
      speechToTextWrapper,
      textToSpeech: '',
      buttons: {
        play: '',
        stop: '',
      },
    };

    // Create initial state
    this.state = {
      synth: window.speechSynthesis,
      utterance: new SpeechSynthesisUtterance(),
      isPlaying: false,
      isPaused: false,
    };

    // Run widget setup
    this.setup();
  }

  /**
   * Initializer
   */
  setup() {
    // Setup SpeechSynthesisUtterance
    this.setupUtteranceSettings();

    // Build HTML
    this.elements.textToSpeech = this.buildComponent();

    // If build failed return
    if (!this.elements.textToSpeech) return;

    // assign button references to state
    this.elements.buttons.play = this.elements.textToSpeech.querySelector(`.${TEXT_TO_SPEECH_CONFIG.classes.textToSpeechComponent.playBtn}`);
    this.elements.buttons.stop = this.elements.textToSpeech.querySelector(`.${TEXT_TO_SPEECH_CONFIG.classes.textToSpeechComponent.stopBtn}`);

    // If buttons are undefined return 
    if (!this.elements.buttons.play || !this.elements.buttons.stop) return;

    // Event handler setup
    addEventListenerToEl(this.elements.buttons.play, 'click', this.playButtonClickHandler);
    addEventListenerToEl(this.elements.buttons.stop, 'click', this.stopButtonClickHandler);

    // Append widget to DOM
    this.elements.speechToTextWrapper.appendChild(this.elements.textToSpeech);
  }

   /**
   * Builds and returns text to speech DOM element
   */
  buildComponent = () => {
    let textToSpeechElm = document.createElement(`div`);
    textToSpeechElm.classList.add(TEXT_TO_SPEECH_CONFIG.classes.wrapper.wrapperClass)
    textToSpeechElm.innerHTML = TEXT_TO_SPEECH_CONFIG.DOMElement;
    return textToSpeechElm;
  };
  
  /**
   * Setup SpeechSynthesisUtterance settings
   */
  setupUtteranceSettings = () => {
    // Check if an instance of the SpeechSynthesisUtterance is created
    if (!this.state.utterance) return;

    let voices = this.state.synth.getVoices();
    this.state.utterance.voice = voices[TEXT_TO_SPEECH_CONFIG.speechSettings.voice];
    this.state.utterance.volume = TEXT_TO_SPEECH_CONFIG.speechSettings.volume;
    this.state.utterance.rate = TEXT_TO_SPEECH_CONFIG.speechSettings.rate;
    this.state.utterance.pitch = TEXT_TO_SPEECH_CONFIG.speechSettings.pitch;
    this.state.utterance.lang = TEXT_TO_SPEECH_CONFIG.speechSettings.lang;
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
   * Toggles between play / paused state
   */
  toggleButtonState = () => {
    this.state.isPaused = !this.state.isPaused;
    this.state.isPlaying = !this.state.isPlaying;
    this.elements.buttons.play.innerText = this.state.isPlaying ? TEXT_TO_SPEECH_CONFIG.content.pauseBtn : TEXT_TO_SPEECH_CONFIG.content.playBtn; 
  };

  /**
   * Begins reading utterance
   */
  readContent = () => {
    this.toggleButtonState();
    this.state.utterance.text = this.elements.speechToTextWrapper.innerText;
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
