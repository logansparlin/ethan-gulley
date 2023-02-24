import { useEffect, useState } from "react";
import { urlFor } from "@lib/sanity";
import styled from 'styled-components';
import { motion } from "framer-motion";
import css from '@styled-system/css'

import { Box } from "@components/box"
import Image from "next/image";
import { useHomeStore } from "@hooks/useHomeStore";
import { getImageDimensions } from "@sanity/asset-utils";
import Header from "@components/Header";

const StyledImage = styled(motion(Box))`
  position: absolute;
  transform: scale(0.6);
  ${css({
  transform: ['scale(1)', null, 'scale(0.6)']
})}
`;

const StyledHeaderOverlay = styled(motion(Box))`
  position: fixed;
`;

const Loading = ({ projects, site }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loops, setLoops] = useState(0);
  const { setView, firstIndex, setLoaded } = useHomeStore();

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let interval;

    if (interval) clearInterval(interval)
    if (typeof window === 'undefined') return null;

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
          setLoaded(true)
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
      <Box flex="1" width="100%" position="relative" height="100%" display="flex" alignItems={["flex-start", null, "center"]} justifyContent={["flex-start", null, "center"]} top="45px">
        {projects.map((project, index) => {
          const url = urlFor(project.image.src).auto('format').dpr(2).width(300).quality(90).url();
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
                width={["100vw", null, "25vw"]}
                height="0"
                pb={[aspect > 1.4 ? '120vw' : `calc(100vw * ${aspect})`, null, `calc(100% * ${aspect})`]}
              >
                <Image
                  src={url}
                  placeholder="blur"
                  blurDataURL={project.image.lqip}
                  layout="fill"
                  objectFit="cover"
                  alt={project.image.alt}
                  loading="eager"
                  unoptimized={true}
                />
              </Box>
              <Box
                pt="8px"
                pl={['15px', null, 0]}
                fontSize="14px"
                opacity="0"
                textAlign="left"
                position="absolute"
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