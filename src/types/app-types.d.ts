import type { CreateTeamsFormValues, Pokemon, TeamResponse } from '@features/dashboard/types';
import type { NativeStackNavigationOptions, NativeStackNavigationProp } from 'react-native-screens/native-stack';

export type RootStackParamList = {
	Home: undefined;
	Dashboard: undefined;
	Login: undefined;
	CreateTeams:
		| undefined
		| {
				team: TeamResponse;
				isUpdate: boolean;
		  };
	ChoosePokemon: { pokemons: Pokemon[]; dataTeam: CreateTeamsFormValues; isUpdate: boolean; team: TeamResponse };
	Teams: undefined;
};

export declare type RouteNamesKeys = keyof RootStackParamList;

export declare type ScreenNavigationProp<RouteName extends RouteNamesKeys> = NativeStackNavigationProp<
	RootStackParamList,
	RouteName
>;
