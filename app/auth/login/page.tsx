'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/lib/api';
import { AuthResponse } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = (await loginUser({ email, password })) as AuthResponse;
      login(res.data.user, res.data.token);
      router.push('/');
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle} className="animate-fade-up">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link
            href="/"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', fontWeight: 700, color: 'var(--paper)', textDecoration: 'none' }}
          >
            Ink<span style={{ color: 'var(--amber)' }}>well</span>
          </Link>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 600, color: 'var(--paper)', margin: '1.25rem 0 0.5rem' }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9375rem', margin: 0 }}>
            Sign in to continue writing
          </p>
        </div>

        {error && <div style={{ marginBottom: '1.25rem' }}><Alert type="error" message={error} onClose={() => setError('')} /></div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
          <Button type="submit" fullWidth loading={loading} size="lg">
            Sign in
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--muted)', fontSize: '0.9rem', margin: '1.5rem 0 0' }}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" style={{ color: 'var(--amber)', textDecoration: 'none', fontWeight: 500 }}>
            Get started
          </Link>
        </p>
      </div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: 'calc(100vh - 64px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 1.5rem',
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '420px',
  background: 'var(--ink-card)',
  border: '1px solid var(--ink-border)',
  borderRadius: '16px',
  padding: '2.5rem',
};
