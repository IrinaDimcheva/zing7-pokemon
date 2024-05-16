'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { generatePagination } from '@/lib/utils';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(totalPages);

  return (
    <div className="flex flex-wrap justify-center py-24">
      {currentPage <= 1 ? (
        <div className="flex h-10 w-10 items-center justify-center border pointer-events-none text-gray-300">
          <ArrowLeftIcon className="w-4" />
        </div>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center border hover:bg-lime-100">
          <Link href={createPageURL(currentPage - 1)}>
            <ArrowLeftIcon className="w-4 text-black" />
          </Link>
        </div>
      )}
      {allPages.map((page) => (
        <PaginationNumber
          key={page}
          page={page}
          href={createPageURL(page)}
          isActive={currentPage === page}
        />
      ))}
      {currentPage >= totalPages ? (
        <div className="flex h-10 w-10 items-center justify-center border pointer-events-none text-gray-300">
          <ArrowRightIcon className="w-4" />
        </div>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center border hover:bg-lime-100 ">
          <Link href={createPageURL(currentPage + 1)}>
            <ArrowRightIcon className="w-4 text-black" />
          </Link>
        </div>
      )}
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'z-10 bg-lime-600 text-white': isActive,
      'hover:bg-lime-100': !isActive,
    }
  );

  return isActive ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}
