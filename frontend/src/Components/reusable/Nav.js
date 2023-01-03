import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import styled from "styled-components";

const Nav = () => {

const dispatch = useDispatch();
const navigate = useNavigate();

const logOutOnClick = () => {
  dispatch(user.actions.setAccessToken(null));
  navigate("/login");
};

  return (
    <NavContainer>
      <NavWrapper>
        <h1 className='Here goes our menu'></h1>
        <button type="button" onClick={() => navigate(-1)}>GO BACK</button>
        <button type="button" onClick={logOutOnClick}>LOG OUT</button>
      </NavWrapper>
    </NavContainer>
  );
};
export default Nav;

const NavContainer = styled.div`
    color: "white";
    margin: 0;
  `
  const NavWrapper = styled.div`
  color: "white";
  margin: 0;
`;
