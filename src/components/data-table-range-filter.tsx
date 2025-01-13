import { Input } from './ui/input';

interface DataTableRangeFilterProps {
  column: any;
  title: string;
  minValue: number;
  maxValue: number;
}

export function DataTableRangeFilter({
  column,
  title,
  minValue,
  maxValue,
}: DataTableRangeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium">{title}:</p>
      <Input
        type="number"
        min={minValue}
        max={maxValue}
        value={(column?.getFilterValue() as number[])?.[0] ?? ''}
        onChange={(e) =>
          column?.setFilterValue((old: number[]) => [e.target.value, old?.[1]])
        }
        placeholder="Min"
      />
      <span>-</span>
      <Input
        type="number"
        min={minValue}
        max={maxValue}
        value={(column?.getFilterValue() as number[])?.[1] ?? ''}
        onChange={(e) =>
          column?.setFilterValue((old: number[]) => [old?.[0], e.target.value])
        }
        placeholder="Max"
      />
    </div>
  );
}
