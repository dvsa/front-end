import { addEventListenerToEl } from '../../../shared/misc/events';
import { TEXT_TO_SPEECH_CONFIG } from './config';
import md5 from 'md5';

// TextToSpeech :: element = HTML Element -> TextToSpeech object
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
    this.speechText = this.textToSpeechWrapper.querySelector('.js-text-to-speech__content');

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

    // If stop button is not defined return with warning
    if (!this.speechText) {
      return console.warn('Text-to-speech: Speech text has not been defined.');
    }

    // Sets up a new speechSynthesis global object
    this.synth = window.speechSynthesis;
    this.synth.readingContext = {
      id: '',
      content: ''
    };

    // Run widget setup
    this.setup();
  }

  // inital component class setup
  // setup :: -> void
  setup() {
    // Event handler setup
    addEventListenerToEl(this.playButton, 'click', this.playButtonClickHandler);
    addEventListenerToEl(this.pauseButton, 'click', this.pauseButtonClickHandler);
    addEventListenerToEl(this.stopButton, 'click', this.stopButtonClickHandler);
  }

  // Handles the play button click event
  // playbuttonClickHandler :: e = event -> void
  playButtonClickHandler = e => {
    e.preventDefault();
    // Check if utterance is currently reading &&
    // ID is equal to THIS instances reading context ID &&
    // is not paused
    if (this.synth.speaking && 
        this.synth.currentlyReading == this.contentUniqueIdentifier && 
        !this.synth.paused) {
      // Cancel all instances utterances (que)
      this.synth.cancel();
      // Start a new utterancec
      this.readContent();
    // If utterance speech is paused
    } else if (this.synth.paused) {
      this.synth.resume();
    // If not reading an utterance
    } else {
      // Start a new utterancec
      this.readContent();      
    }
  };

  // Handles the pause button click event
  // pausebuttonClickHandler :: e = event -> void
  pauseButtonClickHandler = e => {
    e.preventDefault();
    if (this.synth.speaking) this.synth.pause();
  };

  // Handles the stop button click event
  // stopbuttonClickHandler :: e = event -> void
  stopButtonClickHandler = e => {
    e.preventDefault();
    if (this.synth.speaking || this.synth.paused) this.synth.cancel();
  };

  // Begins reading utterance
  // readElementsContent :: () -> void
  readContent = () => {
    this.setReadingContent();
    this.synth.speak(this.initSpeechSynthesisUtterance(this.synth.readingContext.content));
  }

  // Prepares utterance content
  // setReadingContent :: () -> void
  setReadingContent = () => {
    this.synth.readingContext.id = md5(this.speechText.innerHTML);
    this.synth.readingContext.content = this.getTextFromElm(this.speechText);
  }

  // Resets reading content
  // ResetReadingContent :: () -> void
  ResetReadingContent = () => this.synth.readingContext = {};

  // Init a new SpeechSynthesisUtterance object
  // initSpeechSynthesisUtterance :: config = object -> message = string
  initSpeechSynthesisUtterance = (message, config = TEXT_TO_SPEECH_CONFIG) => {
    // if message was not passed in
    if (!message) {
      return console.warn('Text to speech: utterance message was not defined');
    }
    
    // sets up new SpeechSynthesisUtterance
    let utterance = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[TEXT_TO_SPEECH_CONFIG.voice];
    utterance.volume = TEXT_TO_SPEECH_CONFIG.volume;
    utterance.rate = TEXT_TO_SPEECH_CONFIG.rate;
    utterance.pitch = TEXT_TO_SPEECH_CONFIG.pitch;
    utterance.lang = TEXT_TO_SPEECH_CONFIG.lang;
    //Asigns text to be read
    utterance.text = message;

    // Resets reading content 
    utterance.onend = event => this.ResetReadingContent();
    
    // Returns utterance
    return utterance;
  };

  // Reads & returns text from an HTML element
  // getText :: elm = Element -> string
  getTextFromElm = elm => {
    // If elmement was not passed in / defined log an error
    if (!elm) {
      return console.log('Text to speech: method getText requires an element param');
    }

    // Gets the inner text from element
    let textString = elm.innerText;

    // If text string was not defined
    if (!textString) {
      return console.log(`Text to speech: failed to read text from ${elm}`);
    }

    // Return textstring
    return textString;
  };

  // Expermiental
  prepareContent = element => {
    let test = Array.from(element.children)
    .map((node, nodeIndex) => {
        let inner = node.innerHTML
        .split(" ")
        .map((word, wordIndex) => {
          return `<span id="${nodeIndex}-${wordIndex}">${word}</span>`
        });
        return `<${node.tagName.toLowerCase()}>${inner}</${node.tagName.toLowerCase()}>`;
    });
  }

}
