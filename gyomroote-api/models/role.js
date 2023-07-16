const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = Schema(
	{
		name: { type: String, required: true },
		roleId: { type: String, required: true, default: "user" },
		permissions: { type: [String], default: ["read"] },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Permission", RoleSchema);
