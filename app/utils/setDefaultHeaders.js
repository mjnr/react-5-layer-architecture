import axios from 'axios';

const defaultHeaders = axios.defaults.headers.common;

export default function setDefaultHeaders(headerObj = {}) {
	if (Object.keys(headerObj).length) {
		axios.defaults.headers.common = Object.assign(defaultHeaders, headerObj);
	} else {
		axios.defaults.headers.common = defaultHeaders;
	}
};
