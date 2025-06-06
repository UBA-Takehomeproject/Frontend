import { fetchBlogs } from "@/api/blog";
import { useQuery } from "@tanstack/react-query";

export function useGetBlogs(
  page: number,
  rowCount: number,
  cursor?: number,
  authorsId?: string
) {
  const queryKey = ["blogs", authorsId, page, rowCount];

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      fetchBlogs({
        cursor,
        rowCount,
        authorsId,
      }),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    // keepPreviousData: true, // prevent flicker when page changes
  });

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}
