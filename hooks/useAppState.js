import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const APP_STATE_STORAGE_KEY = 'AppState';

export const APP_STATE_KEYS = {
    isOnboardingCompleted: 'isOnboardingCompleted',
    // isLoggedIn: 'isLoggedIn',
    // userName: 'userName',
};

export function useAppState() {
    const [isLoading, setIsLoading] = useState(true);

    const [appState, setAppState] = useState({
        isOnboardingCompleted: false,
    });

    // טעינת הערכים מהאחסון בהתחלה
    useEffect(() => {
        const loadState = async () => {
            try {
                const json = await AsyncStorage.getItem(APP_STATE_STORAGE_KEY);
                if (json) {
                    setAppState(JSON.parse(json));
                }
            } catch (e) {
                console.error('Failed to load appState :', e);
            }
            finally {
                setIsLoading(false);
            }
        };
        loadState();
    }, []);

    // שמירת הערכים בכל שינוי
    useEffect(() => {
        const saveState = async () => {
            try {
                if (isLoading) return;
                // Alert.alert('before Saving State', JSON.stringify(appState));
                await AsyncStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(appState));
                // Alert.alert('after Saving State', JSON.stringify(appState));

            } catch (e) {
                console.error('Failed to save appState :', e);
            }
        };
        saveState();
    }, [appState]);

    // פונקציה לעדכון שדה ספציפי
    const updateAppState = useCallback((key, value) => {
        setAppState(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    return { appState, updateAppState, setIsLoading, isLoading, APP_STATE_KEYS };
}