import { urlFor } from '@lib/sanity'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Box } from "@components/box"

export const NextImage = ({ images, afterIndex, nextProject }) => {
  return (
    <Box position="absolute" top="50%" transform="translateY(-50%)" width="72px" height="90px" right="0">
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
        {images && images.map((image, index) => {
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