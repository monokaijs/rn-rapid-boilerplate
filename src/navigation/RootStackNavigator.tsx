import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList} from "./types";
import MainTabNavigator from "./MainTabNavigator";
import SettingsScreen from "@/screens/SettingsScreen";
import ComponentsDemo from "@/screens/ComponentsDemo";
import CustomScreenHeader from "@/navigation/components/ScreenHeader.tsx";

// Component Demo Screens
import AvatarDemoScreen from "@/screens/demos/AvatarDemoScreen";
import BadgeDemoScreen from "@/screens/demos/BadgeDemoScreen";
import ChipDemoScreen from "@/screens/demos/ChipDemoScreen";
import CheckboxDemoScreen from "@/screens/demos/CheckboxDemoScreen";
import ProgressBarDemoScreen from "@/screens/demos/ProgressBarDemoScreen";
import SliderDemoScreen from "@/screens/demos/SliderDemoScreen";
import SwitchDemoScreen from "@/screens/demos/SwitchDemoScreen";
import SelectDemoScreen from "@/screens/demos/SelectDemoScreen";
import AppTextDemoScreen from "@/screens/demos/AppTextDemoScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          header: (props) => <CustomScreenHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="ComponentsDemo"
        component={ComponentsDemo}
        options={{
          title: "Components Demo",
          header: (props) => <CustomScreenHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="AvatarDemo"
        component={AvatarDemoScreen}
        options={{
          title: "Avatar Component",
          header: (props) => <CustomScreenHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="BadgeDemo"
        component={BadgeDemoScreen}
        options={{
          title: "Badge Component",
          header: (props) => <CustomScreenHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="ChipDemo"
        component={ChipDemoScreen}
        options={{
          title: "Chip Component",
          header: (props) => <CustomScreenHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="CheckboxDemo"
        component={CheckboxDemoScreen}
        options={{
          title: "Checkbox Component",
          header: (props) => <CustomScreenHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="ProgressBarDemo"
        component={ProgressBarDemoScreen}
        options={{
          title: "ProgressBar Component",
          header: (props) => <CustomScreenHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="SliderDemo"
        component={SliderDemoScreen}
        options={{
          title: "Slider Component",
          header: (props) => <CustomScreenHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="SwitchDemo"
        component={SwitchDemoScreen}
        options={{
          title: "Switch Component",
          header: (props) => <CustomScreenHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="SelectDemo"
        component={SelectDemoScreen}
        options={{
          title: "Select Component",
          header: (props) => <CustomScreenHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="AppTextDemo"
        component={AppTextDemoScreen}
        options={{
          title: "Typography",
          header: (props) => <CustomScreenHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
