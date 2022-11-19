import create from 'zustand';

interface AppState {
  informationOpen: boolean;
  setInformationOpen: (open: boolean) => void;
  transitioning: boolean;
  setTransitioning: (transitioning: boolean) => void;
  transitionType: 'page' | 'view';
  setTransitionType: (val: 'page' | 'view') => void;
}

export const useAppStore = create<AppState>((set) => ({
  informationOpen: false,
  setInformationOpen: (open) => {
    set({ informationOpen: open });
  },
  transitioning: false,
  setTransitioning: (transitioning) => {
    set({ transitioning: transitioning })
  },
  transitionType: 'page',
  setTransitionType: (type) => {
    set({ transitionType: type })
  }
}));
