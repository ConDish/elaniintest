import { Box, Text } from 'native-base';
import ChoosePokemonContainer from '@features/dashboard/containers/ChoosePokemon.container';

const ChoosePokemonScreen = () => (
	<Box safeArea flex="1" bg="#1D004C">
		<Box p="3">
			<Text fontSize="lg" color="white">Choose your pokemons</Text>
		</Box>
		<ChoosePokemonContainer />
	</Box>
);

export default ChoosePokemonScreen;
