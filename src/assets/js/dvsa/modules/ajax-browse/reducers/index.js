import { combineReducers } from 'redux';

import blocks from './blocks';
import settings from './settings';

const reducers = combineReducers({
  settings,
  blocks,
});

export default reducers;
