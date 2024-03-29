import {
  Text,
  Dimensions,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import styles from "../../styles/globalStyles";
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "react-native-elements";
import NumInput from "../../components/numInput.js";
import { Formik, Form } from "formik";
import { Picker } from "@react-native-picker/picker";
import Button from "../../components/button.js";
import woodPresets from "../../woodPresets";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Reviewform({ navigation, route }) {
  // picker state
  const [selectedPreset, setPreset] = useState();

  // weight controls
  const [itemWeight, setWeight] = useState();

  useEffect(() => {
    // go to next page here
    if (typeof itemWeight !== "undefined") {
      navigation.navigate("Scale", {
        // item wright here is {material: string, density: num}
        density: itemWeight,
      });
    }
  }, [itemWeight]);

  // set up for reading from async storage data
  const [presetData, setData] = useState(woodPresets);

  // read function
  async function readData() {
    try {
      // await AsyncStorage.removeItem("@presets"); //commenting this line will restart the app memory
      let values = await AsyncStorage.getItem("@presets");
      if (values == null) {
        let history = await AsyncStorage.getItem("@beenSet");
        if (history == null) {
          await AsyncStorage.setItem("@beenSet", "set");
          await AsyncStorage.setItem("@presets", JSON.stringify(woodPresets));
        }
      }

      let data = JSON.parse(await AsyncStorage.getItem("@presets"));
      if (mounted.current) {
        setData(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // read trigger
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;

    if (mounted.current) {
      readData();
    }

    return () => {
      mounted.current = false;
    };
  }, [presetData]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setPreset();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.centerScroll}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.densityBody}>
          {/* Custom */}
          <View style={styles.denCard}>
            <Text style={styles.title}>use custom value</Text>
            <Formik
              initialValues={{
                custom:
                  typeof itemWeight !== "undefined" ? itemWeight.density : "",
              }}
              onSubmit={(val) => {
                // custom area submit event
                setWeight({
                  material: "Custom",
                  density:
                    (val.custom != "") & (val.custom != ".") ? val.custom : "0",
                });
              }}
            >
              {(props) => (
                <View>
                  <NumInput
                    text="Custom Density:"
                    value={`${props.values.custom}`}
                    onChangeText={props.handleChange("custom")}
                    format="lbs/m"
                    super={3}
                  />
                  <Button
                    text="use custom value"
                    alignSelf="center"
                    onPress={props.handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </View>

          {/* line separator */}
          <View style={{ ...styles.lineSeparator, margin: "4%" }} />

          {/* Preset */}
          <View style={styles.denCard}>
            <View
              style={{
                ...styles.subscript,
                padding: 0,
                marginHorizontal: "10%",
                alignSelf: "center",
              }}
            >
              <Text style={styles.title}>use preset value</Text>
              <Text style={{ lineHeight: 45, color: "grey" }}>lbs/m</Text>
              <Text
                style={{
                  fontSize: 8,
                  lineHeight: 35,
                  padding: 0,
                  color: "grey",
                }}
              >
                3
              </Text>
            </View>

            {/* picker content */}
            <Picker
              selectedValue={JSON.stringify(selectedPreset)}
              onValueChange={(itemValue, itemIndex) => {
                setPreset({
                  name: JSON.parse(itemValue)["name"],
                  density: JSON.parse(itemValue)["density"],
                });
              }}
              itemStyle={{
                color: "#434A5D",
                textAlign: "center",
                fontWeight: "600",
                height: "100%",
              }}
              style={{
                backgroundColor: "#F3EFEF",
                borderRadius: 20,
                height: Dimensions.get("window").height * 0.2,
              }}
            >
              {presetData.map((preset) => {
                // each preset is {name: "string", density: number}
                return (
                  <Picker.Item
                    label={preset.name + ":  " + preset.density}
                    value={JSON.stringify(preset)}
                    themeVariant="dark"
                    key={
                      preset.name +
                      Math.random()
                        .toString(36)
                        .replace(/[^a-z]+/g, "")
                        .substring(0, 5)
                    }
                  />
                );
              })}
            </Picker>
            <View style={styles.row}>
              {/* submit button */}
              <Button
                text="Use Preset"
                width={Dimensions.get("window").width * 0.35}
                onPress={() => {
                  if (selectedPreset) {
                    setWeight({
                      material: selectedPreset.name,
                      density: selectedPreset.density,
                    });
                  } else {
                    setWeight({
                      // this will take the first value if the slider has not been slid
                      material: presetData[0].name,
                      density: presetData[0].density,
                    });
                  }
                }}
              />
              <Button
                text="Edit Presets"
                bg="#434A5D"
                width={Dimensions.get("window").width * 0.4}
                onPress={() => navigation.navigate("Presets")}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
