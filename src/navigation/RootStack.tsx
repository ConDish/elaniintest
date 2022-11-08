import { useMemo } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList } from '@app-types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
	const screenDefaultOptions = useMemo<NativeStackNavigationOptions>(
		() => ({
			screenOrientation: 'portrait',
			headerBackTitleVisible: false,
			headerHideShadow: true,
			headerHideBackButton: true,
			headerShown: false,
			headerLargeTitleHideShadow: true,
			contentStyle: {
				flex: 1,
			},
			stackAnimation: 'slide_from_right', // slide animation for androidscree
		}),
		[],
	);

	const initialRouteName = 'Login';

	return (
		<Stack.Navigator initialRouteName={initialRouteName} screenOptions={screenDefaultOptions}>
			<Stack.Screen name="Login" getComponent={() => require('@features/auth/screens/Login.screen').default} />
			<Stack.Screen name="Dashboard" getComponent={() => require('@features/dashboard/screens/Dashboard.screen').default} />
			<Stack.Screen name="ChoosePokemon" getComponent={() => require('@features/dashboard/screens/ChoosePokemon.screen').default} />
		</Stack.Navigator>
	);
};

RootStack.displayName = 'RootStack';

export default RootStack;
