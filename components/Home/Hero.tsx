import { useEffect, useRef, useState } from "react";
import { urlFor } from "@lib/sanity"
import NormalizeWheel from 'normalize-wheel';
import { getImageDimensions } from '@sanity/asset-utils';
import { useHomeStore } from "@hooks/useHomeStore";
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { Box } from "@components/box"
import Image from "next/image"
import InfiniteSlider from "./InfiniteSlider";

const StyledHero = styled(motion(Box))``;

const StyledTitle = styled(motion(Box))``;

const Hero = ({ projects, activeProject, updateProject }) => {
  const scroll = useRef({ target: 0, current: 0 });
  const { loaded, setLoaded } = useHomeStore();
  const activeIndex = useRef(0);
  const loops = useRef(0);

  const handleWheel = (e) => {
    if (!loaded) return;

    const normalized = NormalizeWheel(e);
    const speed = normalized.pixelY;
    scroll.current.target += speed * 0.7;
  }

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    }
  }, []);

  useEffect(() => {
    let interval;

    if (interval) clearInterval(interval)
    if (typeof window === 'undefined') return null;
    const firstIndex = Number(window.localStorage.getItem('first-index'));

    interval = setInterval(() => {
      if (loops.current === 0) {
        if (activeIndex.current < projects.length - 1) {
          activeIndex.current = activeIndex.current + 1
        } else {
          activeIndex.current = 0
          loops.current = 1
        }
      }

      if (loops.current > 0) {
        if (activeIndex.current < firstIndex) {
          activeIndex.current = activeIndex.current + 1
        } else {
          clearInterval(interval)
          setLoaded(true)
        }
      }
      updateProject(projects[activeIndex.current])
    }, 75);

    return (() => {
      clearInterval(interval)
    })
  }, [])

  return (
    <Box position="absolute" flex="1" display="flex" alignItems="center" justifyContent="center" minHeight="100vh" width="100%">
      <Box height="100vh" overflow="hidden" width="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column" position="relative">
        <StyledHero
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          initial={{ opacity: !loaded ? 1 : 0, scale: !loaded ? 0.8 : 1.05 }}
          animate={{ opacity: 1, scale: loaded ? 1 : 0.8 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: [.8, 0, .1, 0.9] }}
        >
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
                <StyledTitle
                  pt="8px"
                  fontSize="14px"
                  opacity="0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: loaded ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [.8, 0, .1, 0.9] }}
                >
                  {project.title}
                </StyledTitle>
              </Box>
            )
          })}
        </StyledHero>
        <InfiniteSlider
          loading={!loaded}
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