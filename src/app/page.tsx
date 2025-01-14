import { DataTable } from '@/components/data-table';
import { columns } from '@/lib/columns';

export default async function Home() {
  return (
    <>
      <div className="px-4">
        <h1 className="font-galaxy text-5xl md:text-8xl dark:text-yellow-300 text-center">
          The Force Directory
        </h1>
      </div>
      <DataTable columns={columns} />
    </>
  );
}
