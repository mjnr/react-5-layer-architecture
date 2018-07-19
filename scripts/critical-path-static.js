const critical = require('critical');
const path = require('path');
const { ROOT_PATH } = require(path.resolve('./currentApp.json'));
const createPageNames = require(path.resolve('./app/utils/createPageNames'));
const pageNames = createPageNames(ROOT_PATH);

const generate = (pages) => {

	const { path, name } = pages.shift();

	critical.generate({
		inline: true,
		minify: true,
		extract: false,
		base: 'build/',
		src: `.${path}/index.html`,
		dest: `.${path}/index.html`,
		width: 1920,
		height: 1080,
		forceInclude: [
			'#icons',
			'.side-section',
			'.hero-simulator'
		],
		css: `build/${ROOT_PATH}/styles/main.css`,
		ignore: [/url\(/,'@font-face',/print/,/\[]/]
	}).then( () => {
		console.log(`Generated ${name} critical path`);

		if (pages.length) {
			generate(pages);
		} else {
			console.log('Critical path generator finished!');
			return true;
		}
	}).catch(e => console.log(e))
}

const start = () => {
	const pages = Object.keys(pageNames).map(key => pageNames[key]);

	return generate(pages);
}

start();
