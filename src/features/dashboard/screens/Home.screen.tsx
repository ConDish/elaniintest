import { Box } from 'native-base';
import HomeContainer from '@features/dashboard/containers/Home.container';

const HomeScreen = () => (
	<Box safeArea flex="1" bg="#1D004C">
		<HomeContainer />
	</Box>
);

export default HomeScreen;
