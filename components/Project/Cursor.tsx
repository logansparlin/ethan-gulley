import { useState, useRef } from 'react';

import { Box } from '@components/box';

export const Cursor = ({ title, count, index }) => {
  const [visible, setVisible] = useState(false);
  const textRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { pageX, pageY } = e;
    const elPos = textRef.current?.getBoundingClientRect();

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
      zIndex="5"
      top="0"
      left="0"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
    >
      <Box
        opacity={visible ? 1 : 0}
        transition="opacity 200ms ease-in-out"
        position="absolute"
        top={`${pos.y}px`}
        left={`${pos.x}px`}
        textAlign="center"
        ref={textRef}
        pointerEvents="none"
        width="200px"
      >
        <Box>{title}</Box>
        <Box>{index}/{count}</Box>
      </Box>
    </Box>
  )
}