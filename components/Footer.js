import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/Colors';

const Footer = ({ buttons = [] }) => {
    if (!buttons.length) return null; // אין כפתורים, לא מציגים Footer

    const singleButton = buttons.length === 1;

    return (
        <View style={styles.container}>
            {buttons.map((btn, index) => (
                <Pressable
                    key={index}
                    style={[
                        styles.button,
                        !btn.validation && styles.buttonDisabled,
                        singleButton && styles.singleButton,
                        !singleButton && index === 0 && styles.leftButton,
                        !singleButton && index === 1 && styles.rightButton,
                    ]}
                    onPress={btn.onPress}
                    disabled={!btn.validation}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            !singleButton && index === 1 ? styles.buttonTextRightButton : null
                        ]}
                    >
                        {btn.label}</Text>
                </Pressable>
            ))}
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    button: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    singleButton: {
        backgroundColor: COLORS.primaryButton,
        flex: 1,
    },
    leftButton: {
        backgroundColor: COLORS.primaryButton,
        flex: 1,
        marginRight: 8,
    },
    rightButton: {
        borderColor: COLORS.primaryButton,
        borderWidth: 1,
        flex: 1,
        marginLeft: 8,
    },
    buttonDisabled: {
        backgroundColor: COLORS.disabled,
        opacity: 0.6,
    },
    buttonText: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '700',
    },
    buttonTextRightButton: {
        color: COLORS.secondaryTextButton,
        fontSize: 18,
        fontWeight: '500',
    },
});