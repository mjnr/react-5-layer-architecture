import Step from 'components/Loans/Step/';

const byEachOption = ({ onSelectIncome }) => ({ value, text }, index) => {
	return (
		<li className="single-option">
			<a onClick={() => onSelectIncome(value)} href="#">{text}</a>
		</li>
	);
};

const IncomeOptions = ({ options, onSelectIncome }) => {
	return (
		<ul className="options">
			{	options.map(byEachOption({ onSelectIncome })) }
		</ul>
	);
};

const IncomeStep = ({ options, onSelectIncome, isActive }) => {
	return (
		<Step
			name="income"
			title="Me diga sua renda!"
			isActive={isActive}>
			<IncomeOptions
				options={options}
				onSelectIncome={onSelectIncome}
			/>
		</Step>
	);
};

export default IncomeStep;
