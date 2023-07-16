"use strict";
const DBMixin = require("../mixins/db.mixin");
const Permission = require("../models/permission");
const User = require("../models/user");
const DuplicateError = require("../exceptions/duplicate.error");
const NotExistsError = require("../exceptions/notExists.error");

module.exports = {
	name: "admin.permissions",
	mixins: [DBMixin("permissions")],
	model: Permission,
	settings: {},

	actions: {
		count: false,
		insert: false,
		find: false,
		list: false,
		update: false,
		create: false,

		assignPermissionsToUser: {
			auth: true,
			rest: {
				method: "POST",
				fullPath: "/admin/permissions/assign",
				path: "/permissions/assign",
			},

			params: {
				userId: { type: "string" },
				permissionIds: { type: "array" },
			},

			async handler(ctx) {
				try {
					if (ctx.params) {
						const user = await User.findById(ctx.params.userId);

						if (!user) {
							throw new NotExistsError("User not found!");
						}

						const permissionIds = ctx.params.permissionIds; // Assuming permissionIds is an array of permission IDs

						const existingPermissions = user.permissions.map((p) =>
							p.toString()
						);

						const permissions = await Permission.find({
							_id: { $in: permissionIds },
						});

						const newPermissions = permissions
							.filter(
								(permission) =>
									!existingPermissions.includes(
										permission._id.toString()
									)
							)
							.map((permission) => permission._id);

						user.permissions.push(...newPermissions);

						await user.save();
					}
				} catch (error) {
					console.log(error);
					throw error;
				}
			},
		},

		createPermission: {
			auth: true,
			rest: {
				method: "POST",
				fullPath: "/admin/permissions",
				path: "/permissions",
			},
			params: {
				name: { type: "string" },
				permissionId: { type: "string" },
				actions: {
					type: "array",
				},
			},

			async handler(ctx) {
				try {
					if (!ctx.params) {
						throw new Error("Missing parameters!");
					}

					const permission = new Permission(ctx.params);

					await permission.save();

					const response = await this.transformDocuments(
						ctx,
						{},
						permission
					);
					return response;
				} catch (err) {
					throw new DuplicateError("Permission already exists!");
				}
			},
		},

		updatePermission: {
			auth: true,

			rest: {
				method: "PUT",
				fullPath: "/admin/permissions/:id",
				path: "/permissions/:id",
			},

			async handler(ctx) {
				// console.log(ctx.action.permissionActionType);

				try {
					if (!ctx.params) {
						throw new Error("Missing parameters!");
					}

					const permission = await Permission.findByIdAndUpdate(
						ctx.params.id,
						ctx.params,
						{
							new: true,
						}
					);

					const response = await this.transformDocuments(
						ctx,
						{},
						permission
					);
					return response;
				} catch (err) {
					throw new NotExistsError("Permission does not exist!");
				}
			},
		},

		listPermissions: {
			auth: true,
			rest: {
				method: "GET",
				fullPath: "/admin/permissions",
				path: "/permissions",
			},

			async handler(ctx) {
				try {
					const permissions = await Permission.find();

					const response = await this.transformDocuments(
						ctx,
						{},
						permissions
					);
					return response;
				} catch (err) {
					throw new NotExistsError("Permission does not exist!");
				}
			},
		},
	},

	methods: {},
};
