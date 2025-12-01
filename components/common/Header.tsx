import { usePremium } from "@/contexts/premium/PremiumContextProvider";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
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

export const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const router = useRouter();
  const { getIcon } = useTheme();
  const { t } = useTranslation();
  const { setIsPremiumModalVisible } = usePremium();
  const { height } = Dimensions.get("window");
  return (
    <View style={{ ...styles.container, height: height * 0.13 }}>
      <View style={styles.body}>
        <View style={styles.left}>
          <Text style={styles.title}>{pageTitle}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsPremiumModalVisible(true)}
          style={styles.test}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {t("index:premium.button.headerGoPremium")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={getIcon("settings")}
            style={{
              width: 30,
              height: 30,
            }}
          />
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
  test: {
    paddingHorizontal: 16,
    borderRadius: 15,
    paddingVertical: 8,
    backgroundColor: "#FFCD3C",
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
