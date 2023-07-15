const { MoleculerError } = require("moleculer").Errors;

class NoFeedError extends MoleculerError {
	constructor(msg, data) {
		super(msg || `No feed found!`, 404, "NO_FEED", data);
	}
}

module.exports = NoFeedError;
