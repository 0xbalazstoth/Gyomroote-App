"use strict";
const DBMixin = require("../mixins/db.mixin");
const Contact = require("../models/contact");
const bcrypt = require("bcrypt");
const hat = require("hat");
const AuthenticationMixin = require("../mixins/authentication.mixin");

module.exports = {
	name: "admin.contacts",
	mixins: [DBMixin("contacts"), AuthenticationMixin],
	model: Contact,
	settings: {
	},

    actions: {
		count: false,
		remove: false,
		insert: false,
		find: false,

		create: {
			rest: {
				method: "POST",
				fullPath: "/admin/contacts",
				path: "/contacts",
			},
			params: {
				contact: {
					type: "object",
				},
			},

			async handler(ctx) {
				const contact = new Contact(ctx.params.contact);

                try
                {
                    await contact.save();
                    
                    const response = await this.transformDocuments(ctx, {}, contact);
                    return response;
                }
                catch (err)
                {
                    console.error(err);
                }
			},
		},
    },
};
