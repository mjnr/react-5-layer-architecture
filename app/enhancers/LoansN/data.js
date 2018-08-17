import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import { connect } from 'react-redux';

export default compose(
	setDisplayName('/app/enhancers/Loans/data.js'),
	connect()
)
