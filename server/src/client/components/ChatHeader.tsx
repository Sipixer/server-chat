import { User, BookOpen } from "lucide-react";
import type React from "react";
import { Link } from "react-router-dom";

interface ChatHeaderProps {
	username: string;
	serverId: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
	username,
	serverId,
}) => (
	<header className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
		<div className="max-w-6xl mx-auto flex flex-wrap items-center gap-x-6 gap-y-2 justify-center md:justify-between">
			<h1 className="text-2xl font-bold text-gray-800 w-full md:w-auto text-center md:text-left">
				Chat
			</h1>
			{serverId && (
				<div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg w-full md:w-auto text-center md:text-left">
					ID du serveur: {serverId}
				</div>
			)}
			<div className="flex items-center gap-3">
				<Link
					to="/letsencrypt-guide"
					className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
					title="Guide Let's Encrypt"
				>
					<BookOpen className="w-5 h-5" />
					<span className="hidden sm:inline">Guide SSL</span>
				</Link>
				<div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl">
					<User className="w-5 h-5 text-blue-500" />
					<span className="text-gray-700 font-medium">{username}</span>
				</div>
			</div>
		</div>
	</header>
);
