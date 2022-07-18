import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import * as React from "react";
import styles from "../styles/globalStyles";

export default function Card(props) {
  return (
    <View style={{ ...styles.numCard, ...props.style }}>
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
          }}
        >
          {props.super}
        </Text>
        <Text style={styles.subtitle}>{props.postText}</Text>
      </View>
      <Text style={{ color: "#434A5D" }}>{props.body}</Text>
    </View>
  );
}
