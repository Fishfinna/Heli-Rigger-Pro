import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "../../styles/globalStyles";
import { Icon } from "react-native-elements";
import Converter from "../../components/modelConverter";

export default function ConverterScreen({ navigation }) {
  const [modalOpen, setModal] = useState(false);
  return (
    <View style={styles.container}>
      {/* options 1: length conversion */}
      <TouchableOpacity style={styles.convertSelection}>
        <Text>
          <Icon name="ruler" color="white" type="material-community" />
        </Text>
        <Text style={{ color: "#CCCCCC" }}>Length Conversion</Text>
      </TouchableOpacity>

      {/* option 2: weight conversion */}
      <TouchableOpacity
        // onPress={() => setModal(true)}
        style={styles.convertSelection}
      >
        <Text>
          <Icon name="weight" color="white" type="material-community" />
        </Text>
        <Text style={{ color: "#CCCCCC" }}>Weight Conversion</Text>
      </TouchableOpacity>

      {/* modal set up */}
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <Converter />
      </Modal>
    </View>
  );
}
