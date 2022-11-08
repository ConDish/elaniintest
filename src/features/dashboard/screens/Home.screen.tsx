import { Box } from 'native-base';
import HomeContainer from '@features/dashboard/containers/Home.container';

const HomeScreen = () => (
	<Box safeArea flex="1">
		<HomeContainer />
	</Box>
);

export default HomeScreen;
