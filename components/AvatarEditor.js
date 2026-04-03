import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileAvatar from './ProfileAvatar';
import Button from './Button';

const AvatarEditor = () => {
    const avatarRef = useRef(null);

    return (
        <View style={styles.container}>
            <ProfileAvatar
                ref={avatarRef}
                size={72}
            />
            <Button
                title="Change"
                variant="primary"
                style={styles.changeButton}
                onPress={() => { avatarRef.current?.showPicker() }}
            />
            <Button
                title="Remove"
                variant="secondary"
                style={styles.removeButton}
                textStyle={styles.removeText}
                onPress={() => { avatarRef.current?.removeImage() }}
            />
        </View>
    );
};

export default AvatarEditor;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    changeButton: {
        flex: 1,
        marginHorizontal: 10,
        background: '#9DA3A0',
    },
    removeButton: {
        flex: 1,
        marginHorizontal: 10,
        borderColor: '#E24B4A',
    },
    removeText: {
        color: '#E24B4A',
    },
});