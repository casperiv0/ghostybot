import { SlashCommand } from "models/Guild.model";
import create from "zustand";

interface SlashStore {
  items: SlashCommand[];
  setItems: (items: SlashCommand[]) => void;

  message: string | null;
  setMessage: (str: string) => void;
}

export const useSlashStore = create<SlashStore>((set) => ({
  items: [],
  setItems: (items: SlashCommand[]) => set({ items }),

  message: null,
  setMessage: (v: string) => set({ message: v }),
}));
