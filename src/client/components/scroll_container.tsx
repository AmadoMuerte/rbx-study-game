import React from "@rbxts/react";
import { usePx } from "client/hooks/use-px";

interface ScrollContainerProps {
    heightOffset: number;
    topOffset: number;
    padding?: number;
    children?: React.ReactNode;
}

export const ScrollContainer = (props: ScrollContainerProps) => {
    const px = usePx();
    return (
        <scrollingframe
            key="ContentFrame"
            Size={new UDim2(1, 0, 1, -px(props.heightOffset))}
            BackgroundTransparency={1}
            ScrollBarThickness={px(4)}
            CanvasSize={new UDim2(0, 0, 0, px(220))}
            Position={new UDim2(0, 0, 0, px(props.topOffset))}
        >
            <uilistlayout
                Padding={new UDim(0, px(props.padding ?? 12))}
                FillDirection={Enum.FillDirection.Vertical}
                HorizontalAlignment={Enum.HorizontalAlignment.Center}
                VerticalAlignment={Enum.VerticalAlignment.Top}
            />
            {props.children}
        </scrollingframe>
    );
};