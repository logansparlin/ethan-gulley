import NormalizeWheel from 'normalize-wheel';
import styled from 'styled-components';
import { useEffect, useRef, useCallback } from "react";
import { urlFor } from "@lib/sanity"
import { getImageDimensions } from '@sanity/asset-utils';
import { useHomeStore } from "@hooks/useHomeStore";
import { useProjectStore } from "@hooks/useProjectStore";
import { useWindowSize } from "@hooks/useWindowSize";
import { motion } from 'framer-motion';

import Link from "next/link";
import { Box } from "@components/box"
import Image from "next/image"
import InfiniteSlider from "./InfiniteSlider";
import { useAppStore } from "@hooks/useAppStore";

const WHEEL_SPEED = 0.85;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

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
  const touchStart = useRef(0);
  const { transitionType, transitioning, setTransitioning, setTransitionType } = useAppStore();
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

  const handleTouchStart = (e) => {
    const { pageY: y } = e.touches[0] || e.changedTouches[0];
    touchStart.current = y;
  }

  const handleTouchMove = (e) => {
    const { pageY: y } = e.touches[0] || e.changedTouches[0];
    scroll.current.target += -1 * clamp(
      (touchStart.current - y) * 2,
      -25, 25
    );
  }

  const handleTouchEnd = (e) => {
    touchStart.current = 0;
  }

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
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
    setTransitioning(true);
    setTransitionType('page')
  }

  return (
    <Box position="absolute" flex="1" display="flex" alignItems="center" justifyContent="center" minHeight="calc(var(--vh, 1vh) * 100)" width="100%">
      <Box height="calc(var(--vh, 1vh) * 100)" overflow="hidden" width="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column" position="relative">
        <StyledHero
          flex="1"
          width="100%"
          height={["calc(calc(var(--vh, 1vh) * 100) - 80px)", null, "calc(calc(var(--vh, 1vh) * 100) - 90px)"]}
          display="flex"
          alignItems={["flex-start", null, "center"]}
          pt={["40px", null, 0]}
          justifyContent="center"
          cursor="pointer"
          key="home-hero"
          initial={{ scale: !loaded ? 0.6 : 1, y: 45, opacity: transitionType == 'view' ? 0 : 1 }}
          animate={{ scale: loaded ? 1 : 0.6, y: loaded ? 0 : 45, opacity: 1 }}
          exit={{ scale: 1, y: 45, opacity: transitionType == 'view' ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [.9, 0, .1, .9] }}
        >
          {projects.map(project => {
            const url = project.images?.length >= 1
              ? urlFor(project.images[0]).auto('format').width(1600).quality(95).url()
              : urlFor(project.image.src).auto('format').width(1600).quality(95).url()
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
                  <Link href={`/projects/${project.slug?.current}`}>
                    <Box>
                      <StyledImage
                        position="relative"
                        width={["100vw", null, "25vw"]}
                        height="0"
                        pb={[aspect > 1.4 ? '120vw' : `calc(100vw * ${aspect})`, null, `calc(100% * ${aspect})`]}
                      >
                        <Image
                          src={project.image?.url || url}
                          layout="fill"
                          objectFit={aspect > 1.4 && windowSize.width < 832 ? 'cover' : "contain"}
                          alt={project.image?.alt ?? ""}
                          loading="eager"
                        />
                      </StyledImage>
                      <StyledTitle
                        pt="8px"
                        pl={['15px', null, 0]}
                        fontSize="14px"
                        opacity="0"
                        textAlign="left"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: loaded && !transitioning ? 1 : 0 }}
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