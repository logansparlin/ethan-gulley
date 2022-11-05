import create from 'zustand';

interface ProjectState {
  activeProject: any;
  setActiveProject: (project: any) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  activeProject: null,
  setActiveProject: (project) => {
    set({ activeProject: project });
  }
}));
