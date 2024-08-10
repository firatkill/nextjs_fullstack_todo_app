import { create } from "zustand";

const useUserStore = create((set, get) => ({
  currentUser: null,
  userPreferences: null,
  setCurrentUser: (user) => {
    set((state) => ({
      ...state,
      currentUser: user,
    }));
  },
  setUserPreferences: (preferences) => {
    set((state) => ({
      ...state,
      userPreferences: preferences,
    }));
  },
}));

export { useUserStore };
