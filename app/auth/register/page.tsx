'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { registerUser } from '@/lib/api';
import { AuthResponse } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Link from 'next/link';

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordStrength = password.length === 0
    ? null
    : password.length < 8
    ? 'weak'
    : password.length < 12
    ? 'fair'
    : 'strong';

  const strengthColor = { weak: 'var(--red)', fair: 'var(--amber)', strong: '#22c55e' };
  const strengthLabel = { weak: 'Too short', fair: 'Fair', strong: 'Strong' };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = (await registerUser({ name, email, password })) as AuthResponse;
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
            Start your blog today
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9375rem', margin: 0 }}>
            Free forever. No ads. Just writing.
          </p>
        </div>

        {error && <div style={{ marginBottom: '1.25rem' }}><Alert type="error" message={error} onClose={() => setError('')} /></div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Input
            label="Full name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Jane Doe"
            autoComplete="name"
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              required
              hint="Use 8+ characters for a stronger password"
            />
            {passwordStrength && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                <div style={{ flex: 1, height: '3px', background: 'var(--ink-border)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      borderRadius: '2px',
                      background: strengthColor[passwordStrength],
                      width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'fair' ? '66%' : '100%',
                      transition: 'width 0.3s, background 0.3s',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: strengthColor[passwordStrength], minWidth: '40px' }}>
                  {strengthLabel[passwordStrength]}
                </span>
              </div>
            )}
          </div>

          <Button type="submit" fullWidth loading={loading} size="lg">
            Create account
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--muted)', fontSize: '0.9rem', margin: '1.5rem 0 0' }}>
          Already have an account?{' '}
          <Link href="/auth/login" style={{ color: 'var(--amber)', textDecoration: 'none', fontWeight: 500 }}>
            Sign in
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
