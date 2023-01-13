import { useEffect, useState } from "react"
import { Box } from "@components/box"

const ProjectList = ({ projects }) => {
  const [years, setYears] = useState([]);

  useEffect(() => {
    const set = new Set();
    projects.forEach(project => {
      set.add(project.year)
    })

    setYears([...set].sort().reverse());
  }, [projects]);

  return (
    <Box pt="100px" className="list-view" px="20px">
      <Box width="100%">
        {years.map(year => {
          return (
            <Box key={year} width="100%" display="flex" flexDirection="column" alignItems="flex-end">
              <Box key={year} width="100%" position="relative">
                <Box width="100%" height="1px" bg="black" mb="3px" />
                <Box position="absolute" left="0" top="100%">{year}</Box>
              </Box>
              {projects.map((project, index) => {
                if (project.year !== year) return null;
                console.log(project)
                return (
                  <Box
                    key={project._id}
                    width="100%"
                    display="flex"
                    justifyContent="flex-end"
                    className="list-view-item"
                  >
                    <Box
                      width="50%"
                      key={project._id}
                      display="flex"
                      justifyContent="space-between"
                      fontSize="15px"
                      lineHeight="20px"
                    >
                      <Box>{project.title}</Box>
                      <Box>{project.images?.length.toString().padStart(2, '0') || '00'}</Box>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default ProjectList;
