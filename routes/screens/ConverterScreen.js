import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "../../styles/globalStyles";
import { Icon } from "react-native-elements";
import Converter from "../../components/modelConverter";

export default function ConverterScreen({ navigation }) {
  const [modalOpen, setModal] = useState(false);
  return (
    <View style={styles.container}>
      {/* line separator */}
      <View style={styles.lineSeparator} />
      {/* options 1: length conversion */}
      <TouchableOpacity style={styles.convertSelection}>
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
      <TouchableOpacity style={styles.convertSelection}>
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
