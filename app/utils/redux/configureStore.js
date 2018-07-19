import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'ducks';
import { devTools } from './devTools';
import isClient from 'utils/isClient';
import { loadState } from 'utils/storage';
import pageNames from 'constants/pageNames';

const IS_DEV = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local';

export default function configureStore() {
	const storeMiddleware = applyMiddleware(
		thunkMiddleware
	);

	const storeEnhancements = compose(
		storeMiddleware,
		...IS_DEV ? [devTools] : []
	);

	let currentState = {};

	if (isClient() && window.location.pathname !== pageNames.RootUrl.path) {
		const localStorageState = loadState();
		currentState = Object.assign({}, localStorageState);
	}

	const store = createStore(rootReducer, currentState, storeEnhancements);

	return store;
}
