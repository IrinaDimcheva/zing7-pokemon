import {
  fetchPokemonData,
  fetchPokemonPages,
  fetchPokemonTypePages,
} from '@/lib/data';
import PokemonList from './home/_components/pokemon-list';
import Pagination from './home/_components/pagination';
import Filter from './home/_components/filter';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    type?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const type = searchParams?.type || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = !type && (await fetchPokemonPages(query));
  // ? await fetchPokemonTypePages(type, query)

  return (
    <main className="max-w-[1440px] mx-auto w-full p-6 flex flex-col gap-24">
      <section>
        <Filter />
      </section>
      <section>
        <PokemonList query={query} type={type} currentPage={currentPage} />
        {totalPages && <Pagination totalPages={totalPages} />}
      </section>
    </main>
  );
}
