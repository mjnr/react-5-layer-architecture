import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import data from './data';
import state from './state';
import handlers from './handlers';
import hooks from './hooks';
import propsMapper from './propsMapper';

export default compose(
	setDisplayName('/app/enhancers/Loans/index.js'),
	data,
	state,
	handlers,
	hooks,
	propsMapper
)
