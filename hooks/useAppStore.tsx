import create from 'zustand';

interface AppState {
  informationOpen: boolean;
  setInformationOpen: (open: boolean) => void;
  transitioning: boolean;
  setTransitioning: (transitioning: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  informationOpen: false,
  setInformationOpen: (open) => {
    set({ informationOpen: open });
  },
  transitioning: false,
  setTransitioning: (transitioning) => {
    set({ transitioning: transitioning })
  }
}));
