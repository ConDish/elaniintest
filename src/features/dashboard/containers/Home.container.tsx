import HomeComponent from '@features/dashboard/components/Home.component';
import { useGetRegions } from '../hooks/useGetRegions';

const HomeContainer = () => {
	const { regions, isLoading, isError } = useGetRegions();
	const onPress = () => {
		console.log('Pressed');
	};
	if (isError) return;
	return <HomeComponent regions={regions} onPress={onPress} />;
};

export default HomeContainer;
