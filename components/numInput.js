import React, { useState, Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from "react-native";
import styles from ".././styles/globalStyles";

export default function numInput(props) {
  return (
    <View style={styles.forms}>
      <Text>{props.text}</Text>

      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          placeholder="0"
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
          <Text style={{ color: "grey", minWidth: 40, lineHeight: 30 }}>
            {props.format}
          </Text>
        )}
      </View>
    </View>
  );
}
