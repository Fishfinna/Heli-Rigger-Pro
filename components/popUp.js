import React from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";

export default function PopUp(props) {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(20,10,30,0.4)",
          }}
        >
          {props.children}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
