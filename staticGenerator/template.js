const template = ({
	markup,
	currentState,
	options,
	hash
}) => {
	return `
		<!doctype html>
			<html lang="pt-br">
				<head>
					<title>${options.title}</title>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
					<meta content="ie=edge" http-equiv="x-ua-compatible">
					<meta name="robots" content="noindex, nofollow">
					<link href="https://fonts.googleapis.com/css?family=Poppins:400,700" rel="stylesheet">
					<link rel="stylesheet" href="${options.rootPath}styles/main.css?v=${hash}">
			</head>
			<body>
				<div id="react-view"><div>${markup}</div></div>
				<script>
					window.pageName = "";
					window.pageCategory = "";
				</script>
				<script>
					window.__STATE__ = ${JSON.stringify(currentState)}
				</script>
				<script src="${options.rootPath}scripts/bundle.vendor.js?v=${hash}" defer></script>
				<script src="${options.rootPath}scripts/bundle.main.js?v=${hash}" defer></script>
			</body>
		</html>
	`;
};

module.exports = template;
