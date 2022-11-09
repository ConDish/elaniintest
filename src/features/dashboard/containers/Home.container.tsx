import HomeComponent from '@features/dashboard/components/Home.component';
import { Pressable, Text, Box, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useGetRegions } from '../hooks/useGetRegions';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import type { ScreenNavigationProp } from '@app-types';

const HomeContainer = () => {
	const navigation = useNavigation<ScreenNavigationProp<'Home'>>();
	const { regions, isError } = useGetRegions();
	const onPress = () => {
		console.log('Pressed');
	};
	const onCreateTeams = () => {
		navigation.navigate('CreateTeams');
	};

	const onLogout = () => {
		auth().signOut();
		navigation.navigate('Login');
	};

	if (isError) return;
	return (
		<>
			<Box justifyContent="flex-end" p="3" alignItems="center" flexDirection="row">
				<Icon as={Ionicons} name="person-add-outline" size="lg" color="black" mr="5" onPress={onCreateTeams} />
				<Icon as={Ionicons} name="log-out-outline" size="lg" color="black" onPress={onLogout} />
			</Box>
			<HomeComponent regions={regions} onPress={onPress} />
		</>
	);
};

export default HomeContainer;
