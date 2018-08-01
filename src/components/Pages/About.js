import React from 'react';
import posed from 'react-pose';

import Default from '../MediaQuery/Default';
import Desktop from '../MediaQuery/Desktop';
import Mobile from '../MediaQuery/Mobile';
import Tablet from '../MediaQuery/Tablet';

const PosedAbout = posed.div({
  before: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

const About = () => (
  <PosedAbout>
    <h1>About</h1>
    <Default>
      <p>You&apos;re not viewing from a mobile phone</p>
    </Default>
    <Desktop>
      <p>You&apos;re viewing from a desktop machine</p>
    </Desktop>
    <Mobile>
      <p>You&apos;re viewing from a mobile phone</p>
    </Mobile>
    <Tablet>
      <p>You&apos;re viewing from a tablet</p>
    </Tablet>
  </PosedAbout>
);

export default About;
