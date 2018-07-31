import React from 'react';
import posed from 'react-pose';

import Square from './Square';

const PosedHome = posed.div({
  before: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

const Home = () => (
  <PosedHome>
    <h1>Home</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <p>Nunc ut dui nec sapien semper porta. Nulla facilisi.</p>
    <p>Vivamus feugiat mollis sapien, et viverra justo tempor at.</p>
    <p>Aliquam ac ultricies elit, a accumsan sapien.</p>
    <Square color="red" />
    <Square color="green" />
    <Square color="blue" />
    <Square color="yellow" />
  </PosedHome>
);

export default Home;
