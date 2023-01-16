import { useState, useRef } from 'react';
import { useWindowSize } from '@hooks/useWindowSize';
import { useLerp } from '@hooks/useLerp';

import { Box } from '@components/box';

export const Cursor = ({ title, count, index, onLeftClick, onRightClick, nextProject, previousProject }) => {
  const [visible, setVisible] = useState(false);
  const textRef = useRef(null);
  const [side, setSide] = useState(null);
  const { width } = useWindowSize();

  const animateX = (value) => {
    if (!textRef || !textRef.current) return;
    textRef.current.style.left = `${value}px`
  }

  const animateY = (value) => {
    if (!textRef || !textRef.current) return;
    textRef.current.style.top = `${value}px`
  }

  const { update: updateX } = useLerp(animateX, 0.3);
  const { update: updateY } = useLerp(animateY, 0.3);

  const handleMouseMove = (e) => {
    const { pageX, pageY } = e;
    const elPos = textRef.current?.getBoundingClientRect();

    setVisible(true)

    if (pageX < width / 2 && side !== 'left') {
      setSide('left')
    }

    if (pageX >= width / 2 && side !== 'right') {
      setSide('right')
    }

    const x = pageX - (elPos.width / 2)
    const y = pageY - (elPos.height / 2)

    updateX(x)
    updateY(y)
  }

  return (
    <Box
      position="fixed"
      width="100%"
      height="100vh"
      zIndex="1"
      top="0"
      left="0"
      cursor="none"
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
    >
      <Box as="button" position="fixed" width="50%" height="100vh" top="0" left="0" zIndex="2" onClick={onLeftClick} cursor="none" />
      <Box as="button" position="fixed" width="50%" height="100vh" top="0" left="50%" zIndex="2" onClick={onRightClick} cursor="none" />
      <Box
        opacity={visible ? 1 : 0}
        transition="opacity 200ms ease-in-out"
        position="absolute"
        top="0"
        left="0"
        textAlign="center"
        ref={textRef}
        width="200px"
      >
        {index === 1 && side === 'left' ? <PrevCursor title={previousProject.title} /> : null}
        {index === count && side === 'right' ? <NextCursor title={nextProject.title} /> : null}
        {(index === 1 && side === 'right') || (index === count && side === 'left') || index > 1 && index < count ? <CurrentCursor title={title} index={index} count={count} /> : null}
      </Box>
    </Box>
  )
}

const NextCursor = ({ title }) => {
  return (
    <>
      <Box>Next Project</Box>
      <Box>{title}</Box>
    </>
  )
}

const PrevCursor = ({ title }) => {
  return (
    <>
      <Box>Previous Project</Box>
      <Box>{title}</Box>
    </>
  )
}

const CurrentCursor = ({ title, index, count }) => {
  return (
    <>
      <Box>{title}</Box>
      <Box>{index}/{count > 0 ? count : 1}</Box>
    </>
  )
}