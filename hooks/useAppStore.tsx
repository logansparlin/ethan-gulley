import create from 'zustand';

type TRANSITION_TYPES = 'page' | 'view' | 'list';

interface AppState {
  informationOpen: boolean;
  setInformationOpen: (open: boolean) => void;
  transitioning: boolean;
  setTransitioning: (transitioning: boolean) => void;
  transitionType: TRANSITION_TYPES;
  setTransitionType: (val: TRANSITION_TYPES) => void;
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
