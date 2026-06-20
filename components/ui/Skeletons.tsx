export function PostCardSkeleton() {
  return (
    <div
      style={{
        background: 'var(--ink-card)',
        border: '1px solid var(--ink-border)',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className="skeleton" style={{ height: '12px', width: '80px' }} />
        <div className="skeleton" style={{ height: '12px', width: '60px' }} />
        <div className="skeleton" style={{ height: '12px', width: '70px', marginLeft: 'auto' }} />
      </div>
      <div className="skeleton" style={{ height: '22px', width: '80%' }} />
      <div className="skeleton" style={{ height: '22px', width: '55%' }} />
      <div className="skeleton" style={{ height: '14px', width: '100%' }} />
      <div className="skeleton" style={{ height: '14px', width: '90%' }} />
      <div className="skeleton" style={{ height: '14px', width: '70%' }} />
      <div className="skeleton" style={{ height: '14px', width: '60px', marginTop: '0.25rem' }} />
    </div>
  );
}

export function PostPageSkeleton() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div className="skeleton" style={{ height: '14px', width: '120px', marginBottom: '2rem' }} />
      <div className="skeleton" style={{ height: '44px', width: '90%', marginBottom: '0.75rem' }} />
      <div className="skeleton" style={{ height: '44px', width: '65%', marginBottom: '2rem' }} />
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="skeleton" style={{ height: '12px', width: '100px' }} />
        <div className="skeleton" style={{ height: '12px', width: '80px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {[100, 90, 95, 85, 100, 70, 88].map((w, i) => (
          <div key={i} className="skeleton" style={{ height: '16px', width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}
