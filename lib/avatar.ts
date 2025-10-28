const AVATAR_STYLES = [
  'bottts',
  'identicon',
  'initials',
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
const SESSION_AVATAR_KEY = 'session_user_avatar';

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

export const generateCachedRandomAvatar = (): string => {
  const cachedAvatar = sessionStorage.getItem(SESSION_AVATAR_KEY);
  if (cachedAvatar) {
    return cachedAvatar;
  }

  const randomSeed = generateRandomSeed() + generateRandomSeed();
  const avatar = generateRandomAvatar(randomSeed);
  sessionStorage.setItem(SESSION_AVATAR_KEY, avatar);

  return avatar;
};

export const getMessagingHeaderAvatar = (): string => {
  return generateCachedRandomAvatar();
};
