import {RunService } from "@rbxts/services";

export const IS_PLUGIN = RunService.IsStudio() && !RunService.IsRunning();

export interface GameModes {
    [key: string]: {
        name: string;
        event: string;
        players: number;
    };
}

export const gameModes: GameModes = {
    oneOnOne: {
        name: "1 VS 1",
        event: "search_game_one_on_one",
        players: 2
    },
    twoOnTwo: {
        name: "2 VS 2",
        event: "search_game_two_on_two",
        players: 4
    },
    threeOnThree: {
        name: "3 VS 3",
        event: "search_game_three_on_three",
        players: 6
    }
};