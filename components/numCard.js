import { Text, View, ScrollView, Dimensions } from "react-native";
import * as React from "react";
import styles from "../styles/globalStyles";

export default function Card(props) {
  return (
    <View
      style={{
        ...styles.numCard,
        ...props.style,
        width: Dimensions.get("window").width * 0.8,
      }}
    >
      <View style={styles.subscript}>
        <Text style={styles.subtitle}>
          {props.text}
          {props.unit}
        </Text>

        <Text
          style={{
            color: "#434A5D",
            fontSize: 10,
            lineHeight: 15,
            textAlignVertical: "top",
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          {props.super}
        </Text>
        <Text style={styles.subtitle}>{props.postText}</Text>
      </View>
      <Text
        style={{
          color: "#434A5D",
          overflow: "hidden",
          fontWeight: "bold",
        }}
        numberOfLines={1}
      >
        {props.body}
      </Text>
    </View>
  );
}
