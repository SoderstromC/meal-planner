import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import Logo from "../../assets/icons/logofoodify.svg";

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
      <LogoWrapper>
        <img src={Logo} alt="Logo" />
      </LogoWrapper>
      <NavWrapper>
        <Nav/> 
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
  width: 30%;
`
const NavWrapper = styled.div`
  width: 70%;
`
