import { StyleSheet, Text, Platform } from "react-native";

export default function Title({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    borderWidth: Platform.select({ ios: 0, android: 2 }),

    borderColor: "white",
    padding: 12,
    maxWidth: "80%",
    width: 300,
  },
});
