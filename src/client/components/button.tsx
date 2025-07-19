import React, { useEffect, useState } from "@rbxts/react";
import { useMotion } from "client/hooks/use-motion";
import { usePx } from "client/hooks/use-px";
import { brighten } from "client/utils/color-utils";
import { fonts } from "client/utils/fonts";
import { palette } from "client/utils/palette";
import { springs } from "client/utils/springs";

interface ButtonProps {
	onClick?: () => void;
	font?: Font;
	text?: string;
	textSize?: number;
	textColor?: Color3;
	backgroundColor?: Color3;
	size?: UDim2;
	position?: UDim2;
	anchorPoint?: Vector2;
	children?: React.ReactNode;
}

export function Button(props: ButtonProps) {
	const {
		onClick,
		font = fonts.inter.regular,
		text,
		textSize,
		textColor = palette.white,
		backgroundColor = palette.blue,
		size,
		position,
		anchorPoint,
		children,
	} = props;

	const px = usePx();
	const [pressed, setPressed] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [buttonColor, buttonColorMotion] = useMotion(backgroundColor);

	useEffect(() => {
		const targetColor = pressed
			? brighten(backgroundColor, -0.1)
			: hovered
				? brighten(backgroundColor, 0.1)
				: backgroundColor;

		buttonColorMotion.spring(targetColor, springs.responsive);
	}, [pressed, hovered, backgroundColor]);

	return (
		<frame BackgroundTransparency={1} AnchorPoint={anchorPoint} Size={size} Position={position}>
			<textbutton
				FontFace={font}
				Text={text}
				TextColor3={textColor}
				TextSize={textSize}
				AutoButtonColor={false}
				BackgroundColor3={buttonColor}
				Size={new UDim2(1, 0, 1, 0)}
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
				<uicorner CornerRadius={new UDim(0, px(16))} />
				{children}
			</textbutton>
		</frame>
	);
}
