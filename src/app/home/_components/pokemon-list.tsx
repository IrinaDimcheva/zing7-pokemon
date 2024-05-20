import Image from 'next/image';
import Link from 'next/link';
import {
  fetchByType,
  fetchPokemonData,
  fetchPokemonDetails,
  fetchAllPokemonCollection,
} from '@/lib/data';

export type PokemonCard = {
  name: string;
  url: string;
};
type PokemonCardFromType = {
  pokemon: {
    name: string;
    url: string;
  };
};

export default async function PokemonList({
  currentPage,
  query,
  type,
}: {
  currentPage: number;
  query: string;
  type: string;
}) {
  const allResults = await fetchAllPokemonCollection();
  const filteredData = await allResults?.filter((pokemon: PokemonCard) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );

  const results = query
    ? filteredData
    : type === ''
    ? await fetchPokemonData(currentPage)
    : await fetchByType(type);

  return (
    <ul className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto">
      {!type &&
        results?.map(async (pokemon: PokemonCard) => {
          const pokemonDetails = (await fetchPokemonDetails(
            pokemon.url
          )) as PokemonAPI.Pokemon;
          return (
            <li
              key={pokemon.name}
              className="p-10 rounded-lg  bg-lime-50 hover:bg-lime-100"
            >
              <Link
                href={`/${pokemonDetails.name}`}
                className="flex flex-col justify-center items-center"
              >
                <h3 className="text-2xl font-bold">{pokemon.name}</h3>
                <div>
                  <Image
                    src={pokemonDetails.sprites.front_default || ''}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                </div>
                <ul>
                  {pokemonDetails.types.map((type) => (
                    <li key={type.type.name}>{type?.type.name}</li>
                  ))}
                </ul>
              </Link>
            </li>
          );
        })}
      {type &&
        results?.map(async (pokemon: PokemonCardFromType) => {
          const pokemonDetails = (await fetchPokemonDetails(
            pokemon.pokemon.url
          )) as PokemonAPI.Pokemon;
          return (
            <li
              key={pokemon.pokemon.name}
              className="p-10 rounded-lg  bg-lime-50 hover:bg-lime-100"
            >
              <Link
                href={`/${pokemonDetails.name}`}
                className="flex flex-col justify-center items-center"
              >
                <h3 className="text-2xl font-bold">{pokemon.pokemon.name}</h3>
                <div>
                  <Image
                    src={pokemonDetails.sprites.front_default || ''}
                    alt={pokemon.pokemon.name}
                    width={100}
                    height={100}
                  />
                </div>
                <ul>
                  {pokemonDetails.types.map((type) => (
                    <li key={type.type.name}>{type?.type.name}</li>
                  ))}
                </ul>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
