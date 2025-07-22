import { ReplicatedStorage } from "@rbxts/services";
import { GameEvents } from "shared/game_events";

const remoteEvent = ReplicatedStorage.WaitForChild("RemoteEvent") as RemoteEvent;

const eventHandlers: GameEvents = {
    searchGame: (mode) => {
        print(`Searching game in mode: ${mode}`);
        remoteEvent.FireServer("searchGame", mode);
    },
    
    playerReady: (playerId) => {
        print(`Player ${playerId} is ready`);
    },
    
    cancelSearch: () => {
        print("Cancelling game search");
    }
};


export const sendEventToServer = <K extends keyof GameEvents>(
    event: K,
    ...args: Parameters<GameEvents[K]>
): void => {
    const handler = eventHandlers[event];
    if (handler) {
        (handler as (...args: any[]) => void)(...args);
    } else {
        warn(`Unknown event: ${event}`);
    }
};