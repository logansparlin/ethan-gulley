import styled from 'styled-components'
import css from '@styled-system/css'
import { GRID_BREAKPOINTS } from '@lib/constants';
import { urlFor } from '@lib/sanity';
import { getImageDimensions } from '@sanity/asset-utils';
import { motion, AnimatePresence } from 'framer-motion'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Box } from "@components/box"
import Image from 'next/image'
import { useEffect, useRef } from 'react';

const StyledOverview = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: black;
  color: white;
  z-index: 100;
  cursor: auto;
  padding: 20px;
`

const Header = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  padding: 20px;
  left: 0;
  z-index: 1000;
  color: white;
  width: 100%;
  cursor: auto;
`

const Title = styled.h1`
  text-align: center;
  ${css({
  fontSize: '44px',
  fontWeight: 500,
  pt: '80px',
  pb: '90px'
})}
`;

export const Overview = ({ title, images, credits, close, isOpen, setActiveIndex }) => {
  const container = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !container.current) {
      return;
    }

    let scroll;
    import("locomotive-scroll").then((LocomotiveScroll) => {
      scroll = new LocomotiveScroll.default({
        el: container.current,
        smooth: true,
        tablet: {
          smooth: true
        },
        smartphone: {
          smooth: true
        }
      });
    });

    return () => {
      scroll.destroy()
    }
  }, [isOpen])

  return (
    <AnimatePresence initial={true}>
      {isOpen ? <>
        <Header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <Box>{title}</Box>
          <Box as="button" onClick={close} lineHeight="0" p="0">Close</Box>
        </Header>
        <StyledOverview
          ref={container}
          initial={{ opacity: 1, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: '100%' }}
          transition={{ duration: 0.8, ease: [.9, 0, .1, 0.9] }}
          key="overview"
        >
          <Title>{title}</Title>
          <ResponsiveMasonry columnsCountBreakPoints={GRID_BREAKPOINTS}>
            <Masonry gutter="20px">
              {images.map((image, index) => {
                const url = urlFor(image).width(500).auto('format').url();
                const dimensions = getImageDimensions(image)
                return (
                  <Box key={url} onClick={() => setActiveIndex(index)}>
                    <Box
                      position="relative"
                      width="100%"
                      height="0"
                      pb={`${(dimensions.height / dimensions.width) * 100}%`}
                    >
                      <Box>
                        <Image src={url} layout="fill" objectFit="cover" alt={image.alt} />
                      </Box>
                    </Box>
                  </Box>
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
          <Box pt="100px" lineHeight="98%" letterSpacing="-0.015em">
            <div>Credits</div>
            <Box pt="34px">
              {credits.map(credit => {
                return (
                  <Box key={credit._key}>
                    <span>{credit.title} </span>
                    {credit.name?.map((item, index) => {
                      return (
                        <span key={item._key}>{item.name}{`${index < credit.name.length - 1 ? ', ' : ''}`}</span>
                      )
                    })}
                  </Box>
                )
              })}
            </Box>
          </Box>
        </StyledOverview>
      </> : null}
    </AnimatePresence>
  )
}