import { cache } from 'react';
import 'server-only';
import { API_URL, LIMIT } from '@/config/constants';

export async function fetchPokemonData(currentPage: number) {
  const offset = (currentPage - 1) * LIMIT;

  const response = await fetch(
    `${API_URL}/pokemon?offset=${offset}&limit=${LIMIT}`
  );
  const data = await response.json();
  // const { count, next, previous, results } = data;
  return data.results;
}

// export const preload = () => {
//   void fetchAllPokemonCollection();
// };

export const fetchAllPokemonCollection = cache(async () => {
  const response = await fetch(`${API_URL}/pokemon?limit=100000`);
  const data = await response.json();
  return data.results;
});

export async function fetchPokemonDetails(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchPokemon(id: string) {
  const response = await fetch(`${API_URL}/pokemon/${id}`);
  const data = await response.json();
  return data;
}

export async function fetchByType(type: string) {
  const response = await fetch(`${API_URL}/type/${type}`);
  const data = await response.json();
  return data.pokemon;
}

export async function fetchPokemonPages(query: string) {
  const response = await fetch(`${API_URL}/pokemon?query=${query}`);
  const data = await response.json();
  const totalPages = Math.ceil(data.count / LIMIT);
  return totalPages;
}
