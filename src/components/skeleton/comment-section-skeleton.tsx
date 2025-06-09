export default function CommentSectionSkeleton() {
  return (
    <div className="pt-10 border-t space-y-4">
      {/* Comments Count Skeleton */}
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
      
      {/* Comment Items Skeleton */}
      {[1, 2].map((i) => (
        <div key={i} className="flex gap-4 items-start">
          {/* Avatar Skeleton */}
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          
          <div className="flex-1 space-y-2">
            {/* Name Skeleton */}
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            
            {/* Time Skeleton */}
            <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
            
            {/* Message Skeleton */}
            <div className="space-y-1">
              <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-4/5 bg-gray-200 rounded animate-pulse" />
            </div>
            
            {/* Reply Button Skeleton */}
            <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
} 