import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/Colors';

const Header = ({
    showBackButton = false,
    onPressBack,
    onPressProfile,
    profileImage,
}) => {
    return (
        <View style={styles.container}>

            <View style={styles.side}>
                {profileImage && (
                    <TouchableOpacity onPress={onPressProfile}>
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.profile}
                        />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.center}>
                <Image
                    source={require('../assets/logo.jpg')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.side}>
                {showBackButton && (
                    <TouchableOpacity style={styles.backBtn} onPress={onPressBack}>
                        <Text style={styles.arrow}>←</Text>
                    </TouchableOpacity>
                )}
            </View>

        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 16,
    },

    side: {
        minWidth: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        height: 40,
        maxWidth: '60%',
        minWidth: 100,
        resizeMode: 'contain',
    },

    profile: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primaryButton,
        alignItems: 'center',
        justifyContent: 'center',

    },

    arrow: {
        fontSize: 28,
        color: COLORS.text,
        textAlign: 'center',
        lineHeight: 28,
        fontWeight: 'bold'
    },
});