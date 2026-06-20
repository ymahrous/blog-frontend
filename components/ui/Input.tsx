'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, hint, id, style, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: error ? 'var(--red)' : 'var(--paper)',
          }}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          style={{
            background: 'var(--ink-card)',
            border: `1px solid ${error ? 'var(--red)' : 'var(--ink-border)'}`,
            borderRadius: '8px',
            padding: '0.65rem 0.9rem',
            color: 'var(--paper)',
            fontSize: '0.9375rem',
            outline: 'none',
            transition: 'border-color 0.15s',
            width: '100%',
            fontFamily: 'Inter, sans-serif',
            ...style,
          }}
          onFocus={e => {
            if (!error)
              (e.target as HTMLInputElement).style.borderColor = 'var(--amber)';
          }}
          onBlur={e => {
            if (!error)
              (e.target as HTMLInputElement).style.borderColor = 'var(--ink-border)';
          }}
          {...props}
        />
        {error && (
          <span style={{ fontSize: '0.8125rem', color: 'var(--red)' }}>
            {error}
          </span>
        )}
        {hint && !error && (
          <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
            {hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
