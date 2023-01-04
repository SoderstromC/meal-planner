import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { Link } from 'react-router-dom';
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
      <Link to={`/`}>
          <p>Main</p>
      </Link>
      <Link to={`/recipes`}>
          <p>Recipes</p>
      </Link>
      <Link to={`/saved`}>
          <p>My saved recipes</p>
      </Link>
      <Link to={`/shoppinglist`}>
          <p>My shopping list</p>
      </Link>
        <LogOutButton type="button" onClick={logOutOnClick}>LOG OUT</LogOutButton>
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
  display: flex;
  justify-content: center;
  gap: 10px;
`
const LogOutButton = styled.button`
height: 20px;
margin-top: 20px;
`
