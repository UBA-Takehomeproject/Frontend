import { Skeleton } from "@/components/ui/skeleton";

export default function BlogContentSkeleton() {
  return (
    <div>
      {/* Cover Image Skeleton */}
      <Skeleton className="w-full h-[500px] rounded-md mb-6" />
      
      {/* Author Info Skeleton */}
      <div className="flex items-center space-x-3 text-sm text-gray-500 mb-4">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="h-4 w-32" />
        <span>•</span>
        <Skeleton className="h-4 w-24" />
      </div>
      
      {/* Title Skeleton */}
      <Skeleton className="h-10 w-3/4 mb-4" />
      
      {/* Content Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      
      {/* Tags Skeleton */}
      <div className="mt-6 flex gap-2">
        <Skeleton className="h-6 w-16 rounded" />
        <Skeleton className="h-6 w-12 rounded" />
        <Skeleton className="h-6 w-14 rounded" />
        <Skeleton className="h-6 w-18 rounded" />
      </div>
    </div>
  );
} 