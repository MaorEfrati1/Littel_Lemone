import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, ActionSheetIOS, Platform, Modal, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { AppDataContext } from '../context/AppDataContext';

const ProfileAvatar = ({ firstName, lastName, size = 40, onPress, style }) => {
    const { appData, updateAppData, APP_DATA_KEYS } = useContext(AppDataContext);
    const [imageUri, setImageUri] = useState(appData.userDetails.image);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setImageUri(appData.userDetails.image);
    }, [appData.userDetails.image]);

    const finalFirstName = firstName?.trim() || appData.userDetails.firstName;
    const finalLastName = lastName?.trim() || appData.userDetails.lastName;

    const isEditable = !onPress;

    const updateImage = (uri) => {
        if (!uri) return;
        const normalized = uri.startsWith('file://') ? uri : `file://${uri}`;
        setImageUri(normalized);

        updateAppData(APP_DATA_KEYS.userDetails, {
            ...(appData.userDetails || {}),
            image: normalized,
        });
    };

    const closeModal = () => {
        return new Promise(resolve => {
            setModalVisible(false);
            setTimeout(resolve, 300);
        });
    };

    const pickFromCamera = async () => {
        await closeModal();

        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') return Alert.alert('Permission denied', 'Camera access is required.');

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        const uri = result.assets?.[0]?.uri || result.uri;
        const cancelled = result.canceled ?? result.cancelled;
        if (!cancelled && uri) updateImage(uri);
    };

    const pickFromGallery = async () => {
        await closeModal();

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') return Alert.alert('Permission denied', 'Gallery access is required.');

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        const uri = result.assets?.[0]?.uri || result.uri;
        const cancelled = result.canceled ?? result.cancelled;
        if (!cancelled && uri) updateImage(uri);
    };

    const pickFromFiles = async () => {
        await closeModal();

        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                copyToCacheDirectory: true,
                multiple: false,
            });

            if (result.assets && result.assets.length > 0) {
                updateImage(result.assets[0].uri);
                return;
            }

            if (result.type === 'success' && result.uri) {
                updateImage(result.uri);
            }

        } catch (error) {
            Alert.alert('Error', 'Could not open file picker');
        }
    };

    const removeImage = () => {
        setModalVisible(false);
        setImageUri(null);

        updateAppData(APP_DATA_KEYS.userDetails, {
            ...(appData.userDetails || {}),
            image: null,
        });
    };

    const showPicker = () => {
        if (Platform.OS === 'ios') {
            const options = [
                'Cancel',
                'Take Photo',
                'Choose from Gallery',
                'Choose from Files',
                ...(imageUri ? ['Remove Photo'] : []),
            ];
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex: 0,
                    destructiveButtonIndex: imageUri ? options.length - 1 : undefined,
                },
                (index) => {
                    if (index === 1) pickFromCamera();
                    if (index === 2) pickFromGallery();
                    if (index === 3) pickFromFiles();
                    if (index === 4 && imageUri) removeImage();
                }
            );
        } else {
            setModalVisible(true);
        }
    };

    const handlePress = () => {
        if (isEditable) {
            showPicker();
        } else {
            onPress && onPress(imageUri);
        }
    };

    const initials = `${finalFirstName?.[0]?.toUpperCase() || ''}${finalLastName?.[0]?.toUpperCase() || ''}`;

    return (
        <>
            <TouchableOpacity
                onPress={handlePress}
                style={[styles.touchable, { width: size, height: size, borderRadius: size / 2 }, style]}
            >
                {imageUri ? (
                    <Image
                        key={imageUri}
                        source={{ uri: imageUri }}
                        style={styles.image}
                        onError={(e) => console.log('Image error:', e.nativeEvent.error)}
                    />
                ) : (
                    <View style={styles.initialsContainer}>
                        <Text style={[styles.initialsText, { fontSize: size / 2.5 }]}>
                            {initials || '?'}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>

            {isEditable && (
                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                        <View style={styles.modalSheet}>
                            <View style={styles.modalHandle} />

                            <Pressable style={styles.option} onPress={pickFromCamera}>
                                <Text style={styles.optionText}>Take Photo</Text>
                            </Pressable>

                            <View style={styles.separator} />

                            <Pressable style={styles.option} onPress={pickFromGallery}>
                                <Text style={styles.optionText}>Choose from Gallery</Text>
                            </Pressable>

                            <View style={styles.separator} />

                            <Pressable style={styles.option} onPress={pickFromFiles}>
                                <Text style={styles.optionText}>Choose from Files</Text>
                            </Pressable>

                            {imageUri && (
                                <>
                                    <View style={styles.separator} />
                                    <Pressable style={styles.option} onPress={removeImage}>
                                        <Text style={[styles.optionText, styles.removeText]}>Remove Photo</Text>
                                    </Pressable>
                                </>
                            )}

                            <View style={styles.cancelSeparator} />

                            <Pressable style={styles.option} onPress={() => setModalVisible(false)}>
                                <Text style={[styles.optionText, styles.cancelText]}>Cancel</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Modal>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    touchable: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialsContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#49dbe6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialsText: {
        color: '#fff',
        fontWeight: 'bold',
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modalSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingBottom: 32,
        paddingTop: 8,
    },
    modalHandle: {
        width: 36,
        height: 4,
        backgroundColor: '#ccc',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 8,
    },
    option: {
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    optionText: {
        fontSize: 16,
        color: '#222',
        textAlign: 'center',
    },
    removeText: {
        color: '#E24B4A',
    },
    cancelText: {
        color: '#888',
        fontWeight: '500',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 16,
    },
    cancelSeparator: {
        height: 8,
        backgroundColor: '#f2f2f2',
        marginVertical: 8,
    },
});

export default ProfileAvatar;