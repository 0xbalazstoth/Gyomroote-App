"use strict";
const PermissionActionTypes = require("../enums/permissionActionTypes.enum");
const DBMixin = require("../mixins/db.mixin");
const Assignment = require("../models/assignment");
const User = require("../models/user");
const AlreadySetError = require("../exceptions/alreadySet.error");
const NotExistsError = require("../exceptions/notExists.error");

module.exports = {
	name: "admin.assignments",
	mixins: [DBMixin("assignments")],
	model: Assignment,

	settings: {},

	actions: {
		count: false,
		remove: false,
		insert: false,
		find: false,

		createAssignment: {
			auth: true,
			rest: {
				method: "POST",
				fullPath: "/admin/assignments",
				path: "/assignments",
			},

			params: {
				name: { type: "string" },
			},

			async handler(ctx) {
				try {
					if (!ctx.params) {
						throw new Error("Missing parameters!");
					}

					const assignment = new Assignment(ctx.params);

					await assignment.save();

					const response = await this.transformDocuments(
						ctx,
						{},
						assignment
					);

					return response;
				} catch (err) {
					console.error(err);
				}
			},
		},

		updateAssignments: {
			auth: true,
			PermissionActionTypes: [PermissionActionTypes.UPDATE],
			rest: {
				method: "PUT",
				fullPath: "/admin/assignments/:id",
				path: "/assignments/:id",
			},
			async handler(ctx) {
				try {
					const assignments = await Assignment.find();

					const response = await this.transformDocuments(
						ctx,
						{},
						assignments
					);

					return response;
				} catch (err) {
					console.error(err);
				}
			},
		},

		listAssignments: {
			auth: true,
			PermissionActionTypes: [PermissionActionTypes.READ],
			rest: {
				method: "GET",
				fullPath: "/admin/assignments",
				path: "/assignments",
			},
			async handler(ctx) {
				try {
					const assignments = await Assignment.find();

					const response = await this.transformDocuments(
						ctx,
						{},
						assignments
					);

					return response;
				} catch (err) {
					console.error(err);
				}
			},
		},

		setAssignmentToUserById: {
			auth: true,
			PermissionActionTypes: [PermissionActionTypes.UPDATE],
			rest: {
				method: "POST",
				fullPath: "/admin/assignments/set-assignment-to-user/",
				path: "/assignments/set-assignment-to-user/",
			},
			params: {
				id: { type: "string" },
				userId: { type: "string" },
			},
			async handler(ctx) {
				try {
					const assignment = await Assignment.findById(ctx.params.id);
					const user = await User.findById(ctx.params.userId);

					if (!assignment || !user) {
						throw new NotExistsError(
							"Assignment or user not exists!"
						);
					}

					if (user.assignmentId == assignment.assignmentId) {
						throw new AlreadySetError("Assignment already set!");
					} else {
						user.assignmentId = assignment.assignmentId;

						await user.save();

						return {
							message: "Assignment set to user successfully!",
							assignment: assignment.name,
						};
					}
				} catch (err) {
					throw err;
				}
			},
		},
	},

	methods: {},
};
