import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "../styles/globalStyles";

export default function modelConverter() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <Text style={{ ...styles.modelBody, backgroundColor: "white" }}>
          Hello :D
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
