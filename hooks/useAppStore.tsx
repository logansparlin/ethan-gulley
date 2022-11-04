import create from 'zustand';

interface AppState {
  informationOpen: boolean;
  setInformationOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  informationOpen: false,
  setInformationOpen: (open) => {
    set({ informationOpen: open });
  }
}));
