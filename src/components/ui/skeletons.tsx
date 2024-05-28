export function CardSkeleton() {
  return (
    <div className="shimmer p-10 rounded-lg  bg-gray-50">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="text-2xl bg-gray-200 w-[150px] h-[20px]"></div>
        <div className="w-[130px] h-[80px] bg-gray-200"></div>
        <div className="text-2xl bg-gray-200 w-[120px] h-[20px]"></div>
      </div>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto">
      {Array.from({ length: 20 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
