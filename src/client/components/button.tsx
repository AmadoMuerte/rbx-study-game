import React, { useEffect, useState } from "@rbxts/react";
import { useMotion } from "client/hooks/use-motion";
import { usePx } from "client/hooks/use-px";
import { brighten } from "client/utils/color-utils";
import { palette } from "client/utils/palette";
import { springs } from "client/utils/springs";

interface ButtonProps {
	onClick?: () => void;
	text?: string;
	textSize?: number;
	textColor?: Color3;
	backgroundColor?: Color3;

	// Layout props
	size?: UDim2;
	position?: UDim2;
	anchorPoint?: Vector2;

	// Visual customization
	cornerRadius?: UDim;
	strokeColor?: Color3;
	strokeThickness?: number;
	hoverEffect?: boolean;

	// Additional children
	children?: React.ReactNode;
}

export function Button(props: ButtonProps) {
	const px = usePx();

	const {
		onClick,
		text = "",
		textSize = px(22),
		textColor = palette.white,
		backgroundColor = palette.blue,
		size = new UDim2(0, 120, 0, 40),
		position,
		anchorPoint,
		cornerRadius = new UDim(0, px(24)),
		strokeColor = new Color3(1, 1, 1),
		strokeThickness = px(1),
		hoverEffect = true,
		children,
	} = props;

	const [pressed, setPressed] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [buttonColor, buttonColorMotion] = useMotion(backgroundColor);

	useEffect(() => {
		if (!hoverEffect) return;

		const targetColor = pressed
			? brighten(backgroundColor, -0.1)
			: hovered
				? brighten(backgroundColor, 0.1)
				: backgroundColor;

		buttonColorMotion.spring(targetColor, springs.responsive);
	}, [pressed, hovered, backgroundColor, hoverEffect]);

	return (
		<textbutton
			Font={Enum.Font.LuckiestGuy}
			Text={text}
			TextColor3={textColor}
			TextSize={textSize}
			AutoButtonColor={false}
			BackgroundColor3={buttonColor}
			Size={size}
			Position={position}
			AnchorPoint={anchorPoint}
			Event={{
				Activated: onClick,
				MouseEnter: () => setHovered(true),
				MouseLeave: () => {
					setHovered(false);
					setPressed(false);
				},
				MouseButton1Down: () => setPressed(true),
				MouseButton1Up: () => setPressed(false),
			}}
		>
			{children}
			<uistroke Color={strokeColor} Thickness={strokeThickness} Transparency={0.5} />
			<uicorner CornerRadius={cornerRadius} />
		</textbutton>
	);
}
