import { fetchPokemonData, fetchPokemonPages } from '@/lib/data';
import PokemonList from './home/_components/pokemon-list';
import Pagination from './home/_components/pagination';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPokemonPages(query);

  return (
    <main className="max-w-[1440px] mx-auto w-full p-6">
      <section>
        <PokemonList query={query} currentPage={currentPage} />
        <Pagination totalPages={totalPages} />
      </section>
    </main>
  );
}
