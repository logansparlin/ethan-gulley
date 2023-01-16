import { useMemo } from 'react'
import { urlFor } from '@lib/sanity'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Box } from "@components/box"

export const PreviousImage = ({ images, beforeIndex, previousProject }) => {
  const isFirstImage = useMemo(() => {
    return images.length - 1 === beforeIndex
  }, [images, beforeIndex])
  const previousProjectUrl = previousProject.images
    ? urlFor(previousProject.images[previousProject.images.length - 1]).auto('format').width(200).url()
    : '';

  return (
    <Box position="absolute" top="50%" transform="translateY(-50%)" width="72px" height="90px" left="0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1, transition: {
            duration: 0.6, ease: 'linear'
          }
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'linear' }}
      >
        {isFirstImage && (
          <Box opacity={isFirstImage ? 1 : 0}>
            <Image src={previousProjectUrl} alt={previousProject.title} layout="fill" objectFit="contain" objectPosition="left" />
          </Box>
        )}
        {!isFirstImage && images && images.map((image, index) => {
          const img = urlFor(image).auto('format').width(200).url();
          return (
            <Box key={image._key} opacity={index === beforeIndex ? 1 : 0}>
              <Image src={img} alt={image.alt} layout="fill" objectFit="contain" objectPosition="left" />
            </Box>
          )
        })}
      </motion.div>
    </Box>
  )
}