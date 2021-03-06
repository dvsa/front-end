import engine from 'store/src/store-engine';
import localStorage from 'store/storages/localStorage';
import cookieStorage from 'store/storages/cookieStorage';
import expirePlugin from 'store/plugins/expire';

const storages = [localStorage, cookieStorage];

const plugins = [expirePlugin];

const store = engine.createStore(storages, plugins);

export default store;
