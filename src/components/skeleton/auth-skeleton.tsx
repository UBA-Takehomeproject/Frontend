import { Skeleton } from "@/components/ui/skeleton";

const LoginPageSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <Skeleton className="mt-8 h-6 w-3/4" />
          <Skeleton className="mt-2 h-4 w-2/3" />
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-10 w-full" />
        </div>

        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-uba-100" />
            </div>
            <div className="relative flex justify-center text-sm font-medium">
              <Skeleton className="h-5 w-32" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageSkeleton;
