import { combineForms } from 'react-redux-form';

const initialState = {
	payload: {
		name: ''
	}
};

export const formReducer = combineForms(initialState, 'currentProposal');
