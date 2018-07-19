const config = {
	"app": "app/",
	"dev": "static/",
	"dest": "build/",
	"styles": {
		"dev": "app/styles/",
		"dest": "build/styles/"
	},
	"fonts": {
		"dev": "static/fonts/",
		"dest": "build/fonts/"
	},
	"scripts": {
		"dev": "app/",
		"dest": "build/scripts/",
		"publicPath": "scripts/"
	},
	"images": {
		"dev": "static/images",
		"publicPath": "static/images/logo.png",
		"dest": "build/images/"
	},
	"webpack": {
		"clientLocalConfig": "webpack/dev.config.js",
		"clientProdConfig": "webpack/prod.config.js",
		"staticConfig": "webpack/static.config.js"
	}
};

module.exports = config;
