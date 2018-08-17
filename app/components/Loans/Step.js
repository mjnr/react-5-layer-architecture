const Step = ({ name, title, isActive, children }) => {
	if (!isActive) return null;

	return (
		<div className="step" data-step={name}>
			<h2 className="subtitle">{title}</h2>
			{children}
		</div>
	);
};

export default Step;
