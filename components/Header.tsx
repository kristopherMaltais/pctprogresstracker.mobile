import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  pageTitle: string;
  showSettings?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  pageTitle,
  showSettings = true,
}) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.left}>
          {router.canGoBack() && (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Image
                source={require("@/assets/images/back.png")}
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
              source={require("@/assets/images/settings.png")}
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
    height: 120,
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
    color: "#155263",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 8,
  },
  left: { display: "flex", flexDirection: "row", alignItems: "center" },
  settings: {},
});
