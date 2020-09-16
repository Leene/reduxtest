import React from 'react'
import styled from "styled-components"

//import logo from './logo.svg'
import './App.css'

import Graphic from "./components/Graphic"

export default function App() {
  return (
    <Main>
      <h1>Redux in React</h1>
 <div>{Graphic()}</div>

    </Main>
  );
}

const Main = styled.main`
    background: linear-gradient(
        0deg,
        rgba(162, 203, 199, 1) 9%,
        rgba(205, 151, 151, 1) 100%
    );
    height: 100vh;
    width: 100vw;
    font-size: calc(10px + 2vmin);
    color: #555;
`



