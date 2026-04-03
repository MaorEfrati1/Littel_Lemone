import React, { useContext, useState, useCallback, useMemo } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useAppNavigation } from '../hooks/useNavigation';
import { SCREENS } from './Screens';
import BasePage from '../components/BasePage';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MenuCard from '../components/MenuCard';
import HeroBanner from '../components/HeroBanner';
import CategoryFilter from '../components/CategoryFilter';
import { AppDataContext } from '../context/AppDataContext';
import LoadingScreen from './LoadingScreen';

function extractCategories(items) {
    const seen = new Set();
    return items
        .map(i => i.category)
        .filter(c => c && !seen.has(c) && seen.add(c));
}

const HomePage = () => {
    const { menuItems, menuLoading, menuError } = useContext(AppDataContext);
    const { goToScreen } = useAppNavigation();

    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(null); // null = All

    const categories = useMemo(() => extractCategories(menuItems), [menuItems]);

    // Filter by search + category
    const filteredItems = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return menuItems.filter(item => {
            const matchesSearch =
                !q ||
                item.name?.toLowerCase().includes(q) ||
                item.description?.toLowerCase().includes(q);
            const matchesCategory =
                !activeCategory ||
                item.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [menuItems, searchQuery, activeCategory]);

    const handleSearchChange = useCallback((text) => setSearchQuery(text), []);
    const handleFilterChange = useCallback((cat) => setActiveCategory(cat), []);

    if (menuLoading) return <LoadingScreen />;
    if (menuError) return <Text style={styles.error}>Error: {menuError}</Text>;

    return (
        <BasePage
            scrollable={false}
            HeaderComponent={Header}
            headerProps={{
                showBackButton: false,
                onPressProfile: () => goToScreen(SCREENS.Profile),
            }}
            bodyChildren={
                <FlatList
                    data={filteredItems}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => <MenuCard item={item} />}
                    ListHeaderComponent={
                        <>
                            <HeroBanner
                                showSearch={true}
                                searchValue={searchQuery}
                                onSearchChange={handleSearchChange}
                                imageSource={require('../assets/little-lemon-logo.png')}
                            />
                            <CategoryFilter
                                categories={categories}
                                onFilterChange={handleFilterChange}
                            />
                        </>
                    }
                    ListEmptyComponent={
                        <Text style={styles.empty}>No items found.</Text>
                    }
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.list}
                />
            }
            FooterComponent={() => <Footer buttons={[]} />}
        />
    );
};

const styles = StyleSheet.create({
    list: { paddingBottom: 24 },
    error: {
        textAlign: 'center',
        marginTop: 40,
        color: '#EE9972',
        fontSize: 15,
    },
    empty: {
        textAlign: 'center',
        marginTop: 40,
        color: '#9DA3A0',
        fontSize: 15,
    },
});

export default HomePage;