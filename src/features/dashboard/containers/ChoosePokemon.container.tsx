import ChoosePokemonComponent from '@features/dashboard/components/ChoosePokemon.component';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { useRef, useState } from 'react';
import database from '@react-native-firebase/database';
import type { CreateTeamsFormValues, Pokemon, TeamResponse } from '../types';
import type { ScreenNavigationProp } from '@app-types';

const MIN_SELECTED_POKEMONS = 3;
const MAX_SELECTED_POKEMONS = 6;

const ChoosePokemonContainer = () => {
	const navigation = useNavigation<ScreenNavigationProp<'ChoosePokemon'>>();
	const { pokemons, dataTeam, isUpdate, team } = useRoute().params as {
		pokemons: Pokemon[];
		dataTeam: CreateTeamsFormValues;
		isUpdate: boolean;
		team: TeamResponse;
	};
	const selectedPokemons = useRef<Set<Pokemon>>(new Set());
	const [error, setError] = useState<string | undefined>(undefined);

	const onSelectedPokemon = useCallback((pokemon: Pokemon) => {
		if (selectedPokemons.current.has(pokemon)) {
			selectedPokemons.current.delete(pokemon);
		} else {
			selectedPokemons.current.add(pokemon);
		}
	}, []);

	const onSubmit = useCallback(() => {
		try {
			if (selectedPokemons.current.size < MIN_SELECTED_POKEMONS) {
				setError(`You must select at least ${MIN_SELECTED_POKEMONS} pokemons`);
				return;
			}

			if (selectedPokemons.current.size > MAX_SELECTED_POKEMONS) {
				setError(`You must select at most ${MAX_SELECTED_POKEMONS} pokemons`);
				return;
			}
			const selecteds = [...selectedPokemons.current];
			if (isUpdate) {
				database().ref('/teams').child(team.id).update({
					name: dataTeam.name,
					pokedexDescription: dataTeam.pokedexDescription,
					type: dataTeam.type,
					pokemons: selecteds,
				});
			} else {
				const reference = database().ref('/teams').push();
				reference.set({
					id: reference.key,
					pokemons: selecteds,
					...dataTeam,
				});
			}
			navigation.navigate('Home');
			setError(undefined);
		} catch (error) {
			setError('Something went wrong');
		}
	}, []);

	return (
		<ChoosePokemonComponent
			pokemons={pokemons}
			onSelectedPokemon={onSelectedPokemon}
			onSubmit={onSubmit}
			error={error}
			selectedPokemons={selectedPokemons.current}
			isUpdate={isUpdate}
		/>
	);
};

export default ChoosePokemonContainer;
