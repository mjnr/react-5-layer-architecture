import { handleActions } from 'redux-actions';

const initialState = {
	loaded: false
};

export const setTrackingConfig = (data) => ({
	type: "SET_TRACKING_CONFIG",
	data
});

export const trackerReducer = handleActions({
	SET_TRACKING_CONFIG: (state, { data }) => ({
		...state,
		...data,
		loaded: true
	})
}, initialState);
