const { run } = require('runjs');

const config = require('../config');;

const {
	dest,
	fonts
} = config;

const clean = require('./clean');
const create = require('./create');

function reset() {
	clean();
	create();
}

module.exports = reset;
