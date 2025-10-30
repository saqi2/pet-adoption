import Link from 'next/link';
import { fetchAnimals } from '../../src/app/lib/petfinder';

export const dynamic = 'force-dynamic'; // ensures SSR fresh fetch

export default async function Home() {
  try {
    const pets = await fetchAnimals();

    return (
      <main className="min-h-screen bg-gray-50 py-10 px-6">
  <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
    🐾 Adoptable Pets
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
    {pets.map((pet: any) => (
      <Link
        href={`/pet/${pet.id}`}
        key={pet.id}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
      >
        <div className="relative w-full h-64 flex items-center justify-center bg-gray-100">
          {pet.photos?.[0]?.medium ? (
            <img
              src={pet.photos[0].medium}
              alt={pet.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="text-gray-500 text-sm font-medium">No image found</span>
          )}
        </div>

        <div className="p-5 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {pet.name}
          </h2>

          <p className="text-gray-600 text-sm">
            {pet.description
              ? pet.description.slice(0, 80) + '…'
              : 'No bio available.'}
          </p>

          <p className="text-sm text-gray-500 italic">
            {pet.breeds?.primary || 'Unknown Breed'}
          </p>
        </div>
      </Link>
    ))}
  </div>
</main>
    );
  } catch (error) {
    return (
      <main style={{ padding: '2rem', color: 'red' }}>
        <h1>Error loading pets 😿</h1>
        <p>{String((error as Error).message)}</p>
      </main>
    );
  }
}