import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../utils/Colors';

const CheckboxGroup = ({ label, options = {}, order = [], labels = {}, onChange }) => {
    const toggleOption = (key) => {
        const newOptions = { ...options, [key]: !options[key] };
        onChange(newOptions);
    };

    const keys = order.length ? order : Object.keys(options);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.groupLabel}>{label}</Text>}

            {keys.map((key) => (
                <Pressable
                    key={key}
                    style={styles.optionContainer}
                    onPress={() => toggleOption(key)}
                >
                    <View style={[styles.checkbox, options[key] && styles.checkboxChecked]}>
                        {options[key] && <Text style={styles.checkMark}>✔</Text>}
                    </View>
                    <Text style={styles.optionLabel}>{labels[key] || key}</Text>
                </Pressable>
            ))}
        </View>
    );
};

export default CheckboxGroup;

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    groupLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: COLORS.textDark,
    },
    optionContainer: {
        flexDirection: 'row', // LTR
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderRadius: 4,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondaryContainer,
    },
    checkboxChecked: {
        backgroundColor: COLORS.primaryButton,
        borderColor: COLORS.primaryButton,
    },
    checkMark: {
        color: COLORS.text,
        fontSize: 14,
        lineHeight: 18,
    },
    optionLabel: {
        fontSize: 16,
        color: COLORS.textDark,
    },
});
