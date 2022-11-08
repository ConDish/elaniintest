import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import type { RootStackParamList } from '@app-types';

const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

const DashboardScreen = () => (
	<Tab.Navigator labeled={false}>
		<Tab.Screen
			options={{
				tabBarIcon: 'home',
			}}
			name="Home"
			getComponent={() => require('@features/dashboard/screens/Home.screen').default}
		/>
		<Tab.Screen
			options={{
				tabBarIcon: 'account-plus',
			}}
			name="CreateTeams"
			getComponent={() => require('@features/dashboard/screens/CreateTeams.screen').default}
		/>
	</Tab.Navigator>
);

export default DashboardScreen;
