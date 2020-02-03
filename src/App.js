import React, { useMeasure } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import _ from "lodash";
import "./App.css";

const dotCount = 5;
const moveSpeed = 300;
const bounceHeight = 150;
const interp = i => r => {
  console.log(bounceHeight * Math.sin(r + (i % 2)));

  return `translate3d(0, ${bounceHeight * Math.sin(r + (i % 2))}px, ${2 *
    Math.sin(r + (i % 2))}em)`;
};

function App() {
  const { move } = useSpring({
    to: async next => {
      while (1) await next({ move: moveSpeed });
    },
    from: { move: 0 }, // starting point
    config: { duration: 50000 },
    reset: true
  });
  return (
    <AppBody>
      {_.map(_.range(dotCount), (dot, index) => (
        <AnimatedDot
          style={{
            transform: move.interpolate(interp(index))
          }}
          key={index}
        />
      ))}
    </AppBody>
  );
}

const AppBody = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Dot = styled.div`
  background-color: #336699;
  border-radius: 50%;
  height: 100px;
  width: 100px;
`;

const AnimatedDot = animated(Dot);

export default App;
