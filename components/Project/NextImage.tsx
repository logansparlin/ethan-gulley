import { useMemo } from 'react'
import { urlFor } from '@lib/sanity'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Box } from "@components/box"

export const NextImage = ({ images, afterIndex, nextProject, transition }) => {
  const isTransitioning = useMemo(() => {
    return transition === 'prev'
  }, [transition])

  const isLastImage = useMemo(() => {
    return afterIndex === 0
  }, [images, afterIndex])

  const nextProjectUrl = nextProject.images
    ? urlFor(nextProject.images[0]).auto('format').width(200).url()
    : '';

  return (
    <Box position="absolute" top="50%" transform="translateY(-50%)" width="72px" height="90px" right="0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isTransitioning ? 0 : 1,
          x: isTransitioning ? '100%' : 0,
          transition: {
            duration: 0.6, ease: 'easeInOut'
          }
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ width: '72px', height: '90px' }}
      >
        {isLastImage && (
          <Box opacity={isLastImage ? 1 : 0}>
            <Image src={nextProjectUrl} alt={nextProject.title} layout="fill" objectFit="contain" objectPosition="left" />
          </Box>
        )}
        {!isLastImage && images && images.map((image, index) => {
          const img = urlFor(image).auto('format').width(200).url();
          return (
            <Box key={image._key} opacity={index === afterIndex ? 1 : 0}>
              <Image src={img} alt={image.alt} layout="fill" objectFit="contain" objectPosition="right" />
            </Box>
          )
        })}
      </motion.div>
    </Box>
  )
}