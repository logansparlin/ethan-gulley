import styled from 'styled-components'
import css from '@styled-system/css'
import { GRID_BREAKPOINTS } from '@lib/constants';
import { urlFor } from '@lib/sanity';
import { getImageDimensions } from '@sanity/asset-utils';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Box } from "@components/box"
import Image from 'next/image'
import { useEffect, useRef } from 'react';

const StyledOverview = styled.div`
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
  padding-bottom: 100px;
`

const Header = styled.header`
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

export const Overview = ({ close, title, images }) => {
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
  }, [])

  return (
    <>
      <Header>
        <Box>{title}</Box>
        <Box as="button" onClick={close}>Close</Box>
      </Header>
      <StyledOverview ref={container}>
        <Title>{title}</Title>
        <ResponsiveMasonry columnsCountBreakPoints={GRID_BREAKPOINTS}>
          <Masonry gutter="20px">
            {images.map(image => {
              const url = urlFor(image).width(500).auto('format').url();
              const dimensions = getImageDimensions(image)
              return (
                <Box>
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
      </StyledOverview>
    </>
  )
}