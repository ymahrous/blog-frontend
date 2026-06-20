import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(5rem, 15vw, 8rem)',
          fontWeight: 700,
          color: 'var(--ink-border)',
          lineHeight: 1,
          margin: '0 0 1rem',
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--paper)',
          margin: '0 0 0.75rem',
        }}
      >
        Page not found
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem', maxWidth: '380px' }}>
        The page you are looking for does not exist or may have been removed.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.65rem 1.5rem',
          background: 'var(--amber)',
          color: '#0F1117',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.9375rem',
          textDecoration: 'none',
        }}
      >
        ← Back to Inkwell
      </Link>
    </div>
  );
}
