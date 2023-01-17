import { useState, useMemo } from "react";
import { getProject, getProjectPaths } from "@lib/api";
import { useProjectStore } from "@hooks/useProjectStore";
import { urlFor } from "@lib/sanity";
import useKeypress from 'react-use-keypress';
import { motion } from "framer-motion";
import { useNextPreviousProjects } from "@hooks/useNextPreviousProjects";
import styled from 'styled-components';
import { useAppStore } from "@hooks/useAppStore";
import { useWindowSize } from "@hooks/useWindowSize";
import { useRouter } from "next/dist/client/router";

import Layout from "@components/Global/Layout";
import { Box } from "@components/box";
import { Cursor } from '@components/Project/Cursor';
import { Overview } from "@components/Project/Overview";
import { PreviousImage } from "@components/Project/PreviousImage";
import { NextImage } from "@components/Project/NextImage";
import { Header } from "@components/Project/Header";
import Image from "next/image";

const StyledImage = styled(motion(Box))`
  z-index: 0;
  will-change: auto;
`;

const StyledBackground = styled(motion.div)`
  position: fixed;
  z-index: 0;
  background: white;
  width: 100%;
  height: 100vh;
  inset: 0;
`

const ProjectPage = ({ pageData }) => {
  if (!pageData) return "no page data"
  const { _id, title, images, image, projects, credits } = pageData;
  const { width, height } = useWindowSize();
  const { scale } = useProjectStore();
  const { nextProject, previousProject } = useNextPreviousProjects({ id: _id, projects })
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [projectTransition, setProjectTransition] = useState<'prev' | 'next' | null>(null)
  const { transitionType, setTransitionType, projectIndex, setProjectIndex } = useAppStore();
  const [activeIndex, setActiveIndex] = useState(projectIndex ?? 0);
  const router = useRouter();

  const transitionScale = useMemo(() => {
    return 90 / height;
  }, [height]);

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
      return setProjectTransition('next');
      // return setActiveIndex(0)
    }
    setProjectTransition(null)
    return setActiveIndex(activeIndex + 1)
  }

  const previousImage = () => {
    if (activeIndex === 0) {
      setTransitionType('project')
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

  const img = urlFor(image.src).auto('format').width(1600).url();

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
            height="100vh"
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
              const img = urlFor(image).auto('format').width(1600).quality(85).url();
              return (
                <StyledImage
                  key={image._key}
                  $active={index === activeIndex}
                  opacity={index === activeIndex ? '1' : '0'}
                  width="70vw"
                  height="calc(100vh)"
                  position="absolute"
                  top="0"
                  left="15vw"
                  initial={{ scale: transitionType === 'list' ? 1 : scale }}
                  animate={{
                    x: projectTransition ? x : 0,
                    scale: projectTransition ? transitionScale : 1,
                    transition: { duration: 0.6, delay: scale ? 0.4 : 0, ease: [1, 0.15, 0.25, 0.9] }
                  }}
                  exit={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: [1, 0.15, 0.25, 0.9] }}
                >
                  <Image src={img} alt={image.alt} layout="fill" objectFit="contain" />
                </StyledImage>
              )
            })}
            {!images && (
              <StyledImage
                key={image._key}
                opacity={1}
                width="70vw"
                height="calc(100vh)"
                position="absolute"
                top="0"
                left="15vw"
                initial={{ opacity: 1, scale: scale }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6, delay: 0, ease: [1, 0.15, 0.25, 0.9] }
                }}
                exit={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [1, 0.15, 0.25, 0.9] }}
              >
                <Image src={img} alt={image.alt} layout="fill" objectFit="contain" />
              </StyledImage>
            )}
            <PreviousImage transition={projectTransition} images={images} beforeIndex={beforeIndex} previousProject={previousProject} />
            <NextImage transition={projectTransition} images={images} afterIndex={afterIndex} nextProject={nextProject} />
          </Box>
        </Layout>
      </motion.div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const { data: pageData, query } = await getProject(params.slug);

  return {
    props: {
      pageData,
      query
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const { data: paths } = await getProjectPaths();

  return {
    paths,
    fallback: true
  };
}

export default ProjectPage;