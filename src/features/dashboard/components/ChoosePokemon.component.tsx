import type { Pokemon } from '../types';
import { Box, Button, Checkbox, Image, Text } from 'native-base';
import { FlashList } from '@shopify/flash-list';
import { useState, memo, useCallback } from 'react';

type Props = {
	pokemons: Pokemon[];
	onSelectedPokemon: (pokemon: Pokemon) => void;
	onSubmit: () => void;
	error?: string;
	selectedPokemons: Set<Pokemon>;
	isUpdate: boolean;
};

type ItemProps = {
	item: Pokemon;
	onSelectedPokemon: (pokemon: Pokemon) => void;
	isDefaultChecked: boolean;
};

const Item = memo(({ item, onSelectedPokemon, isDefaultChecked }: ItemProps) => {
	const [isChecked, setIsChecked] = useState<boolean>(isDefaultChecked || false);
	const onPress = useCallback(() => {
		setIsChecked((prev) => !prev);
		onSelectedPokemon(item);
	}, [onSelectedPokemon]);

	return (
		<Box flex="1" justifyContent="center" m="5" alignItems="center">
			<Image
				source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.entry_number}.png` }}
				size={100}
				alt="pokemon"
			/>
			<Checkbox accessibilityLabel="Select pokemon" value="pokemon" isChecked={isChecked} onChange={onPress} />
		</Box>
	);
});

const ChoosePokemonComponent = ({ pokemons, onSelectedPokemon, onSubmit, error, selectedPokemons, isUpdate }: Props) => {
	const renderItem = ({ item }: { item: Pokemon }) => {
		return <Item item={item} onSelectedPokemon={onSelectedPokemon} isDefaultChecked={selectedPokemons.has(item)} />;
	};
	return (
		<>
			<FlashList<Pokemon>
				data={pokemons}
				renderItem={renderItem}
				numColumns={2}
				estimatedItemSize={30}
				keyExtractor={(item) => item.entry_number.toString()}
			/>
			<Text fontSize="md" color="red.600" textAlign="center">
				{error}
			</Text>
			<Button onPress={onSubmit}>{isUpdate ? 'Update' : 'Submit'}</Button>
		</>
	);
};

export default ChoosePokemonComponent;
