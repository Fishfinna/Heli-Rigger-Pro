import React, { useState, useEffect } from "react";
import {
  Text,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  StatusBar,
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
      await AsyncStorage.setItem("@history", JSON.stringify(updatedList));
    } catch (err) {
      console.log(err);
    }
  }

  async function updateItems(dataList) {
    //this takes a list that will be used to replace the data
    try {
      dataList == null ? (dataList = []) : null;
      await AsyncStorage.setItem("@history", JSON.stringify(dataList));
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
          <Text style={styles.subtitle}>
            Scale Calculations results will be saved here automatically when
            values are entered.
          </Text>
        }
        ListHeaderComponent={
          <View style={{ marginBottom: 20 }}>
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
              arrow={true}
              width={Dimensions.get("window").width * 0.92}
              text="Share selected"
            />
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
                text={"Select"}
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
