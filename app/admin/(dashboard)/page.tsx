import Link from 'next/link';
import { getProjects, getSkills, getSocials } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [projects, skills, socials] = await Promise.all([getProjects(), getSkills(), getSocials()]);

  const stats = [
    { num: projects.length, lbl: 'Projects', href: '/admin/projects' },
    { num: skills.length, lbl: 'Skills', href: '/admin/skills' },
    { num: socials.length, lbl: 'Social Links', href: '/admin/socials' },
  ];

  return (
    <>
      <h1 className="admin-h1">Dashboard</h1>
      <p className="admin-sub">Manage everything that appears on your portfolio.</p>

      <div className="admin-stats">
        {stats.map((s) => (
          <Link key={s.lbl} href={s.href} className="admin-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="num">{s.num}</div>
            <div className="lbl">{s.lbl}</div>
          </Link>
        ))}
      </div>

      <div className="admin-card">
        <h3>Quick links</h3>
        <div className="admin-actions">
          <Link className="admin-btn" href="/admin/profile">Edit Profile &amp; About</Link>
          <Link className="admin-btn secondary" href="/admin/projects">Manage Projects</Link>
          <Link className="admin-btn secondary" href="/admin/skills">Manage Skills</Link>
          <Link className="admin-btn secondary" href="/admin/socials">Manage Socials</Link>
          <Link className="admin-btn secondary" href="/" target="_blank">View Live Site ↗</Link>
        </div>
      </div>
    </>
  );
}
