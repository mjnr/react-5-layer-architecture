import { Component } from 'react';
import { options, results } from './mock';
import { fetchData } from 'ducks/requests';
import { connect } from 'react-redux';
import Button from 'components/Button/';
import Loans from 'components/Loans/';

class LoansContainer extends Component {
	constructor(props) {
		super(props);

		this.onSelectIncome = this.onSelectIncome.bind(this);
		this.onSelectValue = this.onSelectValue.bind(this);
		this.onGetResults = this.onGetResults.bind(this);

		this.state = {
			options: [],
			results: [],
			isLoading: false,
			selectedOption: null,
			selectedValue: null,
			plots: 58,
			installments: 0
		};
	}

	onSelectIncome(option) {
		this.setState({
			isLoading: true
		});

		setTimeout(() => {
			this.setState({
				selectedOption: option
			}, () => {
				this.setState({
					isLoading: false
				});
			});
		}, 600);
	}

	onSelectValue(e) {
		const value = e.target.value;

		this.setState({
			selectedValue: value
		});
	}

	onGetResults() {
		const { dispatch } = this.props,
					{ selectedValue, plots } = this.state;

		this.setState({
			isLoading: true
		});

		dispatch(fetchData({
			url: '/results/',
			key: 'results',
			mock: results
		})).then(res => this.setState({
			results,
			installments: Math.floor(selectedValue / plots),
			isLoading: false
		}));
	}

	getIncomeOptions() {
		const { dispatch } = this.props;

		this.setState({
			isLoading: true
		});

		return dispatch(fetchData({
			url: '/income-options/',
			key: 'income-options',
			mock: options
		})).then(res => this.setState({
			options,
			isLoading: false
		}));
	}

	componentDidMount() {
		this.getIncomeOptions();
	}

	render() {
		const {
			options,
			results,
			selectedOption,
			selectedValue,
			installments,
			plots,
			isLoading,
		} = this.state;

		const isIncomeStepActive = !isLoading && !selectedOption,
					isValueStepActive = !isLoading && selectedOption && !results.length,
					isResultStepActive = !!(results && results.length);

		return (
			<Loans
				isIncomeStepActive={isIncomeStepActive}
				isValueStepActive={isValueStepActive}
				isResultStepActive={isResultStepActive}
				options={options}
				results={results}
				selectedOption={selectedOption}
				selectedValue={selectedValue}
				onSelectIncome={this.onSelectIncome}
				onSelectValue={this.onSelectValue}
				onGetResults={this.onGetResults}
				installments={installments}
				plots={plots}
				isLoading={isLoading}
			/>
		);
	}
};

export default connect()(LoansContainer);
