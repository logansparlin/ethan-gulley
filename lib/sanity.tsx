import { useState } from 'react';
import {
  createClient,
  createImageUrlBuilder,
} from 'next-sanity';
import styled from 'styled-components';

import { PortableText as SanityPortableText } from '@portabletext/react';
import { Box } from '@components/box';
import Image from 'next/image';

const StyledLink = styled.a`
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
  }
`


export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production'
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const PortableText = ({ value }) => {
  return (
    <SanityPortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <Box as="p" pt="32px" fontSize="14px" lineHeight="120%" letterSpacing="-0.015em">{children}</Box>
        },
        marks: {
          link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
            return (
              <StyledLink href={value.href} rel={rel}>
                {children}
              </StyledLink>
            )
          },
          imageHover: (props) => {
            const [hovered, setHovered] = useState(false);
            const url = urlFor(props.value.image).auto('format').width(1200).url();

            return (
              <>
                <Box
                  position="absolute"
                  width="100%"
                  height="100vh"
                  bg="transparent"
                  top="0"
                  left="0"
                  zIndex={-1}
                  pointerEvents="none"
                  opacity={hovered ? 1 : 0}
                  transition="opacity 150ms cubic-bezier(0.9, 0.15, 0.1, 0.8)"
                >
                  <Image src={url} layout="fill" objectFit="contain" objectPosition="left" alt="" />
                </Box>
                <Box
                  as="span"
                  textDecoration="underline"
                  cursor="pointer"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {props.children}
                </Box>
              </>
            )
          }
        },
      }}
    />
  )
}