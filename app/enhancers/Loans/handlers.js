import { options, results } from './mock';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import withHandlers from 'recompose/withHandlers';

export default compose(
	setDisplayName('/app/enhancers/Loans/handlers.js'),
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
		onGetResults: ({ getResults, setResults, setInstallments, setIsLoading, dispatch, selectedValue, plots }) => () => {

			setIsLoading(true);

			getResults().then(res => {
				setResults(results);
				setInstallments(Math.floor(selectedValue / plots));
				setIsLoading(false);
			});
		},
		getIncomeOptions: ({ getOptions, setOptions, setIsLoading, dispatch }) => () => {
			setIsLoading(true);

			getOptions().then(res => {
				setOptions(options);
				setIsLoading(false);
			});
		}
	}),
)
