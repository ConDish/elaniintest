import { ScrollView, Input, FormControl, Select, TextArea, Button, Box } from 'native-base';
import { Controller, UseFormReturn } from 'react-hook-form';

import { form, formKeys } from '../constants';
import type { CreateTeamsFormValues, Pokemon, Regions } from '../types';

type Props = {
	control: UseFormReturn<CreateTeamsFormValues>['control'];
	regions: Regions[];
	onSelectedRegion: (region: string) => void;
	onNext: () => void;
};

const CreateTeamsComponent = ({ control, regions, onSelectedRegion, onNext }: Props) => (
	<>
		<Box p="3" flex="1">
			<Controller
				name={formKeys.createTeams.name}
				control={control}
				render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
					<FormControl isInvalid={!!error}>
						<Input
							placeholder={form.createTeams.placeholder[formKeys.createTeams.name]}
							onChangeText={(value) => onChange(value)}
							bg="white"
							onBlur={onBlur}
							value={value}
							size="lg"
						/>
						<FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
					</FormControl>
				)}
			/>
			<Controller
				name={formKeys.createTeams.region}
				control={control}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<FormControl isInvalid isRequired>
						<Select
							onValueChange={(regionValue) => {
								onChange(regionValue);
								onSelectedRegion(regions.filter((region) => region.name === regionValue)[0].url);
							}}
							bg="white"
							mt="3"
							size="lg"
							defaultValue={value}
							placeholder={form.createTeams.placeholder[formKeys.createTeams.region]}>
							{regions.map((region, index) => (
								<Select.Item key={index} label={region.name} value={region.name} />
							))}
						</Select>
						<FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
					</FormControl>
				)}
			/>
			<Controller
				name={formKeys.createTeams.type}
				control={control}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<FormControl isInvalid isRequired>
						<Select
							onValueChange={onChange}
							defaultValue={value}
							mt="3"
							bg="white"
							size="lg"
							placeholder={form.createTeams.placeholder[formKeys.createTeams.type]}>
							<Select.Item label="Mystic" value="mystic" />
							<Select.Item label="Valor" value="valor" />
							<Select.Item label="Instict" value="instict" />
						</Select>
						<FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
					</FormControl>
				)}
			/>
			<Controller
				name={formKeys.createTeams.pokedexDescription}
				control={control}
				render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
					<FormControl isInvalid={!!error}>
						<TextArea
							h="40"
							autoCompleteType="off"
							placeholder={form.createTeams.placeholder[formKeys.createTeams.pokedexDescription]}
							onChangeText={(value) => onChange(value)}
							onBlur={onBlur}
							value={value}
							size="lg"
							mt="3"
							bg="white"
						/>
						<FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
					</FormControl>
				)}
			/>
		</Box>
		<Button mt="10" onPress={onNext}>
			Next
		</Button>
	</>
);

export default CreateTeamsComponent;
