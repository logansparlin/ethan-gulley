import create from 'zustand';

type View = 'default' | 'grid' | 'list';

interface HomeState {
  view: View;
  setView: (view: View) => void;
  loaded: boolean;
  setLoaded: (val: boolean) => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  lastFocusedIndex: number;
  setLastFocusedIndex: (val: number) => void;
  lastScrollPosition: number;
  setLastScrollPosition: (pos: number) => void;
  firstIndex: number;
  setFirstIndex: (index: number) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  view: 'default',
  setView: (view) => {
    set({ view: view });
  },
  loaded: false,
  setLoaded: (val) => {
    set({ loaded: val })
  },
  focusedIndex: 0,
  setFocusedIndex: (index) => {
    set({ focusedIndex: index })
  },
  lastFocusedIndex: 0,
  setLastFocusedIndex: (index) => {
    set({ lastFocusedIndex: index })
  },
  lastScrollPosition: 0,
  setLastScrollPosition: (pos) => {
    set({ lastScrollPosition: pos })
  },
  firstIndex: 0,
  setFirstIndex: (index) => {
    set({ firstIndex: index })
  }
}));
