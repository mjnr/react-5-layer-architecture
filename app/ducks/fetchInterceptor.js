import { handleActions } from 'redux-actions';
import axios from 'axios';
import setDefaultHeaders from 'utils/setDefaultHeaders';

const mapServerErrorResponses = (message) => message.split(':').pop();

const cleanStorage = dispatch => new Promise((resolve) => {
	let storageIsClear = false;
	dispatch(closeFeedback());

	setTimeout(() => {
		localStorage.clear();
		storageIsClear = true;

		setDefaultHeaders();
		resolve(storageIsClear);
	}, 1000);

});

export function startInterceptor() {
	return dispatch => {
		axios.interceptors.response.use(
			res => {
				if (res.data.body && res.data.body.message && res.status !== 200 && res.status !== 401) {
					let { message } = res.data.body;
					console.log('msg', message)
					dispatch(throwFeedback({
						message: mapServerErrorResponses(message),
						error: true
					}));
				}

				return res;
			},
			error => {
				let errorObj = Object.assign({}, error);

				console.log('GLOBAL REQUEST ERROR!', errorObj);

				const { message } = error.response ? error.response.data : { message: "Ocorreu um impreviso, tente novamente mais tarde!" };
				if (errorObj.response.status !== 401) {
					dispatch(throwFeedback({
						message: mapServerErrorResponses(message),
						error: true
					}));
				}

				if (errorObj.response && errorObj.response.status === 503 && false) {
					cleanStorage(dispatch)
						.then(storageIsClear => location.reload());
				}

				return Promise.reject(error);
			}
		);
	};
};

export function throwFeedback(payload) {
	return {
		type: "THROW_FEEDBACK",
		payload
	};
};

export function closeFeedback() {
	return {
		type: "CLOSE_FEEDBACK"
	}
}

export const fetchInterceptorReducer = handleActions({
  THROW_FEEDBACK: (state, { payload }) => ({
		...payload,
		visible: true
	}),

	CLOSE_FEEDBACK: (state, action) => ({
		...state,
		visible: false
	})
}, {
  visible: false,
	error: false,
	message: ''
});
