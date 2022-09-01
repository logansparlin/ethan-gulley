import { useEffect, useRef } from "react";
import { urlFor } from "@lib/sanity"
import NormalizeWheel from 'normalize-wheel';

import { Box } from "@components/box"
import Image from "next/image"
import InfiniteSlider from "./InfiniteSlider";

const Hero = ({ projects, activeProject, updateProject }) => {
  const scroll = useRef({ target: 0, current: 0 })

  const handleWheel = (e) => {
    const normalized = NormalizeWheel(e);
    const speed = normalized.pixelY;
    scroll.current.target += speed * 0.3;
  }

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    }
  }, [])

  return (
    <Box flex="1" display="flex" alignItems="center" justifyContent="center">
      <Box height="100vh" overflow="hidden" width="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
          {projects.map(project => {
            const url = urlFor(project.image.src).auto('format').width(1000).url();
            return (
              <Box position="absolute" key={project._id} opacity={project._id === activeProject._id ? '1' : '0'}>
                <Image src={project.image.url || url} layout="fixed" width="475px" height="600px" objectFit="cover" alt={project.image.alt} loading="eager" />
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