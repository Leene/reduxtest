import React from 'react'
import styled from "styled-components"

export default function Store_text(){

return (
<div>
    <Graphic>
    <Headline> Was ist Redux?</Headline>
    </Graphic>
<TextContainer>
    <Text>
        Redux ist eine Javascript-Bibliothek für ein übesichtlicheres 
        Management von Zusatandswerten (States) in React-Anwendungen.
    </Text>
</TextContainer>
    
<Graphic>
        <Headline>Store in Redux</Headline>
    </Graphic>
</div>
)}

const Headline = styled.h1`
color: #83c3bd;
`;

const TextContainer = styled.div`
width: 80%; 
margin:auto;
background-color: rgba(255, 255, 255, 0.3);
`;

const Text = styled.p`
color: black;
padding: 10px 20px;
text-align:left;

`;


const Graphic = styled.div`
height: 50px;
width: 80%;
margin:auto;
color: lightgreen;
background-color: rgba(0, 0, 0, 0.1);
`;
