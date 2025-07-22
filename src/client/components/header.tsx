import React from "@rbxts/react";
import { palette } from "client/utils/palette";
import { usePx } from "client/hooks/use-px";

interface HeaderProps {
    title: string;
    height?: number;
}

export const Header = (props: HeaderProps) => {
    const px = usePx();
    return (
        <frame 
            Size={new UDim2(1, 0, 0, px(props.height ?? 70))} 
            BackgroundTransparency={1} 
            Position={new UDim2(0, 0, 0, 0)}
        >
            <textlabel
                key="Title"
                Text={props.title}
                Font={Enum.Font.LuckiestGuy}
                TextSize={px(35)}
                TextColor3={palette.white}
                Size={new UDim2(1, 0, 1, 0)}
                BackgroundTransparency={1}
                TextXAlignment="Center"
            />
        </frame>
    );
};