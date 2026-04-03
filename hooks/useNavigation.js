import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../screens/Screens';

export function useAppNavigation() {
    const navigation = useNavigation();

    const goToScreen = (screenName, params) => {
        navigation.navigate(screenName, params);
    };

    const replaceScreen = (screenName, params) => {
        navigation.replace(screenName, params);
    };

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate(SCREENS.Home); // fallback
        }
    };

    return { goToScreen, goBack, replaceScreen };
}