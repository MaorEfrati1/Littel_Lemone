import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/Colors';

const Button = ({
    title,
    onPress,
    variant = 'primary', // primary | secondary
    disabled = false,
    style,
    textStyle,
}) => {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isPrimary ? styles.primary : styles.secondary,
                disabled && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <Text
                style={[
                    styles.text,
                    !isPrimary && styles.secondaryText,
                    textStyle,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    primary: {
        backgroundColor: COLORS.primaryButton,
    },
    secondary: {
        borderColor: COLORS.primaryButton,
        borderWidth: 1,
    },
    disabled: {
        backgroundColor: COLORS.disabled,
        opacity: 0.6,
    },
    text: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '700',
    },
    secondaryText: {
        color: COLORS.secondaryTextButton,
        fontWeight: '500',
    },
});