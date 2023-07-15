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
			auth: true,
			rest: {
				method: "POST",
				fullPath: "/admin/contacts",
				path: "/contacts",
			},
			params: {
				email: {type: "email", optional: true},
				phone: {type: "string", optional: true},
				address: {type: "string", optional: true},
			},

			async handler(ctx) {
                try
                {
					if (!ctx.params) { // TODO: Check if any of the params are missing
						throw new Error("Missing parameters!");
					}
	
					const contact = new Contact(ctx.params);

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
