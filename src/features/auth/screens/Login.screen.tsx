import LoginContainer from '@features/auth/containers/Login.container';
import { Box } from 'native-base';

const LoginScreen = () => (
	<Box safeArea flex="1">
		<LoginContainer />
	</Box>
);

export default LoginScreen;
