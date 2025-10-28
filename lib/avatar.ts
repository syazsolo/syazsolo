/**
 * Avatar utility functions using DiceBear API
 * Generates random, fun, gender-neutral avatars
 */

// DiceBear avatar styles that are gender-neutral and fun
const AVATAR_STYLES = [
  'bottts', // Robot-style avatars
  'identicon', // Geometric patterns
  'initials', // Initials-based avatars
  'micah', // Cute, colorful avatars
  'miniavs', // Minimalist avatars
  'open-peeps', // Hand-drawn style
  'personas', // Diverse, inclusive avatars
  'pixel-art', // Pixel-style avatars
  'shapes', // Geometric shapes
] as const;

type AvatarStyle = (typeof AVATAR_STYLES)[number];

/**
 * Generate a random DiceBear avatar URL with session caching
 * @param seed - Optional seed for consistent avatar generation
 * @param style - Optional specific style to use
 * @returns DiceBear avatar URL
 */
export const generateRandomAvatar = (
  seed?: string,
  style?: AvatarStyle
): string => {
  // Use provided seed or generate random one
  const avatarSeed = seed || Math.random().toString(36).substring(2, 15);

  // Use provided style or pick random one
  const avatarStyle =
    style || AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)];

  // Generate DiceBear URL
  const baseUrl = 'https://api.dicebear.com/7.x';
  const url = `${baseUrl}/${avatarStyle}/svg?seed=${encodeURIComponent(avatarSeed)}`;

  return url;
};

/**
 * Generate a random avatar with session caching
 * @returns Cached random DiceBear avatar URL
 */
export const generateCachedRandomAvatar = (): string => {
  const cacheKey = 'avatar_user';

  // Check if avatar is already cached in sessionStorage
  const cachedAvatar = sessionStorage.getItem(cacheKey);
  if (cachedAvatar) {
    return cachedAvatar;
  }

  // Generate new random avatar with random seed
  const randomSeed =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const avatar = generateRandomAvatar(randomSeed);

  // Cache it in sessionStorage
  sessionStorage.setItem(cacheKey, avatar);

  return avatar;
};

/**
 * Generate a consistent avatar for a specific user/conversation
 * @param userId - User ID to use as seed
 * @param style - Optional specific style to use
 * @returns Consistent DiceBear avatar URL
 */
export const generateUserAvatar = (
  userId: string,
  style?: AvatarStyle
): string => {
  return generateRandomAvatar(userId, style);
};

/**
 * Generate a fun, random avatar for unknown users
 * @returns Random DiceBear avatar URL
 */
export const generateUnknownUserAvatar = (): string => {
  return generateRandomAvatar();
};

/**
 * Get avatar for specific conversation types
 */
export const getConversationAvatar = (conversationId: string): string => {
  return generateUserAvatar(conversationId, 'personas');
};

/**
 * Get avatar for messaging header (represents the user)
 */
export const getMessagingHeaderAvatar = (): string => {
  return generateCachedRandomAvatar();
};
