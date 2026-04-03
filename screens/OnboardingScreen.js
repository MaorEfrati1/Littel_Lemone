import { useState, useContext } from 'react';
import { Image, View, StyleSheet, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStateContext } from '../context/AppStateContext';
import { validateEmailWithoutLenght, validateNameWithoutLenght } from '../utils/Validations';
import { COLORS } from '../utils/Colors';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useAppNavigation } from '../hooks/useNavigation';
import { SCREENS } from './Screens';

const OnboardingScreen = () => {
  const { updateAppState, APP_STATE_KEYS } = useContext(AppStateContext);
  const { goToScreen } = useAppNavigation();

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
    updateAppState(APP_STATE_KEYS.isOnboardingCompleted, true);
    updateAppState(APP_STATE_KEYS.userDetails, {
      firstName,
      email,
    });

    goToScreen(SCREENS.Home);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.LogoContainer}>
        <Image
          source={require('../assets/logo.jpg')}
          style={styles.LogoImage}
        />
      </View>

      <View style={styles.BodyContainer}>
        <Text style={styles.Title}>Let us get to know you!</Text>

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

        <Button title="Next" onPress={handleSignIn} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondaryContainer },
  LogoContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 40,
  },
  LogoImage: { width: '80%', resizeMode: 'contain' },
  BodyContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  Title: { fontSize: 24, textAlign: 'center', marginBottom: 30, color: '#666' },
  FieldsContainer: { marginBottom: 20 },
});

export default OnboardingScreen;