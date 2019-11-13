function unPack(packed) {
	let unpacked;

	// env gets used below in the eval
	const env = { // eslint-disable-line no-unused-vars
		eval: code => {
			unpacked = code;
		},
		window: {},
		document: {}
	};
		
	eval(`with(env) {${packed}}`);

	return unpacked;
} 


module.exports = {
	unPack
};