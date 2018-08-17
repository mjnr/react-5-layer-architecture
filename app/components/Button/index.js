import './Button.styl';

const Button = ({ children, ...rest }) => {
	return (
		<button className="button" {...rest}>{children}</button>
	);
};

export default Button;
