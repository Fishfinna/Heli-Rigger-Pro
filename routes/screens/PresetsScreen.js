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

export default function Presets() {
  const [addModal, setAddModal] = useState(false);

  return (
    <View style={styles.presetContainer}>
      {/* add modal popup */}
      <PopUp onPress={Keyboard.dismiss} visible={addModal}>
        <View style={styles.popUpNotify}>
          <Text onPress={() => setAddModal(false)}>
            <Icon name="close" size={30} color="black" />
          </Text>

          {/* start of form */}
          <Formik initialValues={{ itemName: "", density: "" }}>
            {(props) => (
              <View style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ ...styles.title, position: "relative" }}>
                  Add Preset
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
                    placeholder="material name"
                    placeholderTextColor="#CCCC"
                    value={`${props.values.itemName}`}
                    onChangeText={props.handleChange("itemName")}
                  ></TextInput>
                </View>
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

                <Button text="save" />
              </View>
            )}
          </Formik>
          {/* end of form */}
        </View>
      </PopUp>

      {/* start of list */}
      <FlatList
        ListHeaderComponent={
          <Button text="Add New Preset+" onPress={() => setAddModal(true)} />
        }
        style={styles.presetList}
        ListFooterComponent={<View style={{ padding: "5%" }} />}
        data={woodPresets}
        renderItem={({ item }) => {
          return (
            <View style={styles.PresetCard}>
              <Text style={styles.presetTitle}>
                <Text style={{ ...styles.title, textAlign: "left" }}>
                  {item.name}
                </Text>{" "}
                {"\n\n"}
                <View
                  style={{
                    ...styles.subscript,
                    padding: 0,
                  }}
                >
                  <Text style={styles.presetTitle}>
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
                <TouchableOpacity onPress={() => console.log(item)}>
                  <Text style={{ paddingLeft: "5%" }}>
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
                            console.log(item);
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
