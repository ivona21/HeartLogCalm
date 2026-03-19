export type BackendTertiaryEmotion = {
  id: string;
  label: string;
};

export type BackendSecondaryEmotion = {
  id: string;
  label: string;
  children: BackendTertiaryEmotion[];
};

export type BackendCoreEmotion = {
  id: string;
  label: string;
  color: string;
  children: BackendSecondaryEmotion[];
};
