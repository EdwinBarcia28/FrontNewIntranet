import { create } from "zustand";

export const useUIStore = create((set) => ({
  globalLoading: false,
  globalLoadingText: "Procesando... espere por favor",
  setGlobalLoading: (value, text) =>
    set({
      globalLoading: value,
      globalLoadingText: text ?? "Procesando... espere por favor",
    }),
}));
