import { Text, View, Dimensions } from "react-native";
import * as React from "react";
import styles from "../styles/globalStyles";
import { Icon } from "react-native-elements";

export default function HistoryCard(props) {
  return (
    <View style={styles.historyCard}>
      <Text numberOfLines={1} style={styles.title}>
        {props.item.species}
      </Text>
      <Text numberOfLines={1} style={{ ...styles.subtitle, fontSize: 14 }}>
        {props.item.time}
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
          density: {props.item.density}
        </Text>

        <Text style={styles.gridItem} numberOfLines={1}>
          volume: {props.item.volume}
        </Text>
        <Text style={styles.gridItem} numberOfLines={1}>
          weight: {props.item.weight}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {props.children}
      </View>
    </View>
  );
}
