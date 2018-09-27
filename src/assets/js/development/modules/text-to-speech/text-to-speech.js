import { addEventListenerToEl, closestParentOfEl } from './../../../shared/misc';
import { TEXT_TO_SPEECH_CONFIG } from './config';

export class TextToSpeech {
  constructor() {
    // Sets up the global component state object
    this.state = {
      synth: window.speechSynthesis,
      elements: [],
      current: {},
      targets: TEXT_TO_SPEECH_CONFIG.DOMTargets,
      currentlyPlayed: {},
    };

    // Sets up the module
    this.setup();
  }

  /**
   * TextToSpeechHover setup class
   *
   */
  setup = () => {
    let textToSpeechWrapper = document.querySelector(`.${TEXT_TO_SPEECH_CONFIG.classes.wrapper}`);
    if (!textToSpeechWrapper) return;

    // Get all DOM elements within body
    // converted to an array
    let DOMElements = Array.from(textToSpeechWrapper.querySelectorAll(this.state.targets));

    // If Array doesnt exist / empty return
    if (!DOMElements) return;

    // Loops through all elements
    DOMElements.forEach((el, index) => {
      // Define scoped variables
      let content, utterance, audioBtn;

      // Gets inner content
      content = el.innerText;

      // Creates a new utterance
      utterance = this.createUtterance(content, index);

      // Creates button
      audioBtn = this.createButton();

      // Return if setup variables empty / non existent
      if (!content || !utterance || !audioBtn) return;

      // Adds class
      el.classList.add(`${TEXT_TO_SPEECH_CONFIG.classes.readerItem}`);

      // Sets ID attribute
      el.setAttribute(TEXT_TO_SPEECH_CONFIG.dataAttributes.readerID, index);

      // Appends button
      el.appendChild(this.createButton());

      // Pushes properties for state capture
      this.state.elements.push({
        id: index,
        element: el,
        isPlaying: false,
        isHighlighted: false,
        utterance,
      });
    });
  };

  /**
   * Play button click handler
   *
   * @param {Event} event - DOM event object
   */
  playAudioClickHandler = event => {
    // Prevent default click event
    event.preventDefault();

    // Cancels any current reading
    this.state.synth.cancel();

    // Gets attribute data-content-id from parent element
    let dataContentID = closestParentOfEl(event.target, '.text-to-speech__item').getAttribute(
      `${TEXT_TO_SPEECH_CONFIG.dataAttributes.readerID}`
    );

    // If failed to get ID return with warning
    if (!dataContentID) return console.warn('Failed to retrieve data content id attribute');

    // Needed for bug in Safari
    this.state.currentlyPlayed = dataContentID;

    // Begins playing utterance
    this.state.synth.speak(this.state.elements[dataContentID].utterance);
  };

  /**
   * Configures and returns a button DOM element
   *
   * @return {element} - DOM element (button)
   */
  createButton = () => {
    // Creates a new button element
    let button = document.createElement('button');

    // Adds class 'text-to-speech-hover__button' to the button
    button.classList.add(`${TEXT_TO_SPEECH_CONFIG.classes.audioBtn}`);

    // Assigns the button with the text 'Play'
    button.innerHTML = TEXT_TO_SPEECH_CONFIG.buttonInnerHtml;

    // Adds click event listener to element
    addEventListenerToEl(button, 'click', this.playAudioClickHandler);

    // Returns button
    return button;
  };

  /**
   * Configures and returns a SpeechSynthesisUtterance
   *
   * @param {content} string - String to read
   * @param {number} id - numbered index
   * @return {SpeechSynthesisUtterance} - SpeechSynthesisUtterance
   */
  createUtterance = (content, id) => {
    // Defines new utterance object
    let utterance = new SpeechSynthesisUtterance();

    // Utterance config setup
    utterance.lang = 'en-uk';
    utterance.text = content;
    utterance.id = id;

    // On utterance start
    utterance.onstart = () => {
      // Sets the current playing state
      this.state.current = this.state.elements[utterance.id];

      // Resets all reader instances
      this.resetAll();

      // Sets playing / highlighted state
      this.state.current.isPlaying = true;
      this.state.current.isHighlighted = true;

      // Adds highlight CSS class
      this.state.current.element.classList.add(`${TEXT_TO_SPEECH_CONFIG.classes.readerItemHighlight}`);
      this.state.current.element
        .querySelector(`.${TEXT_TO_SPEECH_CONFIG.classes.audioBtn}`)
        .classList.add(`${TEXT_TO_SPEECH_CONFIG.classes.audioBtnPlaying}`);
    };

    // On utterance ended
    utterance.onend = () => {
      // Resets all reader instances
      this.resetAll();

      // Removes current reading instance
      this.state.current = {};
    };

    utterance.onerror = () => {
      // Forces a call on onend
      utterance.onend();

      // Sets the current playing state
      this.state.current = this.state.elements[this.state.currentlyPlayed];

      // Forces utterance to start
      this.state.current.utterance.onstart();
    };

    // Returns utterance
    return utterance;
  };

  /**
   * Resets all elements state
   *
   */
  resetAll = () => {
    this.state.elements.map(obj => {
      obj.isPlaying = false;
      obj.isHighlighted = false;

      // Removes highlight CSS class
      obj.element.classList.remove(`${TEXT_TO_SPEECH_CONFIG.classes.readerItemHighlight}`);
      obj.element
        .querySelector(`.${TEXT_TO_SPEECH_CONFIG.classes.audioBtn}`)
        .classList.remove(`${TEXT_TO_SPEECH_CONFIG.classes.audioBtnPlaying}`);
    });
  };
}
