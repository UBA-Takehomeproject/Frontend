import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllBlogs,
  fetchBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  fetchBlogsByAuthorId,
} from "@/api/blog";
import type { Blog } from "@/types";

// Query: Fetch all blogs with pagination
export function useBlogs({ page = 1, limit = 10 } = {}) {
  return useQuery<Blog[], Error>({
    queryKey: ["blogs", page, limit],
    queryFn: async () => {
      // Simulate pagination by fetching all and slicing (replace with backend pagination if available)
      const allBlogs = await fetchAllBlogs();
      const start = (page - 1) * limit;
      const end = start + limit;
      return allBlogs.slice(start, end);
    },
  });
}

// Query: Fetch single blog by id
export function useBlog(id: string | undefined) {
  return useQuery<Blog, Error>({
    queryKey: ["blog", id],
    queryFn: () => {
      if (!id) throw new Error("Blog id is required");
      return fetchBlogById(id);
    },
    enabled: !!id,
  });
}

// Mutation: Create blog
export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blog: Partial<Blog>) => createBlog(blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

// Mutation: Update blog
export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, blog }: { id: string; blog: Partial<Blog> }) =>
      updateBlog(id, blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
}

// Mutation: Delete blog
export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

// Query: Fetch blogs by author id
export function useBlogsByAuthorId(authorId: string | undefined) {
  return useQuery<Blog[], Error>({
    queryKey: ["blogsByAuthorId", authorId],
    queryFn: () => {
      if (!authorId) throw new Error("Author id is required");
      return fetchBlogsByAuthorId(authorId);
    },
    enabled: !!authorId,
  });
}
