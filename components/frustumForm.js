import * as React from "react";
import { StyleSheet, TextInput, View, Text, Dimensions } from "react-native";
import styles from "../styles/globalStyles";
import { Formik, Field, Form } from "formik";
import Button from "./button.js";
import NumInput from "./numInput.js";
import * as yup from "yup";

export default function Reviewform({ navigation, findNums, total }) {
  // form control
  const errorMSG = "must be a positive number";
  const reviewSchema = yup.object({
    base: yup.number().typeError(errorMSG).positive(errorMSG),
    top: yup
      .number(errorMSG)
      .positive(errorMSG)
      .typeError(errorMSG)
      .max(yup.ref("base"), "Top Diameter (d) should be less than Butt (D)."),
    length: yup.number(errorMSG).typeError(errorMSG).positive(errorMSG),
  });

  return (
    <View>
      <Formik
        initialValues={{ base: "", top: "", length: "" }}
        validationSchema={reviewSchema}
        validateOnChange={true}
      >
        {(props) => (
          <View style={{ display: "flex", flexDirection: "column" }}>
            <View
              style={{ paddingLeft: Dimensions.get("window").width * 0.05 }}
            >
              <Text
                style={props.errors.base ? styles.errormsg : styles.emptymsg}
              >
                {props.errors.base}
              </Text>
              <NumInput
                name="base"
                text="Butt Diameter (D):"
                onChangeText={(e) => {
                  props.handleChange("base")(e);
                  findNums({
                    base: e,
                    top: props.values.top,
                    length: props.values.length,
                  });
                }}
                value={props.values.base}
                format="cm"
              />
              <Text
                style={props.errors.length ? styles.errormsg : styles.emptymsg}
              >
                {props.errors.length}
              </Text>
              <NumInput
                text="Length (L):"
                onChangeText={(e) => {
                  props.handleChange("length")(e);
                  findNums({
                    base: props.values.base,
                    top: props.values.top,
                    length: e,
                  });
                }}
                value={props.values.length}
                format="m"
              />
              <Text
                style={props.errors.top ? styles.errormsg : styles.emptymsg}
              >
                {props.errors.top}
              </Text>
              <NumInput
                text="Top Diameter (d):"
                value={props.values.top}
                onChangeText={(e) => {
                  props.handleChange("top")(e);
                  findNums({
                    base: props.values.base,
                    top: e,
                    length: props.values.length,
                  });
                }}
                format="cm"
              />
            </View>

            <View style={styles.row}>
              <Button
                text="Select Density"
                arrow="Display"
                onPress={() => navigation.navigate("Density")}
              />
              <Button
                text="Clear"
                bg="#434A5D"
                onPress={() => {
                  props.resetForm();
                  findNums({
                    base: 0,
                    top: 0,
                    length: 0,
                  });
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
