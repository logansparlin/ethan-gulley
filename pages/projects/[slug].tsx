import { useState, useMemo } from "react";
import { getProject, getProjectPaths } from "@lib/api";
import { useProjectStore } from "@hooks/useProjectStore";
import { urlFor } from "@lib/sanity";
import useKeypress from 'react-use-keypress';
import { motion } from "framer-motion";
import { useNextPreviousProjects } from "@hooks/useNextPreviousProjects";
import styled from 'styled-components';
import { useAppStore } from "@hooks/useAppStore";

import Link from "next/link";
import Layout from "@components/Global/Layout";
import { Box } from "@components/box";
import { Cursor } from '@components/Project/Cursor';
import { Overview } from "@components/Project/Overview";
import { PreviousImage } from "@components/Project/PreviousImage";
import { NextImage } from "@components/Project/NextImage";
import Image from "next/image";
import { useWindowSize } from "@hooks/useWindowSize";

const StyledImage = styled(motion(Box))``;

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
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowSize();
  const { scale } = useProjectStore();
  const { nextProject, previousProject } = useNextPreviousProjects({ id: _id, projects })
  const [overviewOpen, setOverviewOpen] = useState(false);
  const { transitionType } = useAppStore();

  useKeypress(['ArrowLeft', 'ArrowRight'], (e) => {
    if (e.key === 'ArrowRight') {
      nextImage()
    }

    if (e.key === 'ArrowLeft') {
      previousImage()
    }
  });

  const nextImage = () => {
    if (activeIndex === images?.length - 1) {
      return setActiveIndex(0)
    }

    return setActiveIndex(activeIndex + 1)
  }

  const previousImage = () => {
    if (activeIndex === 0) {
      return setActiveIndex(images?.length - 1)
    }

    return setActiveIndex(activeIndex - 1)
  }

  const handleViewClick = (e) => {
    const { pageX: x } = e;

    if (x > width / 2) {
      nextImage()
    } else {
      previousImage()
    }
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
    <motion.div
      initial={{ y: transitionType === 'list' ? '100vh' : 0 }}
      animate={{ y: '0' }}
      exit={{ y: '100vh' }}
      transition={{ duration: 0.8, ease: [.9, 0, .1, .9] }}
      style={{ willChange: 'auto', background: 'green' }}
    >
      <Layout>
        <Overview
          title={title}
          images={images}
          isOpen={overviewOpen}
          close={toggleOverview}
          setActiveIndex={setImage}
          credits={credits}
        />
        <Box
          fontSize="14px"
          cursor="none"
          position="fixed"
          width="100vw"
          height="100vh"
          top="0"
          left="0"
          onClick={handleViewClick}
        >
          <StyledBackground
            initial={{ opacity: transitionType === 'list' ? 1 : 0 }}
            animate={{
              opacity: 1, transition: {
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'circOut' }}
          >
            <Box as="header" position="relative" zIndex="10" display="flex" justifyContent="space-between">
              <Box as="h1" p="20px" color="black">{title}</Box>
              <Box display="flex">
                <Box
                  as="button"
                  type="button"
                  height="auto"
                  pr="24px"
                  position="relative"
                  zIndex="10"
                  cursor="pointer"
                  color={"#B4B4B4"}
                  onClick={toggleOverview}
                >
                  Overview
                </Box>
                <Box pr="20px" pt="20px" position="relative" zIndex="10" cursor="pointer">
                  <Link href="/">Close</Link>
                </Box>
              </Box>
            </Box>
          </motion.div>
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
                  scale: 1,
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
          <PreviousImage images={images} beforeIndex={beforeIndex} previousProject={previousProject} />
          <NextImage images={images} afterIndex={afterIndex} nextProject={nextProject} />
        </Box>
      </Layout>
    </motion.div>
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