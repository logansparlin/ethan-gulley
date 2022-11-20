import { useState, useRef } from "react";
import { urlFor } from "@lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import styled from 'styled-components';

import { Box } from "@components/box";
import Image from 'next/image';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { getImageDimensions } from "@sanity/asset-utils";

const StyledImage = styled(motion(Box))`
  position: relative;
  will-change: auto;
`;

// const breakpoints: Breakpoint[] = [
//   { size: 640, columns: 1 },
//   { size: 1024, columns: 3 },
//   { size: 1200, columns: 6 },
// ];

const breakpoints = {
  640: 1,
  1024: 3,
  1200: 6
}


const ProjectGrid = ({ projects, category }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const selectedProjectPosition = useRef(null);
  const filteredProjects = category === 'all'
    ? projects
    : projects.filter(project => project.category === category);
  const router = useRouter();

  const handleClick = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProject(project._id === selectedProject?._id ? null : project)
    const pos = e.target.getBoundingClientRect()
    const scale = window.innerHeight / pos.height;
    selectedProjectPosition.current = {
      x: ((-1 * pos.x) + window.innerWidth / 2 - pos.width / 2),
      y: ((-1 * pos.y) + window.innerHeight / 2 - pos.height / 2),
      scale: scale
    };

    setTimeout(() => {
      router.push(`/projects/${project.slug.current}`)
    }, 800)
  }

  return (
    <Box pt="70px" pb="100px">
      <AnimatePresence exitBeforeEnter={true} initial={false}>
        <Box key={category}>
          <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
            <Masonry gutter="20px">
              {filteredProjects.map((project, index) => {
                const url = urlFor(project.image.src).url();
                const dimensions = getImageDimensions(project.image.src);
                const isSelected = selectedProject?._id === project._id;
                return (
                  <StyledImage
                    key={project._id}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{
                      y: isSelected ? selectedProjectPosition.current.y : 0,
                      x: isSelected ? selectedProjectPosition.current.x : 0,
                      opacity: selectedProject && !isSelected ? 0 : 1,
                      scale: selectedProject && isSelected ? selectedProjectPosition.current.scale : selectedProject && !isSelected ? 0 : 1,
                      transition: {
                        duration: isSelected ? 0.6 : selectedProject ? 0.8 : 0.6,
                        ease: isSelected ? [.9, 0, .1, 0.9] : 'circOut',
                        delay: isSelected ? 0.8 : selectedProject ? 0 : index * 0.03
                      }
                    }}
                    exit={{
                      y: 0,
                      opacity: isSelected ? 1 : 0,
                      transition: {
                        duration: 0.4,
                        ease: 'easeInOut'
                      }
                    }}
                  >
                    <Box
                      position="relative"
                      width="100%"
                      height="0"
                      pb={`${(dimensions.height / dimensions.width) * 100}%`}
                    >
                      <Box as="button" onClick={(e) => handleClick(e, project)}>
                        <Image src={url} layout="fill" objectFit="cover" alt={project.image.alt} />
                      </Box>
                    </Box>
                  </StyledImage>
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        </Box>
      </AnimatePresence>
    </Box>
  )
}

export default ProjectGrid;