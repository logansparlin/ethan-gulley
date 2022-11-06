import { useState, useRef, useMemo } from "react";
import { getProject, getProjectPaths } from "@lib/api";
import { urlFor } from "@lib/sanity";
import useKeypress from 'react-use-keypress';
import styled from 'styled-components';
import { motion } from "framer-motion";

import Layout from "@components/Global/Layout";
import { Box } from "@components/box";
import { Cursor } from '@components/Project/Cursor';
import Image from "next/image";

const StyledImage = styled(motion(Box))``;

const ProjectPage = ({ pageData }) => {
  if (!pageData) return "no page data"
  const { title, images } = pageData;
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <Layout>
      <Box fontSize="14px" cursor="none" position="fixed" zIndex="80" width="100vw" height="100vh" top="0" left="0" bg="white">
        <Cursor
          title={title}
          count={images?.length ?? 0}
          index={activeIndex + 1}
          onRightClick={nextImage}
          onLeftClick={previousImage}
        />
        <Box as="header" display="flex" justifyContent="space-between">
          <Box as="h1" p="20px">{title}</Box>
          <Box as="a" p="20px" href="/" position="relative" zIndex="10" cursor="pointer">Close</Box>
        </Box>
        {images && images.map((image, index) => {
          const img = urlFor(image).auto('format').width(1000).url();
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
            >
              <Image src={img} alt={image.alt} layout="fill" objectFit="contain" />
            </StyledImage>
          )
        })}
        <Box position="absolute" top="50%" transform="translateY(-50%)" width="120px" height="200px" left="20px">
          {images && images.map((image, index) => {
            const img = urlFor(image).auto('format').width(200).url();
            return (
              <Box key={image._key} opacity={index === beforeIndex ? 1 : 0}>
                <Image src={img} alt={image.alt} layout="fill" objectFit="contain" />
              </Box>
            )
          })}
        </Box>
        <Box position="absolute" top="50%" transform="translateY(-50%)" width="120px" height="200px" right="20px">
          {images && images.map((image, index) => {
            const img = urlFor(image).auto('format').width(200).url();
            return (
              <Box key={image._key} opacity={index === afterIndex ? 1 : 0}>
                <Image src={img} alt={image.alt} layout="fill" objectFit="contain" />
              </Box>
            )
          })}
        </Box>
      </Box>
    </Layout>
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