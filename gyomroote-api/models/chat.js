const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = Schema(
	{
		room: { type: String, required: true },
		messages: { type: [Object], default: [] },
		users: { type: [String], default: [] },
		activeUsers: { type: [Object], default: [] },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Chat", ChatSchema);
