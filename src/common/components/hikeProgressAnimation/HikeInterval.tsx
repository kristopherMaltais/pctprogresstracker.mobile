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
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);

  console.log(interval.end.pathLocation);
  const animatedEnd = useDerivedValue(() => {
    return Math.min(
      globalProgress.value / selectedHikeTotalDistance,
      interval.end.pathLocation / selectedHikeTotalDistance
    );
  });

  return (
    <Path
      path={selectedHike?.path!}
      color={color}
      style="stroke"
      strokeCap={"square"}
      strokeWidth={3}
      start={interval.start.pathLocation / selectedHikeTotalDistance}
      end={animatedEnd}
    />
  );
};
