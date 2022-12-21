export const useNextPreviousProjects = ({ id, projects }) => {
  if (!id || !projects) return null;

  const currentIndex = projects.findIndex(project => project._id === id);
  const lastIndex = projects.length - 1;

  const nextProject = currentIndex === lastIndex ? projects[0] : projects[currentIndex + 1]
  const previousProject = currentIndex === 0 ? projects[lastIndex] : projects[currentIndex - 1]

  return {
    nextProject,
    previousProject
  };
}