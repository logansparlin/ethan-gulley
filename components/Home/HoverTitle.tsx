import { useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useMouseHovered } from 'react-use';
import { useLerp } from '@hooks/useLerp';

import { Box } from "@components/box"

export const StyledHoverTitle = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  left: 0;
  text-align: center;
  z-index: 1;
  color: #000;
  pointer-events: none;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
`;

const StyledTitle = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 200px;
  will-change: auto;
`

export const HoverTitle = ({ children }) => {
  const hoverRef = useRef(null);
  const elRef = useRef(null);
  const { elX, elY } = useMouseHovered(hoverRef, { bound: false, whenHovered: false });

  const animateX = (value) => {
    if (!elRef || !elRef.current) return;
    elRef.current.style.left = `${value}px`
  }

  const animateY = (value) => {
    if (!elRef || !elRef.current) return;
    elRef.current.style.top = `${value}px`
  }

  const { update: updateX } = useLerp(animateX);
  const { update: updateY } = useLerp(animateY)

  updateX(elX)
  updateY(elY)

  return (
    <StyledHoverTitle ref={hoverRef}>
      <StyledTitle ref={elRef}>{children}</StyledTitle>
    </StyledHoverTitle>
  )
}