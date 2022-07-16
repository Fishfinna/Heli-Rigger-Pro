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
import styles from ".././styles/globalStyles";
import React, { useState, useEffect } from "react";
import { Icon, SearchBar } from "react-native-elements";
import NumInput from "./numInput.js";
import FlatButton from "./button.js";
import { Formik, Form } from "formik";

export default function Reviewform({ setModal, setWeight, itemWeight }) {
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
      <View style={{ backgroundColor: "#Fafafa", padding: 10 }}>
        <Text style={styles.title}>use custom value</Text>
        <Formik
          initialValues={{
            custom: itemWeight.density ? itemWeight.density : "",
          }}
          onSubmit={(val) => {
            // top custom area submit event
            setWeight({ material: "Custom", density: val.custom });
            // close the page

            alert(
              `Selected material: ${itemWeight.material}, ${itemWeight.density}kg/m`
            );
            setModal(false);
          }}
        >
          {(props) => (
            <View>
              <NumInput
                text="Custom Density:"
                value={props.values.custom}
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
      <View
        style={{
          borderWidth: 1,
          borderColor: "#434A5D",
          width: "100%",
          marginBottom: 10,
        }}
      />

      {/* Preset */}
      <Text style={styles.title}>use preset value</Text>
      <SearchBar />
    </View>
  );
}
