import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import styles from "../../styles/globalStyles";
import { Icon } from "react-native-elements";
import Button from "../../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HistoryCard from "../../components/historyCard";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function RecordScreen({ navigation, route }) {
  //state used for storing the list data
  const [recordData, setRecordData] = useState();

  //set up the select states
  const [selectAll, setSelectAll] = useState("Select All");
  const [defaultSelect, setDefaultSelect] = useState(false);
  const [selectedList, setList] = useState([]);

  //auto saving
  const [autoSave, setAutoSave] = useState(async () => {
    let valid = await AsyncStorage.getItem("@auto");
    if (valid == null) {
      valid = "enable";
      await AsyncStorage.setItem("@auto", valid);
    }

    return valid;
  });

  async function readHistory() {
    // read record from memory
    try {
      let values = await AsyncStorage.getItem("@history");
      if (values != null) {
        setRecordData(JSON.parse(values));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteItem(data) {
    //this takes a data object and filters it out of the data, then saves it
    try {
      let updatedList = await recordData.filter(
        (item) => JSON.stringify(item) != JSON.stringify(data)
      );
      setRecordData(updatedList);
      try {
        await AsyncStorage.setItem("@history", JSON.stringify(updatedList));
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateItems(dataList) {
    //this takes a list that will be used to replace the data
    try {
      dataList == null ? (dataList = []) : null;
      await AsyncStorage.setItem("@history", JSON.stringify(dataList));
      setSelectAll("Select All");
      setList([]);
      setDefaultSelect(false);
      setRecordData();
      readHistory();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const data = navigation.addListener("focus", () => {
      setList([]);
      setDefaultSelect(false);
      setSelectAll("Select All");
      setRecordData();
      readHistory();
    });
    return data;
  });

  useEffect(() => {
    setRecordData();
    readHistory();
  }, [selectAll, defaultSelect]);

  return (
    <View style={styles.container}>
      {/* start of list */}
      <FlatList
        ListEmptyComponent={
          // this will be rendered when the list is empty
          <View style={{ padding: 10 }}>
            <Text style={styles.subtitle}>
              Scale Calculation results will be saved here automatically when
              values are entered. A maximum of 100 values can be stored at once.
            </Text>
          </View>
        }
        ListHeaderComponent={
          <View
            style={{ marginBottom: 20, display: "flex", alignItems: "center" }}
          >
            {/* line separator */}
            <View
              style={{
                ...styles.lineSeparator,
                width: "100%",
                borderBottomColor: "#DEDEDE",
                marginVertical: "2%",
              }}
            />

            {/* auto save button */}
            <Button
              style={{ margin: 10 }}
              width={Dimensions.get("window").width * 0.92}
              text={
                autoSave == "disable"
                  ? "Enable AutoSaving"
                  : "Disable AutoSaving"
              }
              bg={autoSave == "disable" ? null : "#434A5D"}
              onPress={async () => {
                if (autoSave == "disable") {
                  setAutoSave("enable");
                  await AsyncStorage.setItem("@auto", "enable");
                } else {
                  setAutoSave("disable");
                  await AsyncStorage.setItem("@auto", "disable");
                }
              }}
            />

            {/* line separator */}
            <View style={styles.lineSeparator} />

            {recordData && recordData.length ? (
              <View>
                <Button
                  style={{ margin: 10 }}
                  arrow={true}
                  width={Dimensions.get("window").width * 0.92}
                  text="Share selected"
                  onPress={() => {
                    if (selectedList.length > 0) {
                      let currentList = selectedList;
                      setList([]);
                      navigation.navigate("Share Data", {
                        shareData: currentList,
                      });
                    } else {
                      Alert.alert(
                        "Selected Data Required",
                        "No selected data found, please add items from the list below that you wish to share.",
                        [
                          {
                            text: "return",
                          },
                        ]
                      );
                    }
                  }}
                />

                <View style={styles.lineSeparator} />

                <View style={styles.row}>
                  <Button
                    width={Dimensions.get("window").width * 0.4}
                    text={selectAll}
                    onPress={() => {
                      if (selectAll == "Select All") {
                        setSelectAll("Deselect All");
                        setDefaultSelect(true);
                        setList(recordData);
                      } else {
                        setSelectAll("Select All");
                        setDefaultSelect(false);
                        setList([]);
                      }
                    }}
                  />
                  <Button
                    textStyle={{ overflow: "hidden" }}
                    width={Dimensions.get("window").width * 0.5}
                    text="delete selected"
                    bg="#434A5D"
                    onPress={() => {
                      Alert.alert(
                        "Are your sure?",
                        "Are you sure you want to delete these items? Deleted data can not be restored.",
                        [
                          // The "Yes" button
                          {
                            text: "Yes",
                            onPress: () => {
                              // delete the item here
                              setDefaultSelect(false);

                              let update = recordData.filter(
                                (record) =>
                                  !JSON.stringify(selectedList).includes(
                                    JSON.stringify(record)
                                  )
                              );

                              updateItems(update);
                              setList([]);
                              setDefaultSelect(false);
                            },
                          },
                          // The "No" button
                          // Does nothing but dismiss the dialog when tapped
                          {
                            text: "No",
                          },
                        ]
                      );
                    }}
                  />
                </View>

                <Button
                  textStyle={{ overflow: "hidden" }}
                  width={Dimensions.get("window").width * 0.92}
                  text="delete all"
                  bg="#434A5D"
                  onPress={() => {
                    Alert.alert(
                      "Are your sure?",
                      "Are you sure you want to delete these items? Deleted data can not be restored.",
                      [
                        // The "Yes" button
                        {
                          text: "Yes",
                          onPress: () => {
                            // delete the item here
                            setDefaultSelect(false);

                            updateItems([]);
                            setList([]);
                            setDefaultSelect(false);
                          },
                        },
                        // The "No" button
                        // Does nothing but dismiss the dialog when tapped
                        {
                          text: "No",
                        },
                      ]
                    );
                  }}
                />
              </View>
            ) : null}
          </View>
        }
        style={styles.presetList}
        contentContainerStyle={{ paddingBottom: "14%" }}
        data={recordData}
        extraData={defaultSelect || recordData}
        renderItem={(record) => {
          // draw card here
          return (
            <HistoryCard item={record.item}>
              <BouncyCheckbox
                size={25}
                fillColor="#F78D6C"
                unfillColor="transparent"
                textStyle={{
                  textDecorationLine: "none",
                  color: "#434A5D",
                }}
                isChecked={defaultSelect}
                iconStyle={{ borderColor: "white" }}
                iconInnerStyle={{ borderWidth: 2 }}
                onPress={(isChecked) => {
                  isChecked
                    ? setList([...selectedList, record.item])
                    : setList(
                        selectedList.filter(
                          (item) =>
                            JSON.stringify(item) != JSON.stringify(record.item)
                        )
                      );
                }}
              />

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Are your sure?",
                    "Are you sure you want to delete this item? Deleted data can not be restored.",
                    [
                      // The "Yes" button
                      {
                        text: "Yes",
                        onPress: () => {
                          // delete the item here

                          deleteItem(record.item);
                        },
                      },
                      // The "No" button
                      // this does nothing but dismiss the dialog when tapped
                      {
                        text: "No",
                      },
                    ]
                  )
                }
              >
                <Icon name="delete" color="#434A5D" type="material-community" />
              </TouchableOpacity>
            </HistoryCard>
          );
        }}
      />
      {/* end of flatList */}
    </View>
  );
}
