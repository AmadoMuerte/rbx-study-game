import React from "@rbxts/react";
import { palette } from "client/utils/palette";
import { usePx } from "client/hooks/use-px";
import { Button } from "./button";

interface FooterProps {
    height: number;
    onCancel: () => void;
    onSubmit?: () => void;
    submitText?: string;
    cancelText?: string;
}

export const Footer = (props: FooterProps) => {
    const px = usePx();
    return (
        <frame
            Size={new UDim2(1, 0, 0, px(props.height))}
            Position={new UDim2(0, 0, 1, 0)}
            AnchorPoint={new Vector2(0, 1)}
            BackgroundTransparency={1}
        >
            <uilistlayout
                Padding={new UDim(0, px(10))}
                FillDirection={Enum.FillDirection.Vertical}
                HorizontalAlignment={Enum.HorizontalAlignment.Center}
                VerticalAlignment={Enum.VerticalAlignment.Bottom}
            />

            {props.onSubmit && (
                <Button
                    onClick={props.onSubmit}
                    text={props.submitText ?? "Submit"}
                    size={new UDim2(0.9, 0, 0, px(40))}
                    backgroundColor={palette.green}
                />
            )}
            <Button
                onClick={props.onCancel}
                text={props.cancelText ?? "Cancel"}
                backgroundColor={palette.red}
                size={new UDim2(0.9, 0, 0, px(40))}
            />
        </frame>
    );
};