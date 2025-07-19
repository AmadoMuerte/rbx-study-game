import React from "@rbxts/react";
import { fonts } from "client/utils/fonts";
import { Button } from "./button";
import { palette } from "client/utils/palette";
import { useEffect, useState } from "@rbxts/react";
import { usePx } from "client/hooks/use-px";
import { ReplicatedStorage } from "@rbxts/services";

export const RespawnBtn = () => {
	const [text, setText] = useState("Respawn");
	const [isRespawning, setIsRespawning] = useState(false);
	const px = usePx();

	useEffect(() => {
		const remoteEvent = ReplicatedStorage.FindFirstChildOfClass("RemoteEvent");
		if (!remoteEvent) return;

		const connection = remoteEvent.OnClientEvent.Connect((message: string) => {
			if (message === "respawn_complete") {
				setIsRespawning(false);
				setText("Respawn");
			}
		});

		return () => connection.Disconnect();
	}, []);

	const respawn = () => {
		if (isRespawning) return;

		const remoteEvent = ReplicatedStorage.FindFirstChildOfClass("RemoteEvent");
		if (remoteEvent) {
			setText("Respawning...");
			setIsRespawning(true);
			remoteEvent.FireServer("respawn");
		}
	};

	return (
		<Button
			onClick={respawn}
			font={fonts.inter.medium}
			text={text}
			textSize={px(16)}
			textColor={palette.white}
			backgroundColor={isRespawning ? palette.green : palette.red}
			size={new UDim2(0, px(100), 0, px(20))}
			position={new UDim2(1, -50, 1, -50)}
			anchorPoint={new Vector2(0.5, 0.5)}
		/>
	);
};
