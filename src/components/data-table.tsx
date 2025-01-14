'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type Person, SwapiResponse } from '@/lib/columns';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DataTableToolbar } from './data-table-toolbar';
import { Button } from './ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable({ columns }: DataTableProps<Person, keyof Person>) {
  const [nextURL, setNextURL] = useState<URL | null>(null);
  const [displayData, setDisplayData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  const [eyeColors, setEyeColors] = useState<
    { label: string; value: string }[]
  >([]);

  // Sorting and filtering states
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  // Fetch data from the swapi api
  async function initialFetch() {
    setLoading(true);
    const initialFetchURL = 'https://swapi.py4e.com/api/people/';
    const response = await fetch(initialFetchURL);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const json: SwapiResponse = await response.json();
    setNextURL(json.next);

    // Fetch eye colors for faceted filter
    const eyeColors = json.results
      .map((person) => person.eye_color)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((value) => ({ label: value, value }));

    setEyeColors(eyeColors);

    setLoading(false);

    return json.results;
  }

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setDisplayData(await initialFetch());
    };
    fetchData();
  }, []);

  // Fetch more data
  const handleLoadMore = async () => {
    // Fetch next page
    if (nextURL) {
      setLoading(true);
      const response = await fetch(nextURL.toString());

      // Throw error if fetch fails
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json: SwapiResponse = await response.json();
      setNextURL(json.next);

      // Add new eye for faceted filter only if it's not already in the list
      const newEyeColors = json.results
        .map((person) => person.eye_color)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((value) => ({ label: value, value }))
        .filter(
          (newEyeColor) =>
            !eyeColors.some((eyeColor) => eyeColor.value === newEyeColor.value),
        );

      setEyeColors([...eyeColors, ...newEyeColors]);

      // Append new data to the display data
      setDisplayData([...displayData, ...json.results]);
      setLoading(false);
    }
  };

  const table = useReactTable({
    data: displayData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4 p-4">
      <DataTableToolbar table={table} eyeColors={eyeColors} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {nextURL && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleLoadMore} disabled={loading}>
            Load More {loading && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      )}
    </div>
  );
}
