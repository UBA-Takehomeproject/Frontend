export default function BlogProfileCardSkeleton() {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden relative md:w-9/12  w-11/12  max-h-fit animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="h-32 w-full bg-gray-200" />

      {/* Profile Image Skeleton */}
      <div className="absolute top-20 left-6 w-24 h-24 bg-gray-200 rounded-md shadow-md border" />

      <div className="p-3">
        <div className="mt-16">
          {/* Title Skeleton */}
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-2" />
          
          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>

          {/* Stats Skeleton */}
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 