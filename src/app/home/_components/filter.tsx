'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const types = [
  {
    name: 'normal',
    id: '1',
  },
  {
    name: 'fighting',
    id: '2',
  },
  {
    name: 'flying',
    id: '3',
  },
  {
    name: 'poison',
    id: '4',
  },
  {
    name: 'ground',
    id: '5',
  },
  {
    name: 'rock',
    id: '6',
  },
  {
    name: 'bug',
    id: '7',
  },
  {
    name: 'ghost',
    id: '8',
  },
  {
    name: 'steel',
    id: '9',
  },
  {
    name: 'fire',
    id: '10',
  },
  {
    name: 'water',
    id: '11',
  },
  {
    name: 'grass',
    id: '12',
  },
  {
    name: 'electric',
    id: '13',
  },
  {
    name: 'psychic',
    id: '14',
  },
  {
    name: 'ice',
    id: '15',
  },
  {
    name: 'dragon',
    id: '16',
  },
  {
    name: 'dark',
    id: '17',
  },
  {
    name: 'fairy',
    id: '18',
  },
  {
    name: 'stellar',
    id: '19',
  },
  {
    name: 'unknown',
    id: '10001',
  },
  {
    name: 'shadow',
    id: '10002',
  },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter(type: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.delete('query');
    if (type) {
      params.set('type', type);
      // params.delete('page');
    } else {
      params.delete('type');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-4 items-center">
      <label className="text-xl font-medium">Filter by type</label>
      <div className="border border-lime-300 rounded-lg p-4">
        <select
          className="outline-none cursor-pointer"
          defaultValue={searchParams.get('type')?.toString() || ''}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="">Choose type</option>
          {types.sort().map((type) => (
            <option
              key={type.name}
              className="inline-flex items-center mt-3 mr-3"
              value={type.id}
            >
              {type.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
