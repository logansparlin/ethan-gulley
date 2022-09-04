import create from 'zustand';

type View = 'loading' | 'default' | 'grid' | 'list';

interface HomeState {
  view: View;
  setView: (view: View) => void;
  loaded: boolean;
  setLoaded: (val: boolean) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  view: 'loading',
  setView: (view) => {
    set({ view: view });
  },
  loaded: false,
  setLoaded: (val) => {
    set({ loaded: val })
  }
}));
