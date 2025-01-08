import PeopleTable from '@/components/people-table';
import { type SwapiResponse } from '@/lib/columns';

// function to fetch single page
async function fetchData(fetchURL: string | URL): Promise<SwapiResponse> {
  const data = await fetch(fetchURL);
  const swapiResponse: SwapiResponse = await data.json();
  return swapiResponse;
}

// function to fetch all instances of peoples from all the pages
async function fetchAllPages() {
  console.time('Fetch all pages');
  // Get first page to determine total pages
  const firstPage = await fetchData('https://swapi.py4e.com/api/people/');
  const totalPages = Math.ceil(firstPage.count / 10);

  // Generate URLs for remaining pages
  const remainingUrls = Array.from(
    { length: totalPages - 1 },
    (_, i) => `https://swapi.py4e.com/api/people/?page=${i + 2}`,
  );

  // Fetch remaining pages in parallel
  const remainingResponses = await Promise.all(
    remainingUrls.map((url) => fetchData(url)),
  );

  // Combine all results (first page + remaining pages)
  const allPeople = [
    ...firstPage.results,
    ...remainingResponses.flatMap((response) => response.results),
  ];
  console.timeEnd('Fetch all pages');
  return allPeople;
}

const allPeople = await fetchAllPages();

export default async function Home() {
  return (
    <div>
      <h1>The Force Directory</h1>
      <PeopleTable data={allPeople} />
    </div>
  );
}
