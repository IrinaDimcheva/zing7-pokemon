'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
      params.delete('type');
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 100);

  return (
    <div className="max-w-[800px] w-full">
      <input
        type="text"
        placeholder="Search by name..."
        className="block w-full rounded-lg border border-lime-300 outline-lime-300 p-4 outline-2"
        onChange={(e) => handleSearch(e.target.value.toLowerCase())}
        defaultValue={searchParams.get('query')?.toString() || ''}
      />
    </div>
  );
}
