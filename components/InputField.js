import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
    validator,
    error: externalError,
    secureTextEntry = false,
    keyboardType = 'default',
}) => {
    const [internalError, setInternalError] = useState('');

    const handleBlur = () => {
        if (validator) {
            const validationError = validator(value);
            setInternalError(validationError || '');
        }
    };

    const handleChange = (text) => {
        onChangeText(text);

        if (internalError) setInternalError('');
    };

    const displayedError = externalError || internalError;

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TextInput
                style={[
                    styles.input,
                    displayedError ? styles.inputError : null,
                ]}
                value={value}
                onChangeText={handleChange}
                placeholder={placeholder}
                onBlur={handleBlur}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize="none"
            />

            {displayedError ? (
                <Text style={styles.errorText}>{displayedError}</Text>
            ) : null}
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        marginVertical: 6,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        marginTop: 4,
        color: 'red',
        fontSize: 12,
    },
});