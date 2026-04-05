import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { Map } from "@/src/models/map";
import { Canvas, Path, Shadow } from "@shopify/react-native-skia";
import React from "react";

type HikeProgressStaticProps = {
  map: Map;
  size?: number;
  color: string;
};

export const HikeProgressStatic: React.FC<HikeProgressStaticProps> = ({ map, size = 1, color }) => {
  const { theme } = useTheme();

  return (
    <Canvas
      style={[
        {
          width: map.width,
          height: map.height,
        },
        { transform: [{ scale: size }] },
      ]}
    >
      {map.decorations?.map((decoration: string, index: number) => (
        <Path key={`decoration-${index}`} path={decoration} color={color} strokeWidth={1} style="stroke">
          <Shadow dx={0.2} dy={0.2} blur={1} color="rgba(0,0,0,0.5)" />
        </Path>
      ))}

      <Path path={map.path} color={theme.primary} style="stroke" strokeWidth={3} strokeCap="round">
        <Shadow dx={0.2} dy={0.2} blur={1} color="rgba(0,0,0,0.5)" />
      </Path>
    </Canvas>
  );
};
