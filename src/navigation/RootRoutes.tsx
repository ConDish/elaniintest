import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import RootStack from './RootStack';

const RootRoutes = () => (
	<>
		<StatusBar style="auto" />
		<NavigationContainer onReady={() => SplashScreen.hideAsync()}>
			<RootStack />
		</NavigationContainer>
	</>
);

export default RootRoutes;
