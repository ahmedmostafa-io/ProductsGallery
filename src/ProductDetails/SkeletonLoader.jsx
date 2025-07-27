// SkeletonLoader.jsx
export default function SkeletonLoader() {
  return (
    <div className="animate-pulse mt-28 mb-8 container mx-auto px-4">
      <div className="mb-4 w-16 h-8 bg-gray-200 rounded-2xl" />
      <div className="md:grid md:gap-16 md:grid-cols-12 flex-col space-y-7">
        {/* Image skeleton */}
        <div className="md:col-span-4 flex justify-center items-center">
          <div className="w-60 h-60 bg-gray-200 rounded-xl" />
        </div>
        {/* Info skeleton */}
        <div className="md:col-span-8 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-20 bg-gray-200 rounded w-full" />
          <div className="flex justify-between items-center mb-5">
            <div className="h-8 bg-gray-200 rounded w-24" />
            <div className="h-8 bg-gray-200 rounded w-20" />
          </div>
          <div className="flex flex-col justify-center items-center h-24 my-5">
            <div className="bg-gray-200 w-72 h-20 rounded-2xl" />
            <div className="mt-2 w-32 h-8 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
