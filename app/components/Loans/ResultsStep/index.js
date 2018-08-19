import Step from 'components/Loans/Step/';

const byEachResult = ({ selectedValue, installments, plots }) => ({ name, value }) => {
	return (
		<div className="single-result">
			<h3 className="title">{name}</h3>
			<p>Total do Empréstimo: {selectedValue}</p>
			<p>Parcelas: {plots}x de R$ {installments}</p>
		</div>
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
