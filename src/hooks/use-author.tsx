import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAuthors,
  fetchAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "@/api/author";
import type { Author } from "@/types";

// Query: Fetch all authors with pagination
export function useAuthors({ page = 1, limit = 10 } = {}) {
  return useQuery<Author[], Error>({
    queryKey: ["authors", page, limit],
    queryFn: async () => {
      // Simulate pagination by fetching all and slicing (replace with backend pagination if available)
      const allAuthors = await fetchAuthors();
      const start = (page - 1) * limit;
      const end = start + limit;
      return allAuthors.slice(start, end);
    },
    // keepPreviousData: true,
  });
}

// Query: Fetch single author by id
export function useAuthor(id: string | undefined) {
  return useQuery<Author, Error>({
    queryKey: ["author", id],
    queryFn: () => {
      if (!id) throw new Error("Author id is required");
      return fetchAuthorById(id);
    },
    enabled: !!id,
  });
}

// Mutation: Create author
export function useCreateAuthor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (author: Author) => createAuthor(author),
    onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["authors"] });
      queryClient.clear();
    },
  });
}

// Mutation: Update author
export function useUpdateAuthor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, author }: { id: string; author: Author }) =>
      updateAuthor(id, author),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      queryClient.invalidateQueries({ queryKey: ["author"] });
    },
  });
}

// Mutation: Delete author
export function useDeleteAuthor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAuthor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
  });
}
