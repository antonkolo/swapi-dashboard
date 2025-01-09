'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type SwapiResponse = {
  count: number;
  next: URL | null;
  previous: URL | null;
  results: Person[];
};

const columnHelper = createColumnHelper<Person>();

export const columns: ColumnDef<Person, any>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.getValue('name'),
  },
  {
    accessorKey: 'height',
    header: 'Height',
    cell: ({ row }) => `${row.getValue('height')} cm`,
  },
  {
    accessorKey: 'mass',
    header: 'Mass',
    cell: ({ row }) =>
      `${row.getValue('mass')} ${
        row.getValue('mass') !== 'unknown' ? 'kg' : ''
      }`,
  },
  {
    accessorKey: 'hair_color',
    header: 'Hair Color',
    cell: ({ row }) => row.getValue('hair_color'),
  },
  {
    accessorKey: 'skin_color',
    header: 'Skin Color',
    cell: ({ row }) => row.getValue('skin_color'),
  },
  {
    accessorKey: 'eye_color',
    header: 'Eye Color',
    cell: ({ row }) => row.getValue('eye_color'),
  },
  {
    accessorKey: 'birth_year',
    header: 'Birth Year',
    cell: ({ row }) => row.getValue('birth_year'),
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => row.getValue('gender'),
  },
  {
    accessorKey: 'films',
    header: 'Films',
    cell: ({ row }) => (row.getValue('films') as string[]).length,
  },
  {
    accessorKey: 'species',
    header: 'Species',
    cell: ({ row }) => (row.getValue('species') as string[]).length,
  },
  {
    accessorKey: 'vehicles',
    header: 'Vehicles',
    cell: ({ row }) => (row.getValue('vehicles') as string[]).length,
  },
  {
    accessorKey: 'starships',
    header: 'Starships',
    cell: ({ row }) => (row.getValue('starships') as string[]).length,
  },
];
