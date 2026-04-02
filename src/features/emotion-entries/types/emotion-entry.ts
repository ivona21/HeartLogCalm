export type EmotionEntryEmotion = {
  emotionKey: string;
  isPrimary: boolean;
};

export type EmotionEntry = {
  entryId: string;
  comment: string;
  occurredAt: string;
  selectedEmotions: EmotionEntryEmotion[];
};
