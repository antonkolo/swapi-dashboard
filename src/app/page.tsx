export default async function Home() {
  const data = await fetch('https://swapi.py4e.com/api/people/');
  const people = await data.json();
  console.log(people);

  return (
    <div>
      <h1>The Force Directory</h1>
    </div>
  );
}
