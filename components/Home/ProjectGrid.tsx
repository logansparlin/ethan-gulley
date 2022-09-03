import { urlFor } from "@lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import styled from 'styled-components';

import { Box } from "@components/box";
import Image from 'next/image';

const StyledImage = styled(motion(Box))`
  position: relative;
`

const ProjectGrid = ({ projects, category }) => {
  const filteredProjects = category === 'all'
    ? projects
    : projects.filter(project => project.category === category);

  return (
    <Box pt="70px" pb="100px" display="grid" gridGap="20px" gridTemplateColumns="repeat(6, 1fr)">
      <AnimatePresence exitBeforeEnter={true}>
        {filteredProjects.map((project, index) => {
          const url = urlFor(project.image.src).url();
          return (
            <StyledImage
              key={`${project._id}-${category}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: 0, opacity: 1, transition: {
                  duration: 1.4,
                  ease: 'circOut',
                  delay: index * 0.015
                }
              }}
              exit={{
                y: 0, opacity: 0, transition: {
                  duration: 0.4,
                  ease: 'easeInOut'
                }
              }}
              willChange="auto"
            >
              <Box
                position="relative"
                width="100%"
                height="0"
                pb="120%"
              >
                <Image src={url} layout="fill" objectFit="cover" alt={project.image.alt} />
              </Box>
            </StyledImage>
          )
        })}
      </AnimatePresence>
    </Box>
  )
}

export default ProjectGrid;