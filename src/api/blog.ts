import type { Blog } from "@/types";

type FetchBlogsParams = {
  authorsId?: string;
  rowCount?: number;
  cursor?: number;
};

export async function fetchBlogs(params: FetchBlogsParams) {
  const { authorsId, rowCount = 10, cursor = 0 } = params;
  let url = "";

  if (authorsId) {
    // Fetch blogs by partner id with pagination
    url = `/api/blogs?partnerId=${encodeURIComponent(
      authorsId
    )}&cursor=${cursor}&rowCount=${rowCount}`;
  } else {
    // Fetch all blogs with pagination
    url = `/api/blogs?cursor=${cursor}&rowCount=${rowCount}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Ensure cookies (including JWT) are sent
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blogs: ${response.statusText}`);
  }

  return {
    data: await response.json(),
    nextCursor: 124,
    hasMore: true,
    count: 200,
  };
}

export async function addBlog(params: Partial<Blog>) {
  const response = await fetch("/api/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`Failed to add blog: ${response.statusText}`);
  }

  return await response.json();
}

export async function updateBlog(params: { id: string; data: Partial<Blog> }) {
  if (!params.id) {
    throw new Error("Blog id is required for update");
  }

  const response = await fetch(
    `/api/blogs/${encodeURIComponent(String(params.id ?? ""))}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(params),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update blog: ${response.statusText}`);
  }

  return await response.json();
}

export async function deleteBlog(params: { id: string }) {
  if (!params.id) {
    throw new Error("Blog id is required for deletion");
  }

  const response = await fetch(`/api/blogs/${encodeURIComponent(params.id)}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete blog: ${response.statusText}`);
  }

  return await response.json();
}
