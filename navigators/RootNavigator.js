import * as React from "react";
import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStateContext } from "../context/AppStateContext";
import OnboardingScreen from "../screens/OnboardingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoadingScreen from "../screens/LoadingScreen";
import HomePage from "../screens/HomePage";
import { SCREENS } from '../screens/Screens';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const { appState, isLoading } = useContext(AppStateContext);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Stack.Navigator
            initialRouteName={
                appState.isOnboardingCompleted
                    ? SCREENS.Home
                    : SCREENS.Onboarding
            }
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={SCREENS.Onboarding} component={OnboardingScreen} />
            <Stack.Screen name={SCREENS.Home} component={HomePage} />
            <Stack.Screen name={SCREENS.Profile} component={ProfileScreen} />
        </Stack.Navigator>
    );
};
export default RootNavigator;

