"use strict";
const DBMixin = require("../mixins/db.mixin");
const Map = require("../models/map");
const AuthenticationMixin = require("../mixins/authentication.mixin");

module.exports = {
	name: "admin.maps",
	mixins: [DBMixin("maps")],
	model: Map,

	settings: {},

	actions: {
		count: false,
		remove: false,
		insert: false,
		find: false,

		create: {
			auth: true,
			rest: {
				method: "POST",
				fullPath: "/admin/maps",
				path: "/maps",
			},

			params: {
				name: { type: "string" },
				coords: {
					type: "object",
					latitude: { type: "string" },
					longitude: { type: "string" },
				},
			},

			async handler(ctx) {
				try {
					if (!ctx.params) {
						throw new Error("Missing parameters!");
					}

					const map = new Map(ctx.params);

					await map.save();

					const response = await this.transformDocuments(
						ctx,
						{},
						map
					);

					return response;
				} catch (err) {
					console.error(err);
				}
			},
		},
	},

	methods: {},
};
