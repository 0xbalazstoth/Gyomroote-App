const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermissionSchema = Schema(
	{
		name: { type: String, required: true, unique: true },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Permission", PermissionSchema);
