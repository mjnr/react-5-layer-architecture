import './AppLayout.styl';

const AppLayout = ({ children }) => (
	<div className="app-layout">
		<main className="main-content">
			{ children }
		</main>
	</div>
);

export default AppLayout;
