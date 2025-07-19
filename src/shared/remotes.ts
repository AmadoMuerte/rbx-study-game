import { ReplicatedStorage } from "@rbxts/services";

type EventHandler = (player: Player, ...args: unknown[]) => void;

const EVENT_HANDLERS: Record<string, EventHandler> = {
	respawn: (player: Player) => {
		player.LoadCharacter();
		ReplicatedStorage.FindFirstChildOfClass("RemoteEvent")?.FireClient(player, "respawn_complete");
	},
};

const handleIncomingEvent: EventHandler = (player, ...args) => {
	const eventType = args[0];

	if (typeIs(eventType, "string") && EVENT_HANDLERS[eventType]) {
		EVENT_HANDLERS[eventType](player, args);
	} else {
		warn(`Unknown event type: ${eventType}`);
	}
};

const remoteEvent = ReplicatedStorage.FindFirstChildOfClass("RemoteEvent");
if (remoteEvent) {
	remoteEvent.OnServerEvent.Connect(handleIncomingEvent);
} else {
	warn("RemoteEvent not found in ReplicatedStorage");
}
