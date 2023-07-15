"use strict";
const SocketIOService = require("moleculer-io");
const DBMixin = require("../mixins/db.mixin");

module.exports = {
	name: "chat",
	mixins: [SocketIOService],
	settings: {
		cors: {
			origin: "*",
			methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
			allowedHeaders: ["Content-Type", "api-key"],
			exposedHeaders: [],
			credentials: false,
			maxAge: 3600,
		},
		port: 3001,
	},

	// actions: {
	// 	join(ctx) {
	// 		ctx.meta.$join = ctx.params.room;
	// 	},
	// 	leave(ctx) {
	// 		ctx.meta.$leave = ctx.params.room;
	// 	},
	// 	list(ctx) {
	// 		return ctx.meta.$rooms;
	// 	},
	// },

	methods: {},

	async started() {
		// On connection
		this.io.on("connection", (socket) => {
			console.log(`Socket '${socket.id}' connected.`);

			socket.on("join_room", (data) => {
				socket.join(data);
				console.log(`Socket '${socket.id}' joined room '${data}'.`);
			});

			socket.on("leave_room", (data) => {
				socket.leave(data);
				console.log(`Socket '${socket.id}' left room '${data}'.`);
			});

			socket.on("send_message", (data) => {
				console.log(
					`Socket '${socket.id}' sent message to room '${data.room}'.`
				);

				console.log(data);

				socket.to(data.room).emit("receive_message", data);
			});

			// Disconnect
			socket.on("disconnect", () => {
				console.log(`Socket '${socket.id}' disconnected.`);
			});
		});
	},
};
