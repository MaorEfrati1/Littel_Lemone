import React from 'react'
import { View, Text } from 'react-native'
import { useAppNavigation } from '../hooks/useNavigation';
import { SCREENS } from './Screens';
import BasePage from '../components/BasePage';
import Footer from '../components/Footer';
import Header from '../components/Header';

const HomePage = () => {
    const { goBack, goToScreen } = useAppNavigation();

    return (
        <BasePage
            HeaderComponent={Header}
            headerProps={{
                showBackButton: false,
                onPressBack: () => { goBack() },
                onPressProfile: () => { goToScreen(SCREENS.Profile) },
            }}
            bodyChildren={
                <View>
                    <Text>Personal Information</Text>
                </View>
            }
            FooterComponent={() => (
                <Footer
                    buttons={[]}
                />
            )}
        />
    );
}

export default HomePage