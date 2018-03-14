import { createSelector } from 'reselect';

const settings = state => state.settings;

export const settingsSelector = createSelector(settings, settings => {
  return settings;
});
