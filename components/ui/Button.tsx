'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const styles = {
  primary: {
    background: 'var(--amber)',
    color: '#0F1117',
    border: 'none',
    fontWeight: 600,
  },
  ghost: {
    background: 'transparent',
    color: 'var(--muted)',
    border: '1px solid var(--ink-border)',
    fontWeight: 400,
  },
  danger: {
    background: 'transparent',
    color: 'var(--red)',
    border: '1px solid var(--red)',
    fontWeight: 500,
  },
};

const sizes = {
  sm: { padding: '0.4rem 0.875rem', fontSize: '0.8125rem', borderRadius: '6px' },
  md: { padding: '0.6rem 1.25rem', fontSize: '0.9375rem', borderRadius: '8px' },
  lg: { padding: '0.8rem 1.75rem', fontSize: '1rem', borderRadius: '10px' },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...props
}: Props) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.4rem',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.6 : 1,
        transition: 'opacity 0.15s, transform 0.1s',
        width: fullWidth ? '100%' : undefined,
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.01em',
        ...styles[variant],
        ...sizes[size],
        ...style,
      }}
      // onMouseEnter={e => {
      //   if (!disabled && !loading)
      //     (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
      // }}
      // onMouseLeave={e => {
      //   (e.currentTarget as HTMLButtonElement).style.opacity = '1';
      // }}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ animation: 'spin 0.7s linear infinite' }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
