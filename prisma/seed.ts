import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { DEFAULT_PROFILE } from '../lib/data';

const prisma = new PrismaClient();

const PROJECTS = [
  {
    title: 'BEREHYCO',
    descEn:
      "Bureau d'Etude et Réalisation d'Electricité, Hydraulique et Construction. Construction, electrical works or water supply linker",
    descFr:
      "Bureau d'Etude et Réalisation d'Electricité, Hydraulique et Construction. Liaison pour la construction, les travaux électriques ou l'approvisionnement en eau",
    tags: ['HTML', 'CSS', 'Js', 'CMS'],
    status: 'in-process',
    image: '/rehyco.png',
    accent: '#f0ec2e',
    liveUrl: 'https://berehyco.vercel.app',
    sortOrder: 0,
  },
  {
    title: 'Moto Lens',
    descEn:
      'A visual journal blending motorcycle culture with street photography — cinematic edits, location stories, and raw journeys across Rwanda.',
    descFr:
      'Un journal visuel mêlant culture moto et photographie de rue — montages cinématiques, histoires de lieux et voyages bruts à travers le Rwanda.',
    tags: ['Photography', 'Design', 'Editorial'],
    status: 'in-process',
    image: '/motolens.png',
    accent: '#f32362',
    liveUrl: '#',
    sortOrder: 1,
  },
  {
    title: 'D > shell',
    descEn:
      'An interactive learning platform teaching essential Linux commands and shell scripting. Navigate the command',
    descFr:
      "Une plateforme d'apprentissage interactive enseignant les commandes Linux essentielles et le scripting shell.",
    tags: ['Linux', 'Shell', 'Education', 'Tutorial'],
    status: 'in-process',
    image: '/dshell.png',
    accent: '#10b981',
    liveUrl: '#',
    sortOrder: 2,
  },
  {
    title: 'SpaceD Portfolio',
    descEn:
      'This very portfolio — built with Next.js, Three.js, and a custom design system. Dark/light themes, bilingual (EN/FR), email contact.',
    descFr:
      'Ce portfolio même — construit avec Next.js, Three.js et un système de design personnalisé. Thèmes clair/sombre, bilingue (EN/FR), contact par email.',
    tags: ['Next.js', 'Three.js', 'TypeScript'],
    status: 'done',
    image: '/spaced.png',
    accent: '#4aa8cc',
    liveUrl: 'https://aimedivinchristian.vercel.app/',
    sortOrder: 3,
  },
];

const SKILLS = [
  { name: 'Next.js / React', level: 'Advanced', iconKey: 'react' },
  { name: 'TypeScript', level: 'Advanced', iconKey: 'typescript' },
  { name: 'HTML / CSS', level: 'Advanced', iconKey: 'html' },
  { name: 'C / Embedded C', level: 'Advanced', iconKey: 'c' },
  { name: 'Three.js / WebGL', level: 'Intermediate', iconKey: 'three' },
  { name: 'Linux / Shell', level: 'Advanced', iconKey: 'terminal' },
  { name: 'Embedded Systems', level: 'Advanced', iconKey: 'embedded' },
  { name: 'UI/UX Design', level: 'Intermediate', iconKey: 'figma-color' },
  { name: 'Graphic Design', level: 'Advanced', iconKey: 'adobe' },
  { name: 'Photography', level: 'Intermediate', iconKey: 'camera' },
  { name: 'Adobe Creative Suite', level: 'Intermediate', iconKey: 'adobe' },
  { name: 'Figma', level: 'Intermediate', iconKey: 'figma' },
  { name: 'Node.js', level: 'Intermediate', iconKey: 'node' },
  { name: 'Tailwind CSS', level: 'Advanced', iconKey: 'tailwind' },
  { name: 'Video Editing', level: 'Intermediate', iconKey: 'film' },
  { name: 'Brand Strategy', level: 'Intermediate', iconKey: 'lightbulb' },
].map((s, i) => ({ ...s, sortOrder: i }));

const SOCIALS = [
  { label: 'GitHub', iconKey: 'github', href: 'https://github.com/aimedivinchristian', color: '#0f1720', bg: 'transparent', border: 'var(--border)' },
  { label: 'Instagram', iconKey: 'instagram', href: 'https://instagram.com/aimedivinchristian', color: '#fff', bg: 'linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', border: 'transparent' },
  { label: 'Facebook', iconKey: 'facebook', href: 'https://facebook.com/naime.divinchristian', color: '#fff', bg: '#1877F2', border: 'transparent' },
  { label: 'WhatsApp', iconKey: 'whatsapp', href: 'https://wa.me/250796977458', color: '#fff', bg: '#25D366', border: 'transparent' },
  { label: 'YouTube', iconKey: 'youtube', href: 'https://youtube.com/@aimedivinchristian', color: '#fff', bg: '#FF0000', border: 'transparent' },
  { label: 'Snapchat', iconKey: 'snapchat', href: 'https://snapchat.com/add/aimedivinchri', color: '#fff', bg: '#FFFC00', border: 'transparent' },
].map((s, i) => ({ ...s, sortOrder: i }));

async function main() {
  // ── Admin user ──
  const email = process.env.ADMIN_EMAIL || 'aimedivinchristian@gmail.com';
  const password = process.env.ADMIN_PASSWORD || 'localhost1511';
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`✓ Admin user ready: ${email}`);

  // ── Profile (singleton) ──
  const { id, updatedAt, ...profileData } = DEFAULT_PROFILE;
  await prisma.profile.upsert({
    where: { id: 'main' },
    update: profileData,
    create: { id: 'main', ...profileData },
  });
  console.log('✓ Profile seeded');

  // ── Projects / Skills / Socials (replace all) ──
  await prisma.project.deleteMany();
  await prisma.project.createMany({ data: PROJECTS });
  console.log(`✓ ${PROJECTS.length} projects seeded`);

  await prisma.skill.deleteMany();
  await prisma.skill.createMany({ data: SKILLS });
  console.log(`✓ ${SKILLS.length} skills seeded`);

  await prisma.social.deleteMany();
  await prisma.social.createMany({ data: SOCIALS });
  console.log(`✓ ${SOCIALS.length} socials seeded`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
