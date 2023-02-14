import { useMemo } from 'react'
import { urlFor } from '@lib/sanity'
import styled from 'styled-components'
import css from '@styled-system/css'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Box } from "@components/box"

const StyledImage = styled(motion.div)`
  ${css({
  height: ['80px', null, '90px'],
  width: ['64px', null, '72px']
})}
`

export const PreviousImage = ({ images, beforeIndex, transition, projectTransition = false }) => {

  const isTransitioningPrevious = useMemo(() => {
    return transition === 'prev'
  }, [transition])

  const isFirstImage = useMemo(() => {
    return images ? images.length - 1 === beforeIndex : false
  }, [images, beforeIndex])

  return (
    <Box display={["none", null, "block"]} position="absolute" top="50%" transform="translateY(-50%)" width={["42px", null, "72px"]} height={["55px", null, "90px"]} left="0">
      <StyledImage
        initial={{ opacity: projectTransition ? 1 : 0 }}
        animate={{
          scale: 1,
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: [1, 0.15, 0.25, 0.9]
          }
        }}
        exit={{ opacity: isTransitioningPrevious ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'linear' }}
      >
        {!isFirstImage && images && images.map((image, index) => {
          const img = urlFor(image).auto('format').width(200).url();
          return (
            <Box key={image._key} opacity={index === beforeIndex ? 1 : 0}>
              <Image src={img} alt={image.alt} layout="fill" objectFit="contain" objectPosition="left" />
            </Box>
          )
        })}
      </StyledImage>
    </Box>
  )
}