import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppDataContext } from '../context/AppDataContext';
import { useAppNavigation } from '../hooks/useNavigation';
import BasePage from '../components/BasePage';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CheckboxGroup from '../components/CheckboxGroup';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { validateName, validateEmail, validatePhoneNumber } from '../utils/Validations';
import { COLORS } from '../utils/Colors';
import { SCREENS } from './Screens';

const ProfileScreen = () => {
    const { goBack, goToScreen } = useAppNavigation();

    const emailNotificationsOrder = [
        'orederStatuses',
        'passwordChanges',
        'specialOffers',
        'newsletter',
    ];

    const emailNotificationsLabels = {
        orederStatuses: 'Order statuses',
        passwordChanges: 'Password changes',
        specialOffers: 'Special offers',
        newsletter: 'Newsletter',
    };

    const { appData, updateAppData, APP_DATA_KEYS, clearAppData } = useContext(AppDataContext);

    const [firstName, setFirstName] = useState(appData.userDetails.firstName);
    const [lastName, setLastName] = useState(appData.userDetails.lastName);
    const [email, setEmail] = useState(appData.userDetails.email);
    const [phoneNumber, setPhoneNumber] = useState(appData.userDetails.phone);
    const [formErrors, setFormErrors] = useState({});
    const [emailNotifications, setEmailNotifications] = useState(
        appData.userDetails.emailNotifications || {
            orederStatuses: false,
            passwordChanges: false,
            specialOffers: false,
            newsletter: false,
        }
    );

    const clearError = (field) => {
        setFormErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleSaveChanges = () => {
        let errors = {};

        const firstNameError = validateName(firstName);
        const lastNameError = validateName(lastName);
        const emailError = validateEmail(email);
        const phoneError = validatePhoneNumber(phoneNumber);

        if (firstNameError) errors.firstName = firstNameError;
        if (lastNameError) errors.lastName = lastNameError;
        if (emailError) errors.email = emailError;
        if (phoneError) errors.phoneNumber = phoneError;

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        updateAppData(APP_DATA_KEYS.userDetails, {
            ...appData.userDetails,
            firstName,
            lastName,
            email,
            phone: phoneNumber,
            emailNotifications,
        });

        setFormErrors({});
    };

    const handleDiscardChanges = () => {
        setFirstName(appData.userDetails.firstName);
        setLastName(appData.userDetails.lastName);
        setEmail(appData.userDetails.email);
        setPhoneNumber(appData.userDetails.phone);
        setEmailNotifications(appData.userDetails.emailNotifications || {});
        setFormErrors({});
    };

    const handleLogout = () => {
        clearAppData();
        goToScreen(SCREENS.Onboarding)
    };

    return (
        <BasePage
            HeaderComponent={Header}
            headerProps={{
                showBackButton: true,
                firstName: firstName,
                lastName: lastName,
                onPressBack: () => { goBack() },
                onPressProfile: null,
            }}
            bodyChildren={
                <View>
                    <Text style={styles.TitleText}>Personal Information</Text>

                    <InputField
                        label="First Name"
                        value={firstName}
                        onChangeText={(text) => {
                            setFirstName(text);
                            clearError('firstName');
                        }}
                        placeholder="Enter your first name"
                        validator={validateName}
                        error={formErrors.firstName}
                    />

                    <InputField
                        label="Last Name"
                        value={lastName}
                        onChangeText={(text) => {
                            setLastName(text);
                            clearError('lastName');
                        }}
                        placeholder="Enter your last name"
                        validator={validateName}
                        error={formErrors.lastName}
                    />

                    <InputField
                        label="Email"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            clearError('email');
                        }}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        validator={validateEmail}
                        error={formErrors.email}
                    />

                    <InputField
                        label="Phone Number"
                        value={phoneNumber}
                        onChangeText={(text) => {
                            setPhoneNumber(text);
                            clearError('phoneNumber');
                        }}
                        placeholder="Enter your phone number"
                        keyboardType="numeric"
                        validator={validatePhoneNumber}
                        error={formErrors.phoneNumber}
                    />

                    <CheckboxGroup
                        label="Email notifications"
                        options={emailNotifications}
                        order={emailNotificationsOrder}
                        labels={emailNotificationsLabels}
                        onChange={setEmailNotifications}
                    />

                    <Button title="Logout" style={styles.Logout} onPress={handleLogout} />
                </View>
            }
            FooterComponent={() => (
                <Footer
                    buttons={[
                        {
                            label: 'Discard Changes',
                            onPress: handleDiscardChanges,
                            validation: true,
                        },
                        {
                            label: 'Save Changes',
                            onPress: handleSaveChanges,
                            validation: true,
                        },
                    ]}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    TitleText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    Logout: {
        backgroundColor: COLORS.logoutButton,
        borderColor: COLORS.logoutButtonBorder,
        borderWidth: 2,
    },
});

export default ProfileScreen;