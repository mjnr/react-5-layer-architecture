import { combineReducers } from 'redux';
import { requestsReducer } from './requests';
import { fetchInterceptorReducer } from 'ducks/fetchInterceptor';

const rootReducer = combineReducers({
	requests: requestsReducer,
	interceptor: fetchInterceptorReducer
});

export default rootReducer;
