import { Alert, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/instructionText";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
let minBoundary = 1;
let maxBoundary = 100;
export default GameScreen = ({ userNumber, setGameOver }) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, SetCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      setGameOver();
    }
  }, [currentGuess, userNumber, setGameOver]);

  const nextGuessHandler = (direction) => {
    console.log(direction);
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Dont Lie! you know that this is wrong...");
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    SetCurrentGuess(newRndNumber);
  };
  return (
    <View style={styles.screen}>
      <Title>Opponents Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <InstructionText style={styles.InstructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              -
            </PrimaryButton>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              +
            </PrimaryButton>
          </View>
        </View>
      </View>
      <Text>Log ROUNDS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  InstructionText: {
    marginBottom: 12,
  },
});
