import { Box, Spinner } from 'native-base';
import TeamsComponent from '../components/Teams.component';
import { useGetTeams } from '../hooks/useGetTeams';
import database from '@react-native-firebase/database';
import { TeamResponse } from '../types';
import { useNavigation } from '@react-navigation/native';
import type { ScreenNavigationProp } from '@app-types';

const TeamsContainer = () => {
	const { teamsData, isLoading } = useGetTeams();
	const navigation = useNavigation<ScreenNavigationProp<'Teams'>>();
	const onDelete = (id: string) => database().ref('/teams').child(id).remove();
	const onEdit = (team: TeamResponse) => navigation.navigate('CreateTeams', { team, isUpdate: true });
	if (isLoading) {
		return (
			<Box flex="1" alignItems="center" justifyContent="center">
				<Spinner size="lg" color="white" />
			</Box>
		);
	}
	console.log(teamsData);
	return <TeamsComponent teamsData={teamsData} onDelete={onDelete} onEdit={onEdit} />;
};

export default TeamsContainer;
