import { handleActions } from 'redux-actions';

export const addTest = ({ testName, testValue }) => {
	return {
		type: "ADD_TEST",
		testName,
		testValue
	};
};

export const addError = () => {
	return {
		type: "ADD_ERROR"
	};
};

export const preampReducer = handleActions({
	ADD_TEST: (state, action) => {
		return {
			...state,
			[action.testName]: action.testValue
		};
	},

	ADD_ERROR: (state, action) => {
		return {
			error: true
		}
	}
}, {});
