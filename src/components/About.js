import React from 'react';
import posed from 'react-pose';

const PosedAbout = posed.div({
  before: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

const About = () => (
  <PosedAbout>
    <h1>About</h1>
  </PosedAbout>
);

export default About;
