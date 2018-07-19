const createPageNames = (rootUrl) => {
	return {
		RootUrl: {
			path: rootUrl
		},
		home: {
			path: `${rootUrl}home`,
			route: `${rootUrl}home`,
			name: "home",
			category: "home"
		},
		about: {
			path: `${rootUrl}about`,
			route: `${rootUrl}about`,
			name: "about",
			category: "about"
		}
	};
};

module.exports = createPageNames;
