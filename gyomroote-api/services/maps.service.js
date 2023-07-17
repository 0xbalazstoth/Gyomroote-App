"use strict";
const PermissionActionTypes = require("../enums/permissionActionTypes.enum");
const DBMixin = require("../mixins/db.mixin");
const Map = require("../models/map");

module.exports = {
	name: "maps",
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

		updateMaps: {
			auth: true,
			permissionActionType: PermissionActionTypes.UPDATE,
			rest: {
				method: "PUT",
				fullPath: "/api/maps/:id",
				path: "/maps/:id",
			},

			async handler(ctx) {
				try {
					if (!ctx.params) {
						throw new Error("Missing parameters!");
					}

					const map = await Map.findById(ctx.params.id);

					if (!map) {
						throw new Error("Map not found!");
					}

					map.name = ctx.params.name;
					map.coords = ctx.params.coords;

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
