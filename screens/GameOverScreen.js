import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/title";
import Colors from "../utils/colors";

export default function GameOverScreen({
  onStartGame,
  roundsNumber,
  userNumber,
}) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.containerImage, imageStyle]}>
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
    </ScrollView>
  );
}

// const deviceWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  containerImage: {
    // borderRadius: 150,
    // width: deviceWidth < 300 ? 150 : 300,
    // height: deviceWidth < 300 ? 150 : 300,
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
  screen: {
    flex: 1,
  },
});
