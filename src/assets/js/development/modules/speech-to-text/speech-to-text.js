import { addEventListenerToEl } from '../../../shared/misc/events';
import { toggleClass, closestParentOfEl } from '../../../shared/misc';
import { TEXT_TO_SPEECH_CONFIG } from './config';
import md5 from 'md5';

export class TextToSpeech {
  constructor(textToSpeechWrapper) {
    // Check if element is passed
    if (!textToSpeechWrapper) console.warn('Text to speech wrapper not defined');

    // Object to store / reference state
    this.state = {
      wrapper: textToSpeechWrapper,
      synth: window.speechSynthesis,
      textToSpeechElements: [],
      current: '',
    };

    // Gets all text to speech components in wrapper
    this.sections = this.state.wrapper.querySelectorAll(`.${TEXT_TO_SPEECH_CONFIG.classes.section.wrapper}`);

    // Converts NodeList to array
    this.sections = Array.from(this.sections);

    // If speechSynthesis & SpeechSynthesisUtterance failed to set up return
    if (!this.sections || !this.state.synth) return;

    // Run widget setup
    this.setup();
  }

  /**
   * Initializer
   */
  setup() {
    // Loops through all sections
    this.sections.forEach((section, index) => {
      // Init variable setup
      let sectionContent, textToSpeechDOMComponent, id, playBtn, sectionFirstElm, utterance;

      // Get utterance content
      sectionContent = section.innerText;
      if (!sectionContent) return;

      // Build text to speech DOM element
      textToSpeechDOMComponent = this.buildComponent();
      if (!textToSpeechDOMComponent) return;

      // Create an unique ID
      id = `text-to-speech-${md5(section.innerHTML)}`;
      section.setAttribute('id', id);

      // Creates object to store audio play button properties
      playBtn = {
        elementRef: textToSpeechDOMComponent.querySelector(`.${TEXT_TO_SPEECH_CONFIG.classes.controls.playBtn}`),
        iconRef: textToSpeechDOMComponent.querySelector('.text-to-speech__icon'),
        content: textToSpeechDOMComponent.querySelector('.text-to-speech__button-content'),
      };

      // Returns if DOM elements not found
      if (!playBtn.elementRef || !playBtn.iconRef) return;

      // Add Play / Pause button event listener
      addEventListenerToEl(playBtn.elementRef, 'click', this.playPauseButtonClickHandler);

      // Set data-array index with index value from forEach loop
      section.setAttribute('data-array-index', index);

      // Reference to the first DOM element within section - element & type
      sectionFirstElm = {
        element: section.firstChild.nextSibling,
        type: section.firstChild.nextSibling.nodeName,
      };

      // Tests wether the first element is a heading
      this.testRegex(sectionFirstElm.type, new RegExp('h*[1-6]'))
        ? section.insertBefore(textToSpeechDOMComponent, section.childNodes[2])
        : section.insertBefore(textToSpeechDOMComponent, sectionFirstElm.element);

      // Define and push this elements state
      this.state.textToSpeechElements.push({
        id,
        index,
        sectionContent,
        utterance: this.setupUtteranceSettings(index),
        button: {
          element: playBtn.elementRef,
          icon: playBtn.iconRef,
          content: playBtn.content,
        },
        isPlaying: false,
        isPaused: false,
      });
    });
  }

  /**
   * Click hanlder for play / pause button toggle
   *
   * @param {Event} event - DOM Event object
   */
  playPauseButtonClickHandler = event => {
    //Prevent default action
    event.preventDefault();

    // Gets event target's parent
    let eventTargetParent = closestParentOfEl(event.target, `.${TEXT_TO_SPEECH_CONFIG.classes.section.wrapper}`);

    // Gets informational object on the caller parent
    let caller = this.getDOMElementAttributes(eventTargetParent, ['id', 'data-array-index']);
    if (!caller) console.warn('Failed to retrieve caller info');

    // If event has taken place on the same element that is currently playing / paused
    if (caller.id == this.state.current.id) {
      // If state is paused
      if (this.state.current.isPaused) {
        this.state.synth.resume();
        this.currentElementIsPlaying();
      }

      // If state is playing
      else {
        this.state.synth.pause();
        this.currentElementIsPaused();
      }

      // Toggle button content
      this.toggleButtonContent();

      // Return from method
      return;
    }

    // Removes all utterances from the utterance que
    this.state.synth.cancel();

    // Assigns new reading context to state
    this.state.current = this.state.textToSpeechElements[caller['data-array-index']];

    // Begins reading
    this.readContent();

    // Toggle button content
    this.toggleButtonContent();
  };

  /**
   * Setup utterance
   *
   * @param {Event} elementIndex - Index within DOM collection array
   * @return {utterance} - SpeechSynthesisUtterance
   */
  setupUtteranceSettings = elementIndex => {
    let utterance, voices;

    // Defines new utterance object
    utterance = new SpeechSynthesisUtterance();

    // Creates voices object
    voices = this.state.synth.getVoices();

    // Utterance config setup
    utterance.voice = voices[TEXT_TO_SPEECH_CONFIG.speechSettings.voice];
    utterance.volume = TEXT_TO_SPEECH_CONFIG.speechSettings.volume;
    utterance.rate = TEXT_TO_SPEECH_CONFIG.speechSettings.rate;
    utterance.pitch = TEXT_TO_SPEECH_CONFIG.speechSettings.pitch;
    utterance.lang = TEXT_TO_SPEECH_CONFIG.speechSettings.lang;

    // Resets button state on utterance end
    utterance.onend = () => {
      // Reset this elements state
      this.state.textToSpeechElements[elementIndex].isPlaying = false;
      this.state.textToSpeechElements[elementIndex].isPaused = false;

      // if this element is currently playing reset current
      if (this.state.current.index == elementIndex) this.state.current = '';

      // Toggle button content
      this.toggleButtonContent();
    };

    return utterance;
  };

  /**
   * Gets DOM related info on the calling event
   *
   * @param {Element} Element - DOM Event object
   * @param {Array} Attributes - Array of strings containing attributes to be captured
   * @return {Object} - Event caller information
   */
  getDOMElementAttributes = (element, attributes) => {
    // Init an empty object
    var obj = {};

    // loops through attributes array
    attributes.forEach(attribute => {
      // creates & assigns a new object key to a DOM element attribute
      obj[attribute] = element.getAttribute(`${attribute}`);
    });

    // Returns object
    return obj;
  };

  /**
   * Toggles play / pause button inner text
   */
  toggleButtonContent = () => {
    this.state.textToSpeechElements.map(el => {
      // If element state is no longer playing or paused resort to default state
      if (!el.isPlaying && !el.isPaused) {
        // Initialise button content
        this.buttonContentInit(el);
        return;
      }

      // Toggles between playing / paused state
      el.isPlaying ? this.buttonContentPlaying(el) : this.buttonContentNotPlaying(el);
    });
  };

  /**
   * Begins reading utterance
   */
  readContent = () => {
    this.state.current.utterance.text = this.state.current.sectionContent;
    this.currentElementIsPlaying();
    this.state.synth.speak(this.state.current.utterance);
  };

  /**
   * Builds and returns text to speech DOM element
   */
  buildComponent = () => {
    // Builds out DOM Element
    let textToSpeechElm = document.createElement(`div`);
    textToSpeechElm.classList.add(TEXT_TO_SPEECH_CONFIG.classes.controls.wrapper);
    textToSpeechElm.innerHTML = TEXT_TO_SPEECH_CONFIG.DOMElement;

    // Returns to caller
    return textToSpeechElm;
  };

  /**
   * Initialises / Resets button content
   *
   * @param {Element} Element - DOM Element object
   */
  buttonContentInit = element => {
    element.button.content.innerText = TEXT_TO_SPEECH_CONFIG.content.init;
    element.button.icon.classList.remove('text-to-speech__icon--pause');
    element.button.icon.classList.add('text-to-speech__icon--play');
  };

  /**
   * Lets button content to playing state
   *
   * @param {Element} Element - DOM Element object
   */
  buttonContentPlaying = element => {
    element.button.content.innerText = TEXT_TO_SPEECH_CONFIG.content.pause;
    element.button.icon.classList.remove('text-to-speech__icon--play');
    element.button.icon.classList.add('text-to-speech__icon--pause');
  };

  /**
   * Lets button content to not playing state
   *
   * @param {Element} Element - DOM Element object
   */
  buttonContentNotPlaying = element => {
    element.button.content.innerText = TEXT_TO_SPEECH_CONFIG.content.play;
    element.button.icon.classList.remove('text-to-speech__icon--pause');
    element.button.icon.classList.add('text-to-speech__icon--play');
  };

  /**
   * Sets current elements state to playing
   */
  currentElementIsPlaying = () => {
    this.state.current.isPaused = false;
    this.state.current.isPlaying = true;
  };

  /**
   * Sets current elements state to paused
   */
  currentElementIsPaused = () => {
    this.state.current.isPaused = true;
    this.state.current.isPlaying = false;
  };

  /**
   * Returns boolean value if regex matches heading
   *
   * @param {String} string - String DOM element
   * @param {Regex} Regex - Regex to string against
   * @return {Boolean}
   */
  testRegex = (string, regex) => regex.test(string);
}