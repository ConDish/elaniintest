import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import type { Pokemon } from '../types';
import crashlytics from '@react-native-firebase/crashlytics';


export const useGetPokemonByRegion = (url: string | undefined) => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<unknown>();
	useEffect(() => {
		if (!url) return;
		getPokemonByRegion(url);
	}, []);

	const getPokemonByRegion = async (url: string) => {
		try {
			const { data: region } = await axios(url);
			if (!region) return;
			const { data: pokedex } = await axios(region.pokedexes[0].url);
			if (!pokedex) return;
			setPokemons(pokedex.pokemon_entries);
		} catch (error) {
			setIsError(error);
			crashlytics().recordError(error as Error);
		}
		setIsLoading(false);
	};

	return { pokemons, isLoading, isError, getPokemonByRegion };
};
