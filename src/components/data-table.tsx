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
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable({ columns }: DataTableProps<Person, any>) {
  const [nextURL, setNextURL] = useState<URL | null>(null);
  const [displayData, setDisplayData] = useState<Person[]>([]);

  async function initialFetch() {
    const initialFetchURL = 'https://swapi.py4e.com/api/people/';
    const response = await fetch(initialFetchURL);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const json: SwapiResponse = await response.json();
    setNextURL(json.next);
    return json.results;
  }

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setDisplayData(await initialFetch());
    };
    fetchData();
  }, []);

  const handleLoadMore = async () => {
    if (nextURL) {
      const response = await fetch(nextURL.toString());
      const json = await response.json();
      setNextURL(new URL(json.next));
      setDisplayData([...displayData, ...json.results]);
    }
  };

  const table = useReactTable({
    data: displayData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
}
