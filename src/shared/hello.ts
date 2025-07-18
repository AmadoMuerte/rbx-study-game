import { TextChatService } from "@rbxts/services";

export const systemHello = () => {
	wait(2);
	const chat = TextChatService.FindFirstChildOfClass("TextChannel");

	if (chat) {
		chat.DisplaySystemMessage("Welcome on the place nigger!!!");
	} else {
		print("chat is not defined");
	}
};
