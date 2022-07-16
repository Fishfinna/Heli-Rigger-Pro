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
  StatusBar,
} from "react-native";
import Form from "../../components/form.js";
import styles from "../../styles/globalStyles";
import React, { useState, useEffect } from "react";
import FlatButton from "../../components/button.js";
import { Icon, SearchBar } from "react-native-elements";
import Weight from "../../components/weight.js";

export default function VolumeScreen(navigation) {
  // refresh control
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // add refresh controls here

    setTimeout(() => {
      setRefreshing(false);
      // wipes the numbers on reload
      findNums({ base: 0, top: 0, height: 0 });
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
    material: "None",
    density: 0,
  });

  // weight form controls (used in modal)

  return (
    <ScrollView
      style={{ paddingTop: 15 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {/* content start */}

          {/* modal for density input */}
          <Modal animationType="slide" visible={modalState}>
            <Weight
              itemWeight={itemWeight}
              setModal={setModal}
              onBackdropPress={() => setModalVisible(false)}
              setWeight={setWeight}
            />
          </Modal>

          <StatusBar style="auto" />

          {/* calculate frustum */}
          <Image
            style={{ width: 125, height: 120 }}
            source={require("../../assets/frustum.png")}
          />
          <Form findNums={findNums} setModal={setModal} />

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
                <Text style={{ lineHeight: 30, fontWeight: "bold" }}> ):</Text>
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
                <Text style={{ lineHeight: 30, fontWeight: "bold" }}> ):</Text>
              </View>
              <Text>{total.sa}</Text>
            </View>
          </View>
          {/* weight measurements */}
          {/* selected matieral */}
          <View style={styles.totalWeight}>
            <Text>
              {`Selected material: ${itemWeight.material}, ${itemWeight.density}kg/m`}
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={styles.totalCard}>
              <Text style={{ lineHeight: 30, fontWeight: "bold" }}>
                Weight (kg):
              </Text>
              <Text>{(itemWeight.density / 1000) * (total.volume / 1000)}</Text>
            </View>

            <View style={styles.totalCard}>
              <Text style={{ lineHeight: 30, fontWeight: "bold" }}>
                Weight (pounds):
              </Text>
              <Text>
                {(itemWeight.density / 1000) * (total.volume / 1000) * 2.20462}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
