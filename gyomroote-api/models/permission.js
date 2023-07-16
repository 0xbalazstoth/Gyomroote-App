const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoleSchema = Schema(
	{
		name: { type: String, required: true },
		permissionId: { type: String, required: true, unique: true },
		actions: {
			type: [String],
			enum: ["read", "write", "delete", "update", "all"],
			default: "read",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Permission", RoleSchema);
