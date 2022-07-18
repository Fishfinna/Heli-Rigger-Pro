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
      alignSelf:
        props.alignSelf == "right"
          ? "flex-end"
          : props.alignSelf == "center"
          ? "center"
          : "auto",
      borderRadius: 8,
      paddingVertical: 14,
      paddingHorizontal: 10,
      backgroundColor: props.bg ? props.bg : "#F78D6C",
      shadowOffset: { width: -2, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
    },
    buttonText: {
      color: props.color ? props.color : "white",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontSize: 16,
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          {props.text}{" "}
          {props.arrow ? (
            <Icon
              name="chevron-right"
              size={15}
              color="white"
              type="material"
            />
          ) : (
            ""
          )}{" "}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
