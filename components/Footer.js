import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';

const Footer = ({ buttons = [] }) => {
    if (!buttons.length) return null;

    const singleButton = buttons.length === 1;

    return (
        <View style={styles.container}>
            {buttons.map((btn, index) => {
                const isRight = index === 1;

                return (
                    <Button
                        key={index}
                        title={btn.label}
                        onPress={btn.onPress}
                        disabled={!btn.validation}
                        variant={
                            singleButton
                                ? 'primary'
                                : isRight
                                    ? 'primary'
                                    : 'secondary'
                        }
                        style={[
                            styles.flex,
                            singleButton && styles.singleButton,
                            !singleButton && index === 0 && styles.leftButton,
                            !singleButton && index === 1 && styles.rightButton,
                        ]}
                    />
                );
            })}
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        margin: 5,
        flexDirection: 'row',
        height: 60,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flex: {
        flex: 1,
    },
    singleButton: {},
    leftButton: {
        marginRight: 8,
    },
    rightButton: {
        marginLeft: 8,
    },
});