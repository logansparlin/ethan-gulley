import styled from 'styled-components'

import { Box } from "@components/box"

export const StyledHoverTitle = styled(Box)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 1;
  color: #000;
  transform: translateY(-50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
`;

export const HoverTitle = ({ children }) => {
  return (
    <StyledHoverTitle>
      {children}
    </StyledHoverTitle>
  )
}