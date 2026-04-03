import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_DATA_STORAGE_KEY = 'AppData';

export const APP_DATA_KEYS = {
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

export function useAppData() {
    const [isLoading, setIsLoading] = useState(true);
    const [appData, setAppData] = useState(defaultState);

    useEffect(() => {
        const loadState = async () => {
            try {
                const json = await AsyncStorage.getItem(APP_DATA_STORAGE_KEY);
                if (json) {
                    setAppData(JSON.parse(json));
                }
            } catch (e) {
                console.error('Failed to load appData :', e);
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
                await AsyncStorage.setItem(APP_DATA_STORAGE_KEY, JSON.stringify(appData));

            } catch (e) {
                console.error('Failed to save appData :', e);
            }
        };
        saveState();
    }, [appData]);

    const updateAppData = useCallback((key, value) => {
        setAppData(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const clearAppData = useCallback(async () => {
        try {

            await AsyncStorage.removeItem(APP_DATA_STORAGE_KEY);
            setAppData(defaultState);
        } catch (e) {
            console.error('Failed to clear appData :', e);
        }
    }, []);

    return { appData, updateAppData, setIsLoading, clearAppData, isLoading, APP_DATA_KEYS };
}