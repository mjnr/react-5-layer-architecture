import Button from 'components/Button/';
import Step from 'components/Loans/Step/';

const ValueStep = ({ onSelectValue, onGetResults, isActive }) => {
	return (
		<Step
			name="value"
			title="De quanto você precisa?"
			isActive={isActive}>
			<div className="field value">
				<div className="input-wrapper">
					<input
						className="input"
						onChange={onSelectValue}
						for="loan-value"
						type="text"
					/>
				</div>
				<Button onClick={onGetResults}>Calcular</Button>
			</div>
		</Step>
	);
};

export default ValueStep;
