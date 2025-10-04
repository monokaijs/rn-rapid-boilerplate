import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Root Stack Navigator
export type RootStackParamList = {
  Main?: NavigatorScreenParams<MainTabParamList>;
  Settings: undefined;
  ComponentsDemo: undefined;
  AvatarDemo: undefined;
  BadgeDemo: undefined;
  ChipDemo: undefined;
  CheckboxDemo: undefined;
  ProgressBarDemo: undefined;
  AppButtonDemo: undefined;
  SliderDemo: undefined;
  SwitchDemo: undefined;
  SelectDemo: undefined;
  AppTextDemo: undefined;
  Login: undefined;
  Register: undefined;
  About: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  HOME: undefined;
  MORE: undefined;
};

// Screen props types
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = NativeStackScreenProps<
  MainTabParamList,
  T
>;

// Navigation prop types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
