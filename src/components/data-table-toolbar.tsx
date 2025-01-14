'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableRangeFilter } from './data-table-range-filter';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  eyeColors: { label: string; value: string }[];
}

export function DataTableToolbar<TData>({
  table,
  eyeColors,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-1 items-center flex-wrap  gap-2">
        <Input
          placeholder="Search..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm min-w-32 flex-1"
        />
        <div className="flex flex-1 items-center gap-2 wrap">
          {table.getColumn('eye_color') && (
            <DataTableFacetedFilter
              column={table.getColumn('eye_color')}
              title="Eye Color"
              options={eyeColors}
            />
          )}
          {table.getColumn('height') && (
            <DataTableRangeFilter
              column={table.getColumn('height')}
              title="Height"
              minValue={0}
              maxValue={300}
            />
          )}
          {table.getColumn('mass') && (
            <DataTableRangeFilter
              column={table.getColumn('mass')}
              title="Mass"
              minValue={0}
              maxValue={1000}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
