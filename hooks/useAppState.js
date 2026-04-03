import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_STATE_STORAGE_KEY = 'AppState';

export const APP_STATE_KEYS = {
    isOnboardingCompleted: 'isOnboardingCompleted',
    userDetails: 'userDetails',
};

const defaultState = {
    isOnboardingCompleted: false,
    userDetails: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        image: '',
        emailNotifications: {
            orederStatuses: false,
            passwordChanges: false,
            specialOffers: false,
            newsletter: false,
        },
    },
};

export function useAppState() {
    const [isLoading, setIsLoading] = useState(true);
    const [appState, setAppState] = useState(defaultState);

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

    useEffect(() => {
        const saveState = async () => {
            try {
                if (isLoading) return;
                await AsyncStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(appState));

            } catch (e) {
                console.error('Failed to save appState :', e);
            }
        };
        saveState();
    }, [appState]);

    const updateAppState = useCallback((key, value) => {
        setAppState(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const clearAppState = useCallback(async () => {
        try {

            await AsyncStorage.removeItem(APP_STATE_STORAGE_KEY);
            setAppState(defaultState);
        } catch (e) {
            console.error('Failed to clear appState :', e);
        }
    }, []);

    return { appState, updateAppState, setIsLoading, clearAppState, isLoading, APP_STATE_KEYS };
}