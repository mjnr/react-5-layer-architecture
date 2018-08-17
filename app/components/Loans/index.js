import IncomeStep from './IncomeStep/';
import ValueStep from './ValueStep/';
import ResultsStep from './ResultsStep/';
import Loader from './Loader';

import './Loans.styl';

const Loans = ({
	options,
	results,
	selectedOption,
	selectedValue,
	isLoading,
	onSelectIncome,
	onSelectValue,
	onGetResults,
	isIncomeStepActive,
	isValueStepActive,
	isResultStepActive,
	installments,
	plots
}) => {

	return (
		<div className="loans-wrapper">
			<h1 className="title">Você precisa de um empréstimo?</h1>

			<Loader isLoading={isLoading} />

			<IncomeStep
				isActive={isIncomeStepActive}
				onSelectIncome={onSelectIncome}
				options={options}
			/>

			<ValueStep
				isActive={isValueStepActive}
				onSelectValue={onSelectValue}
				onGetResults={onGetResults}
			/>

			<ResultsStep
				installments={installments}
				plots={plots}
				selectedValue={selectedValue}
				isActive={isResultStepActive}
				results={results}
			/>
		</div>
	);
};

export default Loans;
