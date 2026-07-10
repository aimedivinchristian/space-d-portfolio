'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/profile', label: 'Profile & About' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/skills', label: 'Skills' },
  { href: '/admin/socials', label: 'Social Links' },
];

export default function AdminNav() {
  const pathname = usePathname() ?? '';

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">Space D · Admin</div>
      {LINKS.map((l) => {
        const active = l.href === '/admin' ? pathname === '/admin' : pathname.startsWith(l.href);
        return (
          <Link key={l.href} href={l.href} className={`admin-navlink${active ? ' active' : ''}`}>
            {l.label}
          </Link>
        );
      })}
      <Link href="/" className="admin-navlink" target="_blank">View Site ↗</Link>
      <button className="admin-signout" onClick={() => signOut({ callbackUrl: '/admin/login' })}>
        Sign Out
      </button>
    </aside>
  );
}
