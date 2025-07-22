
export interface GameEvents {
    searchGame: (mode: string) => void;
    playerReady: (playerId: string) => void;
    cancelSearch: () => void;
}