import { Component } from 'react';
import { options, results } from './mock';
import { fetchData } from 'ducks/requests';
import { connect } from 'react-redux';

import './Loans.styl';

class Loans extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options: [],
			results: [],
			isLoading: false,
			selectedOption: null,
			selectedValue: null
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
		const { dispatch } = this.props;

		this.setState({
			isLoading: true
		});

		dispatch(fetchData({
			url: '/results/',
			key: 'results',
			mock: results
		})).then(res => this.setState({
			results,
			isLoading: false
		}));
	}

	componentDidMount() {
		const { dispatch } = this.props;

		this.setState({
			isLoading: true
		});

		dispatch(fetchData({
			url: '/income-options/',
			key: 'income-options',
			mock: options
		})).then(res => this.setState({
			options,
			isLoading: false
		}));
	}

	render() {
		const {
			options,
			results,
			selectedOption,
			selectedValue,
			isLoading
		} = this.state;

		return (
			<div className="loans-wrapper">
				<h1 className="title">Você precisa de um empréstimo?</h1>
				{ isLoading &&
					<div>Carregando...</div>
				}

				{ !isLoading && !selectedOption &&
					<div className="step" data-step="income">
						<h2 className="subtitle">Me diga sua renda!</h2>
						<ul className="options">
							{
								options.map(({ value, text }, index) => {
									return (
										<li className="single-option">
											<a onClick={() => this.onSelectIncome(value)} href="#">{text}</a>
										</li>
									);
								})
							}
						</ul>
					</div>
				}
				{
					!isLoading && selectedOption && !results.length &&
					<div className="step" data-step="value">
						<h2 className="subtitle">De quanto você precisa?</h2>
						<div className="field value">
							<div className="input-wrapper">
								<input
									onChange={this.onSelectValue.bind(this)}
									for="loan-value"
									type="text"
									className="input"
								/>
							</div>
							<button onClick={this.onGetResults.bind(this)} className="button">Calcular</button>
						</div>
					</div>
				}
				{
					!!results.length &&
					<div className="step" data-step="results">
						<h2 className="subtitle">Pronto, escolha a melhor opção pra você!</h2>
						<div className="results">
							{
								results.map(({ name, value }, index) => {
									return (
										<button className="single-result">
											<div className="icon">{index + 1}</div>
											<h3 className="title">{name}</h3>
											<div className="result">
												<strong className="label">Total do Empréstimo</strong>
												<p className="value">R$ {selectedValue}</p>
											</div>
											<div className="result">
												<strong className="label">Parcelas</strong>
												<p className="value">48x de R$ {Math.floor(selectedValue / 48)}</p>
											</div>
										</button>
									);
								})
							}
						</div>
					</div>
				}
			</div>
		);
	}
};

export default connect()(Loans);
