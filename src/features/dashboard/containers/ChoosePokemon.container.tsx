import ChoosePokemonComponent from '@features/dashboard/components/ChoosePokemon.component';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { useRef, useState } from 'react';
import database from '@react-native-firebase/database';
import type { CreateTeamsFormValues, Pokemon } from '../types';
import type { ScreenNavigationProp } from '@app-types';

const MIN_SELECTED_POKEMONS = 3;
const MAX_SELECTED_POKEMONS = 6;

const ChoosePokemonContainer = () => {
	const navigation = useNavigation<ScreenNavigationProp<'ChoosePokemon'>>();
	const { pokemons, dataTeam } = useRoute().params as { pokemons: Pokemon[]; dataTeam: CreateTeamsFormValues };
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
			database()
				.ref('/teams')
				.push()
				.set({
					pokemons: selecteds,
					...dataTeam,
				});
			navigation.navigate('Home');
			setError(undefined);
		} catch (error) {
			setError('Something went wrong');
		}
	}, []);

	return <ChoosePokemonComponent pokemons={pokemons} onSelectedPokemon={onSelectedPokemon} onSubmit={onSubmit} error={error} />;
};

export default ChoosePokemonContainer;
