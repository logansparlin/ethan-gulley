import { FC, ReactNode, MouseEvent } from 'react';
import styled from 'styled-components';

import { Box } from './box';

const Button = styled(Box)`
  display: inline-block;
  appearance: none;
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  border-radius: 0;
  background: transparent;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  cursor: pointer;
`;

interface ButtonOwnProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TextButton: FC<ButtonOwnProps> = ({ children, onClick, ...rest }) => {
  return (
    <Button as="button" onClick={onClick} {...rest}>
      {children}
    </Button>
  )
}

export default TextButton;