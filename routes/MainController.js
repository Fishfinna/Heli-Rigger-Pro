import * as React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

// screens
import ConverterScreen from "./screens/ConverterScreen";
import VolumeScreen from "./screens/VolumeScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Screen names
const ConverterName = "Convert";
const VolumeName = "Weigh";
const SettingsName = "Settings";

const Tab = createBottomTabNavigator();

// theme
const appTheme = {
  dark: false,
  colors: {
    primary: "#F78D6C",
    background: "white",
    card: "#434A5D",
    text: "#EEEEEE",
    border: "#BBBBBB",
    notification: "#EEEEEE",
  },
};

export default function MainController(props) {
  return (
    <NavigationContainer theme={appTheme}>
      <Tab.Navigator
        initialRouteName={VolumeName}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#F78D6C",
          tabBarInactiveTintColor: "#BBBBBB",
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "bold",
            paddingBottom: 10,
          },
          tabBarStyle: [
            {
              height: 55,
              paddingTop: 5,
            },
            null,
          ],
          tabBarIcon: ({ focused, size }) => {
            let iconName;
            let rn = route.name;
            let color;

            if (rn === VolumeName) {
              iconName = focused ? "cube" : "cube-outline";
              color = focused ? "#FEA170" : "#aaaaaa";
            } else if (rn === ConverterName) {
              iconName = focused ? "repeat" : "repeat-outline";
              color = focused ? "#FEA170" : "#aaaaaa";
            } else if (rn === SettingsName) {
              iconName = focused ? "settings" : "settings-outline";
              color = focused ? "#FEA170" : "#aaaaaa";
            }
            return (
              <Text>
                <Icon name={iconName} color={color} type="ionicon" />
              </Text>
            );
          },
        })}
      >
        <Tab.Screen name={VolumeName} component={VolumeScreen} />
        <Tab.Screen name={ConverterName} component={ConverterScreen} />
        <Tab.Screen name={SettingsName} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
