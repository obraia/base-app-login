import { combineReducers } from 'redux';

import themeReducers from './theme';
import menuReducers from './menu';
import productsReducers from './products';
import navigationReducers from './navigation';
import authReducers from './auth';

const reducers = combineReducers({
    themeReducers,
    menuReducers,
    productsReducers,
    navigationReducers,
    authReducers
});

export { reducers };