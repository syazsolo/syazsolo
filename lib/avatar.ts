const AVATAR_STYLES = [
  'bottts',
  'identicon',
  'micah',
  'miniavs',
  'open-peeps',
  'personas',
  'pixel-art',
  'shapes',
] as const;

type AvatarStyle = (typeof AVATAR_STYLES)[number];

const getDicebearBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_DICEBEAR_API_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_DICEBEAR_API_URL must be set');
  }
  return url;
};

const DICEBEAR_BASE_URL = getDicebearBaseUrl();

const generateRandomSeed = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

const buildAvatarUrl = (style: AvatarStyle, seed: string): string => {
  return `${DICEBEAR_BASE_URL}/${style}/svg?seed=${encodeURIComponent(seed)}`;
};

const selectRandomStyle = (): AvatarStyle => {
  return AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)];
};

export const generateRandomAvatar = (
  seed?: string,
  style?: AvatarStyle
): string => {
  const avatarSeed = seed || generateRandomSeed();
  const avatarStyle = style || selectRandomStyle();
  return buildAvatarUrl(avatarStyle, avatarSeed);
};

let cachedSharedAvatarUrl: string | null = null;

export const getSharedAvatarUrl = (): string => {
  if (cachedSharedAvatarUrl) return cachedSharedAvatarUrl;

  let seed: string | null = null;
  if (typeof window !== 'undefined') {
    seed = window.localStorage.getItem('shared_avatar_seed');
    if (!seed) {
      seed = generateRandomSeed();
      try {
        window.localStorage.setItem('shared_avatar_seed', seed);
      } catch {}
    }
  }

  cachedSharedAvatarUrl = generateRandomAvatar(seed || undefined);
  return cachedSharedAvatarUrl;
};
