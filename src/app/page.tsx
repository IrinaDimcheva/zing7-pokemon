import { fetchPokemonPages } from '@/lib/data';
import PokemonList from './home/_components/pokemon-list';
import Pagination from './home/_components/pagination';
import Filter from './home/_components/filter';
import Search from './home/_components/search';
import { Suspense } from 'react';

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
  const totalPages = !type && !query && (await fetchPokemonPages(query));

  return (
    <main className="max-w-[1440px] mx-auto w-full p-6 flex flex-col gap-24">
      <section className="flex flex-wrap justify-between items-center gap-6">
        <Search />
        <Filter />
      </section>
      <section>
        <Suspense fallback={<div className="h-[1500px]">Loading...</div>}>
          <PokemonList query={query} type={type} currentPage={currentPage} />
        </Suspense>
        {totalPages && <Pagination totalPages={totalPages} />}
      </section>
    </main>
  );
}
