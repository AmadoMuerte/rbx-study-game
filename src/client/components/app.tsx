import React, { useState, useEffect } from "@rbxts/react";
import { Layer } from "./layer";
import { RespawnBtn } from "./respawn_btn";

export function App() {
	return (
		<Layer>
			<RespawnBtn />
		</Layer>
	);
}
