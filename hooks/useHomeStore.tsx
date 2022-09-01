import create from 'zustand';

type View = 'default' | 'grid' | 'list';

interface HomeState {
  view: View;
  setView: (view: View) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  view: 'default',
  setView: (view) => {
    set({ view: view });
  },
}));
