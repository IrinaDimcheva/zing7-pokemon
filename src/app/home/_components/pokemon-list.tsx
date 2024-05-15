import { fetchPokemonData } from '@/lib/data';
import Link from 'next/link';

type PokemonCard = {
  name: string;
  url: string;
};

export default async function PokemonList({
  currentPage,
  query,
}: {
  currentPage: number;
  query: string;
}) {
  const pokemonData = await fetchPokemonData(currentPage, query);
  console.log(pokemonData);
  return (
    <ul>
      {pokemonData.results.map((pokemon: PokemonCard) => (
        <li key={pokemon.name}>
          <h3>{pokemon.name}</h3>
          <Link href={pokemon.url}>{pokemon.url}</Link>
        </li>
      ))}
    </ul>
  );
}
