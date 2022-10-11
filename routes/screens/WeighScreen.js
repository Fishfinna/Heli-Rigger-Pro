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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VolumeScreen({ navigation, route }) {
  // form input processing
  const [volume, setVolume] = useState(0);
  const [formData, setFormData] = useState({ base: 0, top: 0, length: 0 });

  const findNums = (nums) => {
    setVolume(() => {
      if (nums.base > 0 && nums.top > 0 && nums.length > 0) {
        setFormData(nums);
        let R = nums.base / 2;
        let r = nums.top / 2;
        let h = nums.length * 100;

        let volume =
          ((1 / 3) * Math.PI * h * (r * r + R * R + r * R)) / 1000000; //we divide by 1000000 to get it out of cm and to meters.
        // return the volume
        return volume;
      } else {
        return 0;
      }
    });
  };

  //define the function for storing data
  async function setData(dataObject) {
    try {
      //uncomment the following line to wipe the data
      // await AsyncStorage.setItem("@history", "");

      //read the data
      let storedValue = JSON.parse(await AsyncStorage.getItem("@history"));

      if (storedValue == null) {
        storedValue = Array();
      }

      //make sure the data is original
      if (!JSON.stringify(storedValue).includes(JSON.stringify(dataObject))) {
        //append the new object
        storedValue.unshift(dataObject);

        //slice to be a max of 100
        storedValue.length > 100 ? (storedValue.length = 100) : storedValue;

        await AsyncStorage.setItem("@history", JSON.stringify(storedValue));
      }
    } catch (err) {
      console.log(err);
    }
  }

  // record date object
  const recordData = async () => {
    let valid = await AsyncStorage.getItem("@auto");

    if (valid == null) {
      valid = "enable";
      await AsyncStorage.setItem("@auto", valid);
    }

    if (
      valid == "enable" &&
      route.params &&
      formData.base > 0 &&
      formData.top > 0 &&
      formData.length > 0 &&
      parseInt(formData.base) >= parseInt(formData.top) &&
      volume > 0
    ) {
      let date = new Date();
      // here we make an object with the data we need to log for later
      let recordObject = {
        butt: formData.base,
        length: formData.length,
        top: formData.top,
        species: route.params.density.material,
        density: route.params.density.density,
        time:
          date.toDateString() +
          " " +
          date.getHours() +
          ":" +
          ("0" + date.getMinutes()).slice(-2),
        volume: volume,
        weight: (volume / 2.2) * (route.params.density.density * 2.2),
      };
      //save the data to async storage
      setData(recordObject);
    }
  };

  // record log on set data change
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (!navigation.canGoBack()) {
        recordData();
      }
    });
    return unsubscribe;
  });

  //record log when the keyboard goes down
  useEffect(() => {
    const keyboardState = Keyboard.addListener("keyboardDidHide", () => {
      recordData();
    });

    return () => keyboardState;
  });

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
                fontSize: 14,
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
