import React, { useRef } from "react";
import {
  Animated,
  ImageBackground,
  PanResponder,
  StyleSheet,
} from "react-native";
import { PctSticker } from "../PctSticker";

type Props = {
  setScrollEnabled?: (enabled: boolean) => void; // for parent ScrollView
};

export const HikingProgressSticker: React.FC<Props> = ({
  setScrollEnabled,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current; // in radians

  const lastPan = useRef({ x: 0, y: 0 }).current;
  const lastScale = useRef(1);
  const lastDistance = useRef(0);
  const lastRotate = useRef(0);
  const lastAngle = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        setScrollEnabled?.(false); // disable parent scroll
        pan.setOffset({ x: lastPan.x, y: lastPan.y });
        pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;

        if (touches.length === 1) {
          // Drag
          Animated.event([null, { dx: pan.x, dy: pan.y }], {
            useNativeDriver: false,
          })(evt, gestureState);
        } else if (touches.length === 2) {
          const touch1 = touches[0];
          const touch2 = touches[1];

          const dx = touch2.pageX - touch1.pageX;
          const dy = touch2.pageY - touch1.pageY;

          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          // Scale
          if (lastDistance.current === 0) {
            lastDistance.current = distance;
          } else {
            let newScale =
              (distance / lastDistance.current) * lastScale.current;
            newScale = Math.max(0.5, Math.min(newScale, 3));
            scale.setValue(newScale);
          }

          // Rotation
          if (lastAngle.current === 0) {
            lastAngle.current = angle;
          } else {
            let delta = angle - lastAngle.current;
            const rotationFactor = 0.1; // <--- reduce rotation speed
            let newRotate = lastRotate.current + delta * rotationFactor;
            rotate.setValue(newRotate);
          }
        }
      },

      onPanResponderRelease: () => {
        lastPan.x += pan.x._value;
        lastPan.y += pan.y._value;
        pan.flattenOffset();

        lastScale.current = scale.__getValue();
        lastRotate.current = rotate.__getValue();
        lastDistance.current = 0;
        lastAngle.current = 0;

        setScrollEnabled?.(true);
      },

      onPanResponderTerminate: () => {
        lastPan.x += pan.x._value;
        lastPan.y += pan.y._value;
        pan.flattenOffset();

        lastScale.current = scale.__getValue();
        lastRotate.current = rotate.__getValue();
        lastDistance.current = 0;
        lastAngle.current = 0;

        setScrollEnabled?.(true);
      },
    })
  ).current;

  const rotation = rotate.interpolate({
    inputRange: [-Math.PI, Math.PI],
    outputRange: ["-180rad", "180rad"],
  });

  return (
    <ImageBackground
      source={require("@/assets/images/testing.jpeg")}
      style={styles.container}
      imageStyle={{ borderRadius: 20 }}
      resizeMode="cover"
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          pan.getLayout(),
          { transform: [{ scale }, { rotate: rotation }] },
        ]}
      >
        <PctSticker
          milesDone={938}
          totalMiles={4250}
          durationSeconds={2}
          width={200}
          height={200}
        />
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
});
