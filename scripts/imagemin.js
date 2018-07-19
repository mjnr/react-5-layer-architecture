'use strict';

const imagemin = require('imagemin'),
	imageminJpegtran = require('imagemin-jpegtran'),
	imageminPngquant = require('imagemin-pngquant'),
	imageminSvgo = require('imagemin-svgo'),
	path = require('path'),
	glob = require('glob'),
	conf = require('../config'),
	paths = {
		dist: path.resolve(conf.images.dest),
		dev: path.resolve(conf.images.dev)
	};

function optimizeImages(err, files) {
	if (err) throw err;

	files.forEach((file) => {
		const folder = path.dirname(file).replace(paths.dev.split('/*').shift(), paths.dist);

		imagemin([file], folder, {
		    plugins: [
		        imageminJpegtran(),
		        imageminPngquant({quality: '65-80'}),
		        imageminSvgo({ plugins: [{ removeUselessDefs: false }, { cleanupIDs: false }] })
		    ]
		});
	});

	console.log(`${files.length} minified images.`);
}

glob(paths.dev, optimizeImages);
