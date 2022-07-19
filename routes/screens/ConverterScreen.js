import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "../../styles/globalStyles";
import { Icon } from "react-native-elements";
import Converter from "../../components/modelConverter";

export default function ConverterScreen({ navigation, route }) {
  const [modalOpen, setModal] = useState(false);
  return (
    <View style={styles.container}>
      {/* line separator */}
      <View style={styles.lineSeparator} />
      {/* options 1: length conversion */}
      <TouchableOpacity
        style={styles.convertSelection}
        onPress={() =>
          navigation.navigate("Unit Converter", {
            units: {
              mm: 1,
              cm: 0.1,
              inch: 0.0393701,
              feet: 0.00328084,
              yards: 0.00109361,
              meter: 0.001,
              km: 1 / 1000000,
              miles: 1 / 1609000,
            },
            title: "length",
          })
        }
      >
        <View style={styles.icon}>
          <Text>
            <Icon
              name="ruler"
              color="white"
              size={30}
              type="material-community"
            />
          </Text>
        </View>
        <Text style={styles.convertLabel}>Length Conversion</Text>
      </TouchableOpacity>

      {/* switch icon */}
      <Text>
        <Icon name="repeat" color="#CCCCCC" size={50} />
      </Text>

      {/* option 2: weight conversion */}
      <TouchableOpacity
        style={styles.convertSelection}
        onPress={() =>
          navigation.navigate("Unit Converter", {
            units: {
              ml: 1,
              g: 0.001,
              oz: 0.000035274,
              ibs: 0.00000220462,
              kg: 1 / 1000000,
              stone: 1 / 6.35e6,
            },
            title: "mass",
          })
        }
      >
        <View style={styles.icon}>
          <Text>
            <Icon
              name="weight"
              color="white"
              size={27}
              type="material-community"
            />
          </Text>
        </View>
        <Text style={styles.convertLabel}>Weight Conversion</Text>
      </TouchableOpacity>
      {/* line separator */}
      <View style={styles.lineSeparator} />
    </View>
  );
}
