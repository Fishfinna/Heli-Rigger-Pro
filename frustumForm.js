import * as React from "react";
import { StyleSheet, Button, TextInput, View } from "react-native";
import styles from "../styles/globalStyles";
import { Formik, Field, Form } from "formik";
import FlatButton from "./button.js";
import NumInput from "./numInput.js";
import * as yup from "yup";

export default function Reviewform({ navigation, findNums, total }) {
  // form control
  const reviewSchema = yup.object({
    base: yup.number().positive().moreThan(yup.ref("top")),
    top: yup.number().positive(),
    height: yup.number().positive(),
  });

  return (
    <View>
      <Formik
        initialValues={{ base: "", top: "", height: "" }}
        onSubmit={(values) => {
          findNums(values);
          navigation.navigate("Density");
        }}
        validationSchema={reviewSchema}
      >
        {(props) => (
          <View>
            <NumInput
              text="Base Diameter (D):"
              onChangeText={props.handleChange("base")}
              value={props.values.base}
              format="cm"
            />

            <NumInput
              text="Top Diameter (d):"
              value={props.values.top}
              onChangeText={(values) => {
                props.handleChange("top")(values);
                console.log(values);
              }}
              format="cm"
            />

            <NumInput
              text="Height (h):"
              onChangeText={props.handleChange("height")}
              value={props.values.height}
              format="m"
            />

            <FlatButton
              text="Select Density"
              width="300%"
              arrow="Display"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
