export const FONT_SIZE_TOGGLE_CONFIG = {
  classes: {
    increaseBtn: 'font-size-toggle__button--increase',
    decreaseBtn: 'font-size-toggle__button--decrease',
    resetBtn: 'font-size-toggle__button--reset',
    hidden: 'font-size-toggle__button--hidden',
  },
  maxSize: 5,
  minSize: -2,
  dataAttributes: {
    type: 'data-toggle-type',
  },
  DOMTargets: ['h1', 'h2', 'h3', 'h4', 'p', 'li', 'td', 'th', 'thead', 'caption', 'legend', 'button', 'dd'],
};
