import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllBlogPosts,
  fetchBlogPostById,
  fetchBlogPostsByBlogId,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/api/blog-post";
import type { BlogPost } from "@/types";

// Query: Fetch all blog posts with pagination
export function useBlogPosts({ page = 1, limit = 10 } = {}) {
  return useQuery<BlogPost[], Error>({
    queryKey: ["blogPosts", page, limit],
    queryFn: async () => {
      // Simulate pagination by fetching all and slicing (replace with backend pagination if available)
      const allPosts = await fetchAllBlogPosts();
      const start = (page - 1) * limit;
      const end = start + limit;
      return allPosts.slice(start, end);
    },
    // keepPreviousData: true,
  });
}

// // Query: Fetch single blog post by id
// export function useBlogPost(id: string | undefined) {
//   return useQuery<BlogPost, Error>({
//     // Use a stable queryKey and avoid undefined in the key
//     queryKey: id ? ["blogPost", id] : ["blogPost", "no-id"],
//     queryFn: async () => {
//       if (!id) throw new Error("Blog post id is required");
//       return fetchBlogPostById(id);
//     },
//     enabled: !!id,
//     // Add cacheTime: 0 to prevent stale data for different ids
//     // cacheTime: 0,
//     ...(id && {
//       staleTime: 0,
//       gcTime: 0,
//       refetchOnMount: true,
//       refetchOnWindowFocus: true,
//     }),
//   });
// }

export function useBlogPost(id: string | undefined) {
    return useQuery<BlogPost, Error>({
      queryKey: ["blogPost", id ?? "no-id"],
      queryFn: async () => {
        if (!id) throw new Error("Blog post id is required");
        return fetchBlogPostById(id);
      },
      enabled: !!id,
      staleTime: 0,                 // always stale
     });
  }

// Query: Fetch blog posts by blog id (with pagination)
export function useBlogPostsByBlogId(
  blogId: string | undefined,
  { page = 1, limit = 10 } = {}
) {
  return useQuery<BlogPost[], Error>({
    queryKey: ["blogPostsByBlogId", blogId, page, limit],
    queryFn: async () => {
      if (!blogId) throw new Error("Blog id is required");
      const allPosts = await fetchBlogPostsByBlogId(blogId);
      const start = (page - 1) * limit;
      const end = start + limit;
      return allPosts.slice(start, end);
    },
    enabled: !!blogId,
    // keepPreviousData: true,
  });
}

// Mutation: Create blog post
export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: Partial<BlogPost>) => createBlogPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      queryClient.invalidateQueries({ queryKey: ["blogPostsByBlogId"] });
    },
  });
}

// Mutation: Update blog post
export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, post }: { id: string; post: Partial<BlogPost> }) =>
      updateBlogPost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      queryClient.invalidateQueries({ queryKey: ["blogPost"] });
      queryClient.invalidateQueries({ queryKey: ["blogPostsByBlogId"] });
    },
  });
}

// Mutation: Delete blog post
export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      queryClient.invalidateQueries({ queryKey: ["blogPostsByBlogId"] });
    },
  });
}
