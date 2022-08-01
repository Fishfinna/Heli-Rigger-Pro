import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import styles from ".././styles/globalStyles";

export default function Flatbutton(props) {
  const styles = StyleSheet.create({
    button: {
      minWidth: props.width ? parseInt(props.width) : "auto",
      maxWidth: props.width ? parseInt(props.width) : "auto",
      margin: 4,
      minHeight: props.height ? props.height : "auto",
      maxHeight: props.height ? props.height : "auto",
      alignSelf: "center",
      borderRadius: 8,
      paddingVertical: 14,
      paddingHorizontal: 10,
      backgroundColor: props.bg ? props.bg : "#F78D6C",
      shadowOffset: { width: -2, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      ...props.style,
    },
    buttonText: {
      color: props.color ? props.color : "white",
      fontWeight: "bold",
      textTransform: "uppercase",

      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={{ ...styles.buttonText, ...props.textStyle }}>
          {props.text}{" "}
          {props.arrow ? (
            <Icon
              name="arrow-forward-outline"
              size={15}
              color="white"
              type="ionicon"
            />
          ) : (
            ""
          )}{" "}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
