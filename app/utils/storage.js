import isClient from 'utils/isClient';

/* global APP */

const { appName, env } = APP;

const key = `storage-${appName}-${env}`;

export const loadState = () => {
	if (isClient()) {
		const state = localStorage.getItem(key);
		return JSON.parse(state);
	}
};

export const saveState = (state) => {
	if (isClient()) {
		localStorage.setItem(key, JSON.stringify(state));
		return true;
	}
};

export const addToState = (state) => {
	if (isClient()) {
		const loadedState = loadState();

		const newState = {
			...loadedState,
			...state
		};

		saveState(newState);

		return true;
	}
}
