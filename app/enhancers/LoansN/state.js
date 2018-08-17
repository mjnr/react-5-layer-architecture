import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import withState from 'recompose/withState';

export default compose(
	setDisplayName('/app/enhancers/Loans/state.js'),
	withState()
)
