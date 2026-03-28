import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import { AppStateProvider } from './context/AppStateContext';

export default function App() {
  return (
    <AppStateProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppStateProvider>
  );
}
