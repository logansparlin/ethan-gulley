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

export const NextImage = ({ images, afterIndex, transition, projectTransition = false }) => {
  const isTransitioning = useMemo(() => {
    return transition === 'prev'
  }, [transition])

  const isLastImage = useMemo(() => {
    return afterIndex === 0
  }, [afterIndex])

  return (
    <Box display={["none", null, "block"]} position="absolute" top="50%" transform="translateY(-50%)" width="72px" height={["55px", null, "90px"]} right="0">
      <StyledImage
        initial={{ opacity: projectTransition ? 1 : 0 }}
        animate={{
          opacity: isTransitioning ? 0 : 1,
          x: isTransitioning ? '100%' : 0,
          transition: {
            duration: 0.6, ease: 'easeInOut'
          }
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {!isLastImage && images && images.map((image, index) => {
          const img = urlFor(image).auto('format').width(200).url();
          return (
            <Box key={image._key} opacity={index === afterIndex ? 1 : 0}>
              <Image src={img} alt={image.alt} layout="fill" objectFit="contain" objectPosition="right" placeholder="blur" blurDataURL={image.metadata.lqip} />
            </Box>
          )
        })}
      </StyledImage>
    </Box>
  )
}