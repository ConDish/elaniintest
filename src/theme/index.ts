import { extendTheme } from 'native-base';
export const theme = extendTheme({
	fontConfig: {
		Poppins: {
			100: {
				normal: 'Poppins_100Thin',
			},
			200: {
				normal: 'Poppins_200ExtraLight',
			},
			300: {
				normal: 'Poppins_300Light',
			},
			400: {
				normal: 'Poppins_400Regular',
			},
			500: {
				normal: 'Poppins_500Medium',
			},
		},
	},
	fonts: {
		heading: 'Poppins',
		body: 'Poppins',
		mono: 'Poppins',
	},

	components: {
		Button: {
			defaultProps: {
				colorScheme: 'coolGray',
			},
		},
	},
});
