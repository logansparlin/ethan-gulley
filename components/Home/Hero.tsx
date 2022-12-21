import { useEffect, useRef, useCallback } from "react";
import { urlFor } from "@lib/sanity"
import NormalizeWheel from 'normalize-wheel';
import { getImageDimensions } from '@sanity/asset-utils';
import { useHomeStore } from "@hooks/useHomeStore";
import { useProjectStore } from "@hooks/useProjectStore";
import { useWindowSize } from "@hooks/useWindowSize";
import { motion } from 'framer-motion';
import styled from 'styled-components';

import Link from "next/link";
import { Box } from "@components/box"
import Image from "next/image"
import InfiniteSlider from "./InfiniteSlider";
import { useAppStore } from "@hooks/useAppStore";

const WHEEL_SPEED = 0.85;

const StyledHero = styled(motion(Box))`
  will-change: auto;
`;

const StyledTitle = styled(motion(Box))`
position: absolute;
`;

const StyledImage = styled(motion(Box))``;

const Hero = ({ projects, focusedProject, updateProject }) => {
  const { loaded, setLoaded, lastFocusedIndex, setLastFocusedIndex, lastScrollPosition, setLastScrollPosition } = useHomeStore();
  const scroll = useRef({ target: lastScrollPosition, current: lastScrollPosition });
  const activeIndex = useRef(lastFocusedIndex);
  const loops = useRef(0);
  const windowSize = useWindowSize();
  const { transitionType, setTransitionType } = useAppStore();
  const { setScale } = useProjectStore();

  const handleProjectChange = (index) => {
    updateProject(projects[index])
    activeIndex.current = index;
  }

  const handleWheel = (e) => {
    if (!loaded) return;
    const normalized = NormalizeWheel(e);
    const delta = normalized.pixelY;
    scroll.current.target += delta * WHEEL_SPEED;
  }

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    }
  }, [loaded]);

  useEffect(() => {
    let interval;

    if (interval) clearInterval(interval)
    if (typeof window === 'undefined') return null;
    const firstIndex = Number(window.localStorage.getItem('first-index'));

    interval = setInterval(() => {
      if (loaded) return;
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
          setTimeout(() => {
            setLoaded(true)
          }, 100)
        }
      }
      handleProjectChange(activeIndex.current)
    }, 90);

    return (() => {
      clearInterval(interval)
    })
  }, [])

  const calculateScale = (e) => {
    const pos = e.target.getBoundingClientRect();
    let scale;
    if (pos.width > pos.height) {
      scale = pos.width / (windowSize.width * 0.7);
    } else {
      scale = pos.height / windowSize.height;
    }
    setLastFocusedIndex(activeIndex.current)
    setScale(scale)
    setLastScrollPosition(scroll.current.current)
    setTransitionType('page')
  }

  return (
    <Box position="absolute" flex="1" display="flex" alignItems="center" justifyContent="center" minHeight="100vh" width="100%">
      <Box height="100vh" overflow="hidden" width="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column" position="relative">
        <StyledHero
          flex="1"
          width="100%"
          height="calc(100vh - 90px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          key="home-hero"
          initial={{ scale: !loaded ? 0.6 : 1, y: 45, opacity: transitionType == 'view' ? 0 : 1 }}
          animate={{ scale: loaded ? 1 : 0.6, y: loaded ? 0 : 45, opacity: 1 }}
          exit={{ scale: 1, y: 45, opacity: transitionType == 'view' ? 0 : 1 }}
          transition={{ duration: 1, ease: [.9, 0, .1, .9] }}
        >
          {projects.map(project => {
            const url = project.images?.length >= 1
              ? urlFor(project.images[0]).auto('format').width(1000).url()
              : urlFor(project.image.src).auto('format').width(1000).url()
            const dimensions = project.images?.length >= 1
              ? getImageDimensions(project.images[0])
              : getImageDimensions(project.image.src);
            const aspect = dimensions.height / dimensions.width;
            return (
              <Box
                position="absolute"
                key={project._id}
                opacity={project._id === focusedProject._id ? '1' : '0'}
                visibility={project._id === focusedProject._id ? 'visible' : 'hidden'}
                zIndex={project._id === focusedProject._id ? 2 : 1}
              >
                <Box as="button" onClick={calculateScale}>
                  <Link href={`/projects/${project.slug.current}`}>
                    <Box>
                      <StyledImage
                        position="relative"
                        width="25vw"
                        height="0"
                        pb={`calc(25vw * ${aspect})`}
                      >
                        <Image src={project.image?.url || url} layout="fill" objectFit="contain" alt={project.image?.alt ?? ""} loading="eager" />
                      </StyledImage>
                      <StyledTitle
                        pt="8px"
                        fontSize="14px"
                        opacity="0"
                        textAlign="left"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: loaded ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [.8, 0, .1, 0.9] }}
                      >
                        {project.title}
                      </StyledTitle>
                    </Box>
                  </Link>
                </Box>
              </Box>
            )
          })}
        </StyledHero>
        <InfiniteSlider
          loading={!loaded}
          projects={projects}
          focusedProject={focusedProject}
          updateProject={handleProjectChange}
          scroll={scroll.current}
        />
      </Box>
    </Box>
  )
}
export default Hero;