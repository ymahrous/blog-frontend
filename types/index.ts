export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author_name: string;
  author_email: string;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  status: 'error';
  message: string;
  errors?: { field: string; message: string }[];
}

export interface AuthResponse {
  status: 'success';
  message: string;
  data: { user: User; token: string };
}

export interface PostListResponse {
  status: 'success';
  data: { posts: Post[]; pagination: Pagination };
}

export interface PostResponse {
  status: 'success';
  data: { post: Post };
}
