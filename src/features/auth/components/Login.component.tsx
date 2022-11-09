import { Box, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
type Props = {
	onGoogleButtonPress: () => void;
};
const LoginComponent = ({ onGoogleButtonPress }: Props) => {
	return (
		<Box flex="1" alignItems="center" justifyContent="center">
			<Button leftIcon={<Icon as={Ionicons} name="logo-google" size="md" />} colorScheme="danger"  onPress={onGoogleButtonPress}>
				Sign in with Gmail
			</Button>
		</Box>
	);
};

export default LoginComponent;
