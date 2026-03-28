import React from 'react';
import { View, StyleSheet } from 'react-native';
import Body from '../components/Body';
import { SafeAreaView } from 'react-native-safe-area-context';

const BasePage = ({ headerProps, bodyChildren, FooterComponent }) => {
    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            {headerProps?.component && <headerProps.component {...headerProps.props} />}

            {/* Body */}
            {bodyChildren && (
                <View style={styles.bodyContainer}>
                    {/* Body */}
                    <Body>
                        {bodyChildren}
                    </Body>
                </View>
            )}

            {/* Footer */}
            {FooterComponent && (
                <FooterComponent />
            )}

        </SafeAreaView>
    );
};

export default BasePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bodyContainer: {
        flex: 1,
    },
});