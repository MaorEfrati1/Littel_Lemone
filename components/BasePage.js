import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BasePage = ({
    HeaderComponent,
    headerProps = {},
    bodyChildren,
    FooterComponent,
}) => {
    return (
        <SafeAreaView style={styles.container}>

            {HeaderComponent && (
                <View style={styles.header}>
                    <HeaderComponent {...headerProps} />
                </View>
            )}

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {bodyChildren ?? null}
            </ScrollView>

            {FooterComponent && (
                <View style={styles.footer}>
                    <FooterComponent />
                </View>
            )}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        zIndex: 10,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 16,
    },
    footer: {
        zIndex: 10,
    },
});

export default BasePage;