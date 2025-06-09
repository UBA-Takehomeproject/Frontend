import type { BlogPost } from "@/types";
import { fetchWithRefresh } from "./service";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/blogpost";

// Fetch all blog posts
export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetchWithRefresh blog posts");
  }
  return response.json();
}

// Fetch blog post by ID
export async function fetchBlogPostById(id: string): Promise<BlogPost> {
  const response = await fetchWithRefresh(`${API_BASE_URL}/${encodeURIComponent(id)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch blog post");
  }
  return await response.json();
}

// Fetch blog posts by blog ID
export async function fetchBlogPostsByBlogId(blogId: string): Promise<BlogPost[]> {
  const response = await fetchWithRefresh(`${API_BASE_URL}/blog/${encodeURIComponent(blogId)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch blog posts for blog");
  }
  return response.json();
}
//Fetch blog post by authoe
export async function fetchBlogPostsByAuthorId(authorId: string): Promise<BlogPost[]> {
  
  const response = await fetchWithRefresh(
    `${API_BASE_URL}/by/${encodeURIComponent(authorId)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
 
  if (!response.ok) {
    throw new Error("Failed to fetch blogs by author");
  }
  return await response.json();
}

// Create a new blog post
export async function createBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
  const response = await fetchWithRefresh(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(post),
  });
  // const text=await response.text()
  // alert(text)
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to create blog post");
  }
  return await response.json();
}

// Update a blog post
export async function updateBlogPost(id: string, post: Partial<BlogPost>): Promise<void> {
  const response = await fetchWithRefresh(`${API_BASE_URL}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to update blog post");
  }
}

// Delete a blog post
export async function deleteBlogPost(id: string): Promise<void> {
  const response = await fetchWithRefresh(`${API_BASE_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to delete blog post");
  }
}
