import { useRef } from "react";
import { urlFor } from "@lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import { useAppStore } from "@hooks/useAppStore";
import { useProjectStore } from "@hooks/useProjectStore";
import { getImageDimensions } from "@sanity/asset-utils";
import { GRID_BREAKPOINTS } from "@lib/constants";
import { useWindowSize } from "@hooks/useWindowSize";
import styled from 'styled-components';
import css from '@styled-system/css'

import { Box } from "@components/box";
import Image from 'next/image';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { HoverTitle, StyledHoverTitle } from "./HoverTitle";
import { useAdjacentGridItem } from "@hooks/useAdjacentGridItem";

const StyledImage = styled(motion(Box))`
  will-change: auto;
  opacity: 1;
  transition: opacity 500ms ease-in-out;
  cursor: none;
`;

const StyledItem = styled(motion(Box))`
  position: relative;
  will-change: auto;
`;

const StyledMobileTitle = styled(motion.h3)`
  padding: 8px 12px;
  font-size: 26px;
  line-height: 116%;
  ${css({
  display: ["block", null, "none"],
})}
`;

const GridWrapper = styled(Box)`
  &:hover {
    ${StyledImage} {
      &.faded {
        opacity: 0.9;
        transition: opacity 500ms ease-in-out;
        transition-delay: 100ms;
      }
      transition: opacity 500ms ease-in-out;
      &:hover:not(.active) {
        opacity: 0.7;
        transition: opacity 500ms ease-in-out;
      }
    }
    ${StyledItem}:hover:not(.active) {
      ${StyledHoverTitle} {
        opacity: 1;
        transition: opacity 300ms ease-in-out;
      }
    }
  }
`


const ProjectGrid = ({ projects, category }) => {
  const selectedProjectPosition = useRef(null);
  const { setTransitionType, isMobile } = useAppStore();
  const { setScale, setActiveProject, activeProject } = useProjectStore();
  const { indices, updateIndices, clearIndices } = useAdjacentGridItem(GRID_BREAKPOINTS);
  const { width, height } = useWindowSize();
  const router = useRouter();

  const filteredProjects = category === 'all'
    ? projects
    : projects.filter(project => project.category === category);

  const handleClick = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveProject(project)

    const pos = e.target.getBoundingClientRect()
    const scale = pos.width < pos.height
      ? height / pos.height
      : (width * 0.7) / pos.width

    selectedProjectPosition.current = {
      x: ((-1 * pos.x) + width / 2 - pos.width / 2),
      y: ((-1 * pos.y) + height / 2 - pos.height / 2),
      scale: scale
    };

    setTransitionType('page');
    setScale(1);

    setTimeout(() => {
      router.push(`/projects/${project.slug.current}`)
    }, 600)
  }

  return (
    <Box pt={["80px", null, "70px"]} pb="100px">
      <AnimatePresence exitBeforeEnter={true} initial={false}>
        <GridWrapper key={category}>
          <ResponsiveMasonry columnsCountBreakPoints={GRID_BREAKPOINTS}>
            <Masonry gutter="20px">
              {filteredProjects.map((project, index) => {
                const url = urlFor(project.image.src).width(800).quality(90).url();
                const dimensions = getImageDimensions(project.image.src);
                const lqip = project.image.lqip;
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
                        scale: activeProject && isSelected && !isMobile ? selectedProjectPosition.current.scale : 1,
                        transition: {
                          duration: isSelected ? 0.6 : activeProject ? 1 : 0.6,
                          ease: isSelected ? [.9, 0, .1, .9] : 'circOut',
                          delay: isSelected ? 0 : activeProject ? 0 : index * 0.03
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
                      style={{ zIndex: isSelected ? 2 : 1 }}
                    >
                      <Box
                        position="relative"
                        width="100%"
                        height="0"
                        pb={`${(dimensions.height / dimensions.width) * 100}%`}
                      >
                        {!isMobile ? <HoverTitle>{project.title}</HoverTitle> : null}
                        <StyledImage className={isSelected ? 'active' : indices && indices.includes(index) && 'faded'} as="button" onClick={(e) => handleClick(e, project)}>
                          <Image
                            src={url}
                            placeholder="blur"
                            blurDataURL={lqip}
                            layout="fill"
                            objectFit="cover"
                            alt={project.image.alt}
                            sizes="(max-width: 300px) 100vw, (max-width: 500px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          />
                        </StyledImage>
                      </Box>
                      <StyledMobileTitle
                        initial={{ opacity: 1 }}
                        animate={{ opacity: activeProject ? 0 : 1 }}
                        transition={{
                          duration: 0.4,
                          ease: 'easeInOut'
                        }}
                      >
                        {project.title}
                      </StyledMobileTitle>
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