import Button from 'components/Button/';
import Step from 'components/Loans/Step/';

const ValueStep = ({ onSelectValue, onGetResults, isActive }) => {
	return (
		<Step
			name="value"
			title="De quanto você precisa?"
			isActive={isActive}>
			<div className="field">
				<input
					onChange={onSelectValue}
					for="loan-value"
					type="text"
				/>
				<Button onClick={onGetResults}>Calcular</Button>
			</div>
		</Step>
	);
};

export default ValueStep;
