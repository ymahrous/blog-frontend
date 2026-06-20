import Link from 'next/link';
import { Post } from '@/types';
import { formatDate, readingTime, excerpt } from '@/lib/utils';
import { Clock, User } from 'lucide-react';

interface Props {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: Props) {
  return (
    <article
      style={{
        background: 'var(--ink-card)',
        border: '1px solid var(--ink-border)',
        borderRadius: '12px',
        padding: featured ? '2rem' : '1.5rem',
        transition: 'border-color 0.2s, transform 0.2s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
      // onMouseEnter={e => {
      //   const el = e.currentTarget as HTMLElement;
      //   el.style.borderColor = 'var(--amber)';
      //   el.style.transform = 'translateY(-2px)';
      // }}
      // onMouseLeave={e => {
      //   const el = e.currentTarget as HTMLElement;
      //   el.style.borderColor = 'var(--ink-border)';
      //   el.style.transform = 'translateY(0)';
      // }}
    >
      {/* Meta */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.8125rem',
          color: 'var(--muted)',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <User size={12} />
          {post.author_name}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Clock size={12} />
          {readingTime(post.content)}
        </span>
        <time dateTime={post.created_at} style={{ marginLeft: 'auto' }}>
          {formatDate(post.created_at)}
        </time>
      </div>

      {/* Title */}
      <Link
        href={`/posts/${post.id}`}
        style={{ textDecoration: 'none' }}
      >
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: featured ? '1.5rem' : '1.2rem',
            fontWeight: 700,
            color: 'var(--paper)',
            lineHeight: 1.3,
            margin: 0,
            transition: 'color 0.15s',
          }}
          // onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--amber)')}
          // onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--paper)')}
        >
          {post.title}
        </h2>
      </Link>

      {/* Excerpt */}
      <p
        style={{
          color: 'var(--muted)',
          fontSize: '0.9375rem',
          lineHeight: 1.7,
          margin: 0,
          flexGrow: 1,
        }}
      >
        {excerpt(post.content, featured ? 220 : 140)}
      </p>

      {/* Read link */}
      <Link
        href={`/posts/${post.id}`}
        style={{
          color: 'var(--amber)',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          marginTop: '0.25rem',
        }}
      >
        Read post →
      </Link>
    </article>
  );
}
