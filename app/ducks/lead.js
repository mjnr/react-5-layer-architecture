import { handleActions } from 'redux-actions';

export const addLeadInfo = (payload) => {
	return {
		type: "ADD_LEAD_INFO",
		payload
	};
};

export const leadReducer = handleActions({
	ADD_LEAD_INFO: (state, { payload }) => {
		return {
			...state,
			...payload
		};
	}
}, {});
