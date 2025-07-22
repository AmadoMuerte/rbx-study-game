import React from "@rbxts/react";
import { usePx } from "client/hooks/use-px";
import { GameModes } from "./game_modes";
import { Panel } from "./panel";
import { Header } from "./header";
import { ScrollContainer } from "./scroll_container";
import { Footer } from "./footer";

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit?: () => void;
}

export const Menu = (props: Props) => {
    const px = usePx();
    const { visible, setVisible, onSubmit } = props;

    return (
        <Panel 
            size={new UDim2(0, px(320), 0, px(450))} 
            visible={visible}
        >
            <Header title="SELECT MODE" />

            <uipadding
                PaddingTop={new UDim(0, px(5))}
                PaddingBottom={new UDim(0, px(20))}
                PaddingLeft={new UDim(0, px(20))}
                PaddingRight={new UDim(0, px(20))}
            />

            <ScrollContainer heightOffset={120} topOffset={70}>
                <GameModes />
            </ScrollContainer>

            <Footer 
                height={100} 
                onCancel={() => setVisible(false)} 
                onSubmit={onSubmit}
            />
        </Panel>
    );
};