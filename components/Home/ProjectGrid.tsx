import { useRef } from "react";
import { urlFor } from "@lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import { useAppStore } from "@hooks/useAppStore";
import { useProjectStore } from "@hooks/useProjectStore";
import { getImageDimensions } from "@sanity/asset-utils";
import styled from 'styled-components';

import { Box } from "@components/box";
import Image from 'next/image';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { HoverTitle, StyledHoverTitle } from "./HoverTitle";
import { useAdjacentGridItem } from "@hooks/useAdjacentGridItem";

const StyledImage = styled(motion(Box))`
  will-change: auto;
  opacity: 1;
  transition: opacity 500ms ease-in-out;
`;

const StyledItem = styled(motion(Box))`
  position: relative;
  will-change: auto;
`;

const GridWrapper = styled(Box)`
  &:hover {
    ${StyledImage} {
      &.faded {
        opacity: 0.6;
        transition: opacity 500ms ease-in-out;
        transition-delay: 100ms;
      }
      transition: opacity 500ms ease-in-out;
      &:hover:not(.active) {
        opacity: 0.2;
        transition: opacity 500ms ease-in-out;
      }
    }
    ${StyledItem}:hover:not(.active) {
      ${StyledHoverTitle} {
        opacity: 1;
        transition: opacity 500ms ease-in-out;
      }
    }
  }
`

const breakpoints = {
  300: 1,
  500: 2,
  768: 3,
  1024: 4,
  1400: 6
}


const ProjectGrid = ({ projects, category }) => {
  const selectedProjectPosition = useRef(null);
  const { setTransitionType } = useAppStore();
  const { setScale, setActiveProject, activeProject } = useProjectStore();
  const router = useRouter();
  const { indices, updateIndices, clearIndices } = useAdjacentGridItem(breakpoints);

  const filteredProjects = category === 'all'
    ? projects
    : projects.filter(project => project.category === category);

  const handleClick = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveProject(project)

    const pos = e.target.getBoundingClientRect()
    const scale = window.innerHeight / pos.height;

    selectedProjectPosition.current = {
      x: ((-1 * pos.x) + window.innerWidth / 2 - pos.width / 2),
      y: ((-1 * pos.y) + window.innerHeight / 2 - pos.height / 2),
      scale: scale
    };

    setTransitionType('page');
    setScale(1);

    setTimeout(() => {
      router.push(`/projects/${project.slug.current}`)
    }, 1000)
  }

  return (
    <Box pt="70px" pb="100px">
      <AnimatePresence exitBeforeEnter={true} initial={false}>
        <GridWrapper key={category}>
          <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
            <Masonry gutter="20px">
              {filteredProjects.map((project, index) => {
                const url = urlFor(project.image.src).auto('format').width(1000).url();
                const dimensions = getImageDimensions(project.image.src);
                const isSelected = activeProject ? activeProject._id === project._id : false;
                return (
                  <Box key={project._id} onMouseEnter={() => updateIndices(index)} onMouseLeave={clearIndices}>
                    <StyledItem
                      className={isSelected && 'active'}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{
                        y: isSelected ? selectedProjectPosition.current.y : 0,
                        x: isSelected ? selectedProjectPosition.current.x : 0,
                        opacity: activeProject && !isSelected ? 0 : 1,
                        scale: activeProject && isSelected ? selectedProjectPosition.current.scale : 1,
                        transition: {
                          duration: isSelected ? 1 : activeProject ? 0.8 : 0.6,
                          ease: isSelected ? [.9, 0, .1, .9] : 'circOut',
                          delay: isSelected ? 0.4 : activeProject ? 0 : index * 0.03
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
                        <HoverTitle>{project.title}</HoverTitle>
                        <StyledImage className={isSelected ? 'active' : indices && indices.includes(index) && 'faded'} as="button" onClick={(e) => handleClick(e, project)}>
                          <Image src={url} layout="fill" objectFit="cover" alt={project.image.alt} />
                        </StyledImage>
                      </Box>
                    </StyledItem>
                  </Box>
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        </GridWrapper>
      </AnimatePresence >
    </Box >
  )
}

export default ProjectGrid;