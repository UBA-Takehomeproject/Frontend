// Type definition for AuthorDto (adjust fields as needed)

import type { Author } from "@/types";
import { fetchWithRefresh } from "./service";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL+'/api/authors';

// Fetch all authors
export async function fetchAuthors(): Promise<Author[]> {
  const response = await fetchWithRefresh(API_BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch authors');
  }
  return response.json();
}

// Fetch author by ID
export async function fetchAuthorById(id: string): Promise<Author> {
  const response = await fetchWithRefresh(`${API_BASE_URL}/${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch author');
  }
  return response.json();
}

// Create a new author
export async function createAuthor(author: Author): Promise<Author> {
  const response = await fetchWithRefresh(`${API_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(author),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to create author');
  }
  return response.json();
}

// Update an author
export async function updateAuthor(id: string, author: Author): Promise<void> {
  const response = await fetchWithRefresh(`${API_BASE_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(author),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to update author');
  }
}

// Delete an author
export async function deleteAuthor(id: string): Promise<void> {
  const response = await fetchWithRefresh(`${API_BASE_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to delete author');
  }
}
