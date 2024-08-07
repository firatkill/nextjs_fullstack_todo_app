import { create } from "zustand";

const useUserStore = create((set, get) => ({
  currentUser: null,
  setCurrentUser: (user) => {
    set((state) => ({
      ...state,
      currentUser: user,
    }));
  },
}));

export { useUserStore };
