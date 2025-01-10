'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={(e) =>
            column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
          }
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue('name'),
  },
  {
    accessorKey: 'height',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={(e) =>
            column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
          }
        >
          Height
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      `${row.getValue('height')} ${
        parseInt(row.getValue('height')) ? 'cm' : ''
      }`,
    sortingFn: (rowA, rowB) => {
      const heightA = parseInt(rowA.getValue('height')) || 0;
      const heightB = parseInt(rowB.getValue('height')) || 0;
      return heightA - heightB;
    },
  },
  {
    accessorKey: 'mass',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={(e) =>
            column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
          }
        >
          Mass
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      `${row.getValue('mass')} ${
        row.getValue('mass') !== 'unknown' ? 'kg' : ''
      }`,
    sortingFn: (rowA, rowB) => {
      const massA = parseInt(rowA.getValue('mass')) || 0;
      const massB = parseInt(rowB.getValue('mass')) || 0;
      return massA - massB;
    },
  },
  {
    accessorKey: 'hair_color',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={(e) =>
            column.toggleSorting(column.getIsSorted() === 'asc', e.shiftKey)
          }
        >
          Hair Color
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
