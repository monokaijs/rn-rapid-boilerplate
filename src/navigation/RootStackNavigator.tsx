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

// Auth Screens
import LoginScreen from "@/screens/auth/LoginScreen";
import RegisterScreen from "@/screens/auth/RegisterScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomScreenHeader {...props} />,
      }}
    >
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
        }}
      />
      <Stack.Screen
        name="ComponentsDemo"
        component={ComponentsDemo}
        options={{
          title: "Components Demo",
        }}
      />
      <Stack.Screen
        name="AvatarDemo"
        component={AvatarDemoScreen}
        options={{
          title: "Avatar Component",
        }}
      />
      <Stack.Screen
        name="BadgeDemo"
        component={BadgeDemoScreen}
        options={{
          title: "Badge Component",
        }}
      />
      <Stack.Screen
        name="ChipDemo"
        component={ChipDemoScreen}
        options={{
          title: "Chip Component",
        }}
      />
      <Stack.Screen
        name="CheckboxDemo"
        component={CheckboxDemoScreen}
        options={{
          title: "Checkbox Component",
        }}
      />
      <Stack.Screen
        name="ProgressBarDemo"
        component={ProgressBarDemoScreen}
        options={{
          title: "ProgressBar Component",
        }}
      />
      <Stack.Screen
        name="SliderDemo"
        component={SliderDemoScreen}
        options={{
          title: "Slider Component",
        }}
      />
      <Stack.Screen
        name="SwitchDemo"
        component={SwitchDemoScreen}
        options={{
          title: "Switch Component",
        }}
      />
      <Stack.Screen
        name="SelectDemo"
        component={SelectDemoScreen}
        options={{
          title: "Select Component",
        }}
      />
      <Stack.Screen
        name="AppTextDemo"
        component={AppTextDemoScreen}
        options={{
          title: "Typography",
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Register",
        }}
      />
    </Stack.Navigator>
  );
};
