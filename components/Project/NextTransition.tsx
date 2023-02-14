import { urlFor } from "@lib/sanity";
import styled from 'styled-components'
import { useWindowSize } from "@hooks/useWindowSize";

import { Box } from "@components/box";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useMemo } from "react";

const StyledSecondImage = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  height: 90px;
  width: 72px;
`;

const StyledImage = styled(motion.div)`
  position: absolute;
  right: 15vw;
  bottom: 0;
  pointer-events: none;
  height: 100vh;
  width: 70vw;
  z-index: 12;
`

export const NextTransition = ({ nextProject, transitioning, visible = false }) => {
  const { width = 0, height = 0 } = useWindowSize();

  const scale = useMemo(() => {
    const scale = height ? 90 / height : 0;
    return scale
  }, [height])

  const x = useMemo(() => {
    const x = ((width * 0.7) / 2) + (width * 0.15) - (72 / 2);
    return x
  }, [width])

  if (!nextProject?.images || nextProject?.images.length < 2) return null;

  const firstImage = nextProject.images[0]
  const secondImage = nextProject.images[1];
  const url = urlFor(firstImage).auto('format').width(1600).quality(95).url();
  const url2 = urlFor(secondImage).auto('format').width(200).url();

  return (
    <Box opacity={visible ? 1 : 0} display={["none", null, "block"]}>
      <StyledImage
        initial={{ scale: scale, opacity: 1, x: x }}
        animate={{ scale: transitioning ? 1 : scale, opacity: 1, x: transitioning ? 0 : x }}
        transition={{
          duration: transitioning ? 0.6 : 0,
          ease: [1, 0.15, 0.25, 0.9]
        }}
      >
        <Image src={url} alt="" layout="fill" objectFit="contain" />
      </StyledImage>
      <StyledSecondImage
        initial={{ opacity: 0, y: '-50%', x: 72 }}
        animate={{ opacity: transitioning ? 1 : 0, y: '-50%', x: transitioning ? 0 : 72 }}
        transition={{
          duration: transitioning ? 0.6 : 0,
          ease: [1, 0.15, 0.25, 0.9],
        }}
      >
        <Image src={url2} alt="" layout="fill" objectFit="contain" />
      </StyledSecondImage>
    </Box>
  )
}
