import Step from 'components/Loans/Step/';

const byEachResult = ({ selectedValue, installments, plots }) => ({ name, value }, index) => {
	return (
		<button className="single-result">
			<div className="icon">{index + 1}</div>
			<h3 className="title">{name}</h3>
			<div className="result">
				<strong className="label">Total do Empréstimo</strong>
				<p className="value">{selectedValue}</p>
			</div>
			<div className="result">
				<strong className="label">Parcelas</strong>
				<p className="value">{plots}x de R$ {installments}</p>
			</div>
		</button>
	);
};

const ResultsList = ({ results, selectedValue, installments, plots }) => {
	return (
		<div className="results">
			{ results.map(byEachResult({ selectedValue, installments, plots })) }
		</div>
	);
};

const ResultsStep = ({ results, selectedValue, isActive, installments, plots }) => {
	return (
		<Step
			name="results"
			title="Pronto, escolha a melhor opção pra você!"
			isActive={isActive}>

			<ResultsList
				installments={installments}
				plots={plots}
				selectedValue={selectedValue}
				results={results}
			/>
		</Step>
	);
};

export default ResultsStep;
