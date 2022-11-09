import { FlatList, Text, Pressable } from 'native-base';
import type { Regions } from '../types';

type Props = {
	regions: Regions[];
	onPress: () => void;
};

const HomeComponent = ({ regions, onPress }: Props) => {
	const renderItem = ({ item }: { item: Regions }) => {
		return (
			<Pressable onPress={onPress} padding="5" alignItems="center" mt="1" bg="white" justifyContent="center">
				<Text fontSize="md">{item.name}</Text>
			</Pressable>
		);
	};
	return <FlatList<Regions> data={regions} renderItem={renderItem} />;
};

export default HomeComponent;
