import styled from 'styled-components';
import { 
    border,
    BorderProps,
    color,
    ColorProps,
    flexbox,
    FlexboxProps,
    grid,
    GridProps,
    layout,
    LayoutProps,
    position,
    PositionProps,
    shadow,
    ShadowProps,
    space,
    SpaceProps,
    typography,
    TypographyProps,
    compose,
    system
} from 'styled-system';

type Props = BorderProps
    & ColorProps
    & FlexboxProps  
    & GridProps
    & LayoutProps
    & PositionProps
    & ShadowProps
    & SpaceProps
    & TypographyProps;

const systemProps = compose(
    border,
    color,
    flexbox,
    grid,
    layout,
    position,
    shadow,
    space,
    typography,
    compose
);

const Box = styled.div<Props>`
    ${systemProps}
    ${system({
        cursor: {
            property: 'cursor'
        }
    })}
`;

export default Box;