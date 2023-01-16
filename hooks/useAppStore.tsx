import create from 'zustand';

type TRANSITION_TYPES = 'page' | 'view' | 'list' | 'project';

interface AppState {
  informationOpen: boolean;
  setInformationOpen: (open: boolean) => void;
  transitioning: boolean;
  setTransitioning: (transitioning: boolean) => void;
  transitionType: TRANSITION_TYPES;
  setTransitionType: (val: TRANSITION_TYPES) => void;
  projectIndex: number;
  setProjectIndex: (val: number) => void;
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
  },
  projectIndex: 0,
  setProjectIndex: (val) => {
    set({ projectIndex: val })
  }
}));
