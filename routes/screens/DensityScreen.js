import {
  Text,
  Dimensions,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import styles from "../../styles/globalStyles";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import NumInput from "../../components/numInput.js";
import FlatButton from "../../components/button.js";
import { Formik, Form } from "formik";
import { Picker } from "@react-native-picker/picker";
import Button from "../../components/button.js";
import Presets from "../../woodPresets";

export default function Reviewform({ navigation, route }) {
  // picker state

  const [selectedPreset, setPreset] = useState();

  // weight controls
  const [itemWeight, setWeight] = useState();

  useEffect(() => {
    // !go to next page here!
    if (typeof itemWeight !== "undefined") {
      navigation.navigate("Frustum", {
        // item wright here is {material: string, density: num}
        density: itemWeight,
      });
    }
  }, [itemWeight]);

  return (
    <ScrollView>
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
                // top custom area submit event
                setWeight({
                  material: "Custom",
                  density: val.custom ? val.custom : "0",
                });
              }}
            >
              {(props) => (
                <View>
                  <NumInput
                    text="Custom Density:"
                    value={`${props.values.custom}`}
                    onChangeText={props.handleChange("custom")}
                    format="kg/m"
                    super={3}
                  />
                  <FlatButton
                    text="use custom value"
                    width="240"
                    alignSelf="center"
                    onPress={props.handleSubmit}
                    arrow={true}
                  />
                </View>
              )}
            </Formik>
          </View>

          {/* line separator */}
          <View style={styles.lineSeparator} />

          {/* Preset */}
          <View style={styles.denCard}>
            <Text style={styles.title}>use preset value</Text>

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
                fontWeight: "500",
                height: "100%",
              }}
              style={{
                backgroundColor: "#F3EFEF",
                borderRadius: 20,
                height: Dimensions.get("window").height * 0.2,
              }}
            >
              {Presets.map((preset) => {
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
                arrow={true}
                onPress={() => {
                  if (selectedPreset) {
                    setWeight({
                      material: selectedPreset.name,
                      density: selectedPreset.density,
                    });
                  } else {
                    setWeight({
                      // this will take the first value if the slider has not been slid
                      material: Presets[0].name,
                      density: Presets[0].density,
                    });
                  }
                }}
              />
              <Button text="Edit Presets" bg="#434A5D" />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
