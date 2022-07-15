import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  RefreshControl,
  Modal,
} from "react-native";
import Form from "./components/form.js";
import styles from "./styles/globalStyles";
import React, { useState, useEffect } from "react";
import FlatButton from "./components/button.js";
import { Icon, SearchBar } from "react-native-elements";
import NumInput from "./components/numInput.js";
import Weight from "./components/weight.js";

export default function App() {
  // refresh control
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // add refresh controls here

    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  }, []);

  // modal control
  const [modalState, setModal] = useState(false);

  // form control
  const [total, setTotal] = useState({ volume: 0, sa: 0 });
  const findNums = (nums) => {
    setTotal(() => {
      let R = nums.base != 0 ? nums.base / 2 : 0;
      let r = nums.top != 0 ? nums.top / 2 : 0;
      let h = nums.height != 0 ? nums.height * 100 : 0;

      return {
        volume: (1 / 3) * Math.PI * h * (r * r + R * R + r * R),
        sa:
          Math.PI *
          (Math.pow(r, 2) +
            Math.pow(R, 2) +
            Math.sqrt(Math.pow(r - R, 2) + Math.pow(h, 2)) * (R + r)),
      };
    });
  };

  // weight controls
  const [itemWeight, setWeight] = useState({
    material: "None Selected",
    density: 0,
  });

  return (
    <ScrollView
      style={{ paddingTop: 50 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {/* content start */}

          {/* modal */}
          <Modal visible={modalState}>
            <Weight setModal={setModal} />
          </Modal>

          <StatusBar style="auto" />

          {/* calculate frustum */}
          <Image
            style={{ width: 125, height: 120 }}
            source={require("./assets/frustum.png")}
          />
          <Form findNums={findNums} />

          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={styles.totalCard}>
              <View style={styles.subscript}>
                <Text style={{ lineHeight: 30, fontWeight: "bold" }}>
                  Volume (cm
                </Text>
                <Text
                  style={{ fontSize: 8, lineHeight: 20, fontWeight: "bold" }}
                >
                  3
                </Text>
                <Text style={{ lineHeight: 30, fontWeight: "bold" }}> )</Text>
              </View>
              <Text>{total.volume}</Text>
            </View>

            <View style={styles.totalCard}>
              <View style={styles.subscript}>
                <Text style={{ lineHeight: 30, fontWeight: "bold" }}>
                  SA (cm{" "}
                </Text>
                <Text
                  style={{ fontSize: 8, lineHeight: 20, fontWeight: "bold" }}
                >
                  2
                </Text>
                <Text style={{ lineHeight: 30, fontWeight: "bold" }}> )</Text>
              </View>
              <Text>{total.sa}</Text>
            </View>
          </View>

          <View style={styles.totalWeight}>
            <Text style={{ lineHeight: 30, fontWeight: "bold" }}>
              Weight (
              {`material: ${itemWeight.material}, density : ${itemWeight.density}`}
              )
            </Text>
            <Text>{itemWeight.density * total.volume}</Text>
          </View>

          <FlatButton
            text="Select Density"
            width="280"
            alignSelf="right"
            arrow="Display"
            onPress={() => setModal(true)}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
