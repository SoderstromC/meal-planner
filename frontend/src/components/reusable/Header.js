import React from "react";
import styled from "styled-components";
// import Nav from "./Nav"; /utkommenterad pga inte korrekt npm install, avvaktar Annikas svae, rensa ej i clean up!
import Logo from "../../assets/icons/logofoodify.svg";

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
      <LogoWrapper>
        <img src={Logo} alt="Logo" />
      </LogoWrapper>
      <NavWrapper>
        {/* <Nav/> */} 
      </NavWrapper>
    </HeaderWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
`
const HeaderWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center; 
`
const LogoWrapper = styled.div`
  width: 50%;
`
const NavWrapper = styled.div`
  width: 50%;
`
