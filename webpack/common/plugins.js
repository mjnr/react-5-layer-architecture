module.exports = (env) => {
	let common = [
		'transform-object-assign',
		'transform-object-rest-spread',
		'babel-plugin-array-includes',
		'transform-array-find'
	]
	if (!env.local) {
		common.push('transform-react-inline-elements');
	}
	return common;
}
