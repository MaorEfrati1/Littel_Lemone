import { useState, useContext } from 'react';
import { View, StyleSheet, } from 'react-native';
import { AppDataContext } from '../context/AppDataContext';
import { validateEmailWithoutLenght, validateNameWithoutLenght } from '../utils/Validations';
import { COLORS } from '../utils/Colors';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAppNavigation } from '../hooks/useNavigation';
import { SCREENS } from './Screens';
import BasePage from '../components/BasePage';
import HeroBanner from '../components/HeroBanner';

const OnboardingScreen = () => {
  const { updateAppData, APP_DATA_KEYS } = useContext(AppDataContext);
  const { replaceScreen } = useAppNavigation();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleSignIn = () => {
    // Validate on press
    const errors = {};

    const firstNameError = validateNameWithoutLenght(firstName, false);
    const emailError = validateEmailWithoutLenght(email, false);

    if (firstNameError) errors.firstName = firstNameError;
    if (emailError) errors.email = emailError;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Save user details
    updateAppData(APP_DATA_KEYS.isOnboardingCompleted, true);
    updateAppData(APP_DATA_KEYS.userDetails, {
      firstName,
      email,
    });

    replaceScreen(SCREENS.Home);
  };

  const isFormValid = () => {
    const firstNameError = validateNameWithoutLenght(firstName, false);
    const emailError = validateEmailWithoutLenght(email, false);

    return !firstNameError && !emailError;
  };

  return (
    <BasePage
      scrollable={false}
      HeaderComponent={Header}
      headerProps={{
        showBackButton: false,
        showProfile: false
      }}
      bodyChildren={
        <View style={styles.container}>

          <HeroBanner
            imageSource={require('../assets/little-lemon-logo.png')}
          />

          <View style={styles.FieldsContainer}>
            <InputField
              label="First Name"
              placeholder="Type Your First Name"
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                setFormErrors({ ...formErrors, firstName: '' });
              }}
              error={formErrors.firstName}
            />

            <InputField
              label="Email"
              placeholder="Type Your Email"
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text);
                setFormErrors({ ...formErrors, email: '' });
              }}
              error={formErrors.email}
            />
          </View>

          <Button title="Next" onPress={handleSignIn} disabled={!isFormValid()} />
        </View>
      }
      FooterComponent={() => <Footer buttons={[]} />}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  LogoContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 40,
  },
  LogoImage: { width: '80%', resizeMode: 'contain' },
  BodyContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  Title: { fontSize: 24, textAlign: 'center', marginBottom: 30, color: '#666' },
  FieldsContainer: { marginVertical: 30 },
});

export default OnboardingScreen;