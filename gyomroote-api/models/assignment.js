const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentSchema = Schema({
	name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
