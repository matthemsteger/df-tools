export default function getMeta() {
	return {};
}

/**
 * One thing to add here is the modeler
 * it gets a token name, and then will create
 * a new modeler on this object
 * The modeler will be a creator that takes in the needed
 * context to create a model (since we do not have that here)
 * The model will handle giving back a clean value
 * and also (in the future) handle writes back
 * create context from all parses
 * modeler is what the context uses (exists at all levels)
 * levels -> file, object, token
 */
