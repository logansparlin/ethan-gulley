import create from 'zustand';

interface ProjectState {
  activeProject: any;
  setActiveProject: (project: any) => void;
  scale: number;
  setScale: (scale: number) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  activeProject: null,
  setActiveProject: (project) => {
    set({ activeProject: project });
  },
  scale: null,
  setScale: (scale) => {
    set({ scale })
  }
}));
