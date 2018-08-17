import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import withProps from 'recompose/withProps';

export default compose(
	setDisplayName('/app/enhancers/Loans/propsMapper.js'),
	withProps()
)
