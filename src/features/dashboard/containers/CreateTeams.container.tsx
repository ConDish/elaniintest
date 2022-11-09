import CreateTeamsComponent from '@features/dashboard/components/CreateTeams.component';
import { zodResolver } from '@hookform/resolvers/zod';
import { form } from '@features/dashboard/constants';
import type { CreateTeamsFormValues } from '../types';
import { useForm } from 'react-hook-form';
import { useGetRegions } from '../hooks/useGetRegions';
import React from 'react';
import { Box } from 'native-base';
import { useGetPokemonByRegion } from '../hooks/useGetPokemonByRegion';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@app-types';

const CreateTeamsContainer = () => {
	const navigation = useNavigation<ScreenNavigationProp<'CreateTeams'>>();
	const { regions, isError } = useGetRegions();
	const { pokemons, isError: isErrorPokemon, getPokemonByRegion } = useGetPokemonByRegion(undefined);
	const { control, handleSubmit } = useForm<CreateTeamsFormValues>({
		resolver: zodResolver(form.createTeams.schema),
        defaultValues: form.createTeams.initialValues,
	});

	const onSelectedRegion = (region: string) => {
		console.log(region);
		getPokemonByRegion(region);
	};

	const onNext = (dataTeam: CreateTeamsFormValues) => {
		navigation.navigate('ChoosePokemon', { pokemons, dataTeam });
	};

	if (isError) return <Box />;
	return (
		<CreateTeamsComponent control={control} regions={regions} onSelectedRegion={onSelectedRegion} onNext={handleSubmit(onNext)} />
	);
};

export default CreateTeamsContainer;
