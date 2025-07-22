import {RunService } from "@rbxts/services";

export const IS_PLUGIN = RunService.IsStudio() && !RunService.IsRunning();

export interface GameModes {
    [key: string]: {
        name: string;
        mode: string;
        players: number;
    };
}

export const gameModes: GameModes = {
    oneOnOne: {
        name: "1 VS 1",
        mode: "oneOnOne",
        players: 2
    },
    twoOnTwo: {
        name: "2 VS 2",
        mode: "twoOnTwo",
        players: 4
    },
    threeOnThree: {
        name: "3 VS 3",
        mode: "threeOnThree",
        players: 6
    }
};