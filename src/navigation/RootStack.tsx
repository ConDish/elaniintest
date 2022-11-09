import { useMemo } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList } from '@app-types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
	const [initializing, setInitializing] = useState(true);
	const screenDefaultOptions = useMemo<NativeStackNavigationOptions>(
		() => ({
			screenOrientation: 'portrait',
			headerBackTitleVisible: false,
			headerHideShadow: true,
			headerHideBackButton: true,
			headerLargeTitleHideShadow: true,
			headerShown: false,
			contentStyle: {
				flex: 1,
			},
			stackAnimation: 'slide_from_right', // slide animation for androidscree
		}),
		[],
	);

	const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
		setUser(user);
		if (initializing) setInitializing(false);
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	const initialRouteName = !user ? 'Login' : 'Dashboard';

	if (initializing) return null;

	return (
		<Stack.Navigator initialRouteName={initialRouteName} screenOptions={screenDefaultOptions}>
			<Stack.Screen name="Login" getComponent={() => require('@features/auth/screens/Login.screen').default} />
			<Stack.Screen name="Dashboard" getComponent={() => require('@features/dashboard/screens/Dashboard.screen').default} />
			<Stack.Screen
				name="ChoosePokemon"
				getComponent={() => require('@features/dashboard/screens/ChoosePokemon.screen').default}
			/>
			<Stack.Screen
				name="CreateTeams"
				getComponent={() => require('@features/dashboard/screens/CreateTeams.screen').default}
			/>
		</Stack.Navigator>
	);
};

RootStack.displayName = 'RootStack';

export default RootStack;
