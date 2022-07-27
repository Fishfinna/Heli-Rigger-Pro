import {
  Text,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import Form from "../../components/frustumForm.js";
import styles from "../../styles/globalStyles";
import React, { useState, useEffect } from "react";
import Card from "../../components/numCard";
import Button from "../../components/button";
import woodPresets from "../../woodPresets";
import { Icon } from "react-native-elements";
import PopUp from "../../components/popUp";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as yup from "yup";

export default function PresetsScreen() {
  // set up presets here
  const [presets, setPresets] = useState();

  // state setters for the modal
  const [modalOpen, setModal] = useState(false);
  const [selectedItem, setSelected] = useState({
    name: "",
    density: "",
    action: "",
  });

  // modal form controller
  const errorMSG = "must be a positive number";
  const reviewSchema = yup.object({
    itemName: yup.string().required("this field is required"),
    density: yup
      .number()
      .typeError(errorMSG)
      .positive(errorMSG)
      .required("this field is required"),
  });

  // read from storage
  async function readData() {
    try {
      let values = await AsyncStorage.getItem("@presets");
      if (values == null) {
        let history = await AsyncStorage.getItem("@beenSet");
        if (history == null) {
          await AsyncStorage.setItem("@beenSet", "set");
          await AsyncStorage.setItem("@presets", JSON.stringify(woodPresets));
        }
      }
      setPresets(JSON.parse(await AsyncStorage.getItem("@presets")));
    } catch (err) {
      console.log(err);
    }
  }

  // update storage
  async function updateData() {
    try {
      if (presets != null) {
        await AsyncStorage.setItem("@presets", JSON.stringify(presets));
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      updateData();
    }
    return () => {
      //when component unmounts, set isMounted to false
      isMounted = false;
    };
  }, [presets]);

  // read trigger
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      readData();
    }
    return () => {
      //when component unmounts, set isMounted to false
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.presetContainer}>
      {/* add modal popup */}
      <PopUp onPress={Keyboard.dismiss} visible={modalOpen}>
        <View style={styles.popUpNotify}>
          <Text onPress={() => setModal(false)}>
            <Icon name="close" size={30} color="black" />
          </Text>

          {/* start of form */}
          <Formik
            initialValues={{
              itemName: selectedItem.name,
              density: selectedItem.density,
            }}
            validationSchema={reviewSchema}
            validateOnChange={false}
            validateOnSubmit={true}
            onSubmit={(values) => {
              // save button set up
              if (selectedItem.action == "edit") {
                setPresets(
                  presets.map((preset, index) => {
                    if (
                      selectedItem.name === preset.name &&
                      selectedItem.density === preset.density &&
                      selectedItem.index === index
                    ) {
                      return {
                        name: values.itemName,
                        density: values.density,
                      };
                    } else return preset;
                  })
                );
              } else {
                setPresets([
                  {
                    name: values.itemName,
                    density: values.density,
                  },
                  ...presets,
                ]);
              }

              setModal(false);
            }}
          >
            {(props) => (
              <View style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ ...styles.title, position: "relative" }}>
                  {selectedItem.action} Preset
                </Text>
                <Text
                  style={
                    props.errors.itemName ? styles.errormsg : styles.emptymsg
                  }
                >
                  {props.errors.itemName}
                </Text>
                <View
                  style={{ ...styles.row, justifyContent: "space-between" }}
                >
                  <Text style={styles.subtitle}>Name:</Text>
                  <TextInput
                    contextMenuHidden={true}
                    style={{
                      ...styles.input,
                      minWidth: Dimensions.get("window").width * 0.45,
                      marginLeft: "10%",
                    }}
                    placeholder="species name"
                    placeholderTextColor="#CCCC"
                    value={`${props.values.itemName}`}
                    onChangeText={props.handleChange("itemName")}
                  ></TextInput>
                </View>
                <Text
                  style={
                    props.errors.density ? styles.errormsg : styles.emptymsg
                  }
                >
                  {props.errors.density}
                </Text>
                <View style={styles.row}>
                  <Text style={styles.subtitle}>Density:</Text>

                  <TextInput
                    contextMenuHidden={true}
                    style={{
                      ...styles.input,
                      minWidth: Dimensions.get("window").width * 0.45,
                      marginLeft: "5%",
                    }}
                    placeholder="0 pounds/meter"
                    placeholderTextColor="#CCCC"
                    value={`${props.values.density}`}
                    onChangeText={props.handleChange("density")}
                    keyboardType="numeric"
                  ></TextInput>
                </View>

                <Button text="save" onPress={props.handleSubmit} />
              </View>
            )}
          </Formik>
          {/* end of form */}
        </View>
      </PopUp>

      {/* start of list */}
      <FlatList
        ListHeaderComponent={
          <Button
            text="Add New Preset +"
            onPress={() => {
              setSelected({ name: "", density: "", action: "add new" });
              setModal(true);
            }}
          />
        }
        style={styles.presetList}
        ListFooterComponent={<View style={{ padding: "5%" }} />}
        data={presets}
        extraData={presets}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.PresetCard}>
              <Text style={styles.presetTitle}>
                <Text
                  style={{
                    ...styles.title,
                    textAlign: "left",
                  }}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>{" "}
                {"\n\n"}
                <View
                  style={{
                    ...styles.subscript,
                    padding: 0,
                  }}
                >
                  <Text style={styles.presetTitle} numberOfLines={1}>
                    Density: {item.density}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      lineHeight: 20,
                      color: "grey",
                    }}
                  >
                    {" "}
                    lbs/m
                  </Text>
                  <Text
                    style={{
                      fontSize: 8,
                      lineHeight: 10,
                      padding: 0,
                      color: "grey",
                    }}
                  >
                    3
                  </Text>
                </View>
              </Text>
              <View style={styles.row}>
                {/* edit */}
                <TouchableOpacity
                  onPress={() => {
                    setSelected({
                      name: item.name,
                      density: item.density,
                      action: "edit",
                      index: index,
                    });
                    setModal(true);
                  }}
                >
                  <Text>
                    <Icon
                      name="square-edit-outline"
                      color="#434A5D"
                      type="material-community"
                    />
                  </Text>
                </TouchableOpacity>

                {/* delete */}
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Are your sure?",
                      "Are you sure you want to delete this item?",
                      [
                        // The "Yes" button
                        {
                          text: "Yes",
                          onPress: () => {
                            // delete the item here
                            setPresets([
                              ...presets.filter((preset) => preset != item),
                            ]);
                          },
                        },
                        // The "No" button
                        // Does nothing but dismiss the dialog when tapped
                        {
                          text: "No",
                        },
                      ]
                    )
                  }
                >
                  <Text>
                    <Icon
                      name="delete"
                      color="#434A5D"
                      type="material-community"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      {/* end of flatList */}
    </View>
  );
}
