import { urlFor } from "@lib/sanity"
import { randomIntFromInterval } from "@lib/helpers"
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Box } from "@components/box"
import { useWindowSize } from "react-use"
import Image from 'next/image'
import { useMemo } from "react"

const StyledHover = styled(motion.div)`
  position: absolute;
  top: 50%;
  width: 300px;
  height: 300px;
  transform: translateY(-50%);
  pointer-events: none;
`

export const HoverImage = ({ image, active }) => {
  const url = image.asset ? urlFor(image.asset).auto('format').width(300).dpr(2).url() : urlFor(image.src).auto('format').width(500).url();
  const { width } = useWindowSize();

  const left = useMemo(() => {
    return randomIntFromInterval(0, (width / 2) - 150)
  }, [])

  return (
    <StyledHover
      style={{ left: `${left}px`, zIndex: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{
        duration: active ? 0.2 : 0.5,
        ease: 'linear',
        delay: active ? 0 : 0.45
      }}
    >
      <Image src={url} alt={image.alt ?? ""} layout="fill" objectFit="contain" objectPosition="center" />
    </StyledHover>
  )
}