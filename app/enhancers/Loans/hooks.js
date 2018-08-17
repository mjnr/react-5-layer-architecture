import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import lifecycle from 'recompose/lifecycle';

export default compose(
	setDisplayName('/app/enhancers/Loans/hooks.js'),
	lifecycle({
		componentDidMount() {
			const { setIsLoading, getIncomeOptions } = this.props;
			getIncomeOptions();
		}
	})
)
