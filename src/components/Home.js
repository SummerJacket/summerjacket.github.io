import React from 'react';
import Square from './Square';

const Home = () => (
  <div>
    <h1>
      Home
    </h1>
    <p>
       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <p>
       Nunc ut dui nec sapien semper porta. Nulla facilisi.
    </p>
    <p>
       Vivamus feugiat mollis sapien, et viverra justo tempor at.
    </p>
    <p>
       Aliquam ac ultricies elit, a accumsan sapien.
    </p>
    <Square color="red" />
    <Square color="green" />
    <Square color="blue" />
    <Square color="yellow" />
  </div>
);

export default Home;
