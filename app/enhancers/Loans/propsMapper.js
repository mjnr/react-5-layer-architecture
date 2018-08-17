import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import mapProps from 'recompose/mapProps';

export default compose(
	setDisplayName('/app/enhancers/Loans/propsMapper.js'),
	mapProps((props) => {
		let { isLoading, selectedOption, results } = props;

		return {
			...props,
			isIncomeStepActive: !isLoading && !selectedOption,
			isValueStepActive: !isLoading && selectedOption && !results.length,
			isResultStepActive: !!(results && results.length)
		};
	}),
)
