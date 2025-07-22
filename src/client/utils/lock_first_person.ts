export function lockFirstPerson(player: Player) {
	player.CameraMode = Enum.CameraMode.LockFirstPerson;
	if (player.CameraMaxZoomDistance !== undefined) {
		player.CameraMaxZoomDistance = 0.5;
		player.CameraMinZoomDistance = 0.5;
	}
}

export function unlockFirstperson(player: Player) {
    player.CameraMode = Enum.CameraMode.Classic;
}