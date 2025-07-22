import { gameModes } from "shared/constants";

type GameModeKey = keyof typeof gameModes;

export interface QueuePlayer {
    player: Player;
    playerId?: string;
    joinTime?: number;
}

interface GameModeQueue {
    maxPlayers: number;
    players: QueuePlayer[];
}

interface GameQueue {
    [mode: GameModeKey]: GameModeQueue;
}
export let gameQueue: GameQueue = {
    oneOnOne: {
        maxPlayers: gameModes.oneOnOne.players,
        players: []
    },
    twoOnTwo: {
        maxPlayers: gameModes.twoOnTwo.players,
        players: []
    },
    threeOnThree: {
        maxPlayers: gameModes.twoOnTwo.players,
        players: []
    }
};

export function isPlayerInQueue(player: Player): boolean {
    for (const [_, queue] of pairs(gameQueue)) {
        if (queue.players.some(p => p.player === player)) {
            return true;
        }
    }
    return false;
}

export function removePlayerFromAllQueues(player: Player) {
    for (const [mode, queue] of pairs(gameQueue)) {
        gameQueue[mode].players = queue.players.filter(p => p.player !== player);
    }
}