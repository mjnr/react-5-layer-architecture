const { exec } = require('child_process');

global.assetsGotCopied = false;

const copyAssets = (publicDir) => {
	if (global.assetsGotCopied) return null;

	const command = `mv build/images build/scripts build/styles build/fonts build${publicDir}`,
	onCopy = (err, stdout, stdin) => {
		if (err) {
			console.log('Error on copy files!', err);
			process.exit(-1);
			return;
		}

		console.log('Done! Assets got copied!', stdout);
	};

	global.assetsGotCopied = true;

	exec(command, onCopy);
};

const init = (publicDir) => {
	const command = `mkdir -p build${publicDir}`;

	exec(command, (err) => {
		if (err) {
			console.log('Error creating folder, ', publicDir, err);
		}
		console.log('Folder created');
		copyAssets(publicDir)
	})
}


module.exports = init;
