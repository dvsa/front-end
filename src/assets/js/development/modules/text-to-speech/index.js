import { TextToSpeech } from './text-to-speech';

export const initTextToSpeech = () => {
  // Returns the first found element
  let textToSpeechElm = document.querySelector('.js-text-to-speech');
  console.log('test');
  // Checks if text to speech element exists
  if (textToSpeechElm) {
    // Init a new textToSpeech element
    new TextToSpeech(element);
  }
};
