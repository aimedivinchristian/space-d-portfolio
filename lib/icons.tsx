import {
  Github,
  Instagram,
  Facebook,
  Youtube,
  Figma,
  Camera,
  Film,
  Lightbulb,
  Terminal,
  Cpu,
  Code,
} from 'lucide-react';

type SvgProps = { size?: number };

const ReactLogo = ({ size = 40 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" aria-hidden="true">
    <circle cx="64" cy="64" r="14" fill="#61DAFB" />
    <ellipse cx="64" cy="64" rx="50" ry="16" stroke="#61DAFB" strokeWidth="12" />
    <ellipse cx="64" cy="64" rx="50" ry="16" stroke="#61DAFB" strokeWidth="12" transform="rotate(60 64 64)" />
    <ellipse cx="64" cy="64" rx="50" ry="16" stroke="#61DAFB" strokeWidth="12" transform="rotate(120 64 64)" />
  </svg>
);

const TypeScriptLogo = ({ size = 40 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" aria-hidden="true">
    <rect width="128" height="128" rx="28" fill="#3178c6" />
    <text x="64" y="78" textAnchor="middle" fontSize="52" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">TS</text>
  </svg>
);

const ThreeLogo = ({ size = 40 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" aria-hidden="true">
    <polygon points="64 14 110 42 110 86 64 114 18 86 18 42" fill="#1c1c1f" />
    <polygon points="64 32 92 52 92 76 64 96 36 76 36 52" fill="#fff" opacity="0.9" />
    <path d="M64 32v64M36 52l28 16 28-16" stroke="#1c1c1f" strokeWidth="4" strokeLinejoin="round" />
  </svg>
);

const NodeLogo = ({ size = 40 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" aria-hidden="true">
    <polygon points="64 10 114 36 114 90 64 116 14 90 14 36" fill="#43853d" />
    <path d="M52 40h12v48h16l20-28-20-20h-16v-8h-12v8h-8v12h8v28z" fill="#fff" />
  </svg>
);

const TailwindLogo = ({ size = 40 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" aria-hidden="true">
    <rect width="128" height="128" rx="28" fill="#38bdf8" />
    <path d="M30 72c23-18 46-18 69 0-23 18-46 18-69 0zm0 20c23-18 46-18 69 0-23 18-46 18-69 0z" fill="#fff" />
  </svg>
);

const AdobeLogo = ({ size = 40 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" aria-hidden="true">
    <rect width="128" height="128" rx="28" fill="#ff0000" />
    <path d="M36 96 52 32h24l16 56 6-20v40H36z" fill="#fff" />
  </svg>
);

const HTMLLogo = ({ size = 40 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" aria-hidden="true">
    <rect width="128" height="128" rx="28" fill="#E34F26" />
    <path d="M40 38 48 86 64 96 80 86 88 38H40Zm17 20h26l-2 22-12 6-12-6-2-22Z" fill="#fff" />
    <path d="M64 56h18l-1 11-8 4-9-4-1-11Z" fill="#EBEBEB" />
  </svg>
);

const CLogo = ({ size = 40 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" aria-hidden="true">
    <circle cx="64" cy="64" r="54" fill="#00589f" />
    <text x="64" y="82" textAnchor="middle" fontSize="72" fontWeight="800" fill="#fff" fontFamily="Inter, sans-serif">C</text>
  </svg>
);

const LinuxLogo = ({ size = 40 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" aria-hidden="true">
    <rect width="128" height="128" rx="28" fill="#000" />
    <path d="M32 44h64v40H32z" fill="#2d2d2d" />
    <path d="M36 52h56v4H36zm0 10h20v4H36zm0 10h36v4H36z" fill="#fff" />
    <circle cx="96" cy="84" r="2" fill="#fff" />
    <circle cx="96" cy="74" r="2" fill="#fff" />
    <circle cx="96" cy="64" r="2" fill="#fff" />
  </svg>
);

const EmbeddedLogo = ({ size = 40 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" aria-hidden="true">
    <rect width="128" height="128" rx="28" fill="#111827" />
    <rect x="30" y="30" width="68" height="68" rx="12" fill="#4b5563" />
    <path d="M42 42h44v44H42z" fill="#1f2937" />
    <path d="M56 56h16v16H56z" fill="#fbbf24" />
    <path d="M76 56h8v8h-8zM44 76h8v8h-8zM76 76h8v8h-8z" fill="#d1d5db" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.83 11.83 0 0 0 12.04 0C5.41 0 .02 5.39.02 12.02c0 2.12.55 4.19 1.6 6.02L0 24l6.13-1.6a12 12 0 0 0 5.89 1.5h.01c6.63 0 12.02-5.39 12.02-12.02 0-3.21-1.25-6.22-3.53-8.4zM12.03 21.7h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.64.95.97-3.55-.23-.37a9.83 9.83 0 0 1-1.5-5.23c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.12 1.03 6.98 2.89a9.8 9.8 0 0 1 2.89 6.98c0 5.45-4.43 9.88-9.88 9.88z" />
  </svg>
);

const SnapchatIcon = ({ size = 20 }: SvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.24 12.34c-.16.08-.46.19-.68.23-.11.02-.16.09-.14.18.05.21.36.88.39 1.05.03.16-.03.26-.21.29-.33.06-.73.1-1.08.1-.21 0-.31.09-.39.25-.26.52-.67.95-1.19 1.24-.48.26-1.03.4-1.61.4s-1.13-.14-1.61-.4c-.52-.29-.93-.72-1.19-1.24-.08-.16-.18-.25-.39-.25-.35 0-.75-.04-1.08-.1-.18-.03-.24-.13-.21-.29.03-.17.34-.84.39-1.05.02-.09-.03-.16-.14-.18-.22-.04-.52-.15-.68-.23-.25-.12-.37-.31-.37-.51 0-.22.15-.4.42-.49.28-.09.58-.21.81-.4.18-.14.29-.35.29-.6V8.85c0-2.03 1.64-3.67 3.67-3.67h.1c2.03 0 3.67 1.64 3.67 3.67v3.14c0 .25.11.46.29.6.23.19.53.31.81.4.27.09.42.27.42.49 0 .2-.12.39-.37.51z" />
  </svg>
);

// Registry: string key (stored in DB) -> icon component.
export const ICONS: Record<string, (props: SvgProps) => JSX.Element> = {
  react: ReactLogo,
  typescript: TypeScriptLogo,
  three: ThreeLogo,
  node: NodeLogo,
  tailwind: TailwindLogo,
  adobe: AdobeLogo,
  html: HTMLLogo,
  c: CLogo,
  linux: LinuxLogo,
  embedded: EmbeddedLogo,
  terminal: ({ size = 32 }) => <Terminal size={size} />,
  figma: ({ size = 34 }) => <Figma size={size} />,
  'figma-color': ({ size = 34 }) => <Figma size={size} color="#f24e1e" />,
  camera: ({ size = 32 }) => <Camera size={size} />,
  film: ({ size = 32 }) => <Film size={size} />,
  lightbulb: ({ size = 32 }) => <Lightbulb size={size} />,
  cpu: ({ size = 32 }) => <Cpu size={size} />,
  code: ({ size = 32 }) => <Code size={size} />,
  github: ({ size = 20 }) => <Github size={size} />,
  instagram: ({ size = 20 }) => <Instagram size={size} />,
  facebook: ({ size = 20 }) => <Facebook size={size} />,
  youtube: ({ size = 20 }) => <Youtube size={size} />,
  whatsapp: WhatsAppIcon,
  snapchat: SnapchatIcon,
};

export const ICON_KEYS = Object.keys(ICONS);

export function Icon({ name, size }: { name: string; size?: number }) {
  const Comp = ICONS[name] ?? ICONS.code;
  return <Comp size={size} />;
}
