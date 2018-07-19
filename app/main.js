import React from 'react';
import configureStore from 'utils/redux/configureStore';
import { render } from 'react-dom';
import { match, browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { RootComponent } from 'components/RootComponent';
import fontObserver from 'utils/fontObserver';

/* global APP */

import routes from './routes';

fontObserver([
	{
		name: 'Poppins'
	},
	{
		name: 'Poppins',
		weight: 700
	}
]);

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

const store = configureStore(),
			history = browserHistory,
			rootComponentProps = { store, history, routes },
			appWrapper = document.getElementById('react-view');

const renderApp = (Component, props) => {
	render(
		<AppContainer>
			<Component { ...props } />
		</AppContainer>,
		appWrapper
	);
}

if (process.env.NODE_ENV === 'production') {
	match({ routes, location }, (err, redirectLocation, renderProps) => {
		const props = Object.assign({}, rootComponentProps, renderProps);
		renderApp(RootComponent, props);
	});
} else {
	renderApp(RootComponent, rootComponentProps);
}

if (module.hot) {
	module.hot.accept('components/RootComponent', () => renderApp(RootComponent, rootComponentProps));
	module.hot.accept('routes', () => renderApp(RootComponent, rootComponentProps));
}
