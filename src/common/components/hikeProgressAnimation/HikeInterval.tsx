import { LocationInterval } from "@/src/models/locationInterval";
import { Path } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

type HikeIntervalProps = {
  selectedHikeTotalDistance: number;
  interval: LocationInterval;
  globalProgress: SharedValue<number>;
  color: string;
  path: string;
};

export const HikeInterval: React.FC<HikeIntervalProps> = ({
  interval,
  globalProgress,
  color,
  path,
  selectedHikeTotalDistance,
}) => {
  const animatedEnd = useDerivedValue(() => {
    if (selectedHikeTotalDistance === 0) return 0;
    return Math.min(
      globalProgress.value / selectedHikeTotalDistance,
      interval.end.pathLocation / selectedHikeTotalDistance
    );
  });

  if (selectedHikeTotalDistance === 0) return null;

  return (
    <Path
      path={path}
      color={color}
      style="stroke"
      strokeCap={"square"}
      strokeWidth={3}
      start={interval.start.pathLocation / selectedHikeTotalDistance}
      end={animatedEnd}
    />
  );
};
