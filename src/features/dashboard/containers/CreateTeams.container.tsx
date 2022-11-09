import CreateTeamsComponent from '@features/dashboard/components/CreateTeams.component';
import { zodResolver } from '@hookform/resolvers/zod';
import { form } from '@features/dashboard/constants';
import type { CreateTeamsFormValues, TeamResponse } from '../types';
import { useForm } from 'react-hook-form';
import { useGetRegions } from '../hooks/useGetRegions';
import { Box, Icon, Pressable } from 'native-base';
import { useGetPokemonByRegion } from '../hooks/useGetPokemonByRegion';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp } from '@app-types';
import { Ionicons } from '@expo/vector-icons';

const CreateTeamsContainer = () => {
	const navigation = useNavigation<ScreenNavigationProp<'CreateTeams'>>();
	const { params } = useRoute() as { params: { team: TeamResponse; isUpdate: boolean } };
	const { regions, isError } = useGetRegions();
	const { pokemons, getPokemonByRegion } = useGetPokemonByRegion(undefined);
	const { control, handleSubmit } = useForm<CreateTeamsFormValues>({
		resolver: zodResolver(form.createTeams.schema),
		defaultValues: params
			? { name: params?.team.name, pokedexDescription: params?.team.pokedexDescription, type: params.team.type }
			: form.createTeams.initialValues,
	});

	const onSelectedRegion = (region: string) => getPokemonByRegion(region);
	const onNext = (dataTeam: CreateTeamsFormValues) =>
		navigation.navigate('ChoosePokemon', { pokemons, dataTeam, isUpdate: params?.isUpdate, team: params?.team });
	const onBack = () => navigation.goBack();

	if (isError) return <Box />;
	return (
		<>
			<Box p="3">
				<Pressable onPress={onBack} alignSelf="flex-start">
					<Icon as={Ionicons} name="arrow-back-outline" size="lg" color="white" />
				</Pressable>
			</Box>
			<CreateTeamsComponent
				control={control}
				regions={regions}
				onSelectedRegion={onSelectedRegion}
				onNext={handleSubmit(onNext)}
			/>
		</>
	);
};

export default CreateTeamsContainer;
