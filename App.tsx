import "@/config/global.css"
import "@/config/i18n"; // Initialize i18n
import React from 'react';
import {StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {persistor, store} from '@/store';
import {useAppSelector} from '@/store/hooks';
import RootStackNavigator from '@/navigation/RootStackNavigator.tsx';
import LoadingScreen from '@/components/LoadingScreen';
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {useColors} from "@/hooks/useColors";
import InsetsHelper from "@/components/helpers/InsetsHelper.tsx";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {LanguageHelper} from "@/components/helpers/LanguageHelper.tsx";
import '@/config/i18n.ts'
import {DialogProvider} from "@/components/ui/DialogProvider.tsx";
import {ToastProvider} from "@/components/ui/ToastProvider.tsx";


const AppContent: React.FC = () => {
  const {theme} = useAppSelector(state => state.app);
  const colors = useColors();

  return (
    <GestureHandlerRootView>
      <View style={{flex: 1}} className={theme === 'dark' ? 'dark' : ''}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            dark: theme === "dark",
            colors: {
              primary: colors.primary,
              background: colors.background,
              card: colors.neutrals800,
              text: colors.foreground,
              border: colors.neutrals700,
              notification: colors.primary,
            },
          }}
        >
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <DialogProvider>
                <ToastProvider>
                  <InsetsHelper/>
                  <LanguageHelper/>
                  <RootStackNavigator/>
                </ToastProvider>
              </DialogProvider>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen/>} persistor={persistor}>
        <AppContent/>
      </PersistGate>
    </Provider>
  );
}

export default App;
