import { useState } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import styles from "../../styles/globalStyles";
import Button from "../../components/button";
import { Formik } from "formik";
import * as yup from "yup";

export default function ({ navigation, route }) {
  const validationSchema = yup.object({
    idNum: yup
      .string()
      .matches(/^[0-9]+$/, "Must be only digits (0-9)")
      .test("len", "Must be less than 25 characters.", (val) =>
        val ? val.length <= 25 : true
      ),
    project: yup
      .string()
      .typeError("Required: must be a string of characters.")
      .strict(true)
      .test("len", "Required: Must be within 1-25 characters.", (val) =>
        val ? val.length <= 25 : false
      ),
    who: yup
      .string()
      .typeError("Required: must be a string of characters.")
      .strict(true)
      .test("len", "Required: Must be within 1-25 characters.", (val) =>
        val ? val.length <= 25 : false
      ),
    where: yup
      .string()
      .typeError("Required: must be a string of characters.")
      .strict(true)
      .test("len", "Required: Must be within 1-25 characters.", (val) =>
        val ? val.length <= 25 : false
      ),
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          {/* uncomment the next line to see selected data */}
          {/* <Text>{JSON.stringify(route.params.shareData)}</Text> */}

          {/* start of form */}
          <Formik
            initialValues={{
              idNum: "",
              project: "",
              who: "",
              where: "",
            }}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnSubmit={true}
            onSubmit={(values) => {
              navigation.navigate("Share Options", {
                shareData: route.params.shareData,
                packageData: values,
              });
            }}
          >
            {(props) => (
              <View
                style={{
                  display: "flex",
                  alignItems: "space-between",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text style={{ ...styles.title, position: "relative" }}>
                  Input Report Data
                </Text>

                {/* start of inputs */}

                <Text
                  style={props.errors.idNum ? styles.errormsg : styles.emptymsg}
                >
                  {props.errors.idNum}
                </Text>

                <View style={styles.shareDataForm}>
                  <Text
                    style={{
                      ...styles.subtitle,
                      textAlign: "left",
                      minWidth: "40%",
                    }}
                  >
                    ID Number <Text style={{ fontSize: 8 }}>(Optional)</Text>:
                  </Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      minWidth: Dimensions.get("window").width * 0.49,
                    }}
                    placeholder="ID Number"
                    placeholderTextColor="#CCCC"
                    value={`${props.values.idNum}`}
                    onChangeText={props.handleChange("idNum")}
                  ></TextInput>
                </View>

                <Text
                  style={
                    props.errors.project ? styles.errormsg : styles.emptymsg
                  }
                >
                  {props.errors.project}
                </Text>

                <View style={styles.shareDataForm}>
                  <Text
                    style={{
                      ...styles.subtitle,
                      textAlign: "left",
                      minWidth: "40%",
                    }}
                  >
                    Project Name:
                  </Text>

                  <TextInput
                    style={{
                      ...styles.input,
                      minWidth: Dimensions.get("window").width * 0.49,
                    }}
                    placeholder="Project Name"
                    placeholderTextColor="#CCCC"
                    value={`${props.values.project}`}
                    onChangeText={props.handleChange("project")}
                  ></TextInput>
                </View>

                <Text
                  style={props.errors.who ? styles.errormsg : styles.emptymsg}
                >
                  {props.errors.who}
                </Text>

                <View style={styles.shareDataForm}>
                  <Text
                    style={{
                      ...styles.subtitle,
                      textAlign: "left",
                      minWidth: "40%",
                    }}
                  >
                    Operator Name:
                  </Text>

                  <TextInput
                    style={{
                      ...styles.input,
                      minWidth: Dimensions.get("window").width * 0.49,
                    }}
                    placeholder="Your Name"
                    placeholderTextColor="#CCCC"
                    value={`${props.values.who}`}
                    onChangeText={props.handleChange("who")}
                  ></TextInput>
                </View>

                <Text
                  style={props.errors.where ? styles.errormsg : styles.emptymsg}
                >
                  {props.errors.where}
                </Text>

                <View style={styles.shareDataForm}>
                  <Text
                    style={{
                      ...styles.subtitle,
                      textAlign: "left",
                      minWidth: "40%",
                    }}
                  >
                    Location:
                  </Text>

                  <TextInput
                    style={{
                      ...styles.input,
                      minWidth: Dimensions.get("window").width * 0.49,
                    }}
                    placeholder="Location"
                    placeholderTextColor="#CCCC"
                    value={`${props.values.where}`}
                    onChangeText={props.handleChange("where")}
                  ></TextInput>
                </View>

                {/* end of inputs */}

                <Button
                  arrow={true}
                  text="Continue"
                  onPress={props.handleSubmit}
                />
              </View>
            )}
          </Formik>
          {/* end of form */}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
