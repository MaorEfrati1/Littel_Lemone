import { useState, useContext } from 'react';
import { Image, View, StyleSheet, TextInput, Pressable, Text, Alert } from 'react-native';
import { validateEmail, validateName } from '../utils/Validations';
import { COLORS } from '../utils/Colors';
import { AppStateContext } from '../context/AppStateContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnboardingScreen = () => {
  const { updateAppState, APP_STATE_KEYS } = useContext(AppStateContext);

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const isValidEmail = validateEmail(email) && email.length > 0;
  const isValidName = validateName(firstName) && firstName.length > 0;

  const handleSignIn = () => {
    updateAppState(APP_STATE_KEYS.isOnboardingCompleted, true);
  };

  return <SafeAreaView style={styles.container}>
    <View style={styles.LogoContainer}>
      <Image source={require('../assets/logo.jpg')} style={styles.LogoImage} />
    </View>

    <View style={styles.BodyContainer}>
      <Text style={styles.Title}>Let us get to know you!</Text>

      <View style={styles.FieldsContainer}>
        <View style={styles.InputContainer}>
          <Text style={styles.InputTitle}>First Name:</Text>
          <TextInput
            placeholder="Type Your First Name"
            placeholderTextColor="#999"
            onChangeText={setFirstName}
            value={firstName}
            style={[
              styles.TextInput,
              firstName.length > 0 && (isValidName ? styles.InputValid : styles.InputInvalid)
            ]}
          />
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.InputTitle}>Email:</Text>
          <TextInput
            placeholder="Type Your Email"
            placeholderTextColor="#999"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            style={[
              styles.TextInput,
              email.length > 0 && (isValidEmail ? styles.InputValid : styles.InputInvalid)
            ]}
          />
          {isValidEmail && <Text style={styles.ValidIndicator}>✓ Valid email</Text>}
          {email.length > 0 && !isValidEmail && <Text style={styles.ErrorText}>⚠ Invalid email</Text>}
        </View>
      </View>

      <Pressable
        style={[styles.Button, (!isValidEmail || !isValidName) && styles.ButtonDisabled]}
        onPress={handleSignIn}
        disabled={!isValidEmail || !isValidName}
      >
        <Text style={styles.ButtonText}> Next </Text>
      </Pressable>
    </View >

  </SafeAreaView>
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  LogoContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.primaryContainer,
  },

  LogoImage: {
    alignContent: 'center',
    width: '80%',
    resizeMode: 'contain',
  },

  Title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 25,
    color: '#666',
    width: '100%',
  },

  InputContainer: {
    width: '100%',
    marginBottom: 20,
  },

  BodyContainer: {
    width: '100%',
    backgroundColor: COLORS.secondaryContainer,
    paddingHorizontal: 20,
  },

  FieldsContainer: {
    paddingTop: 100,
    height: 500,
  },

  InputTitle: {
    fontSize: 18,
    color: '#666',
  },

  TextInput: {
    height: 50,
    borderColor: COLORS.border,
    borderWidth: 2,
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    color: COLORS.textDark,
  },

  InputValid: {
    borderColor: COLORS.success,
  },

  InputInvalid: {
    borderColor: COLORS.error,
  },

  ValidIndicator: {
    color: COLORS.success,
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },

  ErrorText: {
    color: COLORS.error,
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },

  Button: {
    backgroundColor: COLORS.primaryButton,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 20,
  },

  ButtonDisabled: {
    backgroundColor: COLORS.disabledButton,
    opacity: 0.6,
  },

  ButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default OnboardingScreen;
