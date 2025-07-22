// components/panel.tsx
import React from "@rbxts/react";
import { palette } from "client/utils/palette";
import { usePx } from "client/hooks/use-px";

interface PanelProps {
    size: UDim2;
    position?: UDim2;
    anchorPoint?: Vector2;
    children?: React.ReactNode;
    transparency?: number;
    visible?: boolean;
}

export const Panel = (props: PanelProps) => {
    const px = usePx();
    return (
        <frame
            Transparency={props.transparency ?? 0.5}
            Visible={props.visible}
            AnchorPoint={props.anchorPoint ?? new Vector2(0.5, 0.5)}
            Position={props.position ?? new UDim2(0.5, 0, 0.5, 0)}
            Size={props.size}
            BackgroundColor3={palette.purple}
            BackgroundTransparency={0}
        >
            <uicorner CornerRadius={new UDim(0, px(16))} />
            {props.children}
        </frame>
    );
};