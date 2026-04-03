import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const BASE_IMAGE_URL =
    'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/';

export default function MenuCard({ item }) {
    const imageUri = item.image
        ? `${BASE_IMAGE_URL}${item.image}?raw=true`
        : null;

    return (
        <View style={styles.card}>
            {/* Text side */}
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>
                <Text style={styles.price}>${Number(item.price).toFixed(2)}</Text>
            </View>

            {/* Image side */}
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EDEFEE',
        backgroundColor: '#fff',
    },
    info: {
        flex: 1,
        paddingRight: 12,
        gap: 6,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333333',
    },
    description: {
        fontSize: 13,
        color: '#6B6B6B',
        lineHeight: 18,
    },
    price: {
        fontSize: 15,
        fontWeight: '600',
        color: '#495E57',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#EDEFEE',
    },
});