"use strict";
const DBMixin = require("../mixins/db.mixin");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const hat = require("hat");
const AuthenticationMixin = require("../mixins/authentication.mixin");
const { MoleculerError } = require("moleculer").Errors;
const UserExistsError = require("../exceptions/userExists.error");
const PermissionActionType = require("../enums/permissionActionTypes.enum");
const jwt = require("jsonwebtoken");
const PermissionActionTypes = require("../enums/permissionActionTypes.enum");

module.exports = {
	name: "users",
	mixins: [DBMixin("users"), AuthenticationMixin],
	model: User,
	settings: {
		fields: ["_id", "email", "firstName", "lastName", "bio", "permissions"],
		entityValidator: {
			email: { type: "email" },
			password: { type: "string" },
			firstName: { type: "string" },
			lastName: { type: "string" },
			bio: { type: "string", optional: true },
		},
	},

	actions: {
		count: false,
		remove: false,
		insert: false,
		find: false,

		/**
		 * Create a new user entity
		 * @actions
		 * @param {Object} user - User entity
		 * @returns {Object} Created entity & API key
		 */
		create: {
			auth: true,
			params: {
				user: {
					type: "object",
				},
			},

			async handler(ctx) {
				const user = new User(ctx.params.user);
				await this.validateEntity(user);
				user.password = bcrypt.hashSync(user.password, 10);

				const token = jwt.sign(
					{ userId: user._id },
					process.env.JWT_SECRET,
					{ expiresIn: process.env.JWT_EXPIRES_IN }
				);

				user.apiKeys.push({
					token,
				});

				try {
					const existingUser = await User.findOne({
						email: user.email,
					});
					if (existingUser) {
						console.error("Email already exists");

						throw new UserExistsError();
					} else {
						await user.save();

						const response = await this.transformDocuments(
							ctx,
							{},
							user
						);
						response.apiKey = user.apiKeys;
						return response;
					}
				} catch (err) {
					if (err instanceof MoleculerError) {
						throw err;
					}
				}
			},
		},

		/**
		 * Get current user entity with API key
		 * @actions
		 * @returns {Object} - Authenticated user profile
		 */
		me: {
			rest: "GET /me",
			permissionActionType: PermissionActionTypes.READ,
			async handler(ctx) {
				return this.transformDocuments(ctx, {}, ctx.meta.user);
			},
		},
	},

	methods: {},
};
