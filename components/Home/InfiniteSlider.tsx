import { useRef, useEffect } from "react";
import { useAnimationFrame } from "@hooks/useAnimationFrame";
import { urlFor } from "@lib/sanity"
import styled from 'styled-components';
import { lerp } from "@lib/helpers";
import gsap from "gsap";
import { motion } from 'framer-motion';

import { Box } from "@components/box"
import Image from 'next/image'

const Slider = styled(motion(Box))`

`;

const GUTTER = 5;

const StyledImage = styled(Box)`
  transition: opacity 350ms ease-in-out;
`

const InfiniteSlider = ({ projects, activeProject, updateProject, scroll }) => {
  const container = useRef(null);
  const itemRef = useRef(null);
  const itemWidth = useRef(0);
  const containerWidth = useRef(0);
  const items = useRef(null);
  const wrapWidth = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    items.current = document.querySelectorAll('.infinite-item');
  }, []);

  const animate = (scroll) => {
    if (!items.current) return;

    gsap.set(items.current, {
      x: (i) => {
        return i * (itemWidth.current + GUTTER) + scroll
      },
      z: 0,
      modifiers: {
        x: (x, target) => {
          const s = gsap.utils.wrap(-itemWidth.current, wrapWidth.current - itemWidth.current, Number(x.replace('px', '')))
          return `${s}px`
        }
      }
    })
  }

  animate(0);

  useAnimationFrame((val) => {
    if (!itemRef.current) return null;
    itemWidth.current = itemRef.current.clientWidth;
    containerWidth.current = container.current.clientWidth;
    wrapWidth.current = projects.length * (itemWidth.current + GUTTER);
    scroll.current = lerp(scroll.current, scroll.target, 0.05)

    const offset = window.innerWidth / 2;

    const containerIndex = Math.abs(Math.floor(-1 * (scroll.current - offset) / wrapWidth.current))
    const activeIndex = scroll.current - offset <= 0
      ? Math.floor(-1 * (wrapWidth.current - (wrapWidth.current - ((scroll.current + (Math.abs(wrapWidth.current) * containerIndex)) - offset))) / (itemWidth.current + GUTTER))
      : Math.floor((wrapWidth.current - (wrapWidth.current - ((Math.abs(wrapWidth.current) * containerIndex) - scroll.current) - offset)) / (itemWidth.current + GUTTER));


    window.localStorage.setItem('first-index', activeIndex.toString())


    updateProject(projects[activeIndex])

    animate(scroll.current)
  })

  const handleClick = (project, index) => {
    updateProject(project)
    const newScroll = (itemWidth.current + GUTTER) * index;
    scroll.target = -1 * newScroll + ((window.innerWidth / 2) - (itemWidth.current / 2));
  }

  return (
    <Slider
      width="100%"
      height="90px"
      style={{ whiteSpace: 'nowrap', willChange: 'auto' }}
      overflow="hidden"
      ref={container}
      initial={{ opacity: 0, y: 90 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 90 }}
      transition={{ duration: 1, ease: [.8, 0, .1, 0.9] }}
    >
      {projects.map((project, index) => {
        const url = urlFor(project.image.src).auto('format').width(1000).url();
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
            onClick={() => handleClick(project, index)}
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
    </Slider>
  )
}

export default InfiniteSlider;