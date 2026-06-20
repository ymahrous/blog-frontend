'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { PenLine, LogOut, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push('/');
    setMenuOpen(false);
  }

  const isActive = (href: string) => pathname === href;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(15,17,23,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--ink-border)',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--paper)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          Ink<span style={{ color: 'var(--amber)' }}>well</span>
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          className="desktop-nav"
        >
          {user ? (
            <>
              <span
                style={{
                  color: 'var(--muted)',
                  fontSize: '0.875rem',
                  padding: '0 0.75rem',
                }}
              >
                {user.name}
              </span>
              <NavBtn
                href="/posts/new"
                icon={<PenLine size={15} />}
                label="Write"
                primary
                active={isActive('/posts/new')}
                onClick={() => setMenuOpen(false)}
              />
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '6px',
                  border: '1px solid var(--ink-border)',
                  background: 'transparent',
                  color: 'var(--muted)',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                // onMouseEnter={e => {
                //   (e.currentTarget as HTMLButtonElement).style.color = 'var(--red)';
                //   (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--red)';
                // }}
                // onMouseLeave={e => {
                //   (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
                //   (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ink-border)';
                // }}
              >
                <LogOut size={15} /> Sign out
              </button>
            </>
          ) : (
            <>
              <NavBtn
                href="/auth/login"
                icon={<LogIn size={15} />}
                label="Sign in"
                active={isActive('/auth/login')}
                onClick={() => setMenuOpen(false)}
              />
              <NavBtn
                href="/auth/register"
                icon={<UserPlus size={15} />}
                label="Get started"
                primary
                active={isActive('/auth/register')}
                onClick={() => setMenuOpen(false)}
              />
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--paper)',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'var(--ink-card)',
            borderTop: '1px solid var(--ink-border)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {user ? (
            <>
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem', margin: 0 }}>
                Signed in as <strong style={{ color: 'var(--paper)' }}>{user.name}</strong>
              </p>
              <MobileLink href="/posts/new" onClick={() => setMenuOpen(false)}>
                ✍️ Write a post
              </MobileLink>
              <button
                onClick={handleLogout}
                style={{
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  color: 'var(--red)',
                  fontSize: '0.9375rem',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <MobileLink href="/auth/login" onClick={() => setMenuOpen(false)}>
                Sign in
              </MobileLink>
              <MobileLink href="/auth/register" onClick={() => setMenuOpen(false)}>
                Get started
              </MobileLink>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}

function NavBtn({
  href,
  icon,
  label,
  primary,
  active,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.45rem 0.9rem',
        borderRadius: '6px',
        border: primary ? 'none' : '1px solid var(--ink-border)',
        background: primary ? 'var(--amber)' : 'transparent',
        color: primary ? '#0F1117' : active ? 'var(--paper)' : 'var(--muted)',
        fontSize: '0.875rem',
        fontWeight: primary ? 600 : 400,
        textDecoration: 'none',
        transition: 'opacity 0.15s',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')}
      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
    >
      {icon} {label}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        color: 'var(--paper)',
        textDecoration: 'none',
        fontSize: '0.9375rem',
        padding: '0.5rem 0',
        borderBottom: '1px solid var(--ink-border)',
      }}
    >
      {children}
    </Link>
  );
}
