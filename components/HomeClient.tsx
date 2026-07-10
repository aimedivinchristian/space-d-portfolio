'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import { Icon } from '@/lib/icons';
import { translations, Lang } from '@/lib/translations';
import type { Profile, Project, Skill, Social } from '@/lib/data';

const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { ssr: false });

type Props = {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  socials: Social[];
};

const pick = <T,>(lang: Lang, en: T, fr: T) => (lang === 'en' ? en : fr);

export default function HomeClient({ profile, projects, skills, socials }: Props) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [lang, setLang] = useState<Lang>('en');
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    fadeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [lang]);

  const addRef = (el: HTMLElement | null) => { if (el) fadeRefs.current.push(el); };

  const telHref = `tel:${profile.phone.replace(/\s+/g, '')}`;

  return (
    <>
      <LoadingScreen lang={lang} />
      <Navbar
        theme={theme}
        lang={lang}
        onToggleTheme={() => setTheme((v) => (v === 'dark' ? 'light' : 'dark'))}
        onToggleLang={() => setLang((l) => (l === 'en' ? 'fr' : 'en'))}
      />

      {/* ── HERO ── */}
      <section id="home" className="hero" style={{ maxWidth: 'none', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <div className="hero-bg" />
        <ThreeBackground />

        <div className="hero-content" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <p className="hero-greeting">{t.hero.greeting}</p>
          <h1 className="hero-name">{profile.heroName}</h1>
          <p className="hero-tagline">{pick(lang, profile.heroTaglineEn, profile.heroTaglineFr)}</p>
          <p className="hero-sub">{pick(lang, profile.heroSubEn, profile.heroSubFr)}</p>
          <div className="hero-cta">
            <a href="#work" className="btn btn-primary">{t.hero.cta} →</a>
            <a href="#contact" className="btn btn-outline">{t.hero.ctaContact}</a>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2.5rem', flexWrap: 'wrap', opacity: 0, animation: 'fadeUp 0.7s 1s ease forwards' }}>
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title={s.label}
                aria-label={s.label}
                style={{ background: s.bg || undefined, color: s.color || undefined, borderColor: s.border || undefined }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={s.iconKey} size={20} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div ref={addRef} className="fade-up">
          <span className="section-label">{lang === 'en' ? 'Who I Am' : 'Qui je suis'}</span>
          <h2 className="section-title">{pick(lang, profile.aboutTitleEn, profile.aboutTitleFr)}</h2>
        </div>
        <div className="about-grid" ref={addRef as React.Ref<HTMLDivElement>}>
          <div className="about-img-wrap">
            <div className="about-img-placeholder">
              <Image src="/me.jpg" fill alt={profile.heroName} style={{ objectFit: 'cover' }} />
            </div>
            <div className="about-badge">📍 {profile.location}</div>
          </div>
          <div className="about-text">
            <p>{pick(lang, profile.aboutP1En, profile.aboutP1Fr)}</p>
            <p>{pick(lang, profile.aboutP2En, profile.aboutP2Fr)}</p>
            <p>{pick(lang, profile.aboutP3En, profile.aboutP3Fr)}</p>
            <div className="about-contacts">
              <div className="about-contact-item">
                <strong>{t.about.phone}</strong>
                <a href={telHref}>{profile.phone}</a>
              </div>
              <div className="about-contact-item">
                <strong>{t.about.email}</strong>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div className="about-contact-item">
                <strong>{t.about.location}</strong>
                <span>{profile.location}</span>
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
            {projects.map((p, i) => (
              <div
                key={p.id}
                ref={addRef}
                className="work-card fade-up"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div className="work-card-img">
                  <Image src={p.image} alt={p.title} fill className="work-card-img-image" />
                  <div className={`status-badge status-${p.status}`}>
                    {p.status === 'done' ? '✓ Done' : '⏳ In Process'}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: p.accent }} />
                </div>
                <div className="work-card-body">
                  <div className="work-card-tags">
                    {p.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <h3>{p.title}</h3>
                  <p>{pick(lang, p.descEn, p.descFr)}</p>
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
          {skills.map((s, i) => (
            <div
              key={s.id}
              ref={addRef}
              className="skill-card fade-up"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="skill-icon"><Icon name={s.iconKey} /></div>
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
              <h3> {profile.contactName}</h3>
              <p>{pick(lang, profile.contactBlurbEn, profile.contactBlurbFr)}</p>
              <div className="social-links">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={s.label}
                    aria-label={s.label}
                    style={{ background: s.bg || undefined, color: s.color || undefined, borderColor: s.border || undefined }}
                  >
                    <Icon name={s.iconKey} size={20} />
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
        <p>© {new Date().getFullYear()} <strong>{profile.heroName}</strong> — Space D. {profile.location}.</p>
      </footer>
    </>
  );
}
