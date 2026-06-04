'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Github, Instagram, Facebook, Youtube, Figma, Camera, Film, Lightbulb, Terminal, Cpu } from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import { translations, Lang } from '@/lib/translations';

const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { ssr: false });

const ReactLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" fill="none" aria-hidden="true" {...props}>
    <circle cx="64" cy="64" r="14" fill="#61DAFB" />
    <ellipse cx="64" cy="64" rx="50" ry="16" stroke="#61DAFB" strokeWidth="12" />
    <ellipse cx="64" cy="64" rx="50" ry="16" stroke="#61DAFB" strokeWidth="12" transform="rotate(60 64 64)" />
    <ellipse cx="64" cy="64" rx="50" ry="16" stroke="#61DAFB" strokeWidth="12" transform="rotate(120 64 64)" />
  </svg>
);

const TypeScriptLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
    <rect width="128" height="128" rx="28" fill="#3178c6" />
    <text x="64" y="78" textAnchor="middle" fontSize="52" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">TS</text>
  </svg>
);

const ThreeLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
    <polygon points="64 14 110 42 110 86 64 114 18 86 18 42" fill="#1c1c1f" />
    <polygon points="64 32 92 52 92 76 64 96 36 76 36 52" fill="#fff" opacity="0.9" />
    <path d="M64 32v64M36 52l28 16 28-16" stroke="#1c1c1f" strokeWidth="4" strokeLinejoin="round" />
  </svg>
);

const NodeLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
    <polygon points="64 10 114 36 114 90 64 116 14 90 14 36" fill="#43853d" />
    <path d="M52 40h12v48h16l20-28-20-20h-16v-8h-12v8h-8v12h8v28z" fill="#fff" />
  </svg>
);

const TailwindLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
    <rect width="128" height="128" rx="28" fill="#38bdf8" />
    <path d="M30 72c23-18 46-18 69 0-23 18-46 18-69 0zm0 20c23-18 46-18 69 0-23 18-46 18-69 0z" fill="#fff" />
  </svg>
);

const AdobeLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
    <rect width="128" height="128" rx="28" fill="#ff0000" />
    <path d="M36 96 52 32h24l16 56 6-20v40H36z" fill="#fff" />
  </svg>
);

const HTMLLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
    <rect width="128" height="128" rx="28" fill="#E34F26" />
    <path d="M40 38 48 86 64 96 80 86 88 38H40Zm17 20h26l-2 22-12 6-12-6-2-22Z" fill="#fff" />
    <path d="M64 56h18l-1 11-8 4-9-4-1-11Z" fill="#EBEBEB" />
  </svg>
);

const CLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
    <circle cx="64" cy="64" r="54" fill="#00589f" />
    <text x="64" y="82" textAnchor="middle" fontSize="72" fontWeight="800" fill="#fff" fontFamily="Inter, sans-serif">C</text>
  </svg>
);

const LinuxLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
    <rect width="128" height="128" rx="28" fill="#000" />
    <path d="M32 44h64v40H32z" fill="#2d2d2d" />
    <path d="M36 52h56v4H36zm0 10h20v4H36zm0 10h36v4H36z" fill="#fff" />
    <circle cx="96" cy="84" r="2" fill="#fff" />
    <circle cx="96" cy="74" r="2" fill="#fff" />
    <circle cx="96" cy="64" r="2" fill="#fff" />
  </svg>
);

const EmbeddedLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
    <rect width="128" height="128" rx="28" fill="#111827" />
    <rect x="30" y="30" width="68" height="68" rx="12" fill="#4b5563" />
    <path d="M42 42h44v44H42z" fill="#1f2937" />
    <path d="M56 56h16v16H56z" fill="#fbbf24" />
    <path d="M76 56h8v8h-8zM44 76h8v8h-8zM76 76h8v8h-8z" fill="#d1d5db" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.427 0-2.834.356-4.06 1.031l-.291.16-.302-.04C6.281 6.95 5.52 6.7 4.8 6.7c-3.798 0-6.89 3.09-6.89 6.887 0 1.52.395 3.005 1.143 4.308l.213.408-.33.954c-.485 1.39-1.271 2.6-1.271 2.6s1.364-.095 2.926-.938l.412-.25.475.09c1.39.266 2.633.266 2.633.266 3.798 0 6.89-3.09 6.89-6.89 0-1.819-.75-3.54-2.124-4.757-1.374-1.218-3.199-1.89-5.125-1.89" />
  </svg>
);

const SnapchatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.065.217c4.697 0 7.454 3.253 7.454 7.454 0 1.158-.13 2.237-.522 3.236.956.13 1.652.696 1.913 1.652.26 1.087-.087 2.304-1.087 3.066.609.478 1.087 1.304 1.087 2.391 0 1.826-1.478 3.253-3.304 3.253-1.304 0-2.478-.609-3.253-1.565-.783.174-1.913.348-3.304.348-1.739 0-3.692-.348-5.344-.696-.348.956-1.304 1.565-2.478 1.565-1.826 0-3.304-1.427-3.304-3.253 0-1.087.478-1.913 1.087-2.391-.956-.783-1.304-1.978-1.087-3.066.261-.956.956-1.522 1.913-1.652-.392-.999-.522-2.078-.522-3.236C4.611 3.47 7.368.217 12.065.217zm0 1.044c-3.997 0-6.192 2.65-6.192 6.41 0 1.044.13 2.135.522 3.135a.667.667 0 0 1-.696.826c-.913.087-1.522.478-1.696 1.044-.174.696.087 1.565.826 2.13a.667.667 0 0 1 .174.956c-.348.696-.783 1.522-.783 2.304 0 1.478 1.044 2.739 2.478 2.739 1.044 0 1.913-.565 2.304-1.435a.667.667 0 0 1 .783-.348c1.478.348 3.31.652 4.87.652 1.522 0 3.31-.348 4.87-.74a.667.667 0 0 1 .783.348c.391.87 1.26 1.435 2.304 1.435 1.434 0 2.478-1.261 2.478-2.739 0-.783-.435-1.608-.783-2.304a.667.667 0 0 1 .174-.956c.739-.565.996-1.434.826-2.13-.174-.565-.783-.957-1.696-1.044a.667.667 0 0 1-.696-.826c.392-1 .522-2.091.522-3.135 0-3.76-2.195-6.41-6.192-6.41z" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.427 0-2.834.356-4.06 1.031l-.291.16-.302-.04C6.281 6.95 5.52 6.7 4.8 6.7c-3.798 0-6.89 3.09-6.89 6.887 0 1.52.395 3.005 1.143 4.308l.213.408-.33.954c-.485 1.39-1.271 2.6-1.271 2.6s1.364-.095 2.926-.938l.412-.25.475.09c1.39.266 2.633.266 2.633.266 3.798 0 6.89-3.09 6.89-6.89 0-1.819-.75-3.54-2.124-4.757-1.374-1.218-3.199-1.89-5.125-1.89" />
  </svg>
);

const SnapchatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.065.217c4.697 0 7.454 3.253 7.454 7.454 0 1.158-.13 2.237-.522 3.236.956.13 1.652.696 1.913 1.652.26 1.087-.087 2.304-1.087 3.066.609.478 1.087 1.304 1.087 2.391 0 1.826-1.478 3.253-3.304 3.253-1.304 0-2.478-.609-3.253-1.565-.783.174-1.913.348-3.304.348-1.739 0-3.692-.348-5.344-.696-.348.956-1.304 1.565-2.478 1.565-1.826 0-3.304-1.427-3.304-3.253 0-1.087.478-1.913 1.087-2.391-.956-.783-1.304-1.978-1.087-3.066.261-.956.956-1.522 1.913-1.652-.392-.999-.522-2.078-.522-3.236C4.611 3.47 7.368.217 12.065.217zm0 1.044c-3.997 0-6.192 2.65-6.192 6.41 0 1.044.13 2.135.522 3.135a.667.667 0 0 1-.696.826c-.913.087-1.522.478-1.696 1.044-.174.696.087 1.565.826 2.13a.667.667 0 0 1 .174.956c-.348.696-.783 1.522-.783 2.304 0 1.478 1.044 2.739 2.478 2.739 1.044 0 1.913-.565 2.304-1.435a.667.667 0 0 1 .783-.348c1.478.348 3.31.652 4.87.652 1.522 0 3.31-.348 4.87-.74a.667.667 0 0 1 .783.348c.391.87 1.26 1.435 2.304 1.435 1.434 0 2.478-1.261 2.478-2.739 0-.783-.435-1.608-.783-2.304a.667.667 0 0 1 .174-.956c.739-.565.996-1.434.826-2.13-.174-.565-.783-.957-1.696-1.044a.667.667 0 0 1-.696-.826c.392-1 .522-2.091.522-3.135 0-3.76-2.195-6.41-6.192-6.41z" />
  </svg>
);

const PROJECTS = [
  {
    title: 'Moto Lens',
    desc: 'A visual journal blending motorcycle culture with street photography — cinematic edits, location stories, and raw journeys across Rwanda.',
    tags: ['Photography', 'Design', 'Editorial'],
    status: 'in-process' as const,
    image: '/motolens.png',
    accent: '#e08a45',
    liveUrl: '#', // TODO: Add your Moto Lens live URL here
  },
  {
    title: 'SpaceD Portfolio',
    desc: 'This very portfolio — built with Next.js, Three.js, and a custom design system. Dark/light themes, bilingual (EN/FR), email contact.',
    tags: ['Next.js', 'Three.js', 'TypeScript'],
    status: 'done' as const,
    image: '/spaced.png',
    accent: '#4aa8cc',
    liveUrl: 'https://aimedivinchristian.vercel.app/', // TODO: Add your SpaceD Portfolio live URL here
  },
];

const SKILLS = [
  { name: 'Next.js / React', level: 'Advanced', icon: <ReactLogo width={40} height={40} /> },
  { name: 'TypeScript', level: 'Advanced', icon: <TypeScriptLogo width={40} height={40} /> },
  { name: 'HTML / CSS', level: 'Advanced', icon: <HTMLLogo width={40} height={40} /> },
  { name: 'C / Embedded C', level: 'Advanced', icon: <CLogo width={40} height={40} /> },
  { name: 'Three.js / WebGL', level: 'Intermediate', icon: <ThreeLogo width={40} height={40} /> },
  { name: 'Linux / Shell', level: 'Advanced', icon: <Terminal size={32} /> },
  { name: 'Embedded Systems', level: 'Advanced', icon: <EmbeddedLogo width={40} height={40} /> },
  { name: 'UI/UX Design', level: 'Intermediate', icon: <Figma size={34} color="#f24e1e" /> },
  { name: 'Graphic Design', level: 'Advanced', icon: <AdobeLogo width={40} height={40} /> },
  { name: 'Photography', level: 'Intermediate', icon: <Camera size={32} /> },
  { name: 'Adobe Creative Suite', level: 'Intermediate', icon: <AdobeLogo width={40} height={40} /> },
  { name: 'Figma', level: 'Intermediate', icon: <Figma size={34} /> },
  { name: 'Node.js', level: 'Intermediate', icon: <NodeLogo width={40} height={40} /> },
  { name: 'Tailwind CSS', level: 'Advanced', icon: <TailwindLogo width={40} height={40} /> },
  { name: 'Video Editing', level: 'Intermediate', icon: <Film size={32} /> },
  { name: 'Brand Strategy', level: 'Intermediate', icon: <Lightbulb size={32} /> },
];

const SOCIALS = [
  { label: 'GitHub', icon: <Github size={20} />, href: 'https://github.com/aimedivinchristian', title: 'GitHub', color: '#0f1720', bg: 'transparent', border: 'var(--border)' },
  { label: 'Instagram', icon: <Instagram size={20} />, href: 'https://instagram.com/aimedivinchristian', title: 'Instagram', color: '#fff', bg: 'linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', border: 'transparent' },
  { label: 'Facebook', icon: <Facebook size={20} />, href: 'https://facebook.com/naime.divinchristian', title: 'Facebook', color: '#fff', bg: '#1877F2', border: 'transparent' },
  { label: 'WhatsApp', icon: <WhatsAppIcon width={20} height={20} />, href: 'https://wa.me/250796977458', title: 'WhatsApp', color: '#fff', bg: '#25D366', border: 'transparent' },
  { label: 'YouTube', icon: <Youtube size={20} />, href: 'https://youtube.com/@aimedivinchristian', title: 'YouTube', color: '#fff', bg: '#FF0000', border: 'transparent' },
  { label: 'Snapchat', icon: <SnapchatIcon width={20} height={20} />, href: 'https://snapchat.com/add/aimedivinchri', title: 'Snapchat', color: '#fff', bg: '#FFFC00', border: 'transparent' },
];

export default function HomePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [lang, setLang] = useState<Lang>('en');
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);

  const t = translations[lang];

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Intersection observer for fade-up
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    fadeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [lang]);

  const addRef = (el: HTMLElement | null) => { if (el) fadeRefs.current.push(el); };

  return (
    <>
      <LoadingScreen lang={lang} />
      <Navbar
        theme={theme}
        lang={lang}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        onToggleLang={() => setLang((l) => (l === 'en' ? 'fr' : 'en'))}
      />

      {/* ── HERO ── */}
      <section id="home" className="hero" style={{ maxWidth: 'none', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <div className="hero-bg" />
        <ThreeBackground />

        <div className="hero-content" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <p className="hero-greeting">{t.hero.greeting}</p>
          <h1 className="hero-name">{t.hero.name}</h1>
          <p className="hero-tagline">{t.hero.tagline}</p>
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-cta">
            <a href="#work" className="btn btn-primary">{t.hero.cta} →</a>
            <a href="#contact" className="btn btn-outline">{t.hero.ctaContact}</a>
          </div>

          {/* Social links in hero */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2.5rem', flexWrap: 'wrap', opacity: 0, animation: 'fadeUp 0.7s 1s ease forwards' }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title={s.title}
                aria-label={s.title}
                style={{ background: s.bg || undefined, color: s.color || undefined, borderColor: s.border || undefined }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div ref={addRef} className="fade-up">
          <span className="section-label">{lang === 'en' ? 'Who I Am' : 'Qui je suis'}</span>
          <h2 className="section-title">{t.about.title}</h2>
        </div>
        <div className="about-grid" ref={addRef as React.Ref<HTMLDivElement>}>
          <div className="about-img-wrap">
            <div className="about-img-placeholder">
              <Image src="/me.jpg" fill alt="Aime Divin Christian" style={{objectFit:'cover'}} />
            </div>
            <div className="about-badge">📍 Kigali, Rwanda</div>
          </div>
          <div className="about-text">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
            <div className="about-contacts">
              <div className="about-contact-item">
                <strong>{t.about.phone}</strong>
                <a href="tel:+250796977458">+250 796 977 458</a>
              </div>
              <div className="about-contact-item">
                <strong>{t.about.email}</strong>
                <a href="mailto:aimedivinchristian@gmail.com">aimedivinchristian@gmail.com</a>
              </div>
              <div className="about-contact-item">
                <strong>{t.about.location}</strong>
                <span>Kigali, Rwanda</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" style={{ background: 'var(--bg2)', maxWidth: 'none', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div ref={addRef} className="fade-up">
            <span className="section-label">{lang === 'en' ? 'Portfolio' : 'Portfolio'}</span>
            <h2 className="section-title">{t.work.title}</h2>
            <p className="section-sub">{t.work.sub}</p>
          </div>
          <div className="work-grid">
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                ref={addRef}
                className="work-card fade-up"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div className="work-card-img">
                  <Image src={p.image} alt={p.title} fill className="work-card-img-image" />
                  <div className={`status-badge status-${p.status}`}>
                    {p.status === 'done' ? '✓ Done' : '⏳ In Process'}
                  </div>
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
                    background: p.accent,
                  }} />
                </div>
                <div className="work-card-body">
                  <div className="work-card-tags">
                    {p.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
                    >
                      {lang === 'en' ? 'View Live' : 'Voir en direct'} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div ref={addRef} className="fade-up">
          <span className="section-label">{lang === 'en' ? 'Expertise' : 'Expertise'}</span>
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-sub">{t.skills.sub}</p>
        </div>
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <div
              key={s.name}
              ref={addRef}
              className="skill-card fade-up"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="skill-icon">{s.icon}</div>
              <div>
                <p className="skill-name">{s.name}</p>
                <p className="skill-level">{s.level}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: 'var(--bg2)', maxWidth: 'none', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div ref={addRef} className="fade-up">
            <span className="section-label">{lang === 'en' ? 'Contact' : 'Contact'}</span>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-sub">{t.contact.sub}</p>
          </div>
          <div className="contact-grid">
            <div ref={addRef} className="fade-up contact-info">
              <h3> NDANYUZWE Aime Divin Christian</h3>
              <p>
                {lang === 'en'
                  ? 'Open to freelance projects, collaborations, and creative commissions. Based in Kigali — working globally.'
                  : 'Disponible pour des projets freelance, collaborations et commissions créatives. Basé à Kigali — travaillant à l\'échelle mondiale.'}
              </p>
              <div className="social-links">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={s.title}
                    aria-label={s.title}
                    style={{ background: s.bg || undefined, color: s.color || undefined, borderColor: s.border || undefined }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <div ref={addRef} className="fade-up">
              <ContactForm lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} <strong>Aime Divin Christian</strong> — Space D. Kigali, Rwanda.</p>
      </footer>
    </>
  );
}
