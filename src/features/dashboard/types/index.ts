import * as z from 'zod';
import { form } from '@features/dashboard/constants';

export type Regions = {
	name: string;
	url: string;
};

export type Pokemon = {
    entry_number: number;
    pokemon_species: {
        name: string;
        url: string;
    };
}

export type CreateTeamsFormValues = z.infer<typeof form.createTeams.schema>;
