const reactRedux = require('react-redux'),
			reactServer = require('react-dom/server'),
			reactRouter = require('react-router');

const { Provider } = reactRedux,
			{ RouterContext } = reactRouter,
			{ renderToString } = reactServer;

const template = require('./template');

const startApp = (locals) => (store, renderProps, currentState) => {
	let { path, webpackStats } = locals;
	let { hash } = webpackStats;

	let markup,
			templateMarkup,
			currentRouteConfig;

	if (renderProps) {

		markup = renderToString(
			<Provider store={store}>
				<RouterContext { ...renderProps } />
			</Provider>
		);

		currentRouteConfig = renderProps.routes[0] || renderProps.routes[1];

		let { name, category } = currentRouteConfig;

		templateMarkup = template({
			pageName: name,
			pageCategory: category || "",
			markup,
			currentState,
			options: locals,
			hash
		});

	}

	return new Promise((resolve, reject) => {
		if (!templateMarkup) {
			let err = new Error(`Error on generate ${path} static markup`);
			reject(err);
		} else {
			console.log(`${path} static markup successfully generated`);
			resolve(templateMarkup);
		}
	});
};

module.exports = startApp;
