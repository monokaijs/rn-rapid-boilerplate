import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList} from "./types";
import MainTabNavigator from "./MainTabNavigator";
import SettingsScreen from "@/screens/SettingsScreen";
import CustomScreenHeader from "@/navigation/components/ScreenHeader.tsx";

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
    </Stack.Navigator>
  );
};
