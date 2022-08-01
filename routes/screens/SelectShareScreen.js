import { useState } from "react";
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

export default function ({ navigation, route }) {
  return (
    <View style={styles.container}>
      {/* uncomment the next line to see selected data */}
      {/* <Text>{JSON.stringify(route.params.shareData)}</Text> */}
      <View style={{ ...styles.denCard, padding: "5%" }}>
        <Text style={{ ...styles.title, margin: "5%", fontSize: 20 }}>
          Select Share Option:
        </Text>
        <Button
          arrow={true}
          width={Dimensions.get("window").width * 0.8}
          text="Send as Email"
        />
        <Button
          arrow={true}
          style={{ margin: "10%" }}
          width={Dimensions.get("window").width * 0.8}
          text="Send as Text"
        />
        <Button
          arrow={true}
          width={Dimensions.get("window").width * 0.8}
          text="Save Report File"
          onPress={() =>
            navigation.navigate("View Document", {
              shareData: route.params.shareData,
              packageData: route.params.packageData,
              action: "Save",
            })
          }
        />
      </View>
    </View>
  );
}
