'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getPost, updatePost } from '@/lib/api';
import { PostResponse } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: Props) {
  const { id } = use(params);
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [notOwner, setNotOwner] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push('/auth/login'); return; }

    getPost(Number(id))
      .then((res) => {
        const post = (res as PostResponse).data.post;
        if (post.author_id !== user.id) { setNotOwner(true); return; }
        setTitle(post.title);
        setContent(post.content);
      })
      .catch(() => router.push('/'))
      .finally(() => setLoading(false));
  }, [id, user, authLoading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!content.trim()) errs.content = 'Content is required';
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    setSaving(true);
    setError('');
    try {
      await updatePost(Number(id), { title: title.trim(), content: content.trim() }, token!);
      router.push(`/posts/${id}`);
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
      setSaving(false);
    }
  }

  if (loading || authLoading) return <FormSkeleton />;

  if (notOwner) return (
    <div style={{ maxWidth: '640px', margin: '6rem auto', padding: '0 1.5rem', textAlign: 'center' }}>
      <p style={{ color: 'var(--muted)' }}>You do not have permission to edit this post.</p>
      <Link href="/" style={{ color: 'var(--amber)' }}>← Go home</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      <Link
        href={`/posts/${id}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--muted)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '2.5rem' }}
      >
        <ArrowLeft size={15} /> Back to post
      </Link>

      <h1
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--paper)',
          margin: '0 0 2rem',
        }}
      >
        Edit post
      </h1>

      {error && <div style={{ marginBottom: '1.5rem' }}><Alert type="error" message={error} onClose={() => setError('')} /></div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Input
          label="Title"
          value={title}
          onChange={e => { setTitle(e.target.value); setFieldErrors(p => ({ ...p, title: '' })); }}
          error={fieldErrors.title}
          placeholder="Give your post a title…"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, color: fieldErrors.content ? 'var(--red)' : 'var(--paper)' }}>
            Content
          </label>
          <textarea
            value={content}
            onChange={e => { setContent(e.target.value); setFieldErrors(p => ({ ...p, content: '' })); }}
            rows={18}
            placeholder="Write your story…"
            style={{
              background: 'var(--ink-card)',
              border: `1px solid ${fieldErrors.content ? 'var(--red)' : 'var(--ink-border)'}`,
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: 'var(--paper)',
              fontSize: '0.9375rem',
              lineHeight: 1.75,
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'Inter, sans-serif',
              transition: 'border-color 0.15s',
              width: '100%',
            }}
            onFocus={e => { if (!fieldErrors.content) e.target.style.borderColor = 'var(--amber)'; }}
            onBlur={e => { if (!fieldErrors.content) e.target.style.borderColor = 'var(--ink-border)'; }}
          />
          {fieldErrors.content && <span style={{ fontSize: '0.8125rem', color: 'var(--red)' }}>{fieldErrors.content}</span>}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button variant="ghost" type="button" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" loading={saving}><Save size={15} /> Save changes</Button>
        </div>
      </form>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div style={{ maxWidth: '720px', margin: '3rem auto', padding: '0 1.5rem' }}>
      <div className="skeleton" style={{ height: '14px', width: '100px', marginBottom: '2.5rem' }} />
      <div className="skeleton" style={{ height: '40px', width: '200px', marginBottom: '2rem' }} />
      <div className="skeleton" style={{ height: '48px', width: '100%', marginBottom: '1.5rem' }} />
      <div className="skeleton" style={{ height: '320px', width: '100%' }} />
    </div>
  );
}
