import type { RedisClientType } from "redis";
import type { Server, Socket } from "socket.io";
import { MESSAGE_EXPIRATION, REDIS_KEY } from "../config/redis.js";
import { serverId } from "../routes/api.js";
import {
	decrementActiveSockets,
	incrementActiveSockets,
	incrementChatMessageCount,
} from "../monitoring/metrics.js";

export const handleSocketConnection = (
	socket: Socket,
	io: Server,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	redisClient: RedisClientType<any, any, any>,
) => {
	console.log(`✅ A user connected: ${socket.id}`);
	incrementActiveSockets();

	const handleInitialConnection = async () => {
		const previousMessages = await redisClient.lRange(REDIS_KEY, 0, -1);
		const parsedMessages = previousMessages.map((msg: string) =>
			JSON.parse(msg),
		);
		socket.emit("previous messages", parsedMessages);
		console.log(`📤 Sent previous messages to ${socket.id}`);
	};

	const handleChatMessage = async ({
		username,
		message,
	}: { username: string; message: string }) => {
		const chatMessage = { username, message, timestamp: Date.now(), serverId };
		console.log("📩 Received message:", chatMessage);
		incrementChatMessageCount();

		await redisClient.rPush(REDIS_KEY, JSON.stringify(chatMessage));
		await redisClient.expire(REDIS_KEY, MESSAGE_EXPIRATION);

		io.emit("chat message", chatMessage);
	};

	const handleDisconnect = () => {
		console.log(`❌ User disconnected: ${socket.id}`);
		decrementActiveSockets();
	};

	// Set up event handlers
	handleInitialConnection();
	socket.on("chat message", handleChatMessage);
	socket.on("disconnect", handleDisconnect);
};
