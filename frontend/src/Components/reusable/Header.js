import React from "react";
import styled from "styled-components";
import Nav from "./Nav";

export const Header = () => {
  const HeaderContainer = styled.div`
    color: "white";
    margin: 0;
    `
  const HeaderWrapper = styled.div`
  color: "white";
  margin: 0;
`
;

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <h1 className='headerText'>Here goes our header</h1>
        <p>Here goes our Navigation</p>
        <Nav/>
      </HeaderWrapper>
    </HeaderContainer>
  );
};
