export type SecondaryEmotion = {
  id: string;
  label: string;
};

export type CoreEmotion = {
  id: string;
  label: string;
  color: string;
  startAngle: number; // degrees
  endAngle: number; // degrees
  secondary?: SecondaryEmotion[];
};
