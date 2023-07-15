const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapSchema = Schema(
	{
		name: { type: String, required: true },
		coords: {
			type: Object,
			latitude: {
				type: String,
				default: "47.4187332322783",
			},
			longitude: {
				type: String,
				default: "19.38967533994398",
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Map", MapSchema);
