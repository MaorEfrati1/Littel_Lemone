import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, } from 'react-native';

const ALL = 'All';
const { width } = Dimensions.get('window');

const isSmallScreen = width < 360;

export default function CategoryFilter({ categories = [], onFilterChange }) {
    const [selected, setSelected] = useState(ALL);

    const options = [ALL, ...categories];

    const handlePress = (cat) => {
        setSelected(cat);
        onFilterChange(cat === ALL ? null : cat);
    };

    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>ORDER FOR DELIVERY!</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.row}
            >
                {options.map((cat, index) => {
                    const isLast = index === options.length - 1;
                    const isActive = selected === cat;

                    return (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.chip,
                                isActive && styles.chipActive,
                                !isLast && styles.chipSpacing,
                            ]}
                            onPress={() => handlePress(cat)}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.chipText,
                                    isActive && styles.chipTextActive,
                                ]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <View style={styles.divider} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 16,
    },

    heading: {
        fontSize: isSmallScreen ? 16 : 18,
        fontWeight: '800',
        color: '#333333',
        marginBottom: 14,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
    },

    chip: {
        paddingHorizontal: isSmallScreen ? 12 : 16,
        paddingVertical: isSmallScreen ? 8 : 10,
        borderRadius: 16,
        backgroundColor: '#EDEFEE',
    },

    chipSpacing: {
        marginRight: 12,
    },

    chipActive: {
        backgroundColor: '#495E57',
    },

    chipText: {
        fontSize: isSmallScreen ? 13 : 15,
        fontWeight: '600',
        color: '#495E57',
    },

    chipTextActive: {
        color: '#fff',
    },

    divider: {
        height: 1,
        backgroundColor: '#CCCCCC',
        marginTop: 4,
    },
});