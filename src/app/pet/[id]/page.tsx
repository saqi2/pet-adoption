import { fetchAnimalById } from '../../lib/petfinder';
import Link from 'next/link';

interface Props {
  params: { id: string };
}

export default async function PetPage({ params }: Props) {
const {id} = await params;
  const pet = await fetchAnimalById(id);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
  <Link
    href="/"
    className="text-blue-600 hover:text-blue-800 self-start mb-6 flex items-center gap-2"
  >
    ⬅ Back to list
  </Link>

  <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
    <div className="flex flex-col items-center">
      {pet.photos?.[0] ? (
        <img
          src={pet.photos[0].large}
          alt={pet.name}
          className="w-80 h-80 object-cover rounded-xl shadow-md mb-6"
        />
      ) : (
        <div className="w-80 h-80 flex items-center justify-center bg-gray-200 rounded-xl mb-6 text-gray-600">
          No photo available
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{pet.name}</h1>
      <p className="text-gray-500 text-sm mb-6 italic">{pet.type}</p>

      <div className="space-y-3 text-gray-700 w-full">
        <p>
          <span className="font-semibold">Age:</span> {pet.age}
        </p>
        <p>
          <span className="font-semibold">Gender:</span> {pet.gender}
        </p>
        <p>
          <span className="font-semibold">Breed:</span> {pet.breeds?.primary}
        </p>
        <p>
          <span className="font-semibold">Description:</span>{' '}
          {pet.description || 'No description provided.'}
        </p>
      </div>
    </div>
  </div>
</main>
  );
}