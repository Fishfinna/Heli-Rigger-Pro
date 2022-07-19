import React, { useState, Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  TextInput,
} from "react-native";
import styles from ".././styles/globalStyles";

export default function numInput(props) {
  return (
    <View style={{ ...styles.forms, ...props.style }}>
      <Text style={{ color: "#434A5D", fontSize: 15 }}>{props.text}</Text>

      <View style={styles.inputField}>
        <TextInput
          onBlur={props.onBlur}
          name={props.name}
          style={{
            ...styles.input,
            minWidth: props.width
              ? props.width
              : Dimensions.get("window").width * 0.25,
          }}
          placeholder="0"
          placeholderTextColor="grey"
          onChangeText={props.onChangeText ? props.onChangeText : null}
          value={props.value}
          keyboardType="numeric"
        ></TextInput>

        {props.super ? (
          <View style={styles.subscript}>
            <Text style={{ lineHeight: 30, color: "grey" }}>
              {props.format}
            </Text>
            <Text style={{ fontSize: 8, lineHeight: 20, color: "grey" }}>
              {props.super}
            </Text>
          </View>
        ) : (
          <Text
            style={
              props.format
                ? { color: "grey", minWidth: 40, lineHeight: 30 }
                : { width: 0 }
            }
          >
            {props.format}
          </Text>
        )}
      </View>
    </View>
  );
}
