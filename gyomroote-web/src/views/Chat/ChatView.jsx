import React from "react";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "../components/Chat";

const socket = io.connect("http://localhost:3001");

const ChatView = () => {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [showChat, setShowChat] = useState(false);

	const joinRoom = () => {
		if (username !== "" && room !== "") {
			const data = {
				username: username,
				room: room,
			};

			socket.emit("join_room", data);
			setShowChat(true);
		}
	};

	const handleShowChatChange = (value) => {
		setShowChat(value);
	};

	return (
		<div>
			{!showChat ? (
				<div className="joinChatContainer">
					<h3>Csatlakozás</h3>
					<input
						type="text"
						placeholder="Név"
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="Szoba"
						onChange={(event) => {
							setRoom(event.target.value);
						}}
					/>
					<button onClick={joinRoom}>Csatlakozás</button>
				</div>
			) : (
				<Chat
					socket={socket}
					username={username}
					room={room}
					showChat={showChat}
					setShowChat={handleShowChatChange}
				/>
			)}
		</div>
	);
};

export default ChatView;
