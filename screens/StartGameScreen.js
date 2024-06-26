import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/title";
import { useState } from "react";
import Colors from "../utils/colors";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/instructionText";

export default function StartGameScreen({ onConfirmNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const numberInputHandler = (text) => {
    setEnteredNumber(text);
  };

  const { width, height } = useWindowDimensions();

  const resetInputHandler = () => {
    setEnteredNumber("");
  };

  const ConfirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number!", "Number has to be above 0 !", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    onConfirmNumber(chosenNumber);
  };

  const marginTopp = height < 380 ? 30 : 100;
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopp }]}>
          <Title>Guess My Number</Title>

          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              keyboardType="number-pad"
              maxLength={2}
              style={styles.numberInput}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={ConfirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const deviceHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,

    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flex: 1,
  },
});
