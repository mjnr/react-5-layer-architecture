const Loader = ({ isLoading }) => {
	if (!isLoading) return null;

	return (
		<div>Carregando...</div>
	);
};

export default Loader;
