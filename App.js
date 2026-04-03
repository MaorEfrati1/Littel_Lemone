import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { I18nManager, } from 'react-native';
import RootNavigator from "./navigators/RootNavigator";
import { AppStateProvider } from './context/AppStateContext';
import LoadingScreen from './screens/LoadingScreen';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Force LTR layout globally
    if (I18nManager.isRTL) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      // You need to reload the app for this to take effect
      // For development: Just reload JS bundle
      // For production: full rebuild required
    }
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <AppStateProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppStateProvider>
  );
}