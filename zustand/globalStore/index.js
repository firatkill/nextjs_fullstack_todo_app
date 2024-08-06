import { create } from "zustand";

const useGlobalStore = create((set, get) => ({
  currentTodoCategory: null,
  loading: false,
  sidebarOptions: { mobileOpen: false, isClosing: false },
  activeModal: null,

  handleLoading: (isLoading) => {
    set((state) => ({
      ...state,
      loading: isLoading,
    }));
  },
  handleActiveModal: (modalName) => {
    set((state) => ({
      ...state,
      activeModal: modalName,
    }));
  },
  changeCurrentCategory: (category) => {
    set((state) => ({
      ...state,
      currentTodoCategory: category,
    }));
  },
  handleDrawerClose: () => {
    set((state) => ({
      ...state,
      sidebarOptions: { mobileOpen: false, isClosing: true },
    }));
  },
  handleDrawerTransitionEnd: () =>
    set((state) => ({
      ...state,
      sidebarOptions: { ...state.sidebarOptions, isClosing: false },
    })),
  handleDrawerToggle: () => {
    if (!get().sidebarOptions.isClosing) {
      set((state) => ({
        ...state,
        sidebarOptions: {
          ...state.sidebarOptions,
          mobileOpen: true,
        },
      }));
    }
  },
}));

export { useGlobalStore };

// usage in comps :
// function BearCounter() {
//   const bears = useBearStore((state) => state.bears);
//   return <h1>{bears} around here ...</h1>;
// }

// function Controls() {
//   const increasePopulation = useBearStore((state) => state.increasePopulation);
//   return <button onClick={increasePopulation}>one up</button>;
// }
