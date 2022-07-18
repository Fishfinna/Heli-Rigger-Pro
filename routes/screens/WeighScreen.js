import {
  StyleSheet,
  Text,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  RefreshControl,
  Modal,
  StatusBar,
} from "react-native";
import Form from "../../components/form.js";
import styles from "../../styles/globalStyles";
import React, { useState, useEffect } from "react";
import Card from "../../components/numCard";
import Button from "../../components/button";

export default function VolumeScreen({ navigation }) {
  // form input processing
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

  useEffect(() => {
    if (total.volume != 0 && total.sa != 0) {
      navigation.navigate("Density", { total: total });
    }
  }, [total]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={{ marginTop: "5%" }}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          {/* content start */}
          <Image
            style={{ width: 145, height: 135 }}
            source={require("../../assets/frustum.png")}
          />
          {/* form */}
          <KeyboardAvoidingView>
            <Form navigation={navigation} findNums={findNums} total={total} />
          </KeyboardAvoidingView>
          {/* line separator */}
          <View style={styles.lineSeparator} />
          {/* cards */}
          <View style={{ marginTop: 10 }}>
            <View style={{ ...styles.row, justifyContent: "space-around" }}>
              {/* weight (POUNDS) */}
              <Card text="Weight (ibs)" body={10} />
              {/* volume card */}
              <Card text="Volume (" super="3" unit="m" postText=")" body={10} />
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
