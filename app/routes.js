import { Route } from 'react-router';
import AppLayout from 'layouts/AppLayout';
import pageNames from 'constants/pageNames';

const {
	home
} = pageNames;

const loadRoute = callback => (module) => {
	if (!module) {
		callback();
	} else {
		callback(null, module.default);
	}
};

const errorOnLoadingRoute = error => {
	console.log(error);
	throw new Error('Error on dynamic route loading', error);
};

const routes = [
	<Route component={AppLayout}>
		<Route
			path={`${home.route}`}
			name={home.name}
			getComponent={
				(location, cb) => {
					System.import('./pages/Home/')
						.then(loadRoute(cb, null))
						.catch(errorOnLoadingRoute);
				}
			}
		/>
	</Route>
];

export default routes;
