import type { Pokemon } from '../types';
import { Box, Button, Checkbox, Text } from 'native-base';
import { FlashList } from '@shopify/flash-list';
import { useState, memo, useCallback } from 'react';

type Props = {
	pokemons: Pokemon[];
    onSelectedPokemon: (pokemon: Pokemon) => void;
    onSubmit: () => void;
    error?: string;
};

type ItemProps = {
	item: Pokemon;
    onSelectedPokemon: (pokemon: Pokemon) => void;
};

const Item = memo(({ item, onSelectedPokemon }: ItemProps) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);
    const onPress = useCallback(() => {
        setIsChecked((prev)=>!prev);
        onSelectedPokemon(item);
    },[onSelectedPokemon]);

	return (
		<Box flex="1" justifyContent="center" m="5" alignItems="center">
			<Text fontSize="md">{item.pokemon_species.name}</Text>
			<Checkbox
				accessibilityLabel="Select pokemon"
				value="pokemon"
				isChecked={isChecked}
				onChange={onPress}
			/>
		</Box>
	);
});

const ChoosePokemonComponent = ({ pokemons, onSelectedPokemon, onSubmit, error }: Props) => {
	const renderItem = ({ item }: { item: Pokemon }) => {
		return <Item item={item} onSelectedPokemon={onSelectedPokemon} />;
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
            <Text fontSize="md" color="red.600" textAlign="center">{error}</Text>
			<Button onPress={onSubmit}>Submit</Button>
		</>
	);
};

export default ChoosePokemonComponent;
