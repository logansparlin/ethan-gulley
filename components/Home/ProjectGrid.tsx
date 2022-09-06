import { urlFor } from "@lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import styled from 'styled-components';

import { Box } from "@components/box";
import Image from 'next/image';
import { Plock, Breakpoint } from "react-plock";
import { getImageDimensions } from "@sanity/asset-utils";

const StyledImage = styled(motion(Box))`
  position: relative;
`;

const breakpoints: Breakpoint[] = [
  { size: 640, columns: 1 },
  { size: 1024, columns: 3 },
  { size: 1200, columns: 6 },
];


const ProjectGrid = ({ projects, category }) => {
  const filteredProjects = category === 'all'
    ? projects
    : projects.filter(project => project.category === category);

  return (
    <Box pt="70px" pb="100px">
      <AnimatePresence exitBeforeEnter={true}>
        <Plock breakpoints={breakpoints} gap="20px">
          {filteredProjects.map((project, index) => {
            const url = urlFor(project.image.src).url();
            const dimensions = getImageDimensions(project.image.src);
            return (
              <StyledImage
                key={`${project._id}-${category}`}
                initial={{ y: -20, opacity: 0 }}
                animate={{
                  y: 0, opacity: 1, transition: {
                    duration: 1.8,
                    ease: 'circOut',
                    delay: index * 0.03
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
                  pb={`${(dimensions.height / dimensions.width) * 100}%`}
                >
                  <Image src={url} layout="fill" objectFit="cover" alt={project.image.alt} />
                </Box>
              </StyledImage>
            )
          })}
        </Plock>
      </AnimatePresence>
    </Box>
  )
}

export default ProjectGrid;