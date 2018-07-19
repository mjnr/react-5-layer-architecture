const { run } = require('runjs');

const config = require('../config');;

const {
	dest,
	fonts
} = config;

function create() {
	return run(`cross-conf-env mkdirp ${dest} ${dest}styles/ ${dest}scripts/ ${dest}images/ ${dest}fonts/ && cp -r ${fonts.dev}* ${fonts.dest}`);
}

module.exports = create;
