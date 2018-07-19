const { run } = require('runjs');

const config = require('../config');;

const {
	dest
} = config;

function clean() {
	return run(`find ${dest} ! \\( -name 'download' -o -name '.gitkeep' -o -name 'build' -o -name 'icons' -o -name 'fonts' -o -name 'images' \\) ! -path '*/icons/*' ! -path '*/images/*' -exec rm -rf {} +`);
}

module.exports = clean;
