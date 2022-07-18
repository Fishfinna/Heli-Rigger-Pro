import * as React from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { Icon } from "react-native-elements";

export default function SettingsScreen({ navigation }) {
  const list = [
    {
      name: "About",
      icon: "information-circle",
    },
    {
      name: "Manage Presets",
      icon: "pencil",
    },
  ];
  return (
    <View>
      {list.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              <Icon name={l.icon} color="#434A5D" type="ionicon" />
              {l.name}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
