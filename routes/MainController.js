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
import unitScreen from "./screens/unitConversion";
import PrestsScreen from "./screens/PresetsScreen";

// main Screen names
const ConverterName = "Convert";
const WeighName = "Measure";
const SettingsName = "System";

// tab screen set up
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
        },
        headerTintColor: "#434A5D",
      }}
    >
      <WeighStack.Screen name="Scale" component={WeighScreen} />
      <WeighStack.Screen name="Density" component={DensityScreen} />
      <WeighStack.Screen name="Presets" component={PrestsScreen} />
    </WeighStack.Navigator>
  );
}

// converstion stack navigation
const ConversionStack = createStackNavigator();

function ConversionStackScreen() {
  return (
    <ConversionStack.Navigator
      screenOptions={{
        tabBarLabel: "Frustum",
        headerStyle: {
          backgroundColor: "#eeee",
        },
        headerTintColor: "#434A5D",
      }}
    >
      <ConversionStack.Screen
        name="Select Converter"
        component={ConverterScreen}
      />
      <ConversionStack.Screen name="Unit Converter" component={unitScreen} />
    </ConversionStack.Navigator>
  );
}

// System stack navigation
const SystemStack = createStackNavigator();

function SystemStackScreen() {
  return (
    <SystemStack.Navigator
      screenOptions={{
        tabBarLabel: "Frustum",
        headerStyle: {
          backgroundColor: "#eeee",
        },
        headerTintColor: "#434A5D",
      }}
    >
      <SystemStack.Screen name={"Settings"} component={SettingsScreen} />
      <SystemStack.Screen name="Edit Presets" component={PrestsScreen} />
    </SystemStack.Navigator>
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
        <Tab.Screen name={ConverterName} component={ConversionStackScreen} />
        <Tab.Screen name={SettingsName} component={SystemStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
