import { useEffect, useRef } from "react";
import { urlFor } from "@lib/sanity"
import NormalizeWheel from 'normalize-wheel';
import { getImageDimensions } from '@sanity/asset-utils';
import { useHomeStore } from "@hooks/useHomeStore";

import { Box } from "@components/box"
import Image from "next/image"
import InfiniteSlider from "./InfiniteSlider";

const Hero = ({ projects, activeProject, updateProject }) => {
  const scroll = useRef({ target: 0, current: 0 });
  const { view } = useHomeStore();

  const handleWheel = (e) => {
    const normalized = NormalizeWheel(e);
    const speed = normalized.pixelY;
    scroll.current.target += speed * 0.7;
  }

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    }
  }, [])

  return (
    <Box flex="1" display="flex" alignItems="center" justifyContent="center" opacity={view !== 'default' ? 0 : 1} transition="opacity 500ms ease-in-out">
      <Box height="100vh" overflow="hidden" width="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column" position="relative">
        <Box flex="1" display="flex" alignItems="center" justifyContent="center" cursor="pointer">
          {projects.map(project => {
            const url = urlFor(project.image.src).auto('format').width(1000).url();
            const dimensions = getImageDimensions(project.image.src);
            const aspect = dimensions.height / dimensions.width;
            return (
              <Box
                position="absolute"
                key={project._id}
                opacity={project._id === activeProject._id ? '1' : '0'}
                visibility={project._id === activeProject._id ? 'visible' : 'hidden'}
                zIndex={project._id === activeProject._id ? 2 : 1}
              >
                <Box
                  position="relative"
                  width="25vw"
                  height="0"
                  pb={`calc(25vw * ${aspect})`}
                >
                  <Image src={project.image.url || url} layout="fill" objectFit="cover" alt={project.image.alt} loading="eager" />
                </Box>
                <Box pt="8px" fontSize="14px">
                  {project.title}
                </Box>
              </Box>
            )
          })}
        </Box>
        <InfiniteSlider
          projects={projects}
          activeProject={activeProject}
          updateProject={updateProject}
          scroll={scroll.current}
        />
      </Box>
    </Box>
  )
}
export default Hero;