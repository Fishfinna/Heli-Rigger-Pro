import { shareAsync } from "expo-sharing";
import { WebView } from "react-native-webview";
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import Button from "../../components/button";
import styles from "../../styles/globalStyles";
import { Icon } from "react-native-elements";
import * as MailComposer from "expo-mail-composer";

export default function ViewDocument({ navigation, route }) {
  const [file, setFile] = useState(route.params.file);

  async function sendEmailAsync() {
    try {
      if (MailComposer.isAvailableAsync()) {
        let result = await MailComposer.composeAsync({
          recipients: [""],
          subject: "Heli Rigger Pro Report",
          body: "Your document is attached. Please add a recipient and format this email with all relevant information.",
          attachments: [file.uri],
        });
        alert("Your Email has been " + result.status + ".");
      }
    } catch (error) {
      Alert.alert(
        "Email Error",
        "Please try again, an error occurred. Error Info:" +
          error[{ text: "OK" }]
      );
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.dataViewContainer}>
          <WebView
            originWhitelist={["*"]}
            source={{ uri: file ? file.uri : null }}
          />
        </View>

        {/* uncomment the following line to see the data structure */}
        {/* <Text>{JSON.stringify(route.params)}</Text> */}
        <Button
          text={route.params.action + " report"}
          width={Dimensions.get("window").width * 0.8}
          onPress={
            route.params.action == "Save"
              ? async () => await shareAsync(file.uri)
              : sendEmailAsync
          }
        />
        <Button
          width={Dimensions.get("window").width * 0.8}
          text="start a new report"
          arrow
          bg="#434A5D"
          onPress={() => navigation.navigate("Calculation History")}
        />
      </View>
    </ScrollView>
  );
}
