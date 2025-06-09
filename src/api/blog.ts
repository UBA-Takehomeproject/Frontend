import type { Blog } from "@/types";
import { fetchWithRefresh } from "./service";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/blog";

// Fetch all blogs
export async function fetchAllBlogs(): Promise<Blog[]> {
  const response = await fetchWithRefresh(API_BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
}

// Fetch blog by ID
export async function fetchBlogById(id: string): Promise<Blog> {
  const response = await fetchWithRefresh(
    `${API_BASE_URL}/${encodeURIComponent(id)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  return response.json();
}

// Create a new blog
export async function createBlog(blog: Partial<Blog>): Promise<Blog> {
  const response = await fetchWithRefresh(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(blog),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to create blog");
  }
  return await response.json();
}

// Update a blog
export async function updateBlog(
  id: string,
  blog: Partial<Blog>
): Promise<void> {
  const response = await fetchWithRefresh(
    `${API_BASE_URL}/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(blog),
    }
  );
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to update blog");
  }
}

// Delete a blog
export async function deleteBlog(id: string): Promise<void> {
  const response = await fetchWithRefresh(
    `${API_BASE_URL}/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to delete blog");
  }
}

// Fetch blogs by author ID
export async function fetchBlogsByAuthorId(authorId: string): Promise<Blog[]> {
  
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
