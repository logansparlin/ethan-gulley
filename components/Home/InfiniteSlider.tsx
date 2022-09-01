import { urlFor } from "@lib/sanity"
import styled from 'styled-components';
import { lerp } from "@lib/helpers";
import { useRef } from "react";
import { useAnimationFrame } from "@hooks/useAnimationFrame";
import gsap from "gsap";

import { Box } from "@components/box"
import Image from 'next/image'

const GUTTER = 5;

const StyledImage = styled(Box)`
  transition: opacity 350ms ease-in-out;
  &:hover {
    opacity: 0.5;
    transition: opacity 350ms ease-in-out;
  }
`

const InfiniteSlider = ({ projects, activeProject, updateProject, scroll }) => {
  const container = useRef(null);
  const itemRef = useRef(null);
  const itemWidth = useRef(0);
  const containerWidth = useRef(0);
  const wrapWidth = useRef(0);

  const dispose = (scroll) => {
    if (typeof window === 'undefined') return null;
    gsap.set(document.querySelectorAll('.infinite-item'), {
      x: (i) => {
        return i * (itemWidth.current + GUTTER) + scroll
      },
      modifiers: {
        x: (x, target) => {
          const s = gsap.utils.wrap(-itemWidth.current, wrapWidth.current - itemWidth.current, parseInt(x))
          return `${s}px`
        }
      }
    })
    console.log('disposing: ', scroll)
  }

  dispose(0);

  useAnimationFrame(() => {
    itemWidth.current = itemRef.current.clientWidth;
    containerWidth.current = container.current.clientWidth;
    wrapWidth.current = projects.length * (itemWidth.current + GUTTER);
    scroll.current = lerp(scroll.current, scroll.target, 0.05)
    dispose(scroll.current)
  })

  return (
    <Box
      width="100%"
      height="90px"
      style={{ whiteSpace: 'nowrap' }}
      overflow="hidden"
      ref={container}
    >
      {projects.map((project, index) => {
        const url = urlFor(project.image.src).auto('format').width(200).url();
        return (
          <StyledImage
            ref={index === 0 ? itemRef : null}
            position="absolute"
            width="72px"
            height="90px"
            mr="5px"
            key={project._id}
            display="inline-block"
            cursor="pointer"
            opacity={activeProject._id === project._id ? '0.5' : '1'}
            bg="#eee"
            onClick={() => updateProject(project)}
            className="infinite-item"
            style={{ willChange: 'auto' }}
          >
            <Image
              src={url}
              layout="fill"
              objectFit="cover"
              alt={project.image.alt}
              loading="eager"
              placeholder="blur"
              blurDataURL={project.image.lqip}
            />
          </StyledImage>
        )
      })}
    </Box>
  )
}

export default InfiniteSlider;