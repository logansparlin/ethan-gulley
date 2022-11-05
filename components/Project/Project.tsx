import { useState, useMemo } from "react";
import { urlFor } from "@lib/sanity";
import { useProjectStore } from "@hooks/useProjectStore";
import useKeypress from 'react-use-keypress';
import styled from 'styled-components';
import { motion } from "framer-motion";

import { Box } from "@components/box";
import { Cursor } from '@components/Project/Cursor';
import Image from "next/image";

const StyledImage = styled(motion(Box))``;

export const Project = () => {
  const { activeProject, setActiveProject } = useProjectStore();
  const { title, images } = activeProject;
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
    if (activeIndex === images.length - 1) {
      return setActiveIndex(0)
    }

    return setActiveIndex(activeIndex + 1)
  }

  const previousImage = () => {
    if (activeIndex === 0) {
      return setActiveIndex(images.length - 1)
    }

    return setActiveIndex(activeIndex - 1)
  }

  const beforeIndex = useMemo(() => {
    if (activeIndex === 0) {
      return images.length - 1
    }

    return activeIndex - 1
  }, [activeIndex])

  const afterIndex = useMemo(() => {
    if (activeIndex === images.length - 1) {
      return 0
    }

    return activeIndex + 1
  }, [activeIndex])

  return (
    <Box fontSize="14px" cursor="none" position="fixed" zIndex="80" width="100vw" height="100vh" top="0" left="0" bg="white">
      <Cursor
        title={title}
        count={images.length}
        index={activeIndex + 1}
        onRightClick={nextImage}
        onLeftClick={previousImage}
      />
      <Box as="header" display="flex" justifyContent="space-between">
        <Box as="h1" p="20px">{title}</Box>
        <Box as="button" p="20px" onClick={() => setActiveProject(null)} position="relative" zIndex="10" cursor="pointer">Close</Box>
      </Box>
      {images.map((image, index) => {
        const img = urlFor(image).auto('format').width(1400).quality(80).url();
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
        {images.map((image, index) => {
          const img = urlFor(image).auto('format').width(200).url();
          return (
            <Box key={image._key} opacity={index === beforeIndex ? 1 : 0}>
              <Image src={img} alt={image.alt} layout="fill" objectFit="contain" />
            </Box>
          )
        })}
      </Box>
      <Box position="absolute" top="50%" transform="translateY(-50%)" width="120px" height="200px" right="20px">
        {images.map((image, index) => {
          const img = urlFor(image).auto('format').width(200).url();
          return (
            <Box key={image._key} opacity={index === afterIndex ? 1 : 0}>
              <Image src={img} alt={image.alt} layout="fill" objectFit="contain" />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}