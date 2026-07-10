'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');
}

function revalidateSite() {
  revalidatePath('/');
  revalidatePath('/admin', 'layout');
}

const str = (v: FormDataEntryValue | null) => (v ?? '').toString().trim();
const num = (v: FormDataEntryValue | null) => Number(v ?? 0) || 0;
const tags = (v: FormDataEntryValue | null) =>
  str(v)
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

// ── Profile ──
export async function updateProfile(formData: FormData) {
  await requireAuth();
  const data = {
    heroName: str(formData.get('heroName')),
    heroTaglineEn: str(formData.get('heroTaglineEn')),
    heroTaglineFr: str(formData.get('heroTaglineFr')),
    heroSubEn: str(formData.get('heroSubEn')),
    heroSubFr: str(formData.get('heroSubFr')),
    aboutTitleEn: str(formData.get('aboutTitleEn')),
    aboutTitleFr: str(formData.get('aboutTitleFr')),
    aboutP1En: str(formData.get('aboutP1En')),
    aboutP1Fr: str(formData.get('aboutP1Fr')),
    aboutP2En: str(formData.get('aboutP2En')),
    aboutP2Fr: str(formData.get('aboutP2Fr')),
    aboutP3En: str(formData.get('aboutP3En')),
    aboutP3Fr: str(formData.get('aboutP3Fr')),
    phone: str(formData.get('phone')),
    email: str(formData.get('email')),
    location: str(formData.get('location')),
    contactName: str(formData.get('contactName')),
    contactBlurbEn: str(formData.get('contactBlurbEn')),
    contactBlurbFr: str(formData.get('contactBlurbFr')),
  };
  await prisma.profile.upsert({
    where: { id: 'main' },
    update: data,
    create: { id: 'main', ...data },
  });
  revalidateSite();
}

// ── Projects ──
function projectData(formData: FormData) {
  return {
    title: str(formData.get('title')),
    descEn: str(formData.get('descEn')),
    descFr: str(formData.get('descFr')),
    tags: tags(formData.get('tags')),
    status: str(formData.get('status')) || 'in-process',
    image: str(formData.get('image')),
    accent: str(formData.get('accent')) || '#4aa8cc',
    liveUrl: str(formData.get('liveUrl')) || null,
    sortOrder: num(formData.get('sortOrder')),
  };
}

export async function createProject(formData: FormData) {
  await requireAuth();
  await prisma.project.create({ data: projectData(formData) });
  revalidateSite();
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();
  await prisma.project.update({ where: { id }, data: projectData(formData) });
  revalidateSite();
}

export async function deleteProject(id: string) {
  await requireAuth();
  await prisma.project.delete({ where: { id } });
  revalidateSite();
}

// ── Skills ──
function skillData(formData: FormData) {
  return {
    name: str(formData.get('name')),
    level: str(formData.get('level')) || 'Intermediate',
    iconKey: str(formData.get('iconKey')) || 'code',
    sortOrder: num(formData.get('sortOrder')),
  };
}

export async function createSkill(formData: FormData) {
  await requireAuth();
  await prisma.skill.create({ data: skillData(formData) });
  revalidateSite();
}

export async function updateSkill(id: string, formData: FormData) {
  await requireAuth();
  await prisma.skill.update({ where: { id }, data: skillData(formData) });
  revalidateSite();
}

export async function deleteSkill(id: string) {
  await requireAuth();
  await prisma.skill.delete({ where: { id } });
  revalidateSite();
}

// ── Socials ──
function socialData(formData: FormData) {
  return {
    label: str(formData.get('label')),
    iconKey: str(formData.get('iconKey')) || 'github',
    href: str(formData.get('href')),
    color: str(formData.get('color')) || '#fff',
    bg: str(formData.get('bg')) || 'transparent',
    border: str(formData.get('border')) || 'transparent',
    sortOrder: num(formData.get('sortOrder')),
  };
}

export async function createSocial(formData: FormData) {
  await requireAuth();
  await prisma.social.create({ data: socialData(formData) });
  revalidateSite();
}

export async function updateSocial(id: string, formData: FormData) {
  await requireAuth();
  await prisma.social.update({ where: { id }, data: socialData(formData) });
  revalidateSite();
}

export async function deleteSocial(id: string) {
  await requireAuth();
  await prisma.social.delete({ where: { id } });
  revalidateSite();
}
