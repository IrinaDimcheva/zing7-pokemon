import { API_URL, LIMIT } from '@/config/constants';

export async function fetchPokemonData(currentPage: number, query?: string) {
  const offset = (currentPage - 1) * LIMIT;

  const response = await fetch(
    `${API_URL}/pokemon?offset=${offset}&limit=${LIMIT}`
  );
  const data = await response.json();
  // const { count, next, previous, results } = data;
  return data;
}

export async function fetchPokemonPages(query: string) {
  const response = await fetch(`${API_URL}/pokemon?query=${query}`);
  const data = await response.json();
  const totalPages = Math.ceil(data.count / LIMIT);
  return totalPages;
}
