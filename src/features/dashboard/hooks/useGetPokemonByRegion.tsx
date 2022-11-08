import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import type { Pokemon } from '../types';

export const useGetPokemonByRegion = (url: string | undefined) => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<unknown>();
	useEffect(() => {
		if (!url) return;
		getPokemonByRegion(url);
	}, []);

	const getPokemonByRegion = async (url: string) => {
		console.log(url);
		try {
			const { data: region } = await axios(url);
			if (!region) return;
			const { data: pokedex } = await axios(region.pokedexes[0].url);
			if (!pokedex) return;
			setPokemons(pokedex.pokemon_entries);
		} catch (error) {
			setIsError(error);
		}
		setIsLoading(false);
	};

	return { pokemons, isLoading, isError, getPokemonByRegion };
};
