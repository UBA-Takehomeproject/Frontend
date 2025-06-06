import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBlog, updateBlog, deleteBlog } from "@/api/blog";

import type { Blog } from "@/types";

export function useAddBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBlog: Partial<Blog>) => addBlog(newBlog),
    onSuccess: () => {
      // Invalidate or refetch blogs list
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Blog> }) =>
      updateBlog({id, data}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBlog({id}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
