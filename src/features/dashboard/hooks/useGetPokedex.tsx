import { useState } from 'react';
export const useGetPokedex = () => {
	const [pokedex, setPokedex] = useState<Pokedex[]>([]);
};
