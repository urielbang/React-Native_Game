import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/instructionText";
import Card from "../components/ui/Card";
import Colors from "../utils/colors";
import GuessLogItem from "../components/game/GuessLogItem";

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
// let count = 0;
export default GameScreen = ({ userNumber, setGameOver }) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, SetCurrentGuess] = useState(initialGuess);
  const [countRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      setGameOver(countRounds.length);

      // count = 0;
    }
  }, [currentGuess, userNumber, setGameOver]);

  useEffect(() => {
    maxBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    console.log(direction);
    if (
      (direction == "lower" && currentGuess <= userNumber) ||
      (direction == "greater" && currentGuess >= userNumber)
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
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  };

  const guessRoundsListLength = countRounds.length;
  return (
    <View style={styles.screen}>
      <Title style={styles.title}>Opponents Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Card>
          <InstructionText style={styles.InstructionText}>
            Higher or lower?
          </InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                <Ionicons name="remove-circle-outline" size={24} />
              </PrimaryButton>
            </View>

            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
                <Ionicons name="add-circle-outline" size={24} />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </View>
      <View style={styles.containerTries}>
        <FlatList
          data={countRounds}
          renderItem={(itemData) => {
            return (
              <GuessLogItem
                roundNumber={guessRoundsListLength - itemData.index}
                guess={itemData.item}
              />
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
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
  title: {
    marginTop: 50,
  },
  containerTries: {
    flex: 1,
    padding: 16,
  },
  cardNumber: {
    backgroundColor: Colors.primary500,
    width: 140,
    margin: 3,
    borderRadius: 25,
    color: "white",
    fontFamily: "open-sans",
    textAlign: "center",
  },
});
