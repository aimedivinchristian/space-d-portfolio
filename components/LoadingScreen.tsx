'use client';
import { useEffect, useState } from 'react';
import { Lang } from '@/lib/translations';

interface Props { lang: Lang; }

export default function LoadingScreen({ lang }: Props) {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 2000);
    const t2 = setTimeout(() => setMounted(false), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!mounted) return null;

  return (
    <div className={`loading-screen${hidden ? ' hidden' : ''}`} aria-hidden="true">
      <div className="loading-logo">
        Space<span> D</span>
      </div>
      <div className="loading-bar-wrap">
        <div className="loading-bar" />
      </div>
      <p className="loading-text">
        {lang === 'fr' ? 'Chargement…' : 'Loading…'}
      </p>
    </div>
  );
}
