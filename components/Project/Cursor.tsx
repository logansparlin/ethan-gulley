import { useState, useRef } from 'react';

import { Box } from '@components/box';
import { useWindowSize } from '@hooks/useWindowSize';

export const Cursor = ({ title, count, index, onLeftClick, onRightClick, nextProject, previousProject }) => {
  const [visible, setVisible] = useState(false);
  const textRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [side, setSide] = useState(null);
  const { width } = useWindowSize();

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

    setPos({
      x: pageX - (elPos.width / 2),
      y: pageY - (elPos.height / 2)
    })
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
      <Box as="button" position="fixed" width="50%" height="100%" top="0" left="0" zIndex="2" onClick={onLeftClick} cursor="none" />
      <Box as="button" position="fixed" width="50%" height="100%" top="0" left="50%" zIndex="2" onClick={onRightClick} cursor="none" />
      <Box
        opacity={visible ? 1 : 0}
        transition="opacity 200ms ease-in-out"
        position="absolute"
        top={`${pos.y}px`}
        left={`${pos.x}px`}
        textAlign="center"
        ref={textRef}
        style={{ pointerEvents: 'none' }}
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
      <Box>{index}/{count}</Box>
    </>
  )
}