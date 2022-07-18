import * as React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";

// screens
import ConverterScreen from "./screens/ConverterScreen";
import WeighScreen from "./screens/WeighScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Secondary screens
import DensityScreen from "./screens/DensityScreen";
import CalculationsScreen from "./screens/CalculationsScreen";

// main Screen names
const ConverterName = "Convert";
const WeighName = "Weigh";
const SettingsName = "System";

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

// Weigh Stack Navigation
const WeighStack = createStackNavigator();

function WeighStackScreen() {
  return (
    <WeighStack.Navigator
      screenOptions={{
        tabBarLabel: "Frustum",
        headerStyle: {
          backgroundColor: "#eeee",
          height: 30,
        },
        headerTintColor: "#434A5D",
      }}
    >
      <WeighStack.Screen name="Frustum" component={WeighScreen} />
      <WeighStack.Screen name="Density" component={DensityScreen} />
      <WeighStack.Screen name="Calculations" component={CalculationsScreen} />
    </WeighStack.Navigator>
  );
}

export default function MainController(props) {
  return (
    <NavigationContainer theme={appTheme}>
      <Tab.Navigator
        initialRouteName={WeighName}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#F78D6C",
          tabBarInactiveTintColor: "#BBBBBB",
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "bold",
            paddingBottom: 5,
          },
          tabBarStyle: [
            {
              paddingTop: 5,
            },
            null,
          ],
          tabBarIcon: ({ focused, size }) => {
            let iconName;
            let rn = route.name;
            let color;

            if (rn === WeighName) {
              iconName = focused ? "cube" : "cube-outline";
              color = focused ? "#FEA170" : "#aaaaaa";
            } else if (rn === ConverterName) {
              iconName = focused ? "calculator" : "calculator-outline";
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
        <Tab.Screen name={WeighName} component={WeighStackScreen} />
        <Tab.Screen name={ConverterName} component={ConverterScreen} />
        <Tab.Screen name={SettingsName} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
