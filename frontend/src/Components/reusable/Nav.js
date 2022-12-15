import React from "react";
import styled from "styled-components";

const Nav = () => {
  const NavContainer = styled.div`
    color: "white";
    margin: 0;
  `
  const NavWrapper = styled.div`
  color: "white";
  margin: 0;
`;

  return (
    <NavContainer>
      <NavWrapper>
        <h1 className='Here goes our menu'></h1>
      </NavWrapper>
    </NavContainer>
  );
};
export default Nav;
