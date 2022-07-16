import React, { FormEvent } from "react";
import { StyleSheet, Button, TextInput, View } from "react-native";
import styles from ".././styles/globalStyles";
import { Formik, Form } from "formik";
import FlatButton from "./button.js";
import NumInput from "./numInput.js";
import * as yup from "yup";

export default function Reviewform({ findNums, setModal }) {
  // refresh control
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 250);
  }, []);

  // form control
  const reviewSchema = yup.object({
    base: yup.number().positive().max(200).moreThan(yup.ref("top")),
    top: yup.number().positive().max(200),
    height: yup.number().positive().max(200),
  });

  return (
    <View>
      <Formik
        initialValues={{ base: "", top: "", height: "" }}
        onSubmit={(values) => {
          findNums(values);
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
              onChangeText={props.handleChange("top")}
              value={props.values.top}
              format="cm"
            />

            <NumInput
              text="Height (h):"
              onChangeText={props.handleChange("height")}
              value={props.values.height}
              format="m"
            />

            <View style={styles.row}>
              <FlatButton text="calculate" onPress={props.handleSubmit} />
              <FlatButton
                text="Select Density"
                alignSelf="right"
                arrow="Display"
                onPress={() => (setModal ? setModal(true) : null)}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
