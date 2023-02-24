import { useRef, useEffect } from "react";
import { useAnimationFrame } from "@hooks/useAnimationFrame";
import { useHomeStore } from "@hooks/useHomeStore";
import { urlFor } from "@lib/sanity"
// import { lerp } from "@lib/helpers";
import { motion } from 'framer-motion';
import { useWindowSize } from "@hooks/useWindowSize";
import { calculateIndex } from "@lib/helpers";
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

const InfiniteSlider = ({ projects, focusedIndex, updateProject, scroll, loading }) => {
  const container = useRef(null);
  const itemRef = useRef(null);
  const itemWidth = useRef(0);
  const containerWidth = useRef(0);
  const lastActiveIndex = useRef(focusedIndex);
  const items = useRef(null);
  const wrapWidth = useRef(0);
  const loadingRef = useRef(loading);
  const { width } = useWindowSize();
  const { setFirstIndex, setFocusedIndex } = useHomeStore();
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

    const calculate = () => {
      itemWidth.current = itemRef.current.clientWidth;
      containerWidth.current = container.current.clientWidth;
      wrapWidth.current = projects.length * (itemWidth.current + gutter.current);
      const offset = window.innerWidth / 2;

      const containerIndex = Math.abs(Math.floor(-1 * (scroll.current - offset) / wrapWidth.current))
      const firstIndex = calculateIndex({ scroll: scroll.current, offset, containerIndex, wrapWidth: wrapWidth.current, itemWidth: itemWidth.current, gutter: gutter.current })

      setFocusedIndex(firstIndex)
      setFirstIndex(firstIndex)
    }

    calculate();

    window.addEventListener('resize', calculate);

    return () => {
      window.removeEventListener('resize', calculate);
    }

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

    // scroll.current = lerp(scroll.current, scroll.target, 0.2);
    scroll.current = scroll.target

    const offset = window.innerWidth / 2;

    const containerIndex = Math.abs(Math.floor(-1 * (scroll.current - offset) / wrapWidth.current))

    const activeIndex = calculateIndex({ scroll: scroll.current, offset, containerIndex, wrapWidth: wrapWidth.current, itemWidth: itemWidth.current, gutter: gutter.current })

    if (loadingRef.current) return;

    if (lastActiveIndex.current !== activeIndex) {
      lastActiveIndex.current = activeIndex;
      updateProject(activeIndex)
    }

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
        const url = project.image ? urlFor(project.image.src).auto('format').width(90).dpr(2).url() : urlFor(project.images[0].src).fit('max').auto('format').url();
        return (
          <StyledImage
            key={project._id}
            ref={index === 0 ? itemRef : null}
            position="relative"
            width={["32px", null, "72px"]}
            height={["40px", null, "90px"]}
            mr={["2px", null, "5px"]}
            display="inline-block"
            cursor="pointer"
            opacity={focusedIndex === index ? '0.5' : '1'}
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