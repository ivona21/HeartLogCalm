/**
 * Emotion hierarchy depth levels based on id parts (separated by dots)
 */
export const EMOTION_DEPTH = {
  CORE: 1,
  SECONDARY: 2,
  TERTIARY: 3,
} as const;

/**
 * Maximum number of emotions that can be selected simultaneously
 */
export const MAX_SELECTED_EMOTIONS = 10;
