import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type HeaderProps = {
  pageTitle: string;
  showSettings?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  pageTitle,
  showSettings = true,
}) => {
  const router = useRouter();
  const { getIcon } = useTheme();
  const { height } = Dimensions.get("window");
  return (
    <View style={{ ...styles.container, height: height * 0.12 }}>
      <View style={styles.body}>
        <View style={styles.left}>
          {router.canGoBack() && (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Image
                source={getIcon("back")}
                style={{
                  width: 15,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{pageTitle}</Text>
        </View>
        <TouchableOpacity
          style={styles.settings}
          onPress={() => {
            router.push("/settings");
          }}
        >
          {showSettings && (
            <Image
              source={getIcon("settings")}
              style={{
                width: 30,
                height: 30,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    backgroundColor: "#FFCD3C",
    paddingBottom: 16,
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 8,
  },
  left: { display: "flex", flexDirection: "row", alignItems: "center" },
  settings: {},
});
