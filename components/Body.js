import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

const Body = ({ children }) => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.bodyContainer}>
                {children}
            </View>
        </ScrollView>
    );
};

export default Body;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    bodyContainer: {
        flex: 1,
        padding: 16,
    },
});