import { getPost } from '@/lib/api';
import { PostResponse } from '@/types';
import { formatDate, readingTime } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import PostActions from './PostActions';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = (await getPost(Number(id))) as PostResponse;
    const post = res.data.post;
    const desc = post.content.slice(0, 155).replace(/\s+\S*$/, '') + '…';
    return {
      title: post.title,
      description: desc,
      authors: [{ name: post.author_name }],
      openGraph: {
        title: post.title,
        description: desc,
        type: 'article',
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
        authors: [post.author_name],
      },
      twitter: {
        card: 'summary',
        title: post.title,
        description: desc,
      },
    };
  } catch {
    return { title: 'Post not found' };
  }
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  let post;

  try {
    const res = (await getPost(Number(id))) as PostResponse;
    post = res.data.post;
  } catch {
    notFound();
  }

  const paragraphs = post.content.split(/\n+/).filter(Boolean);

  return (
    <article style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      {/* Back */}
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          color: 'var(--muted)',
          textDecoration: 'none',
          fontSize: '0.875rem',
          marginBottom: '2.5rem',
          transition: 'color 0.15s',
        }}
        // onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--amber)')}
        // onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)')}
      >
        <ArrowLeft size={15} /> All posts
      </Link>

      {/* Title */}
      <h1
        className="animate-fade-up"
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: 'var(--paper)',
          margin: '0 0 1.75rem',
        }}
      >
        {post.title}
      </h1>

      {/* Meta bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          padding: '1rem 0',
          borderTop: '1px solid var(--ink-border)',
          borderBottom: '1px solid var(--ink-border)',
          marginBottom: '2.5rem',
          fontSize: '0.875rem',
          color: 'var(--muted)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <User size={14} />
          <strong style={{ color: 'var(--paper)', fontWeight: 500 }}>{post.author_name}</strong>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calendar size={14} />
          <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Clock size={14} />
          {readingTime(post.content)}
        </span>
        {post.updated_at !== post.created_at && (
          <span style={{ marginLeft: 'auto', fontSize: '0.8125rem' }}>
            Updated {formatDate(post.updated_at)}
          </span>
        )}
      </div>

      {/* Post body */}
      <div className="prose-blog animate-fade-up" style={{ animationDelay: '100ms' }}>
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Owner actions (edit/delete) — client component */}
      <PostActions post={post} />

      {/* Back to all posts */}
      <div
        style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--ink-border)',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'var(--amber)',
            textDecoration: 'none',
            fontSize: '0.9375rem',
            fontWeight: 500,
          }}
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
}
