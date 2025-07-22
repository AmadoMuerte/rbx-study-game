import React from "@rbxts/react";
import { gameModes } from "shared/constants";
import { Button } from "./button";
import { palette } from "client/utils/palette";
import { usePx } from "client/hooks/use-px";
import { sendEventToServer } from "client/utils/event";

export const GameModes = () => {
    const px = usePx();
    const modes: JSX.Element[] = [];

    for (const [key, mode] of pairs(gameModes)) {
        modes.push(
            <Button
                key={`ModeButton_${key}`}
                onClick={() => {
                    sendEventToServer("searchGame", mode.mode)
                    print(`Selected ${mode.name} mode`)
                }}
                text={mode.name}
                textSize={px(22)}
                textColor={palette.white}
                backgroundColor={palette.blue}
                size={new UDim2(0.9, 0, 0, 40)}
            />
        );
    }

    return <>{modes}</>;
};