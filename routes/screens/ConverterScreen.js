import * as React from "react";
import { View, Text } from "react-native";

export default function ConverterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Convert")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Convert Screen
      </Text>
    </View>
  );
}
