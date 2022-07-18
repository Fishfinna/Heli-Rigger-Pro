import { Text, View, Image, ScrollView } from "react-native";
import * as React from "react";
import styles from "../../styles/globalStyles";
import Card from "../../components/numCard";
import Button from "../../components/button";

export default function Calculations({ navigation, route }) {
  /* data stucture is:
      {
        total: {volume: num (cm), sa: num (cm)}
        density: {material: name (string), density: num (kg/m^3) }
      } */

  // additional calculations
  const weightKG =
    (route.params.total.volume / 1000) * (route.params.density.density / 1000);
  const weightPounds = weightKG * 2.20462;
  return (
    <View style={{ flex: 1 }}>
      {/* uncomment the following line to see the data */}
      {/* <Text>{JSON.stringify(route.params)}</Text> */}

      {/* measurements title */}
      <Text style={styles.title}>
        {route.params.density.material} Measurements
      </Text>
      <Text style={styles.subtitle}>
        Current density:{" "}
        {route.params.density.density ? route.params.density.density : 0}kg/m
      </Text>

      {/* Volumne (meters) next to Surface Area in meters*/}
      <View style={{ marginTop: 10 }}>
        <View style={{ ...styles.row, justifyContent: "space-around" }}>
          {/* volume card */}
          <Card
            text="Volume ("
            super="3"
            unit="m"
            postText=")"
            body={route.params.total.volume / 100 /* render the number here */}
          />
          {/* SA card */}
          <Card
            text="Surface Area ("
            super="2"
            unit="m"
            postText=")"
            body={route.params.total.sa / 100}
          />
        </View>
        {/* line separator */}
        <View style={styles.lineSeparator} />

        {/* weight in pounds */}
        <View style={styles.column}>
          <Card
            style={{ width: "95%" }}
            text="Weight (pounds)"
            body={weightPounds}
          />

          {/* weight in kg */}
          <Card style={{ width: "95%" }} text="Weight (kg)" body={weightKG} />
        </View>
      </View>
      <Button
        text="New Calculation"
        onPress={() => navigation.navigate("Frustum")}
        bg="#434A5D"
      />
    </View>
  );
}
