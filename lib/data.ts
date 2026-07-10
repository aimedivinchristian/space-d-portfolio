import { prisma } from './prisma';
import type { Profile, Project, Skill, Social } from '@prisma/client';

export type { Profile, Project, Skill, Social };

// Sensible fallback so the homepage still renders if the DB is empty / unreachable.
export const DEFAULT_PROFILE: Profile = {
  id: 'main',
  heroName: 'Aime Divin Christian',
  heroTaglineEn: 'Creative Developer & Designer',
  heroTaglineFr: 'Développeur Créatif & Designer',
  heroSubEn: 'Based in Kigali, Rwanda — crafting digital experiences that live between art and code.',
  heroSubFr: "Basé à Kigali, Rwanda — je crée des expériences numériques à la croisée de l'art et du code.",
  aboutTitleEn: 'About Me',
  aboutTitleFr: 'À Propos',
  aboutP1En:
    "I'm a creative developer and designer passionate about photography, graphic design, and motorcycle culture. I blend visual aesthetics with personal expression to build memorable digital experiences.",
  aboutP1Fr:
    'Je suis un développeur créatif et designer passionné par la photographie, le design graphique et la culture moto. Je mêle esthétique visuelle et expression personnelle pour créer des expériences numériques mémorables.',
  aboutP2En:
    'Based in Kigali, Rwanda, I bring a unique African perspective to every project — where storytelling meets modern technology.',
  aboutP2Fr:
    "Basé à Kigali, Rwanda, j'apporte une perspective africaine unique à chaque projet — où le storytelling rencontre la technologie moderne.",
  aboutP3En: "When I'm not coding, I'm behind a lens or on two wheels, chasing the perfect frame.",
  aboutP3Fr: 'Quand je ne code pas, je suis derrière un objectif ou sur deux roues, à la recherche du cadre parfait.',
  phone: '+250 796 977 458',
  email: 'aimedivinchristian@gmail.com',
  location: 'Kigali, Rwanda',
  contactName: 'NDANYUZWE Aime Divin Christian',
  contactBlurbEn:
    'Open to freelance projects, collaborations, and creative commissions. Based in Kigali — working globally.',
  contactBlurbFr:
    "Disponible pour des projets freelance, collaborations et commissions créatives. Basé à Kigali — travaillant à l'échelle mondiale.",
  updatedAt: new Date(),
};

export async function getProfile(): Promise<Profile> {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: 'main' } });
    return profile ?? DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    return await prisma.project.findMany({ orderBy: { sortOrder: 'asc' } });
  } catch {
    return [];
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    return await prisma.skill.findMany({ orderBy: { sortOrder: 'asc' } });
  } catch {
    return [];
  }
}

export async function getSocials(): Promise<Social[]> {
  try {
    return await prisma.social.findMany({ orderBy: { sortOrder: 'asc' } });
  } catch {
    return [];
  }
}
