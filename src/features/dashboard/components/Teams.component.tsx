import { Box, Text, Divider, FlatList, Image, Icon, Pressable } from 'native-base';
import type { TeamResponse } from '../types';
import { Ionicons } from '@expo/vector-icons';

type Props = {
	teamsData: TeamResponse[];
	onDelete: (id: string) => void;
	onEdit: (team: TeamResponse) => void;
};

const TeamsComponent = ({ teamsData, onDelete, onEdit }: Props) => {
	const renderItem = ({ item, index }: { item: TeamResponse; index: number }) => {
		const imageSource =
			item.type === 'mystic'
				? require('../../../../assets/mystic.png')
				: item.type === 'valor'
				? require('../../../../assets/valor.png')
				: require('../../../../assets/instinct.png');
		return (
			<Box bg="white" mt="3">
				<Box p="2" flexDirection="row" justifyContent="space-between">
					<Box>
						<Text fontSize="lg">Name - {item.name}</Text>
						<Text fontSize="md">Number - {index + 1}</Text>
						<Text fontSize="sm">Description - {item.pokedexDescription}</Text>
					</Box>
					<Image source={imageSource} size={45} alt="type_team_logo" />
					<Box flexDir="row">
						<Pressable
							onPress={() => onEdit(item)}
							p="3"
							justifyContent="center"
							alignItems="center"
							android_ripple={{
								borderless: true,
								radius: 20,
							}}>
							<Icon as={Ionicons} name="create-outline" size="lg" color="green.600" />
						</Pressable>
						<Pressable
							ml="2"
							p="3"
							justifyContent="center"
							alignItems="center"
							onPress={() => onDelete(item.id)}
							android_ripple={{
								borderless: false,
								radius: 20,
							}}>
							<Icon as={Ionicons} name="trash-outline" size="lg" color="danger.700" />
						</Pressable>
					</Box>
				</Box>
				<Box flexDir="row" flexWrap="wrap">
					{item.pokemons.map((pokemon) => (
						<Image
							key={pokemon.entry_number}
							source={{
								uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.entry_number}.png`,
							}}
							alt="pokemon"
							size={90}
							resizeMode="cover"
						/>
					))}
				</Box>
			</Box>
		);
	};
	return (
		<FlatList<TeamResponse>
			contentContainerStyle={{
				padding: 10,
			}}
			data={teamsData.reverse()}
			renderItem={renderItem}
			ListEmptyComponent={() => (
				<Box flex="1" bg="red" alignItems="center" justifyContent="center">
					<Text fontSize="lg" textAlign="center" color="white">
						No teams found
					</Text>
				</Box>
			)}
			extraData={teamsData}
			keyExtractor={(item) => item.id.toString()}
		/>
	);
};

export default TeamsComponent;
