import { NativeBaseProvider } from "native-base";
import {
  Poppins_300Light,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_100Thin,
  useFonts,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { theme } from "@theme/index";
import RootRoutes from "@navigation/RootRoutes";

SplashScreen.preventAutoHideAsync();
export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_300Light,
    Poppins_500Medium,
  });

  if (!fontsLoaded) return;

  return (
    <NativeBaseProvider theme={theme}>
      <RootRoutes />
    </NativeBaseProvider>
  );
}