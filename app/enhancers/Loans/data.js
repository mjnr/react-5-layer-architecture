import { options, results } from './mock';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import { connect } from 'react-redux';
import { fetchData } from 'ducks/requests';

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getOptions() {
			return dispatch(fetchData({
				url: '/income-options/',
				key: 'income-options',
				mock: options
			}))
		},
		getResults() {
			return dispatch(fetchData({
				url: '/results/',
				key: 'results',
				mock: results
			}))
		}
	};
};

export default compose(
	setDisplayName('/app/enhancers/Loans/data.js'),
	connect(mapStateToProps, mapDispatchToProps)
)
