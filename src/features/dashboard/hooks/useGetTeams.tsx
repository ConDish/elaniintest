import { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import type { TeamResponse } from '../types';
import { useIsFocused } from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';

export const useGetTeams = () => {
	const [teamsData, setTeamsData] = useState<TeamResponse[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const isFocused = useIsFocused();

	useEffect(() => {
		if (!isFocused) return;

		const onValueChange = database()
			.ref('/teams')
			.on('value', (snapshot) => {
				const teams = snapshot.val();
				if (!teams) {
					setTeamsData([]);
					setIsLoading(false);
					crashlytics().recordError({ message: 'Not found' } as Error);
					return;
				}
				setTeamsData(Object.values(teams));
				setIsLoading(false);
			});

		return () => database().ref('/teams').off('value', onValueChange);
	}, [isFocused]);

	return { teamsData, isLoading };
};
