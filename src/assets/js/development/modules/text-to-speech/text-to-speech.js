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
    this.sections = Array.from(this.state.wrapper.querySelectorAll(`.${TEXT_TO_SPEECH_CONFIG.classes.section.wrapper}`));
    if (!this.sections || !this.sections.length) return;

    // If speechSynthesis & SpeechSynthesisUtterance failed to set up return
    if (!this.state.synth) return;

    // Run widget setup
    this.setup();
  }

  /**
   * Initializer
   */
  setup() {
    this.sections.forEach((section, index) => {
      // Get utterance content
      let content = section.innerText;
      if (!content) return;

      // Build text to speech DOM element
      let textToSpeechDOMComponent = this.buildComponent();
      if (!textToSpeechDOMComponent) return;

      // Adds JS enabled class
      textToSpeechDOMComponent.classList.add(TEXT_TO_SPEECH_CONFIG.classes.controls.JSEnabled);

      // Create an unique ID
      let uniqueIdentifier = `text-to-speech-${md5(section.innerHTML)}`;
      section.setAttribute('id', uniqueIdentifier);

      // Get play button ref
      let playBtn = textToSpeechDOMComponent.querySelector(`.${TEXT_TO_SPEECH_CONFIG.classes.controls.playBtn}`);
      if (!playBtn) return;

      // Play / Pause button event listener
      addEventListenerToEl(playBtn, 'click', this.playPauseButtonClickHandler);

      // Set the index
      section.setAttribute('data-array-index', index);

      // Reference to the first DOM element within section - element & type
      let sectionFirstElm = {
        element: section.firstChild.nextSibling,
        type: section.firstChild.nextSibling.nodeName,
      };

      // Creates reg exp pattern to detect headings
      let headingPattern = new RegExp('h*[1-6]');

      // Tests wether the first element in section is a heading
      if (headingPattern.test(sectionFirstElm.type)) {
        // Renders DOM Object after heading
        section.insertBefore(textToSpeechDOMComponent, section.childNodes[2]);
      } else {
        // Renders DOM Object top of section
        section.insertBefore(textToSpeechDOMComponent, sectionFirstElm.element);
      }

      // Sets up utterance
      let utterance = this.setupUtteranceSettings(index);
      if (!utterance) return;

      // Define and push this elements state
      this.state.textToSpeechElements.push({
        id: uniqueIdentifier,
        index,
        section,
        content,
        textToSpeechDOMComponent,
        playBtn,
        isPlaying: false,
        isPaused: false,
        utterance,
      });
    });
  }

  /**
   * Click hanlder for play / pause button toggle
   *
   * @param {Event} event - DOM Event object
   * @return {void}
   */
  playPauseButtonClickHandler = event => {
    event.preventDefault();

    // Gets informational object on the caller
    let caller = this.getCallerInfo(event);
    if (!caller) console.warn('Failed to retrieve caller info');

    // If event has taken place on the same element that is currently playing / paused
    if (caller.id == this.state.current.id) {
      // If state is paused
      if (this.state.current.isPaused) {
        this.state.synth.resume();
        this.currentElementIsPlaying();
      } else {
        // If state is playing
        this.state.synth.pause();
        this.currentElementIsPaused();
      }

      // Toggle button text
      this.toggleButtonText();

      // Return from method
      return;
    }

    // Removes all utterances from the utterance que
    this.state.synth.cancel();

    // Assigns new reading context to state
    this.state.current = this.state.textToSpeechElements[caller.index];

    // Begins reading
    this.readContent();

    // Toggle button text
    this.toggleButtonText();
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

      // Toggle button text
      this.toggleButtonText();
    };

    return utterance;
  };

  /**
   * Gets DOM related info on the calling event
   *
   * @param {Event} event - DOM Event object
   * @return {obj} - Event caller information
   */
  getCallerInfo = event => {
    // Method var setup
    let elm, id, index;

    // Gets the index of the current caller
    elm = closestParentOfEl(event.target, `.${TEXT_TO_SPEECH_CONFIG.classes.section.wrapper}`);
    id = elm.getAttribute('id');
    index = elm.getAttribute('data-array-index');

    // If elements are undefined return
    if (!elm || !id || !index) return;

    // Return caller info object
    return {
      elm,
      id,
      index,
    };
  };

  /**
   * Toggles play / pause button inner text
   */
  toggleButtonText = () => {
    this.state.textToSpeechElements.map(element => {
      // If element state is no longer playing or paused resort to default state
      if (!element.isPlaying && !element.isPaused) {
        element.playBtn.innerText = TEXT_TO_SPEECH_CONFIG.content.init;
        return;
      }

      // Toggles between playing / paused state
      element.isPlaying
        ? (element.playBtn.innerText = TEXT_TO_SPEECH_CONFIG.content.pause)
        : (element.playBtn.innerText = TEXT_TO_SPEECH_CONFIG.content.play);
    });
  };

  /**
   * Begins reading utterance
   */
  readContent = () => {
    this.state.current.utterance.text = this.state.current.content;
    this.state.current.isPlaying = true;
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
}
