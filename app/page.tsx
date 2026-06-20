import { getPosts } from '@/lib/api';
import { PostListResponse } from '@/types';
import PostCard from '@/components/PostCard';
import PaginationControls from '@/components/PaginationControls';
import { PenLine } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inkwell — Read & Write',
  description: 'Discover thoughtful essays and personal stories from writers around the world.',
};

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  let data: PostListResponse | null = null;
  let error: string | null = null;

  try {
    data = (await getPosts(page, 9)) as PostListResponse;
  } catch (e) {
    error = (e as Error).message;
  }

  const posts = data?.data.posts ?? [];
  const pagination = data?.data.pagination;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section
        style={{
          padding: '6rem 1.5rem 4rem',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          className="animate-fade-up"
          style={{ animationDelay: '0ms' }}
        >
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(245,158,11,0.12)',
              border: '1px solid rgba(245,158,11,0.3)',
              color: 'var(--amber)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.3rem 0.85rem',
              borderRadius: '20px',
              marginBottom: '1.75rem',
            }}
          >
            Personal Blogging Platform
          </span>
        </div>

        <h1
          className="animate-fade-up"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--paper)',
            margin: '0 auto 1.5rem',
            maxWidth: '820px',
            animationDelay: '80ms',
          }}
        >
          Where ideas find{' '}
          <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>
            their voice
          </em>
        </h1>

        <p
          className="animate-fade-up"
          style={{
            color: 'var(--muted)',
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
            lineHeight: 1.75,
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
            animationDelay: '160ms',
          }}
        >
          Thoughtful essays, personal stories, and ideas worth sharing —
          written by people who care about words.
        </p>

        <div
          className="animate-fade-up"
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animationDelay: '240ms',
          }}
        >
          <Link
            href="/auth/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--amber)',
              color: '#0F1117',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9375rem',
              textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}
            // onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')}
            // onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
          >
            <PenLine size={16} /> Start writing
          </Link>
          <a
            href="#posts"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              color: 'var(--paper)',
              border: '1px solid var(--ink-border)',
              borderRadius: '8px',
              fontWeight: 400,
              fontSize: '0.9375rem',
              textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}
            // onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--amber)')}
            // onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--ink-border)')}
          >
            Browse posts ↓
          </a>
        </div>

        {/* Decorative divider */}
        <div
          style={{
            marginTop: '5rem',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--ink-border), transparent)',
          }}
        />
      </section>

      {/* ── Posts Grid ────────────────────────────────── */}
      <section
        id="posts"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem 4rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--paper)',
              margin: 0,
            }}
          >
            {page === 1 ? 'Latest posts' : `Page ${page}`}
          </h2>
          {pagination && (
            <span style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
              {pagination.total} {pagination.total === 1 ? 'post' : 'posts'}
            </span>
          )}
        </div>

        {error && (
          <div
            style={{
              padding: '3rem',
              textAlign: 'center',
              color: 'var(--muted)',
              background: 'var(--ink-card)',
              borderRadius: '12px',
              border: '1px solid var(--ink-border)',
            }}
          >
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--paper)' }}>
              Could not load posts
            </p>
            <p style={{ fontSize: '0.875rem', margin: 0 }}>
              Make sure the API server is running at{' '}
              <code style={{ color: 'var(--amber)' }}>
                {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}
              </code>
            </p>
          </div>
        )}

        {!error && posts.length === 0 && (
          <div
            style={{
              padding: '4rem',
              textAlign: 'center',
              color: 'var(--muted)',
              background: 'var(--ink-card)',
              borderRadius: '12px',
              border: '1px solid var(--ink-border)',
            }}
          >
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--paper)', marginBottom: '0.75rem' }}>
              No posts yet
            </p>
            <p style={{ margin: '0 0 1.5rem' }}>Be the first to share something worth reading.</p>
            <Link
              href="/auth/register"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.25rem',
                background: 'var(--amber)',
                color: '#0F1117',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
              }}
            >
              <PenLine size={15} /> Write the first post
            </Link>
          </div>
        )}

        {posts.length > 0 && (
          <>
            {/* Featured first post */}
            {page === 1 && posts[0] && (
              <div style={{ marginBottom: '1.5rem' }}>
                <PostCard post={posts[0]} featured />
              </div>
            )}

            {/* Remaining posts grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {(page === 1 ? posts.slice(1) : posts).map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div style={{ marginTop: '3rem' }}>
                <PaginationControls pagination={pagination} />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
