import { create } from 'zustand';

type ColorStore = {
  color: string;
  setColor: (color: string) => void;
};

export const useColorStore = create<ColorStore>((set) => ({
  color: '#000000', // Default color
  setColor: (color) => set({ color }),
}));
