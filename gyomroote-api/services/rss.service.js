"use strict";
let Parser = require("rss-parser");
let parser = new Parser();
const NoFeedError = require("../exceptions/noFeed.error");

module.exports = {
	name: "rss",
	mixins: [],
	settings: {},

	actions: {
		count: false,
		remove: false,
		insert: false,
		find: false,

		feed: {
			auth: false,
			method: "POST",
			path: "/feed",
			params: {
				url: {
					type: "string",
				},
			},
			async handler(ctx) {
				if (!ctx.params.url) {
					throw new NoFeedError();
				}

				let feed = await parser.parseURL(ctx.params.url);
				return feed;
			},
		},
	},

	methods: {},
};
