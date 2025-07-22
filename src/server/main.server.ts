import { Players } from "@rbxts/services";
import "./events"
import { removePlayerFromAllQueues } from "./game_queue";

Players.PlayerRemoving.Connect((player) => {
    removePlayerFromAllQueues(player);
    print(`[Server] Player ${player.Name} removed from queues (disconnected)`);
});