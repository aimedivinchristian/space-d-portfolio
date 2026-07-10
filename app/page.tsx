import HomeClient from '@/components/HomeClient';
import { getProfile, getProjects, getSkills, getSocials } from '@/lib/data';

// Content is stored in the DB and edited via /admin, so always render fresh.
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [profile, projects, skills, socials] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getSocials(),
  ]);

  return <HomeClient profile={profile} projects={projects} skills={skills} socials={socials} />;
}
