import { Box } from "@components/box"

const ProjectList = ({ projects }) => {
  return (
    <Box pt="100px">
      <Box width="100%" display="flex" flexDirection="column" alignItems="flex-end">
        <Box width="100%" position="relative">
          <Box width="100%" height="1px" bg="black" mb="3px" />
          <Box position="absolute" left="0" top="100%">2022</Box>
        </Box>
        {projects.map(project => {
          return (
            <Box width="50%" key={project._id} display="flex" justifyContent="space-between" borderBottom="1px solid black" fontSize="15px" lineHeight="20px">
              <Box>{project.title}</Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default ProjectList;
