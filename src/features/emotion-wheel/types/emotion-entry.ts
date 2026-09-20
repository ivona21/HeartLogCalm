export type SelectedEmotionEntryEmotion = {
  emotionKey: string;
  isPrimary: boolean;
};

export type EmotionEntry = {
  id: string;
  comment: string | null;
  occurredAt: string;
  createdAt: string | null;
  selectedEmotions: SelectedEmotionEntryEmotion[];
};
