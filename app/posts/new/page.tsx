'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createPost } from '@/lib/api';
import { PostResponse } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { PenLine } from 'lucide-react';

export default function NewPostPage() {
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [user, authLoading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!content.trim()) errs.content = 'Content is required';
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    setSubmitting(true);
    setError('');
    try {
      const res = (await createPost({ title: title.trim(), content: content.trim() }, token!)) as PostResponse;
      router.push(`/posts/${res.data.post.id}`);
    } catch (e) {
      setError((e as Error).message);
      setSubmitting(false);
    }
  }

  if (authLoading) return null;

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.25rem',
            fontWeight: 700,
            color: 'var(--paper)',
            margin: '0 0 0.5rem',
          }}
        >
          Write a new post
        </h1>
        <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.9375rem' }}>
          Share something worth reading, {user?.name?.split(' ')[0]}.
        </p>
      </div>

      {error && <div style={{ marginBottom: '1.5rem' }}><Alert type="error" message={error} onClose={() => setError('')} /></div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Input
          label="Title"
          value={title}
          onChange={e => { setTitle(e.target.value); setFieldErrors(p => ({ ...p, title: '' })); }}
          error={fieldErrors.title}
          placeholder="Give your post a great title…"
          autoFocus
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: fieldErrors.content ? 'var(--red)' : 'var(--paper)' }}>
              Content
            </label>
            {wordCount > 0 && (
              <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
                {wordCount} {wordCount === 1 ? 'word' : 'words'} · ~{Math.max(1, Math.round(wordCount / 200))} min read
              </span>
            )}
          </div>
          <textarea
            value={content}
            onChange={e => { setContent(e.target.value); setFieldErrors(p => ({ ...p, content: '' })); }}
            rows={20}
            placeholder="Start writing your story… Use blank lines to separate paragraphs."
            style={{
              background: 'var(--ink-card)',
              border: `1px solid ${fieldErrors.content ? 'var(--red)' : 'var(--ink-border)'}`,
              borderRadius: '8px',
              padding: '0.875rem 1rem',
              color: 'var(--paper)',
              fontSize: '1rem',
              lineHeight: 1.8,
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'Georgia, "Playfair Display", serif',
              transition: 'border-color 0.15s',
              width: '100%',
            }}
            onFocus={e => { if (!fieldErrors.content) e.target.style.borderColor = 'var(--amber)'; }}
            onBlur={e => { if (!fieldErrors.content) e.target.style.borderColor = 'var(--ink-border)'; }}
          />
          {fieldErrors.content && <span style={{ fontSize: '0.8125rem', color: 'var(--red)' }}>{fieldErrors.content}</span>}
          <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
            Separate paragraphs with a blank line.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
          <Button variant="ghost" type="button" onClick={() => router.back()}>
            Discard
          </Button>
          <Button type="submit" loading={submitting} size="lg">
            <PenLine size={16} /> Publish post
          </Button>
        </div>
      </form>
    </div>
  );
}
