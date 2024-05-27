import { View, Image, StyleSheet, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/title";
import Colors from "../utils/colors";

export default function GameOverScreen({
  onStartGame,
  roundsNumber,
  userNumber,
}) {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed<Text style={styles.highLight}>{roundsNumber}</Text>{" "}
        rounds to guess the number
        <Text style={styles.highLight}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onStartGame}>Start New Game</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    borderRadius: 150,

    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: Colors.primary600,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 24,
  },
  highLight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
