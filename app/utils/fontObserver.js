import FontFaceObserver from 'fontfaceobserver';

const fontObserver = (fonts = []) => {

const asyncFonts = fonts.map(font => {
		const { name } = font;
		return new FontFaceObserver(name, { ...font }).load();
});

Promise.all(asyncFonts)
	.then(() => document.body.classList.add('fonts-loaded'));
}

export default fontObserver
