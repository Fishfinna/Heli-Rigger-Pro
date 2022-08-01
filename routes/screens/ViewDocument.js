import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { WebView } from "react-native-webview";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import Button from "../../components/button";
import styles from "../../styles/globalStyles";
import { Icon } from "react-native-elements";

const htmlReport = `
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    </head>
    <style type="text/css">
    html *{font-family: serif; color: #2b2b2b;}
        body{min-width: 90vw; margin: 20px; padding: 5%}
        ol{margin:0;padding:0}
        table td,table th{padding:0}
       table {
  width: 100%;
  background-color: #FFFFFF;
  border-collapse: collapse;
  border-width: 2px;
  border-color: #E0E0E0;
  border-style: solid;
 
}

table td, table th {
  border-width: 2px;
  border-color: #E0E0E0;
  border-style: solid;
  padding: 15px;
  text-align: left
 
}

td { color: #2a2a2a;}

tr:nth-child(even){
  background-color: #f5f5f5;
}

table thead {
  background-color: #2B2B2B;
}

tr th{ color: #fefefe;}
    </style>
    <body class="c20 doc-content">

        <h1>MEASUREMENT REPORT</h1>
        <h2> Submitted By: NAME, DATE</h2>
        <hr>
        <p> ID Number:</p>
        <p>Project Name:</p>
        <p>Location:</p>
        <hr>
        <div style="display: flex; margin: 10%; justify-content: center">
            <table class="customTable">
                <thead>
                    <tr>
                        <th>Header 1</th>
                        <th>Header 2</th>
                        <th>Header 3</th>
                        <th>Header 4</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Row 1, Cell 1</td>
                        <td>Row 1, Cell 2</td>
                        <td>Row 1, Cell 3</td>
                        <td>Row 1, Cell 4</td>
                    </tr>
                    <tr>
                        <td>Row 2, Cell 1</td>
                        <td>Row 2, Cell 2</td>
                        <td>Row 2, Cell 3</td>
                        <td>Row 2, Cell 4</td>
                    </tr>
                    <tr>
                        <td>Row 3, Cell 1</td>
                        <td>Row 3, Cell 2</td>
                        <td>Row 3, Cell 3</td>
                        <td>Row 3, Cell 4</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="c3">
            <span class="c1"></span>
        </p>
        <p class="c3">
            <span class="c1"></span>
        </p>
    </body>
</html>

`;

export default function ViewDocument({ navigation, route }) {
  const [file, setFile] = useState();

  let generatePdf = async () => {
    try {
      const file = await printToFileAsync({
        html: htmlReport,
        base64: false,
      });
      setFile(file);
      // await shareAsync(file.uri);
    } catch (error) {
      Alert.alert(
        "File Error",
        "Please try again, an error occurred while creating your file. Error Info:" +
          error[{ text: "OK" }]
      );
    }
  };

  useEffect(() => {
    const data = navigation.addListener("focus", () => {
      generatePdf();
    });
    return data;
  });

  return (
    <View style={styles.container}>
      {/* uncomment the following line to see the data structure */}

      <View
        style={{
          minHeight: Dimensions.get("window").height * 0.5,
          width: Dimensions.get("window").width * 0.9,

          borderRadius: 10,
          margin: 10,
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        }}
      >
        <WebView
          originWhitelist={["*"]}
          source={{ uri: file ? file.uri : null }}
        />
      </View>

      <Text>{JSON.stringify(route.params)}</Text>
      <Button
        text="download report"
        width={Dimensions.get("window").width * 0.8}
        style={{ marginBottom: "5%" }}
      />
      <Button
        width={Dimensions.get("window").width * 0.8}
        text="start a new report"
        arrow
        bg="#434A5D"
        onPress={() => navigation.navigate("Calculation History")}
      />
    </View>
  );
}
