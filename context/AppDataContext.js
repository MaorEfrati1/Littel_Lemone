import React, { createContext } from 'react';
import { useAppData } from '../hooks/useAppData';

export const AppDataContext = createContext();

export function AppDataProvider({ children }) {
    const { appData, updateAppData, isLoading, APP_DATA_KEYS, clearAppData } = useAppData();
    return (
        <AppDataContext.Provider value={{ appData, updateAppData, isLoading, APP_DATA_KEYS, clearAppData }}>
            {children}
        </AppDataContext.Provider>
    );
} 