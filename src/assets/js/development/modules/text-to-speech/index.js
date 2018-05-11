import { TextToSpeech } from './text-to-speech';

export const initTextToSpeech = () => {
  // Returns the first found element
  let textToSpeechElements = document.querySelectorAll('.js-text-to-speech');

  // Convers textToSpeechElements to array
  textToSpeechElements = Array.from(textToSpeechElements);

  // If not defined & includes at least one element 
  if (textToSpeechElements && textToSpeechElements.length) {
    textToSpeechElements.forEach(textToSpeechElm => {
      // Init a new textToSpeech element
      new TextToSpeech(textToSpeechElm);
    });
  };
};
