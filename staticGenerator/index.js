const thunkMiddleware = require('redux-thunk').default,
			rootReducer = require('../app/ducks/').default,
			routes = require('../app/routes').default;

const redux = require('redux'),
			reactRouter = require('react-router'),
			serialize = require('serialize-javascript');

const { createStore, applyMiddleware } = redux,
			{ match } = reactRouter;

const startApp = require('./startApp'),
			copyAssets = require('./copyAssets');

const staticGenerator = function(locals, callback) {

	let location = locals.path;

	const onRouteMatch = (err, redirectLocation, renderProps) => {

		const store = createStore(
			rootReducer,
			applyMiddleware(thunkMiddleware)
		);

		const currentState = serialize(store.getState(), { isJSON: true });
		startApp(locals)(store, renderProps, currentState)
			.then((templateMarkup) => callback(null, templateMarkup))
			.then(() => locals.rootPath !== '/' ? copyAssets(locals.rootPath) : null)
			.catch((e) => {
				console.log(location, e);
				process.exit(-1)
			})
	};


	match(
		{ routes, location },
		onRouteMatch
	);
};

module.exports = staticGenerator;
