const BASE_URL = 'https://api.petfinder.com/v2';

let token: string | null = '';
let tokenExpiry = 0;

export async function getAccessToken() {
  const now = Date.now();
  if (token && now < tokenExpiry) return token;

  debugger;
  const res = await fetch(`${BASE_URL}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.PETFINDER_KEY!,
      client_secret: process.env.PETFINDER_SECRET!,
    }),
  });

  console.log("Using Petfinder credentials:", {
  key: process.env.PETFINDER_KEY,
  secret: process.env.PETFINDER_SECRET
});

  if (!res.ok) throw new Error('Failed to fetch access token');
  const data = await res.json();
  token = data.access_token;
  tokenExpiry = now + data.expires_in * 1000;
  return token;
}

export async function fetchAnimals() {
  const token = await getAccessToken();
  const res = await fetch(`${BASE_URL}/animals?limit=12`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Failed to fetch animals');
  const data = await res.json();
  return data.animals;
}

export async function fetchAnimalById(id: string) {
  const token = await getAccessToken();
  const res = await fetch(`${BASE_URL}/animals/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(res, 'animal by id response');
  if (!res.ok) throw new Error('Failed to fetch animal');
  const data = await res.json();
  return data.animal;
}