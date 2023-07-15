"use strict";
const nodemailer = require("nodemailer");
const vash = require("vash");
const fs = require("fs");

module.exports = {
	name: "emails",
	mixins: [],
	settings: {},
	actions: {
		sendEmail: {
			params: {
				subject: {
					type: "string",
				},
				receivers: {
					type: "string",
				},
				templateName: {
					type: "string",
					optional: true,
				},
				locale: {
					type: "string",
					optional: true,
					default: "en",
				},
				variables: {
					type: "object",
					optional: true,
					default: {},
				},
			},
			async handler(ctx) {
				const template = fs.readFileSync(
					`templates/emails/${ctx.params.locale}/${ctx.params.templateName}.html`,
					"utf-8"
				);
				const tpl = vash.compile(template);
				const contentHTML = tpl(ctx.params.variables);

				const info = await this.mailTransporter.sendMail({
					from: process.env.EMAIL_SENDER_ADDRESS, // sender address
					to: ctx.params.receivers, // list of receivers
					subject: ctx.params.subject, // Subject line
					html: contentHTML, // html body
				});

				console.info("Message sent: %s", info.messageId);
				console.info(
					"Preview URL: %s",
					nodemailer.getTestMessageUrl(info)
				);
			},
		},
	},
	methods: {},

	async created() {
		// GMAIL: https://miracleio.me/snippets/use-gmail-with-nodemailer/
		this.mailTransporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: process.env.SMTP || false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});
	},
};
