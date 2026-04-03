import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Animated, StyleSheet, } from 'react-native';

export default function HeroBanner({
    title = 'Little Lemon',
    subtitle = 'Chicago',
    description = 'We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.',
    showSearch = false,
    searchValue = '',
    onSearchChange,
    imageSource,
}) {
    const [searchOpen, setSearchOpen] = useState(false);
    const inputRef = useRef(null);

    // Animation values
    const widthAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const openSearch = () => {
        setSearchOpen(true);
        Animated.parallel([
            Animated.spring(widthAnim, {
                toValue: 1,
                useNativeDriver: false,
                tension: 60,
                friction: 10,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }),
        ]).start(() => {
            inputRef.current?.focus();
        });
    };

    const closeSearch = () => {
        inputRef.current?.blur();
        Animated.parallel([
            Animated.timing(widthAnim, {
                toValue: 0,
                duration: 220,
                useNativeDriver: false,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false,
            }),
        ]).start(() => {
            setSearchOpen(false);
            if (onSearchChange) onSearchChange('');
        });
    };

    const handleBlur = () => {
        // Close only if the input is empty
        if (!searchValue || searchValue.trim() === '') {
            closeSearch();
        }
    };

    // Interpolate width: 0 → full width of the row minus button size
    const animatedWidth = widthAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.banner}>
            <View style={styles.topRow}>
                <View style={styles.textBlock}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <Text style={styles.description} numberOfLines={4}>
                        {description}
                    </Text>
                </View>
                {imageSource && (
                    <Image
                        source={imageSource}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                )}
            </View>

            {showSearch && (
                <View style={styles.searchRow}>
                    {/* Search button — anchored left */}
                    <TouchableOpacity
                        style={[styles.searchButton, searchOpen && styles.searchButtonActive]}
                        onPress={searchOpen ? closeSearch : openSearch}
                        activeOpacity={0.85}
                    >
                        <Text style={searchOpen ? styles.searchIconClose : styles.searchIconSearch}>
                            {searchOpen ? '✕' : '⌕'}
                        </Text>
                    </TouchableOpacity>

                    {/* Animated search input — grows to the right */}
                    <Animated.View
                        style={[
                            styles.searchInputWrapper,
                            { width: animatedWidth, opacity: opacityAnim },
                        ]}
                        pointerEvents={searchOpen ? 'auto' : 'none'}
                    >
                        <TextInput
                            ref={inputRef}
                            style={styles.searchInput}
                            placeholder="Search menu..."
                            placeholderTextColor="#9DA3A0"
                            value={searchValue}
                            onChangeText={onSearchChange}
                            onBlur={handleBlur}
                            returnKeyType="search"
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                    </Animated.View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#495E57',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
        gap: 16,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    textBlock: {
        flex: 1,
        paddingRight: 12,
        gap: 4,
    },
    title: {
        fontSize: 36,
        fontWeight: '700',
        color: '#F4CE14',
        lineHeight: 40,
    },
    subtitle: {
        fontSize: 22,
        fontWeight: '500',
        color: '#EDEFEE',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#EDEFEE',
        lineHeight: 20,
    },
    heroImage: {
        width: 110,
        height: 130,
        borderRadius: 12,
    },

    // ── Search ───────────────────────────────────────────────
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 12,
    },
    searchInputWrapper: {
        height: 46,
        overflow: 'hidden',
        maxWidth: '85%',
        marginHorizontal: 10,
        flex: 1,
    },
    searchInput: {
        height: 46,
        backgroundColor: 'rgba(237, 239, 238, 0.15)',
        borderWidth: 1.5,
        borderColor: 'rgba(237, 239, 238, 0.4)',
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 15,
        color: '#EDEFEE',
    },
    searchButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#D9DEDD',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
        flexShrink: 0,
    },
    searchButtonActive: {
        backgroundColor: 'rgba(217, 222, 221)',
    },
    searchIconSearch: {
        fontSize: 36,
        color: '#1A1A1A',
        fontWeight: 'bold',
        lineHeight: 44,
    },
    searchIconClose: {
        fontSize: 18,
        color: '#1A1A1A',
        lineHeight: 20,
    },
});