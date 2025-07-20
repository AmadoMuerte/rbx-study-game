import { Workspace, ReplicatedStorage, Debris } from "@rbxts/services";

const SPAWN_INTERVAL = 5;
const SPAWN_POSITIONS = [new Vector3(-101.573, 111.64, 176.309), new Vector3(-129.386, 113, -155.154)];

function getRandomAsset() {
	const assetsFolder = ReplicatedStorage.FindFirstChild("Assets") as Folder;
	if (!assetsFolder) {
		return undefined;
	}

	const children = assetsFolder.GetChildren();
	if (children.size() === 0) {
		return undefined;
	}

	const randomIndex = math.floor(math.random() * children.size());
	return children[randomIndex];
}

export function spawnRandomModel() {
	const asset = getRandomAsset();
	if (!asset) return;

	const spawnPos = SPAWN_POSITIONS[math.floor(math.random() * SPAWN_POSITIONS.size())];
	const instance = asset.Clone();

	if (instance.IsA("BasePart")) {
		instance.Position = spawnPos;
	} else if (instance.IsA("Model")) {
		instance.PivotTo(new CFrame(spawnPos));
	}

	instance.Parent = Workspace;
	game.GetService("Debris").AddItem(instance, 55);
}

for (;;) {
	spawnRandomModel();
	wait(SPAWN_INTERVAL);
}
