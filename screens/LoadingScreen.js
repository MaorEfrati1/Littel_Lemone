import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppState } from '../hooks/useAppState';
import { COLORS } from '../utils/Colors';

const LoadingScreen = () => {
    const { isLoading } = useAppState();


    return (
        <View style={styles.container}>
            <Image style={styles.LogoImage} source={require('../assets/little-lemon-logo.png')} />
            {isLoading === true && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.secondaryContainer} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.primaryContainer,
        alignItems: 'center',
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center',
        marginVertical: 20,
    },
    LogoImage: {
        resizeMode: 'contain',
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    text: {
        fontSize: 24,
    }
});

export default LoadingScreen