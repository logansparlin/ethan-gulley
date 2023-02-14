import { useEffect, useState } from "react";
import { urlFor } from "@lib/sanity";
import styled from 'styled-components';
import { motion } from "framer-motion";

import { Box } from "@components/box"
import Image from "next/image";
import { useHomeStore } from "@hooks/useHomeStore";
import { getImageDimensions } from "@sanity/asset-utils";
import Header from "@components/Header";

const StyledImage = styled(motion(Box))`
  position: absolute;
  transform: scale(0.8);
`;

const StyledHeaderOverlay = styled(motion(Box))`
  position: fixed;
`;

const Loading = ({ projects, site }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loops, setLoops] = useState(0);
  const { setView } = useHomeStore();

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let interval;

    if (interval) clearInterval(interval)
    if (typeof window === 'undefined') return null;
    const firstIndex = Number(window.localStorage.getItem('first-index'));

    interval = setInterval(() => {
      if (loops === 0) {
        if (activeIndex < projects.length - 1) {
          setActiveIndex(activeIndex + 1)
        } else {
          setActiveIndex(0)
          setLoops(1)
        }
      }

      if (loops > 0) {
        if (activeIndex < firstIndex) {
          setActiveIndex(activeIndex + 1)
        } else {
          clearInterval(interval)
          setView('default')
        }
      }
    }, 75);

    return (() => {
      clearInterval(interval)
    })
  })

  return (
    <Box
      position="fixed"
      width="100vw"
      height="calc(var(--vh, 1vh) * 100)"
      top="0"
      left="0"
      bg="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      zIndex={10}
    >
      <StyledHeaderOverlay
        width="100%"
        top="0"
        left="0"
      >
        <Header {...site} />
      </StyledHeaderOverlay>
      <Box flex="1" width="100%" position="relative" height="100%" display="flex" alignItems="center" justifyContent="center">
        {projects.map((project, index) => {
          const url = urlFor(project.image.src).url();
          const dimensions = getImageDimensions(project.image.src);
          const aspect = dimensions.height / dimensions.width;
          return (
            <StyledImage
              position="absolute"
              key={project._id}
              opacity={activeIndex === index ? '1' : '0'}
            >
              <Box
                position="relative"
                width="25vw"
                height="0"
                pb={`calc(25vw * ${aspect})`}
              >
                <Image src={project.image.url || url} layout="fill" objectFit="cover" alt={project.image.alt} loading="eager" />
              </Box>
              <Box
                pt="8px"
                fontSize="14px"
                opacity="0"
              >
                {project.title}
              </Box>
            </StyledImage>
          )
        })}
      </Box>
      <Box width="100%" height={["55px", null, "90px"]} bg="transparent" />
    </Box >
  )
}

export default Loading;