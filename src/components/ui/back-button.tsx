'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="px-8 py-2 font-medium bg-lime-100 rounded-md"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
}
