"use strict";
const SocketIOService = require("moleculer-io");
const DBMixin = require("../mixins/db.mixin");
const Chat = require("../models/chat");

module.exports = {
	name: "chat",
	mixins: [DBMixin("chats"), SocketIOService],
	model: Chat,
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

	actions: {
		getMessagesByUsernameInRoom: {
			params: {
				username: { type: "string" },
				room: { type: "string" },
			},

			async handler(ctx) {
				// Get messages by username in room
				const chat = await Chat.findOne({});
			},
		},
	},

	methods: {},

	async started() {
		// On connection
		this.io.on("connection", (socket) => {
			console.log(`Socket '${socket.id}' connected.`);

			// Join room
			socket.on("join_room", (data) => {
				socket.join(data.room);

				// Add user to room
				Chat.findOne({ room: data.room }).then((chat) => {
					if (!chat) {
						chat = new Chat({
							room: data.room,
							users: [data.username],
							activeUsers: [
								{
									username: data.username,
									socketId: socket.id,
								},
							],
						});
					} else {
						// Check if user is already in room
						if (!chat.users.includes(data.username)) {
							chat.users.push(data.username);
						}

						// Check if user is already active in room
						if (!chat.activeUsers.includes(data.username)) {
							chat.activeUsers.push({
								username: data.username,
								socketId: socket.id,
							});
						}
					}

					chat.save();
				});

				console.log(`Socket '${socket.id}' joined room'.`);
				console.log(data);
			});

			// Leaving room
			socket.on("leave_room", (data) => {
				socket.leave(data.room);

				// Remove user from room
				Chat.findOne({ room: data.room }).then((chat) => {
					if (!chat) {
						return;
					}

					chat.users = chat.users.filter(
						(user) => user !== data.username
					);

					chat.save();
				});

				console.log(`Socket '${socket.id}' left room'.`);

				console.log(data);
			});

			// Sending message
			socket.on("send_message", (data) => {
				console.log(
					`Socket '${socket.id}' sent message to room '${data.room}'.`
				);

				console.log(data);

				socket.to(data.room).emit("receive_message", data);

				// Add message to room
				Chat.findOne({ room: data.room }).then((chat) => {
					if (!chat) {
						chat = new Chat({
							room: data.room,
							messages: [data],
						});
					} else {
						chat.messages.push(data);
					}

					chat.save();
				});
			});

			// Disconnect
			socket.on("disconnect", () => {
				console.log(`Socket '${socket.id}' disconnected.`);

				// Remove user from room (activeUser)
				Chat.findOne({ "activeUsers.socketId": socket.id }).then(
					(chat) => {
						if (!chat) {
							return;
						}

						chat.activeUsers = chat.activeUsers.filter(
							(user) => user.socketId !== socket.id
						);

						chat.save();
					}
				);
			});
		});
	},
};
