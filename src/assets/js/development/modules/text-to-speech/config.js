export const TEXT_TO_SPEECH_CONFIG = {
  speechSettings: {
    voice: 7,
    volume: 1,
    rate: -1,
    pitch: 0,
    lang: 'en-uk',
  },
  content: {
    title: 'Listen to this information.',
    playBtn: 'Play audio',
    stopBtn: 'Stop audio'
  },
  classes: {
    wrapper: {
      wrapperClass: 'js-text-to-speech',
      JSEnabled: 'js-text-to-speech--js-enabled'
    },
    textToSpeechComponent: {
      playBtn: 'js-text-to-speech__button--play',
      stopBtn: 'js-text-to-speech__button--stop'
    },
  },
  DOMElement: `<p class='js-text-to-speech__title'>
  <strong>${this.content.title}</strong>
  </p>
  <div class='js-text-to-speech__controls'>
  <button class='js-text-to-speech__button ${this.classes.textToSpeechComponent.playBtn}'>${this.content.playBtn}</button>
  <button class='js-text-to-speech__button ${this.classes.textToSpeechComponent.stopBtn}'>${this.content.stopBtn}</button>
  </div>`
};
