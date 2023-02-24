import { useState, useEffect, useMemo } from "react";
import { useProjectStore } from "@hooks/useProjectStore";
import { urlFor } from "@lib/sanity";
import useKeypress from 'react-use-keypress';
import { motion } from "framer-motion";
import { useNextPreviousProjects } from "@hooks/useNextPreviousProjects";
import styled from 'styled-components';
import { useAppStore } from "@hooks/useAppStore";
import { useWindowSize } from "@hooks/useWindowSize";
import { useRouter } from "next/dist/client/router";
import { useIsMobile } from "@hooks/useIsMobile";

import Layout from "@components/Global/Layout";
import { Box } from "@components/box";
import { Cursor } from '@components/Project/Cursor';
import { Overview } from "@components/Project/Overview";
import { PreviousImage } from "@components/Project/PreviousImage";
import { NextImage } from "@components/Project/NextImage";
import { Header } from "@components/Project/Header";
import Image from "next/image";
import { NextTransition } from "@components/Project/NextTransition";
import { PreviousTransition } from "@components/Project/PreviousTransition";
import { getImageDimensions } from "@sanity/asset-utils";

const StyledImage = styled(motion(Box))`
  z-index: 10;
  will-change: auto;
`;

const StyledBackground = styled(motion.div)`
  position: fixed;
  z-index: 0;
  background: white;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  inset: 0;
`

export const ProjectPage = ({ data }) => {
  const { _id, title, images, image, projects, credits } = data;
  const { width, height } = useWindowSize();
  const { scale } = useProjectStore();
  const { nextProject, previousProject } = useNextPreviousProjects({ id: _id, projects })
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [projectTransition, setProjectTransition] = useState<'prev' | 'next' | null>(null)
  const { transitionType, setTransitionType, projectIndex, setProjectIndex } = useAppStore();
  const [activeIndex, setActiveIndex] = useState(projectIndex ?? 0);
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (transitionType !== 'project') {
      setProjectIndex(0)
    }
  }, [transitionType])

  const getTransitionScale = (elWidth, elHeight) => {
    return elWidth < elHeight ? (90 / height) : (72 / (width * 0.7))
  }

  const x = useMemo(() => {
    if (projectTransition === 'prev') {
      return ((width * .5) - (72 / 2))
    }

    if (projectTransition === 'next') {
      return -1 * ((width * .5) - (72 / 2))
    }
  }, [width, projectTransition])

  useKeypress(['ArrowLeft', 'ArrowRight'], (e) => {
    if (projectTransition !== null) return;

    if (e.key === 'ArrowRight') {
      nextImage()
    }

    if (e.key === 'ArrowLeft') {
      previousImage()
    }
  });

  const nextImage = () => {
    if (activeIndex === images?.length - 1) {
      setProjectTransition('next');
      setTransitionType('project')
      setProjectIndex(0)
      setTimeout(() => {
        router.push(`/projects/${nextProject.slug.current}`)
      }, 600)
      return setActiveIndex(images?.length - 1)
    }
    setProjectTransition(null)
    return setActiveIndex(activeIndex + 1)
  }

  const previousImage = () => {
    if (activeIndex === 0) {
      setTransitionType('project')
      setProjectTransition('prev');
      setProjectIndex(previousProject.images.length - 1)
      setTimeout(() => {
        router.push(`/projects/${previousProject.slug.current}`)
      }, 600)
      return setProjectTransition('prev')
    }
    setProjectTransition(null)
    return setActiveIndex(activeIndex - 1)
  }

  const setImage = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
      setOverviewOpen(false)
    }
  }

  const isFirst = useMemo(() => {
    return activeIndex === 0
  }, [activeIndex])

  const isLast = useMemo(() => {
    return activeIndex === images?.length - 1
  }, [activeIndex, images])

  const beforeIndex = useMemo(() => {
    if (activeIndex === 0) {
      return images?.length - 1
    }

    return activeIndex - 1
  }, [activeIndex])

  const afterIndex = useMemo(() => {
    if (activeIndex === images?.length - 1) {
      return 0
    }

    return activeIndex + 1
  }, [activeIndex])

  const img = urlFor(image.src).auto('format').width(1000).dpr(2).quality(90).url();

  const toggleOverview = () => {
    setOverviewOpen(!overviewOpen)
  }

  return (
    <>
      <Overview
        title={title}
        images={images}
        isOpen={overviewOpen}
        close={toggleOverview}
        setActiveIndex={setImage}
        credits={credits}
      />
      <motion.div
        initial={{ y: transitionType === 'list' ? '100vh' : 0, filter: 'blur(0px)', opacity: 1 }}
        animate={{
          y: overviewOpen ? '-10vh' : '0',
          filter: overviewOpen ? 'blur(12px)' : 'blur(0px)',
          opacity: overviewOpen ? 0.8 : 1
        }}
        exit={{ y: transitionType === 'project' ? 0 : '100vh', filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.86, 0, 0.07, 1] }}
        style={{ willChange: 'auto', background: 'green' }}
      >
        <Layout>
          <Box
            fontSize="14px"
            cursor="none"
            position="fixed"
            width="100vw"
            height="calc(var(--vh, 1vh) * 100)"
            top="0"
            left="0"
          >
            <StyledBackground
              initial={{ opacity: transitionType === 'list' || transitionType === 'project' ? 1 : 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.6, ease: 'linear'
                }
              }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'linear' }}
            />
            <Cursor
              title={title}
              count={images?.length ?? 0}
              index={activeIndex + 1}
              onRightClick={nextImage}
              onLeftClick={previousImage}
              nextProject={nextProject}
              previousProject={previousProject}
            />
            <Header title={title} toggleOverview={toggleOverview} />
            {images && images.map((image, index) => {
              const img = urlFor(image).auto('format').width(1000).dpr(2).quality(90).url();
              const lqip = image.metadata.lqip;
              const dimensions = getImageDimensions(image)
              return (
                <StyledImage
                  key={image._key}
                  $active={index === activeIndex}
                  opacity={index === activeIndex ? '1' : '0'}
                  width={["100vw", null, "70vw"]}
                  height="calc(var(--vh, 1vh) * 100)"
                  position="absolute"
                  top="0"
                  left={[0, null, "15vw"]}
                  initial={{ scale: transitionType === 'list' || isMobile ? 1 : scale }}
                  animate={{
                    x: projectTransition ? x : 0,
                    scale: projectTransition ? getTransitionScale(dimensions.width, dimensions.height) : 1,
                    transition: { duration: 0.6, delay: 0, ease: [1, 0.15, 0.25, 0.9] }
                  }}
                  exit={{
                    scale: transitionType === 'project' && !isMobile ? getTransitionScale(dimensions.width, dimensions.height) : 1,
                    opacity: index !== activeIndex ? 0 : 1,
                    transition: {
                      duration: 0
                    }
                  }}
                  transition={{ duration: 0.6, ease: [1, 0.15, 0.25, 0.9] }}
                >
                  <Image src={img} placeholder={index > 0 ? 'blur' : 'empty'} blurDataURL={lqip} alt={image.alt} layout="fill" loading={index === 0 ? 'eager' : 'lazy'} objectFit="contain" priority={index === 0} />
                </StyledImage>
              )
            })}
            {!images && (
              <StyledImage
                key={image._key}
                opacity={1}
                width={["100vw", null, "70vw"]}
                height="calc(var(--vh, 1vh) * 100)"
                position="absolute"
                top="0"
                left={[0, null, "15vw"]}
                initial={{ opacity: 1, scale: scale }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6, delay: 0, ease: [1, 0.15, 0.25, 0.9] }
                }}
                exit={{
                  scale: 1,
                  opacity: transitionType === 'project' ? 0 : 1
                }}
                transition={{ duration: 0.6, ease: [1, 0.15, 0.25, 0.9] }}
              >
                <Image src={img} alt={image.alt} layout="fill" objectFit="contain" priority={true} />
              </StyledImage>
            )}
            <PreviousImage transition={projectTransition} images={images} beforeIndex={beforeIndex} projectTransition={transitionType === 'project'} />
            <NextImage transition={projectTransition} images={images} afterIndex={afterIndex} projectTransition={transitionType === 'project'} />
            <NextTransition nextProject={nextProject} transitioning={projectTransition === 'next'} visible={isLast} />
            <PreviousTransition previousProject={previousProject} transitioning={projectTransition === 'prev'} visible={isFirst} />
          </Box>
        </Layout>
      </motion.div>
    </>
  )
}
