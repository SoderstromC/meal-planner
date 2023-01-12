import React from "react";
import styled from "styled-components";

export const Footer = () => {
  
  return (
    <FooterContainer as='footer' backgroundColor='white'>
      <FooterWrapper>
        <h1 className='footerText'>Here goes our footer</h1>
      </FooterWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
color: "white";
margin: 0;
`;
const FooterWrapper = styled.div`
color: "white";
margin: 0;
`;
