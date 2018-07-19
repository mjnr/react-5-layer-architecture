const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__;

const isDevToolDefined = () => {
	const isWindowAnObject = typeof window === 'object';
	return isWindowAnObject && reduxDevTools;
};

export const devTools = isDevToolDefined() ? reduxDevTools() : (fallback) => fallback;

export { isDevToolDefined };
