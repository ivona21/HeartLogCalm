export type TertiaryEmotion = {
  key: string;
};

export type SecondaryEmotion = {
  key: string;
  tertiary: TertiaryEmotion[];
};

export type CoreEmotion = {
  key: string;
  color: string;
  startAngle: number;
  endAngle: number;
  secondary: SecondaryEmotion[];
};
