import NormalizeWheel from 'normalize-wheel';
import styled from 'styled-components';
import { useEffect, useRef, useState } from "react";
import { urlFor } from "@lib/sanity"
import { getImageDimensions } from '@sanity/asset-utils';
import { useHomeStore } from "@hooks/useHomeStore";
import { useProjectStore } from "@hooks/useProjectStore";
import { useWindowSize } from "@hooks/useWindowSize";
import { motion } from 'framer-motion';
import { useIsMobile } from '@hooks/useIsMobile';

import Link from "next/link";
import { Box } from "@components/box"
import Image from "next/image"
import InfiniteSlider from "./InfiniteSlider";
import { useAppStore } from "@hooks/useAppStore";
import Loading from './Loading';

const WHEEL_SPEED = 0.85;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const StyledHero = styled(motion(Box))`
  will-change: auto;
`;

const StyledTitle = styled(motion(Box))`
position: absolute;
`;

const StyledImage = styled(motion(Box))``;

const Hero = ({ projects, site }) => {
  const { loaded, lastFocusedIndex, setLastFocusedIndex, lastScrollPosition, setLastScrollPosition, firstIndex } = useHomeStore();
  const { transitionType, transitioning, setTransitioning, setTransitionType } = useAppStore();
  const isMobile = useIsMobile();
  const scroll = useRef({ target: lastScrollPosition, current: lastScrollPosition });
  const imagesRef = useRef(null);
  const activeIndex = useRef(lastFocusedIndex);
  const windowSize = useWindowSize();
  const touchStart = useRef(0);
  const { setScale } = useProjectStore();
  const [focusedIndex, setFocusedIndex] = useState(0)

  const handleProjectChange = (index) => {
    // setFocusedIndex(index)
    console.log('changed')
    setFocusedIndex(index)
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
    console.log(touchStart.current)
    scroll.current.target += -1 * clamp(
      (touchStart.current - y) * 2,
      -25, 25
    );
  }

  const handleTouchEnd = () => {
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
    <Box position="absolute" flex="1" display="flex" alignItems="center" justifyContent="center" height="calc(var(--vh, 1vh) * 100)" width="100%">
      {/* {!loaded && <Loading projects={projects} site={site} />} */}
      <Box height="100%" overflow="hidden" width="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column" position="relative">
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
          initial={{ scale: !loaded ? 0.6 : 1, y: 45, opacity: transitionType === 'view' ? 0 : 1 }}
          animate={{ scale: loaded ? 1 : 0.6, y: loaded ? 0 : 45, opacity: 1 }}
          exit={{ scale: 1, y: 45, opacity: transitionType === 'view' ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [.9, 0, .1, .9] }}
        >
          {projects.map((project, index) => {
            const url = project.images?.length >= 1
              ? urlFor(project.images[0]).auto('format').width(isMobile ? 600 : 800).dpr(2).quality(90).url()
              : urlFor(project.image.src).auto('format').width(isMobile ? 600 : 800).dpr(2).quality(90).url()
            const dimensions = project.images?.length >= 1
              ? getImageDimensions(project.images[0])
              : getImageDimensions(project.image.src);

            const lqip = project.images?.length >= 1 ? project.images[0].metadata.lqip : project.image.metadata.lqip;
            const aspect = dimensions.height / dimensions.width;
            // if (index !== focusedIndex) {
            //   return null
            // }
            return (
              <Box
                className="hero-image-large"
                position="absolute"
                key={project._id}
                opacity={index === focusedIndex ? '1' : '0'}
                visibility={index === focusedIndex ? 'visible' : 'hidden'}
                zIndex={index === focusedIndex ? 2 : 1}
              >
                <Box as="button" onClick={calculateScale}>
                  <Link href={`/projects/${project.slug?.current}`} passHref>
                    <Box>
                      <StyledImage
                        position="relative"
                        width={["100vw", null, "25vw"]}
                        height="0"
                        pb={[aspect > 1.4 ? '120vw' : `calc(100vw * ${aspect})`, null, `calc(100% * ${aspect})`]}
                      >
                        <Image
                          src={url}
                          placeholder="blur"
                          blurDataURL={lqip}
                          layout="fill"
                          objectFit={"cover"}
                          alt={project.image?.alt ?? ""}
                          loading={index === firstIndex ? "eager" : "lazy"}
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
          focusedIndex={1}
          updateProject={handleProjectChange}
          scroll={scroll.current}
        />
      </Box>
    </Box>
  )
}
export default Hero;