import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { LocationInterval } from "@/src/models/locationInterval";
import { Path } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

type HikeIntervalProps = {
  interval: LocationInterval;
  globalProgress: SharedValue<number>;
  path: string;
  color: string;
};

export const HikeInterval: React.FC<HikeIntervalProps> = ({ interval, globalProgress, color }) => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);

  const animatedEnd = useDerivedValue(() => {
    if (globalProgress.value < interval.start.pathLocation) {
      return interval.start.pathLocation;
    }
    return Math.min(globalProgress.value, interval.end.pathLocation);
  });

  return (
    <Path
      path={selectedHike?.path!}
      color={color}
      style="stroke"
      strokeCap={"round"}
      strokeWidth={3}
      start={interval.start.pathLocation}
      end={animatedEnd}
    />
  );
};
