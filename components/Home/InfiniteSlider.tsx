import { useRef, useEffect } from "react";
import { useAnimationFrame } from "@hooks/useAnimationFrame";
import { urlFor } from "@lib/sanity"
import { lerp } from "@lib/helpers";
import { motion } from 'framer-motion';
import { useWindowSize } from "@hooks/useWindowSize";
import styled from 'styled-components';
import gsap from "gsap";

import { Box } from "@components/box"
import Image from 'next/image'

const Slider = styled(motion(Box))``;

const StyledImage = styled(Box)`
  transition: opacity 850ms ease-in-out;
  transition-delay: 200ms;
  &:hover {
    transition: opacity 250ms ease-in-out;
    opacity: 0.5;
  }
`

const InfiniteSlider = ({ projects, focusedProject, updateProject, scroll, loading }) => {
  const container = useRef(null);
  const itemRef = useRef(null);
  const itemWidth = useRef(0);
  const containerWidth = useRef(0);
  const items = useRef(null);
  const wrapWidth = useRef(0);
  const loadingRef = useRef(loading);
  const { width } = useWindowSize();
  const gutter = useRef(5);

  useEffect(() => {
    gutter.current = width < 832 ? 2 : 5
  }, [width])

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading])

  useEffect(() => {
    if (typeof window === 'undefined') return;

    items.current = document.querySelectorAll('.infinite-item');
  }, []);

  const animate = (scroll) => {
    if (!items.current) return;

    gsap.set(items.current, {
      x: (i) => {
        return i * (itemWidth.current + gutter.current) + scroll
      },
      z: 0,
      modifiers: {
        x: (x) => {
          const s = gsap.utils.wrap(-itemWidth.current, wrapWidth.current - itemWidth.current, Number(x.replace('px', '')))
          return `${s}px`
        }
      }
    })
  }

  useAnimationFrame(() => {
    if (!itemRef.current) return;

    itemWidth.current = itemRef.current.clientWidth;
    containerWidth.current = container.current.clientWidth;
    wrapWidth.current = projects.length * (itemWidth.current + gutter.current);
    scroll.current = lerp(scroll.current, scroll.target, 0.05)

    const offset = window.innerWidth / 2;

    const containerIndex = Math.abs(Math.floor(-1 * (scroll.current - offset) / wrapWidth.current))
    const activeIndex = scroll.current - offset <= 0
      ? Math.floor(-1 * (wrapWidth.current - (wrapWidth.current - ((scroll.current + (Math.abs(wrapWidth.current) * containerIndex)) - offset))) / (itemWidth.current + gutter.current))
      : Math.floor((wrapWidth.current - (wrapWidth.current - ((Math.abs(wrapWidth.current) * containerIndex) - scroll.current) - offset)) / (itemWidth.current + gutter.current));

    window.localStorage.setItem('first-index', activeIndex.toString())

    if (loadingRef.current) return;

    updateProject(activeIndex)

    animate(scroll.current)
  })

  const handleClick = (_, index) => {
    updateProject(index)
    const newScroll = (itemWidth.current + gutter.current) * index;
    scroll.target = -1 * newScroll + ((window.innerWidth / 2) - (itemWidth.current / 2));
  }

  return (
    <Slider
      width="100%"
      height={["40px", null, "90px"]}
      style={{ whiteSpace: 'nowrap', willChange: 'auto' }}
      overflow="hidden"
      ref={container}
      initial={{ opacity: 0, y: 90 }}
      animate={{ opacity: 1, y: loading ? 90 : 0 }}
      exit={{ opacity: 0, y: 90 }}
      transition={{ duration: 0.6, ease: [.9, 0, .1, 0.9] }}
    >
      {projects.map((project, index) => {
        const url = project.image ? urlFor(project.image.src).auto('format').width(400).url() : urlFor(project.images[0].src).width(400).auto('format').url();
        return (
          <StyledImage
            key={project._id}
            ref={index === 0 ? itemRef : null}
            position="absolute"
            width={["32px", null, "72px"]}
            height={["40px", null, "90px"]}
            mr={["2px", null, "5px"]}
            display="inline-block"
            cursor="pointer"
            opacity={focusedProject._id === project._id ? '0.5' : '1'}
            bg="#eee"
            onClick={() => handleClick(project, index)}
            className="infinite-item"
            style={{ willChange: 'auto' }}
          >
            <Image
              src={url}
              layout="fill"
              objectFit="cover"
              alt={project.image?.alt || ""}
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