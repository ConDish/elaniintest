import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Regions } from '../types';
import crashlytics from '@react-native-firebase/crashlytics';

export const useGetRegions = () => {
	const [regions, setRegions] = useState<Regions[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<unknown>();

	const getRegions = async () => {
		try {
			const { data } = await axios('https://pokeapi.co/api/v2/region');
			if (!data) {
				throw new Error('No data');
			}
			setRegions(data.results);
		} catch (error) {
			setIsError(error);
			crashlytics().recordError(error as Error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getRegions();
	}, []);

	return { regions, isLoading, isError };
};
