'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Pagination } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Suspense } from 'react';

function PaginationInner({ pagination }: { pagination: Pagination }) {
  const searchParams = useSearchParams();
  const { page, totalPages, total, limit } = pagination;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  function pageHref(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(p));
    return `?${params.toString()}`;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <span style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
        Showing {from}–{to} of {total} posts
      </span>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {page > 1 ? (
          <Link href={pageHref(page - 1)} style={btnStyle}>
            <ChevronLeft size={16} /> Previous
          </Link>
        ) : (
          <span style={{ ...btnStyle, opacity: 0.35, pointerEvents: 'none' }}>
            <ChevronLeft size={16} /> Previous
          </span>
        )}

        <span style={{ color: 'var(--muted)', fontSize: '0.875rem', padding: '0 0.5rem' }}>
          {page} / {totalPages}
        </span>

        {page < totalPages ? (
          <Link href={pageHref(page + 1)} style={btnStyle}>
            Next <ChevronRight size={16} />
          </Link>
        ) : (
          <span style={{ ...btnStyle, opacity: 0.35, pointerEvents: 'none' }}>
            Next <ChevronRight size={16} />
          </span>
        )}
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  border: '1px solid var(--ink-border)',
  background: 'transparent',
  color: 'var(--paper)',
  fontSize: '0.875rem',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'border-color 0.15s',
};

export default function PaginationControls({ pagination }: { pagination: Pagination }) {
  return (
    <Suspense>
      <PaginationInner pagination={pagination} />
    </Suspense>
  );
}
