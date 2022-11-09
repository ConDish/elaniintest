import LoginComponent from '@features/auth/components/Login.component';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { CLIENT_ID } from '@env';
import { useNavigation } from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';

import type { ScreenNavigationProp } from '@app-types';

GoogleSignin.configure({
	webClientId: CLIENT_ID,
	offlineAccess: true,
});

const LoginContainer = () => {
	const navigation = useNavigation<ScreenNavigationProp<'Login'>>();
	const onGoogleButtonPress = async () => {
		try {
			await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
			const { idToken } = await GoogleSignin.signIn();
			const googleCredential = auth.GoogleAuthProvider.credential(idToken);
			auth().signInWithCredential(googleCredential);
			navigation.navigate('Dashboard');
		} catch (error) {
			crashlytics().recordError(error as Error);
		}
	};

	return <LoginComponent onGoogleButtonPress={onGoogleButtonPress} />;
};

export default LoginContainer;
