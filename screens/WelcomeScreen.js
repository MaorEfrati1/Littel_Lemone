import * as React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { COLORS } from '../utils/Colors';

const WelcomeScreen = ({ navigation }) => {
  return <View style={styles.container}>
    <Image source={require('../assets/little-lemon-logo.png')} style={styles.LogoImage} />
    <Text style={styles.Title}>Welcome to Little Lemon</Text>
    <Text style={styles.Subtitle}>Your local Mediterranean bistro with the freshest ingredients</Text>

    <View style={styles.FeaturesList}>
      <Text style={styles.Feature}>🍽️ Fresh and delicious food</Text>
      <Text style={styles.Feature}>👨‍🍳 Unique recipes</Text>
      <Text style={styles.Feature}>🌟 Unforgettable experience</Text>
    </View>

    <Pressable
      style={({ pressed }) => [
        styles.Button,
        pressed && styles.ButtonPressed
      ]}
      onPress={() => navigation.navigate('Subscribe')}
    >
      <Text style={styles.ButtonText}>Newsletter</Text>
      <Text style={{ fontWeight: 'bold' }}>
        I am bold
        <Text style={{ color: 'blue' }}>and blue</Text>
      </Text>

    </Pressable>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  LogoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  Title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: COLORS.primary,
  },
  Subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: '500',
    color: '#666',
    width: '85%',
  },
  FeaturesList: {
    marginVertical: 30,
    width: '100%',
  },
  Feature: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: COLORS.textDark,
  },
  Button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ButtonPressed: {
    opacity: 0.8,
    elevation: 8,
  },
  ButtonText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
