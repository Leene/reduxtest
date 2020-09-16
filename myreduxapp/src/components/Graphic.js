import React from 'react'
import styled from "styled-components"
import Store_text from "./Store_text"


export default function Graphic(){
    return (<Store>
        {Store_text()}
    </Store>
    )
}

const Store = styled.section`
  height: 90vh;
  text-align: center;
  
`;