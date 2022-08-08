import { Text, View, Dimensions } from "react-native";
import * as React from "react";
import styles from "../styles/globalStyles";
import { Icon } from "react-native-elements";

export default function HistoryCard(props) {
  return (
    <View>
      <View
        style={{
          ...styles.lineSeparator,
          width: "100%",
          borderBottomColor: "#DEDEDE",
          marginVertical: "2%",
        }}
      />
      <View style={styles.historyCard}>
        <View style={{ ...styles.row, overflow: "hidden" }}>
          {props.children}
        </View>

        <Text numberOfLines={1} style={{ ...styles.subtitle, width: "30%" }}>
          {props.item.species}
        </Text>

        <View style={styles.historyCardGrid}>
          <Text style={styles.gridItem} numberOfLines={1}>
            butt: {props.item.butt}
          </Text>
          <Text style={styles.gridItem} numberOfLines={1}>
            length: {props.item.length}
          </Text>

          <Text style={styles.gridItem} numberOfLines={1}>
            top: {props.item.top}
          </Text>

          <Text style={styles.gridItem} numberOfLines={1}>
            weight: {props.item.weight}
          </Text>
        </View>
      </View>
    </View>
  );
}
