import React, { createContext } from 'react';
import { useAppState } from '../hooks/useAppState';

export const AppStateContext = createContext();

export function AppStateProvider({ children }) {
    const { appState, updateAppState, isLoading, APP_STATE_KEYS, clearAppState } = useAppState();
    return (
        <AppStateContext.Provider value={{ appState, updateAppState, isLoading, APP_STATE_KEYS, clearAppState }}>
            {children}
        </AppStateContext.Provider>
    );
} 