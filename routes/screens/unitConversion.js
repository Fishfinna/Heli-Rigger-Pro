import React, { useState, Component } from "react";
import { Text, Dimensions, View } from "react-native";
import styles from "../../styles/globalStyles";
import NumInput from "../../components/numInput.js";
import { Formik } from "formik";
import Button from "../../components/button.js";
import { ScrollView } from "react-native-gesture-handler";

export default function Length({ navigation, route }) {
  // use the smallest as the base = 1

  let units = route.params.units;

  // make a copy for edits
  let initialValues = { ...units };
  Object.keys(initialValues).map((key) => (initialValues[key] = ""));

  return (
    <ScrollView>
      <View style={styles.containerUncentered}>
        <Text style={{ ...styles.title, marginTop: "10%" }}>
          {route.params.title} Unit Conversion
        </Text>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            resetForm();
          }}
        >
          {(props) => (
            <View style={styles.inputColumn}>
              {Object.keys(units).map((unit) => {
                return (
                  <NumInput
                    width={Dimensions.get("window").width * 0.65}
                    key={`${unit}`}
                    text={`${unit}:`}
                    value={`${props.values[unit]}`}
                    onChangeText={(e) => {
                      props.handleChange(unit)(e);
                      //   get the value in cm
                      let unitCM = e / units[unit];

                      // update all other values
                      Object.keys(props.values).map((key) => {
                        if (unit != key) {
                          props.setFieldValue(
                            key,
                            e == 0 ? "" : unitCM * units[key]
                          );
                        }
                      });
                    }}
                  />
                );
              })}
              <Button
                text="clear values"
                alignSelf="center"
                onPress={props.handleSubmit}
                style={{ marginRight: "25%" }}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
