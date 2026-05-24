'use client';
import { useState } from 'react';
import { translations, Lang } from '@/lib/translations';

interface Props {
  theme: 'light' | 'dark';
  lang: Lang;
  onToggleTheme: () => void;
  onToggleLang: () => void;
}

export default function Navbar({ theme, lang, onToggleTheme, onToggleLang }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const links = [
    { href: '#home', label: t.home },
    { href: '#about', label: t.about },
    { href: '#work', label: t.work },
    { href: '#skills', label: t.skills },
    { href: '#contact', label: t.contact },
  ];

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#home" className="nav-logo">Space<span>  D</span></a>

          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>

          <div className="nav-controls">
            <button className="nav-btn" onClick={onToggleLang} title="Toggle language" aria-label="Toggle language">
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button className="nav-btn" onClick={onToggleTheme} title="Toggle theme" aria-label="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              className="hamburger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
          <button className="nav-btn" onClick={onToggleLang}>{lang === 'en' ? 'FR' : 'EN'}</button>
          <button className="nav-btn" onClick={onToggleTheme}>{theme === 'dark' ? '☀️' : '🌙'}</button>
        </div>
      </div>
    </>
  );
}
