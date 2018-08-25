import posed from 'react-pose';
import styled from 'styled-components';

const MenuBackground = styled(
  posed.div({
    open: {
      height: ({ menuheight, startingheight }) => menuheight + startingheight,
      transition: { type: 'spring', mass: 0.7 },
    },
    closed: {
      height: ({ startingheight }) => startingheight,
      transition: { ease: 'anticipate', duration: 600 },
    },
    props: { startingheight: 0 },
  })
)`
  position: fixed;
  width: inherit;
`;

export default MenuBackground;
