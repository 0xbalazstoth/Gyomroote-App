"use strict";
const DBMixin = require("../mixins/db.mixin");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const hat = require("hat");
const AuthenticationMixin = require("../mixins/authentication.mixin");

module.exports = {
	name: "users",
	mixins: [DBMixin("users"), AuthenticationMixin],
	model: User,
	settings: {
        fields: [
            '_id', 'email', 'firstName', 'lastName', 'bio'
        ],
		entityValidator: {
			email: { type: "email" },
			password: { type: "string"},
			firstName: { type: "string"},
			lastName: { type: "string"},
            bio: {type: "string", optional: true},
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
            auth: false,
			params: {
				user: {
					type: "object",
				},
			},

			async handler(ctx) {
				const user = new User(ctx.params.user);
				await this.validateEntity(user);
				user.password = bcrypt.hashSync(user.password, 10);
				user.apiKeys.push({
					token: hat(256),
					deviceId: hat(), // TODO: get device id from request
				});

				try
				{
					await user.save();
				} catch (err) {
					console.error(`HIBA: ${err}`);
				}

                const response = await this.transformDocuments(ctx, {}, user);
                response.apiKey = user.apiKeys;
                return response;
			},
		},

        /**
         * Get current user entity with API key
         * @actions
         * @returns {Object} - Authenticated user profile
         */
        me: {
            rest: {
                method: "GET",
                path: "/me",
            },
            async handler(ctx) {
                return this.transformDocuments(ctx, {}, ctx.meta.user);
            },
        },
    },

	methods: {

	}
};
