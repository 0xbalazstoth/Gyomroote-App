"use strict";
const DBMixin = require("../mixins/db.mixin");
const AdminUser = require("../models/adminUser");
const bcrypt = require("bcrypt");
const hat = require("hat");
const AuthenticationMixin = require("../mixins/authentication.mixin");

module.exports = {
	name: "admin.users",
	mixins: [DBMixin("adminUsers"), AuthenticationMixin],
	model: AdminUser,
	settings: {
		entityValidator: {
			email: { type: "email" },
			password: { type: "string"},
			firstName: { type: "string"},
			lastName: { type: "string"},
		},
	},

    actions: {
		count: false,
		remove: false,
		insert: false,
		find: false,

		create: {
			params: {
				adminUser: {
					type: "object",
				},
			},

			async handler(ctx) {
				const adminUser = new AdminUser(ctx.params.adminUser);
				await this.validateEntity(adminUser);
				adminUser.password = bcrypt.hashSync(adminUser.password, 10);
				adminUser.apiKeys.push({
					token: hat(256),
					deviceId: hat(), // TODO: get device id from request
				});

				try
				{
					await adminUser.save();
				} catch (err) {
					console.error(err);
				}
				return adminUser;
			},
		},

		test: {
			//auth: false,
			handler() {
				return {result: "ok"};
			},
		},
    },

	// methods: {
	// 	async initializeAdminUser() {
	// 		const count = await this.adapter.count();
			
	// 		if (count === 0) {
	// 			this.broker.call('admin.users.create', {
	// 				adminUser: {
	// 					email: process.env.ADMIN_USER_EMAIL,
	// 					password: process.env.ADMIN_USER_PASSWORD,
	// 					firstName: "Default",
	// 					lastName: "Admin",
	// 				},
	// 			});
	// 		}
	// 	},
	// },

	// started() {
	// 	if (process.env.ENV === "dev")
	// 	{
	// 		this.initializeAdminUser();
	// 	}
	// },
};
