import styled from 'styled-components'
import css from '@styled-system/css'
import { GRID_BREAKPOINTS } from '@lib/constants';
import { urlFor } from '@lib/sanity';
import { getImageDimensions } from '@sanity/asset-utils';
import { motion, AnimatePresence } from 'framer-motion'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Box } from "@components/box"
import Image from 'next/image'
import { useRef } from 'react';

const OverviewContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  inset: 0;
  z-index: 100;
  overflow: scroll;
  transition: translate3d(0, 0, 0);
`

const StyledOverview = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  background: white;
  color: black;
  z-index: 100;
  cursor: auto;
  padding: 20px;
  will-change: transform;
`

const Header = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  padding: 20px;
  left: 0;
  z-index: 1000;
  color: black;
  width: 100%;
  cursor: auto;
  font-size: 14px;
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

  return (
    <AnimatePresence initial={true}>
      {isOpen ? <>
        <Header
          initial={{ opacity: 0, y: '100vh' }}
          animate={{ opacity: 1, y: '0' }}
          exit={{ opacity: 0, y: '100vh' }}
          transition={{ duration: 0.8, ease: [0.86, 0, 0.07, 1] }}
          key="header"
        >
          <Box>{title}</Box>
          <Box as="button" onClick={close} lineHeight="0" p="0">Close</Box>
        </Header>
        <OverviewContainer
          initial={{ opacity: 1, y: '100vh' }}
          animate={{ opacity: 1, y: '0' }}
          exit={{ opacity: 1, y: '100vh' }}
          transition={{ duration: 0.8, ease: [0.86, 0, 0.07, 1] }}
          style={{ willChange: 'auto', transform: 'translate3d(0, 0, 0)' }}
        >
          <StyledOverview
            ref={container}
            key="overview"
          >
            <Title>{title}</Title>
            {images ? <ResponsiveMasonry columnsCountBreakPoints={GRID_BREAKPOINTS}>
              <Masonry gutter="20px">
                {images.map((image, index) => {
                  const url = urlFor(image).width(500).quality(90).auto('format').url();
                  const dimensions = getImageDimensions(image)
                  const lqip = image.lqip;
                  return (
                    <Box key={url} onClick={() => setActiveIndex(index)}>
                      <Box
                        position="relative"
                        width="100%"
                        height="0"
                        pb={`${(dimensions.height / dimensions.width) * 100}%`}
                      >
                        <Box>
                          <Image src={url} placeholder="blur" blurDataURL={lqip} layout="fill" objectFit="cover" alt={image.alt} loading="lazy" />
                        </Box>
                      </Box>
                    </Box>
                  )
                })}
              </Masonry>
            </ResponsiveMasonry> : null}
            {credits && <Box pt="100px" lineHeight="98%" letterSpacing="-0.015em">
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
            </Box>}
          </StyledOverview>
        </OverviewContainer>
      </> : null}
    </AnimatePresence>
  )
}