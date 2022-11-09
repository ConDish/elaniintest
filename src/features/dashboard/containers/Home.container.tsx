import HomeComponent from '@features/dashboard/components/Home.component';
import { Box, Icon, Image, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useGetRegions } from '../hooks/useGetRegions';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import type { ScreenNavigationProp } from '@app-types';

const HomeContainer = () => {
	const navigation = useNavigation<ScreenNavigationProp<'Home'>>();
	const { regions, isError } = useGetRegions();
	const onPress = () => {};
	const onCreateTeams = () => {
		navigation.navigate('CreateTeams');
	};

	const onLogout = () => {
		auth().signOut();
		navigation.navigate('Login');
	};

	if (isError) return <Box />;
	return (
		<>
			<Box flexDirection="row" p="2">
				<Image source={{ uri: 'https://i.gifer.com/2iiJ.gif' }} resizeMode="contain" size={10} alt="pokemon_running" />
				<Box flex="1" justifyContent="flex-end" p="3" alignItems="center" flexDirection="row">
					<Pressable onPress={onCreateTeams} mr="5">
						<Icon as={Ionicons} name="person-add-outline" size="lg" color="white" />
					</Pressable>
					<Pressable onPress={onLogout}>
						<Icon as={Ionicons} name="log-out-outline" size="lg" color="white" />
					</Pressable>
				</Box>
			</Box>
			<HomeComponent regions={regions} onPress={onPress} />
		</>
	);
};

export default HomeContainer;
