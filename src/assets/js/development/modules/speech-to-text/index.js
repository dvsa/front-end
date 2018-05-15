import { SpeechToText } from './speech-to-text';
import { isChrome } from './isChrome';

export const initSpeechToText = () => {
  // Web speech API is only supported on chrome currently
  // Returns if not Chrome
  if (!isChrome()) return
  
  // Creates NodeList of every speech to text HTML element
  let speechToTextElements = document.querySelectorAll('.search-bar__search-voice');
  // Converts Nodelist into an array of HTML elements
  speechToTextElements = Array.from(speechToTextElements);

  // If array exists
  if (speechToTextElements && speechToTextElements.length) {
    // Cycle through each
    speechToTextElements.forEach(element => {
      // Construct new SpeechToText object
      element.classList.add('search-bar__search-voice--is-supported');
      new SpeechToText(element);
    });
  }
};
