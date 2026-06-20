const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      data?.errors?.[0]?.message || data?.message || 'Something went wrong';
    throw new Error(message);
  }

  return data as T;
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function registerUser(body: {
  name: string;
  email: string;
  password: string;
}) {
  return request('/auth/register', { method: 'POST', body: JSON.stringify(body) });
}

export async function loginUser(body: { email: string; password: string }) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify(body) });
}

// ─── Posts ───────────────────────────────────────────────────────────────────

export async function getPosts(page = 1, limit = 12) {
  return request(`/posts?page=${page}&limit=${limit}`);
}

export async function getPost(id: number) {
  return request(`/posts/${id}`);
}

export async function createPost(
  body: { title: string; content: string },
  token: string
) {
  return request('/posts', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: authHeaders(token),
  });
}

export async function updatePost(
  id: number,
  body: { title: string; content: string },
  token: string
) {
  return request(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: authHeaders(token),
  });
}

export async function deletePost(id: number, token: string) {
  return request(`/posts/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}
