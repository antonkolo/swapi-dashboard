import { Column } from '@tanstack/react-table';
import { PlusCircle } from 'lucide-react';
import * as React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';

interface DataTableRangeFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title: string;
  minValue: number;
  maxValue: number;
}

export function DataTableRangeFilter<TData, TValue>({
  column,
  title,
  minValue,
  maxValue,
}: DataTableRangeFilterProps<TData, TValue>) {
  const filterValues = column?.getFilterValue() as [number, number];
  const hasValues = filterValues?.[0] != null || filterValues?.[1] != null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {hasValues && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {filterValues?.[0] ?? ''} - {filterValues?.[1] ?? ''}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {filterValues?.[0] ?? ''} - {filterValues?.[1] ?? ''}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={minValue}
              max={maxValue}
              value={filterValues?.[0] ?? ''}
              onChange={(e) =>
                column?.setFilterValue((old: [number, number]) => [
                  e.target.value ? Number(e.target.value) : undefined,
                  old?.[1],
                ])
              }
              placeholder="Min"
              className="h-8"
            />
            <span>-</span>
            <Input
              type="number"
              min={minValue}
              max={maxValue}
              value={filterValues?.[1] ?? ''}
              onChange={(e) =>
                column?.setFilterValue((old: [number, number]) => [
                  old?.[0],
                  e.target.value ? Number(e.target.value) : undefined,
                ])
              }
              placeholder="Max"
              className="h-8"
            />
          </div>
          {hasValues && (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => column?.setFilterValue(undefined)}
            >
              Clear filter
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
