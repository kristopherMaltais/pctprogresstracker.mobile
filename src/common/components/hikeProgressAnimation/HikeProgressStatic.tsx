import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { Sticker } from "@/src/models/sticker";
import { Canvas, Path, Shadow } from "@shopify/react-native-skia";
import React from "react";

type HikeProgressStaticProps = {
  sticker: Sticker;
  size?: number;
};

export const HikeProgressStatic: React.FC<HikeProgressStaticProps> = ({ sticker, size = 1 }) => {
  const { theme } = useTheme();

  return (
    <Canvas
      style={[
        {
          width: sticker.width,
          height: sticker.height,
        },
        { transform: [{ scale: size }] },
      ]}
    >
      {sticker.decorations?.map((decoration: string, index) => (
        <Path key={`decoration-${index}`} path={decoration} color={theme.decorations} strokeWidth={1} style="stroke">
          <Shadow dx={0.2} dy={0.2} blur={1} color="rgba(0,0,0,0.5)" />
        </Path>
      ))}

      <Path path={sticker.path} color={theme.primary} style="stroke" strokeWidth={3} strokeCap="round">
        <Shadow dx={0.2} dy={0.2} blur={1} color="rgba(0,0,0,0.5)" />
      </Path>
    </Canvas>
  );
};
