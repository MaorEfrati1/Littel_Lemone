import * as React from "react";
import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStateContext } from "../context/AppStateContext";
import OnboardingScreen from "../screens/OnboardingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoadingScreen from "../screens/LoadingScreen";
import HomePage from "../screens/HomePage";
import { COLORS } from '../utils/Colors';
import { SCREENS } from '../screens/Screens';
import { Alert } from "react-native";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const { appState, isLoading } = useContext(AppStateContext);
    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <Stack.Navigator initialRouteName={SCREENS.Profile} screenOptions={{
            headerShown: false,
            headerStyle: {
                marginTop: 50,
            },
        }}>
            {
                appState.isOnboardingCompleted ? (
                    <Stack.Screen name={SCREENS.Home} component={HomePage} />
                ) : (
                    <Stack.Screen name={SCREENS.Onboarding} component={OnboardingScreen} />
                )
            }
            <Stack.Screen name={SCREENS.Profile} component={ProfileScreen} />
        </Stack.Navigator >
    );
};
export default RootNavigator;

