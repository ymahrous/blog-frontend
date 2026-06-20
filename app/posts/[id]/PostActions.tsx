'use client';

import { useAuth } from '@/context/AuthContext';
import { deletePost } from '@/lib/api';
import { Post } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { Pencil, Trash2 } from 'lucide-react';

export default function PostActions({ post }: { post: Post }) {
  const { user, token } = useAuth();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  if (!user || user.id !== post.author_id) return null;

  async function handleDelete() {
    if (!token) return;
    setDeleting(true);
    setError('');
    try {
      await deletePost(post.id, token);
      router.push('/');
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
      setDeleting(false);
      setShowConfirm(false);
    }
  }

  return (
    <div
      style={{
        marginTop: '3rem',
        padding: '1.25rem 1.5rem',
        background: 'var(--ink-card)',
        border: '1px solid var(--ink-border)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <span style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
        You wrote this post
      </span>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {showConfirm ? (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>
              Delete this post?
            </span>
            <Button
              variant="danger"
              size="sm"
              loading={deleting}
              onClick={handleDelete}
            >
              Yes, delete
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <Link
              href={`/posts/${post.id}/edit`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.875rem',
                borderRadius: '6px',
                border: '1px solid var(--ink-border)',
                color: 'var(--paper)',
                fontSize: '0.8125rem',
                textDecoration: 'none',
                transition: 'border-color 0.15s',
              }}
              // onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--amber)')}
              // onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--ink-border)')}
            >
              <Pencil size={13} /> Edit
            </Link>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowConfirm(true)}
            >
              <Trash2 size={13} /> Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
