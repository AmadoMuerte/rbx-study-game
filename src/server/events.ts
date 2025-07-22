import {ReplicatedStorage, TextChatService } from "@rbxts/services";
import { GameEvents } from "shared/game_events";
import { gameQueue, isPlayerInQueue, QueuePlayer, removePlayerFromAllQueues } from "./game_queue";

const remoteEvent = ReplicatedStorage.WaitForChild("RemoteEvent") as RemoteEvent;

type ServerEventHandlers = {
    [K in keyof GameEvents]: (player: Player, ...args: Parameters<GameEvents[K]>) => void;
};

const serverEventHandlers: ServerEventHandlers = {
    searchGame: (player, mode) => {
        if (isPlayerInQueue(player)) {
            warn(`[Server] Player ${player.Name} is already in queue`);
            return;
        }

        if (!gameQueue[mode]) {
            warn(`[Server] Unknown game mode: ${mode}`);
            return;
        }

        const newPlayer: QueuePlayer = {
            player: player,
            playerId: `player_${player.UserId}`,
            joinTime: os.time()
        };

        gameQueue[mode].players.push(newPlayer);
        
        if (gameQueue[mode].players.size() === gameQueue[mode].maxPlayers) {
            const message = `Лобби готово! Игроков: ${gameQueue[mode].players.size()}/${gameQueue[mode].maxPlayers}. Начинаем игру!`;

            print(message)
            gameQueue[mode].players = [];
        }
        
        print(`[Server] Player ${player.Name} added to ${mode} queue`);
    },
    
    playerReady: (player, playerId) => {
        print(`[Server] Player ${player.Name} (ID: ${playerId}) is ready`);
    },
    
    cancelSearch: (player) => {
        const wasInQueue = isPlayerInQueue(player);
        removePlayerFromAllQueues(player);
        
        if (wasInQueue) {
            print(`[Server] Player ${player.Name} removed from all queues`);
        } else {
            print(`[Server] Player ${player.Name} was not in any queue`);
        }
    }
};

remoteEvent.OnServerEvent.Connect((player: Player, ...args: unknown[]) => {
    if (args.size() === 0) {
        warn("Received empty event");
        return;
    }

    const eventName = args[0];
    if (!typeIs(eventName, "string")) {
        warn("Event name must be string");
        return;
    }

    if (!(eventName in serverEventHandlers)) {
        warn(`Unknown event: ${eventName}`);
        return;
    }

    switch (eventName) {
        case "searchGame":
            if (args.size() >= 2 && typeIs(args[1], "string")) {
               serverEventHandlers.searchGame(player, args[1])
            } else {
                warn("Invalid arguments for searchGame - expected mode: string");
            }
            break;
            
        case "playerReady":
            if (args.size() >= 2 && typeIs(args[1], "string")) {
                serverEventHandlers.playerReady(player, args[1]);
            } else {
                warn("Invalid arguments for playerReady - expected playerId: string");
            }
            break;
            
        case "cancelSearch":
            serverEventHandlers.cancelSearch(player)
            break;
    }
});