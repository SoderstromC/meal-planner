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
        <button type="button" onClick={logOutOnClick}>LOG OUT</button>
      </NavContainer>
  );
};
export default Nav;

  const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  `

