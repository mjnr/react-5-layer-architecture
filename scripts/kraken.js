const Kraken = require('kraken');
const path = require('path');
const http = require('https');
const glob = require('glob');
const fs = require('fs');
const	conf = require('../config');

const imagesDevDir = path.resolve(__dirname, '..', conf.images.dev);
const imagesDestDir = path.resolve(__dirname, '..', conf.images.dest);

const compressedImages = fs.readdirSync(imagesDestDir);

const kraken = new Kraken({
	'api_key': '16b02ba654479da158eba8eb620cab6e',
	'api_secret': '0154f95e70c2e018fac3cf7579c01749346be7b5'
});

glob(`${imagesDevDir}/*.{jpeg,jpg,gif,png}`, (err, allImages) => {
	if (err) {
		console.log('Error on images glob', err);
		return;
	}

	if (allImages.length === 0) {
		console.log('No new images to be compressed');
		return ;
	}

	console.log('Compressing images');
	const promises = allImages.map(file => new Promise((resolve, reject) => {
		let params = {
			file,
			wait: true
		};

		kraken.upload(params, (status) => {
			if (status.success) {
        console.log('Success. Optimized image URL: %s', status.kraked_url);
				resolve(status);
			} else {
        console.log('Fail. Error message: %s', status.message);
				console.log('Error Params', params);
				console.log('Error Object', status);
				reject(status);
			}
		})
	}));

	const onCompressImages = (results) => {
		results.forEach((result) => {
			const { file_name, kraked_url } = result,
				filePath = `${imagesDestDir}/${file_name}`,
				fileDevPath = `${imagesDevDir}/${file_name}`,
				file = fs.createWriteStream(filePath),
				request = http.get(kraked_url, (res) => {
				res.pipe(file);
				file.on('finish', () => {
					console.log('Saved file %s', file_name);
					file.close();
					fs.unlinkSync(fileDevPath);
					console.log('Deleted src file %s', file_name);
				});
			}).on('error', (err) => {
				fs.unlink(filePath);
				console.log('Error on downloading file, %s \n %s', file_name, kraked_url);
				console.log('Error: ', err);
			});
		})
	}

	Promise.all(promises)
		.then(onCompressImages)
		.catch(r => {
			console.log('Error on upload image');
			console.log(r);
		});
})

// Coping svgs, not compressing yet TODO: Find a svg optimizor
glob(`${imagesDevDir}/*.svg`, (err, svgs) => {
	if (err) {
		console.log('Error on svg glob: ', err);
		return;
	}

	if (svgs.length === 0) {
		console.log('No new svgs to be compressed');
		return ;
	}

	console.log('Compressing SVGs');
	svgs.forEach( file => {
		let destFile = file.replace(imagesDevDir, imagesDestDir);
		console.log('Compressing File: ', destFile);
		let readStream = fs.createReadStream(file)
			.pipe(fs.createWriteStream(destFile));

		readStream.on('error', (err) => {
			console.log('Read stream error', err);
			process.exit(1);
		});

		readStream.on('close', () => {
			fs.unlinkSync(file);
		});

	})
	console.log('%s SVG compressed', svgs.length);
})
