import LoginContainer from '@features/auth/containers/Login.container';
import { Box, Image } from 'native-base';

const LoginScreen = () => (
	<Box safeArea flex="1" bg="#1D004C">
		<Box flex="1" alignItems="center" justifyContent="center">
			<Image source={require('../../../../assets/logo.png')} size={200} alt="Logo" />
		</Box>
		<LoginContainer />
	</Box>
);

export default LoginScreen;
