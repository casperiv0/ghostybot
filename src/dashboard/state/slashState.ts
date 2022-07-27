import type { GuildsSlashCommands } from "@prisma/client";
import create from "zustand";

interface SlashStore {
  items: GuildsSlashCommands[];
  setItems(items: GuildsSlashCommands[]): void;

  message: string | null;
  setMessage(str: string): void;
}

export const useSlashStore = create<SlashStore>()((set) => ({
  items: [],
  setItems: (items: GuildsSlashCommands[]) => set({ items }),

  message: null,
  setMessage: (v: string) => set({ message: v }),
}));
