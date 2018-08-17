import { options, results } from './mock';
import { fetchData } from 'ducks/requests';
import { connect } from 'react-redux';
import Button from 'components/Button/';
import Loans from 'components/Loans/';

import {
	compose,
	withState,
	withHandlers,
	lifecycle,
	mapProps
} from 'recompose';

const LoansEnhancer = compose(
	connect(),
	withState('options', 'setOptions', []),
	withState('results', 'setResults', []),
	withState('isLoading', 'setIsLoading', false),
	withState('selectedOption', 'setSelectedOption', null),
	withState('selectedValue', 'setSelectedValue', null),
	withState('plots', 'setplots', 58),
	withState('installments', 'setInstallments', 0),
	withHandlers({
		onSelectIncome: ({ setIsLoading, setSelectedOption }) => (option) => {
			setIsLoading(true);

			setTimeout(() => {
				setSelectedOption(option);
				setIsLoading(false);
			}, 600);
		},
		onSelectValue: ({ setSelectedValue }) => (e) => {
			const value = e.target.value;

			setSelectedValue(value);
		},
		onGetResults: ({ setResults, setInstallments, setIsLoading, dispatch, selectedValue, plots }) => () => {

			setIsLoading(true);

			dispatch(fetchData({
				url: '/results/',
				key: 'results',
				mock: results
			})).then(res => {
				setResults(results);
				setInstallments(Math.floor(selectedValue / plots));
				setIsLoading(false);
			});
		},
		getIncomeOptions: ({ setOptions, setIsLoading, dispatch }) => () => {
			setIsLoading(true);

			return dispatch(fetchData({
				url: '/income-options/',
				key: 'income-options',
				mock: options
			})).then(res => {
				setOptions(options);
				setIsLoading(false);
			});
		}
	}),
	mapProps((props) => {
		let { isLoading, selectedOption, results } = props;

		return {
			...props,
			isIncomeStepActive: !isLoading && !selectedOption,
			isValueStepActive: !isLoading && selectedOption && !results.length,
			isResultStepActive: !!(results && results.length)
		};
	}),
	lifecycle({
		componentDidMount() {
			const { setIsLoading, getIncomeOptions } = this.props;
			getIncomeOptions();
		}
	})
);

export default LoansEnhancer;
