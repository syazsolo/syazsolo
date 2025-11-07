const BOT_RESPONSE_DELAY_BASE = 600;
const BOT_RESPONSE_DELAY_PER_CHAR = 20;
const BOT_RESPONSE_DELAY_MAX = 3000;

export const calculateTypingDelay = (text: string): number => {
  const charCount = text.length;
  const delay =
    BOT_RESPONSE_DELAY_BASE + charCount * BOT_RESPONSE_DELAY_PER_CHAR;
  return Math.min(delay, BOT_RESPONSE_DELAY_MAX);
};
