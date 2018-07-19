const applyToConstructor = (constructor, argumentsCollection) => {
	const args = [null].concat(argumentsCollection),
				factoryFunction = constructor.bind.apply(constructor, args);

	return new factoryFunction();
};

module.exports = applyToConstructor;
