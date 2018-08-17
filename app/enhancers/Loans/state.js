import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import withState from 'recompose/withState';

export default compose(
	setDisplayName('/app/enhancers/Loans/state.js'),
	withState('options', 'setOptions', []),
	withState('results', 'setResults', []),
	withState('isLoading', 'setIsLoading', false),
	withState('selectedOption', 'setSelectedOption', null),
	withState('selectedValue', 'setSelectedValue', null),
	withState('plots', 'setplots', 58),
	withState('installments', 'setInstallments', 0),
)
