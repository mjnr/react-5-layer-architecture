import { Provider } from 'react-redux';
import { Router } from 'react-router';

export const RootComponent = ({ store, history, routes }) => (
	<Provider store={store}>
		<Router history={history}>
			{ routes }
		</Router>
	</Provider>
);
