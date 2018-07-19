const { run } = require('runjs');

function generateCritical() {
	return run("node scripts/critical-path-static.js");
}

module.exports = generateCritical;
