import ChoosePokemonComponent from '@features/dashboard/components/ChoosePokemon.component';
import { useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { useRef, useState } from 'react';
import type { Pokemon } from '../types';

const MIN_SELECTED_POKEMONS = 3;
const MAX_SELECTED_POKEMONS = 6;

const ChoosePokemonContainer = () => {
	const { pokemons } = useRoute().params as { pokemons: Pokemon[] };
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

        if (selectedPokemons.current.size < MIN_SELECTED_POKEMONS) {
            setError(`You must select at least ${MIN_SELECTED_POKEMONS} pokemons`);
            return;
        }

        if (selectedPokemons.current.size > MAX_SELECTED_POKEMONS) {
            setError(`You must select at most ${MAX_SELECTED_POKEMONS} pokemons`);
            return;
        }
        const selecteds = [...selectedPokemons.current];
        console.log(selecteds);
        setError(undefined);

    }, []);



	return <ChoosePokemonComponent pokemons={pokemons} onSelectedPokemon={onSelectedPokemon} onSubmit={onSubmit} error={error} />;
};

export default ChoosePokemonContainer;
