import React, { useState, useEffect } from "@rbxts/react";
import { Layer } from "./layer";
import { Button } from "./button";
import { palette } from "client/utils/palette";
import { usePx } from "client/hooks/use-px";
import { Menu } from "./menu";

export function App() {
	const [visible, setVisible] = useState(false);
	const px = usePx();

	return (
		<Layer>
			<Menu visible={visible} setVisible={setVisible} />
			<Button
				onClick={() => setVisible(!visible)}
				text={"Search Game"}
				textSize={px(16)}
				size={new UDim2(0, 170, 0, 40)}
				textColor={palette.white}
				backgroundColor={palette.green}
				position={new UDim2(1, -100, 1, -50)}
				anchorPoint={new Vector2(0.5, 0.5)}
			/>
		</Layer>
	);
}
