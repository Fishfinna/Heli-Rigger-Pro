import { Text, Dimensions, View, TouchableWithoutFeedback } from "react-native";
import styles from ".././styles/globalStyles";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import NumInput from "./numInput.js";
import FlatButton from "./button.js";
import { Formik, Form } from "formik";
import { Picker } from "@react-native-picker/picker";
import Button from "./button.js";
import Presets from "../woodPresets";

export default function Reviewform({ setModal, setWeight, itemWeight }) {
  // picker state

  const [selectedPreset, setPreset] = useState();

  return (
    <View style={styles.modalBody}>
      {/* return */}
      <TouchableWithoutFeedback onPress={() => setModal(false)}>
        <View style={styles.cancel}>
          <Icon name="arrow-back" size={40} color="#434A5D" type="material" />
          <Text style={styles.cancelText}> RETURN </Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Custom */}
      <View style={styles.card}>
        <Text style={styles.title}>use custom value</Text>
        <Formik
          initialValues={{
            custom: itemWeight.density ? itemWeight.density : "",
          }}
          onSubmit={(val) => {
            // top custom area submit event
            setWeight({ material: "Custom", density: val.custom });
            // close the page
            setModal(false);
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
                text="set custom value"
                width="200"
                alignSelf="center"
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>

      {/* line separator */}
      <View style={styles.lineSeparator} />

      {/* Preset */}
      <View style={styles.card}>
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
          }}
          style={{
            backgroundColor: "#F3EFEF",
            borderRadius: 20,
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
          <Button
            text="Set Preset"
            onPress={
              () => {
                if (selectedPreset) {
                  setWeight({
                    material: selectedPreset.name,
                    density: selectedPreset.density,
                  });
                } else {
                  setWeight({
                    material: Presets[0].name,
                    density: Presets[0].density,
                  });
                }
                setModal(false);
              }
              // close the page
            }
          />
          <Button text="Edit Presets" bg="#434A5D" arrow={true} />
        </View>
      </View>
    </View>
  );
}
