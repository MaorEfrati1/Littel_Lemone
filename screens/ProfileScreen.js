import React, { useContext } from 'react'
import { View, Text, Image } from 'react-native'
import { AppStateContext } from '../context/AppStateContext';
import BasePage from '../components/BasePage';
import Footer from '../components/Footer';
import Header from '../components/Header';

// const { updateAppState, APP_STATE_KEYS } = useContext(AppStateContext);

const HandleEditProfile = () => {
    // updateAppState(APP_STATE_KEYS.isOnboardingCompleted, true);
}

const HandleLogout = () => {
    updateAppState(APP_STATE_KEYS.isOnboardingCompleted, false);
}
const HandlePressBack = () => {
    // updateAppState(APP_STATE_KEYS.isOnboardingCompleted, false);
}

const HandleDiscardChanges = () => {
    // updateAppState(APP_STATE_KEYS.isOnboardingCompleted, false);
}

const HandleSaveChanges = () => {
    // updateAppState(APP_STATE_KEYS.isOnboardingCompleted, false);
}

const ProfileScreen = () => {
    return (
        <View >
            <BasePage headerProps={{
                component: Header,
                props: {
                    showBackButton: true,
                    onPressBack: () => HandlePressBack(),
                    onPressProfile: () => HandleEditProfile(),
                    profileImage: '../assets/icon.png'
                }
            }}

                bodyChildren={
                    <View>
                        {/* <Text style={{ fontSize: 18, marginBottom: 20 }}>תוכן ראשי של המסך</Text>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/300' }}
                            style={{ width: '100%', height: 200, marginBottom: 20 }}
                            resizeMode="contain"
                        />
                        <Text style={{ fontSize: 16 }}>עוד תוכן, רשימות, טפסים וכו׳...</Text> */}
                    </View>
                }

                FooterComponent={() => (
                    <Footer
                        buttons={[
                            {
                                label: 'Save Changes',
                                onPress: () => HandleSaveChanges(),
                                validation: true,
                            },
                            {
                                label: 'Discard Changes',
                                onPress: () => HandleDiscardChanges(),
                                validation: true,
                            },

                        ]}
                    />
                )}
            />
        </View>
    )
}

export default ProfileScreen