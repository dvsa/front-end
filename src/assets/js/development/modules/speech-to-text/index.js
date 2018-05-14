import { SpeechToText } from './speech-to-text';

export const initSpeechToText = () => {
  // Creates NodeList of every speech to text HTML element
  let speechToTextElements = document.querySelectorAll('.search-bar__search-voice');
  // Converts Nodelist into an array of HTML elements
  speechToTextElements = Array.from(speechToTextElements);

  // If array exists
  if (speechToTextElements && speechToTextElements.length) {
    // Cycle through each
    speechToTextElements.forEach(element => {
      // Construct new SpeechToText object
      new SpeechToText(element);
    });
  }
};
