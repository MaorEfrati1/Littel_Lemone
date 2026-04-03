import React, { createContext } from 'react';
import { useAppData } from '../hooks/useAppData';
import { useMenuData } from '../hooks/useMenuData';

export const AppDataContext = createContext();

export function AppDataProvider({ children }) {
    const { appData, updateAppData, isLoading, APP_DATA_KEYS, clearAppData } = useAppData();
    const { menuItems, isLoading: menuLoading, error: menuError,
        getByCategory, searchMenu, clearMenu } = useMenuData();

    return (
        <AppDataContext.Provider value={{
            // AsyncStorage
            appData, updateAppData, isLoading, APP_DATA_KEYS, clearAppData,
            // SQLITE
            menuItems, menuLoading, menuError,
            getByCategory, searchMenu, clearMenu,
        }}>
            {children}
        </AppDataContext.Provider>
    );
}