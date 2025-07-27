export default function SkeletonLoaderHome() {
  return (
    <div className="animate-pulse mt-28 mb-8 container mx-auto px-4">
      <div className="bg-white p-4 rounded-xl shadow mb-12 grid grid-cols-1 md:grid-cols-4 gap-4 items-center animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-24 col-span-1" />
        <div className="col-span-2 md:col-span-2">
          <div className="h-10 bg-gray-200 rounded w-full" />
        </div>
        <div className="h-10 bg-gray-200 rounded w-full col-span-1" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-100 rounded-3xl shadow-md overflow-hidden relative animate-pulse"
          >
            <div className="h-64 bg-gray-200 flex items-center justify-center overflow-hidden relative" />
            <div className="p-4 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-3 w-3 bg-gray-200 rounded-full" />
                ))}
                <div className="h-3 w-8 bg-gray-200 rounded ml-2" />
              </div>
              <div className="flex flex-col mt-2 gap-1">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
