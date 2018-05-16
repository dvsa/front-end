const textToSpeech = {
  classes: {
    playBtn: 'js-text-to-speech__button--play',
    stopBtn: 'js-text-to-speech__button--stop'
  },
  content: {
    title: 'Listen to this information.',    
    playBtn: 'Play audio',
    pauseBtn: 'Resume audio',
    stopBtn: 'Stop audio'
  }
}

export const TEXT_TO_SPEECH_CONFIG = {
  speechSettings: {
    voice: 7,
    volume: 1,
    rate: -1,
    pitch: 0,
    lang: 'en-uk',
  },
  content: {
    title: textToSpeech.content.title,
    playBtn: textToSpeech.content.playBtn,
    pauseBtn: textToSpeech.content.pauseBtn,
    stopBtn: textToSpeech.content.stopBtn
  },
  classes: {
    wrapper: {
      wrapperClass: 'js-text-to-speech',
      JSEnabled: 'js-text-to-speech--js-enabled'
    },
    textToSpeechComponent: {
      playBtn: textToSpeech.classes.playBtn,
      stopBtn: textToSpeech.classes.stopBtn
    },
  },
  DOMElement: `<p class='js-text-to-speech__title'>
  <strong>${textToSpeech.content.title}</strong>
  </p>
  <div class='js-text-to-speech__controls'>
  <button class='js-text-to-speech__button ${textToSpeech.classes.playBtn}'>${textToSpeech.content.playBtn}</button>
  <button class='js-text-to-speech__button ${textToSpeech.classes.stopBtn}'>${textToSpeech.content.stopBtn}</button>
  </div>`
};
