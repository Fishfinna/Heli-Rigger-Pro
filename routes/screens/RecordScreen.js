import React, { useState } from "react";
import {
  Text,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import styles from "../../styles/globalStyles";
import { Icon } from "react-native-elements";
import Converter from "../../components/modelConverter";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecordScreen({ navigation, route }) {
  //state used for storing the list data
  const [recordData, setRecordData] = useState("");

  // read record from memory all alone in the moon light
  async function readHistory() {
    try {
      let values = await AsyncStorage.getItem("@history");
      if (values != null) {
        setRecordData(JSON.parse(values));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateHistory() {
    null;
  }

  return (
    <View style={styles.container}>
      {/* start of list */}
      <FlatList
        ListEmptyComponent={
          // this will be rendered when the list is empty
          <Text style={styles.subtitle}>
            Entered Calculations will be saved here automatically.
          </Text>
        }
        ListHeaderComponent={null /*this will be a share button later*/}
        style={styles.presetList}
        ListFooterComponent={<View style={{ padding: "5%" }} />}
        data={recordData}
        extraData={recordData}
        renderItem={null}
      />
      {/* end of flatList */}
    </View>
  );
}
