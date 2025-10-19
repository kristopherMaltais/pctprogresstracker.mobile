import { useColorScheme as _useColorScheme } from "react-native";

/**
 * Returns the system color scheme ("light" or "dark"), with a fallback to "light" if undefined.
 */
export function useColorScheme() {
  return _useColorScheme() ?? "light";
}
