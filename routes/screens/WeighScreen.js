import {
  Text,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import Form from "../../components/frustumForm.js";
import styles from "../../styles/globalStyles";
import React, { useState, useEffect } from "react";
import Card from "../../components/numCard";
import Button from "../../components/button";

export default function VolumeScreen({ navigation, route }) {
  // form input processing
  const [volume, setVolume] = useState(0);
  const findNums = (nums) => {
    setVolume(() => {
      if (nums.base > 0 && nums.top > 0 && nums.length > 0) {
        let R = nums.base / 2;
        let r = nums.top / 2;
        let h = nums.length * 100;

        return ((1 / 3) * Math.PI * h * (r * r + R * R + r * R)) / 1000000; //we divide by 1000000 to get it out of cm and to meters
      } else {
        return 0;
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={{ flex: 1, marginTop: 3 }}>
        <View style={{ ...styles.container, paddingBottom: "5%" }}>
          <StatusBar barStyle="light-content" />
          {/* content start */}
          <Image
            style={{
              width: Dimensions.get("window").width * 0.26,
              height: Dimensions.get("window").width * 0.3,
            }}
            source={require("../../assets/frustum.png")}
          />
          {/* form */}
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <Form navigation={navigation} findNums={findNums} />
          </KeyboardAvoidingView>
          {/* line separator */}
          <View style={styles.lineSeparator} />
          {/* cards */}
          <View
            style={{
              ...styles.column,
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: Dimensions.get("window").height * 0.02,
            }}
          >
            {/* subtitle */}
            <Text
              numberOfLines={1}
              style={{
                ...styles.subtitle,
                maxWidth: Dimensions.get("window").width * 0.9,
              }}
            >
              {" "}
              Current Species:{" "}
              <Text style={{ color: "#F78D6C" }}>
                {typeof route.params != "undefined"
                  ? route.params.density.material
                  : "No Material Selected"}
              </Text>
            </Text>
            <View>
              {/* volume card */}
              <Card
                text="Volume ("
                super="3"
                unit="m"
                postText=")"
                body={volume}
              />

              {/* weight (POUNDS) */}
              <Card
                text="Weight (lbs)"
                body={
                  typeof route.params != "undefined"
                    ? (volume / 2.2) * (route.params.density.density * 2.2)
                    : 0
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
